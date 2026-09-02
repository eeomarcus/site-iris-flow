/* ============================================================
   Integração com o Supabase.

   Este arquivo é a única parte do site que conhece o banco. As páginas
   e o AccountContext falam só com as funções daqui, então trocar de
   provedor um dia não passa deste arquivo.

   O esquema correspondente está em supabase/schema.sql.
   ============================================================ */

import { client, mensagemDeErro } from '@/lib/supabase'
import type { Account, Payment, Profile } from '@/context/AccountContext'

/** Base de uma API própria, caso existam Edge Functions. Opcional. */
export const API_URL = import.meta.env.VITE_API_URL ?? ''

/** Erro já traduzido, para as telas exibirem direto. */
export class ApiError extends Error {
  constructor(causa: unknown) {
    super(mensagemDeErro(causa))
    this.name = 'ApiError'
  }
}

function erro(causa: unknown): never {
  throw new ApiError(causa)
}

/* ------------------------------------------------------------
   A view my_account devolve perfil, beneficiário, assinatura e forma
   de pagamento numa linha só. Aqui ela volta ao formato Account que
   as páginas já usam, para que nenhuma tela precise ser reescrita.
   ------------------------------------------------------------ */

type MyAccountRow = {
  subscription_id: string
  profile_id: string
  buyer_name: string
  email: string
  phone: string | null
  document: string | null
  newsletter: boolean
  user_name: string | null
  relation: string | null
  condition: string | null
  os: string | null
  prescriber_name: string | null
  prescriber_role: string | null
  status: Account['status']
  price_brl: number | string
  trial_ends_at: string
  next_charge_at: string
  canceled_at: string | null
  created_at: string
  payment_method: Payment['method'] | null
  billing_interval: 'mensal' | 'anual' | null
  card_last4: string | null
  card_brand: string | null
  holder: string | null
}

const COLUNAS = `
  subscription_id, profile_id, buyer_name, email, phone, document, newsletter,
  user_name, relation, condition, os, prescriber_name, prescriber_role,
  status, price_brl, trial_ends_at, next_charge_at, canceled_at, created_at,
  payment_method, billing_interval, card_last4, card_brand, holder
`

function paraAccount(row: MyAccountRow): Account {
  return {
    id: row.subscription_id,
    profile: {
      buyerName: row.buyer_name,
      email: row.email,
      phone: row.phone ?? '',
      document: row.document ?? '',
      userName: row.user_name ?? '',
      relation: row.relation ?? '',
      condition: row.condition ?? '',
      os: row.os ?? '',
      prescriberName: row.prescriber_name ?? undefined,
      prescriberRole: row.prescriber_role ?? undefined,
      newsletter: row.newsletter,
    },
    payment: row.payment_method
      ? {
          method: row.payment_method,
          cardLast4: row.card_last4 ?? undefined,
          cardBrand: row.card_brand ?? undefined,
          holder: row.holder ?? undefined,
          // o checkout usa 1 para mensal e 12 para anual
          installments: row.billing_interval === 'anual' ? 12 : 1,
        }
      : undefined,
    status: row.status,
    createdAt: row.created_at,
    trialEndsAt: row.trial_ends_at,
    nextChargeAt: row.next_charge_at,
    // numeric pode chegar como texto, dependendo da versão do PostgREST
    priceBRL: Number(row.price_brl),
  }
}

/* ---------------- sessão ---------------- */

/**
 * Cria a conta e abre o período de avaliação.
 *
 * São dois passos porque os dados sensíveis não podem ir no signUp: o
 * que se manda em `options.data` vira raw_user_meta_data, é escrito
 * pelo próprio cliente e viaja dentro do JWT. CPF e condição de saúde
 * entram depois, pela função complete_registration, que roda no banco.
 */
export async function signUp(profile: Profile, password: string): Promise<Account> {
  const sb = client()

  // Uma tentativa anterior pode ter criado o usuário e falhado adiante.
  // Nesse caso a sessão já existe, e repetir o signUp só daria
  // "User already registered", travando o cadastro. Então só criamos o
  // usuário quando ainda não há sessão aberta.
  const { data: sessaoAtual } = await sb.auth.getSession()

  if (!sessaoAtual.session) {
    const { data, error } = await sb.auth.signUp({
      email: profile.email.trim().toLowerCase(),
      password,
      options: {
        data: { buyer_name: profile.buyerName, newsletter: profile.newsletter },
      },
    })
    if (error) erro(error)

    // Sem sessão aqui significa "Confirm email" ligado no painel: o
    // usuário existe, mas ainda não está autenticado, e a RPC abaixo
    // seria negada.
    if (!data.session) {
      erro(
        'Conta criada, mas é preciso confirmar o e-mail antes de continuar. ' +
          'Para o fluxo seguir direto até o checkout, desligue "Confirm email" em ' +
          'Authentication > Sign In / Providers > Email no painel do Supabase.',
      )
    }
  }

  const { error: erroRpc } = await sb.rpc('complete_registration', {
    p_phone: profile.phone,
    p_document: profile.document,
    p_user_name: profile.userName,
    p_relation: profile.relation,
    p_condition: profile.condition,
    p_os: profile.os,
    p_prescriber_name: profile.prescriberName ?? null,
    p_prescriber_role: profile.prescriberRole ?? null,
    p_newsletter: profile.newsletter,
  })
  if (erroRpc) erro(erroRpc)

  const conta = await fetchAccount()
  if (!conta) erro('A conta foi criada, mas não foi possível carregá-la.')
  return conta
}

export async function signIn(email: string, password: string): Promise<void> {
  const { error } = await client().auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })
  if (error) erro(error)
}

export async function signOut(): Promise<void> {
  const { error } = await client().auth.signOut()
  if (error) erro(error)
}

/** Conta do usuário logado, ou null se não houver sessão. */
export async function fetchAccount(): Promise<Account | null> {
  const sb = client()

  const { data: sessao } = await sb.auth.getSession()
  if (!sessao.session) return null

  // maybeSingle: quem se autenticou mas ainda não concluiu o cadastro
  // não tem assinatura, e isso não é erro.
  const { data, error } = await sb.from('my_account').select(COLUNAS).maybeSingle()
  if (error) erro(error)

  return data ? paraAccount(data as MyAccountRow) : null
}

/* ---------------- assinatura ---------------- */

export async function attachPaymentMethod(payment: Payment): Promise<void> {
  const { error } = await client().rpc('attach_payment_method', {
    p_method: payment.method,
    p_billing_interval: payment.installments === 12 ? 'anual' : 'mensal',
    p_card_last4: payment.cardLast4 ?? null,
    p_card_brand: payment.cardBrand ?? null,
    p_holder: payment.holder ?? null,
    p_gateway_token: null, // preencher quando o gateway entrar
  })
  if (error) erro(error)
}

export async function cancelSubscription(): Promise<void> {
  const { error } = await client().rpc('request_cancellation')
  if (error) erro(error)
}

export async function reactivateSubscription(): Promise<void> {
  const { error } = await client().rpc('reactivate_subscription')
  if (error) erro(error)
}

/* ---------------- contato ---------------- */

export async function sendContactMessage(input: {
  name: string
  email: string
  role: string
  message: string
}): Promise<void> {
  const { error } = await client()
    .from('contact_messages')
    .insert({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      role: input.role,
      message: input.message.trim(),
    })
  if (error) erro(error)
}

/* ---------------- instaladores ---------------- */

export type Downloads = { windows: string; macos: string; linux: string }

/** Usado enquanto a consulta não volta, e se a tabela estiver vazia. */
export const DOWNLOADS: Downloads = { windows: '#', macos: '#', linux: '#' }

export async function fetchDownloads(): Promise<Downloads> {
  const { data, error } = await client()
    .from('app_releases')
    .select('os, download_url')
    .eq('is_current', true)

  if (error || !data) return DOWNLOADS

  return data.reduce<Downloads>(
    (acc, r) => {
      const chave = r.os as keyof Downloads
      if (chave in acc) acc[chave] = r.download_url
      return acc
    },
    { ...DOWNLOADS },
  )
}

/* ---------------- pagamento ----------------
   Continua fora do banco de propósito. Dados de cartão nunca devem
   trafegar pelo servidor da aplicação: o SDK do gateway tokeniza no
   navegador e só o token vai para attachPaymentMethod.
   ------------------------------------------ */

export async function tokenizeCard(_card: {
  number: string
  holder: string
  expiry: string
  cvv: string
}): Promise<{ token: string; last4: string; brand: string }> {
  // Stripe:        stripe.createPaymentMethod({ type: 'card', card })
  // Mercado Pago:  mp.createCardToken({ ... })
  // Pagar.me:      pagarme.client.cards.create({ ... })
  throw new Error('tokenizeCard: integrar com o SDK do gateway')
}

export async function createPixCharge(_accountId: string): Promise<{
  qrCode: string
  copyPaste: string
  expiresAt: string
}> {
  throw new Error('createPixCharge: integrar com o gateway')
}

export async function createBoleto(_accountId: string): Promise<{
  barcode: string
  pdfUrl: string
  dueAt: string
}> {
  throw new Error('createBoleto: integrar com o gateway')
}
