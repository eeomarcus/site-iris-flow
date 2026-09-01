/* ============================================================
   Pontos de integracao — todos vazios de proposito.

   O projeto foi entregue sem banco de dados e sem gateway. Este
   arquivo concentra as chamadas que precisam existir quando o
   back-end entrar, para que nenhum componente precise ser reescrito:
   basta preencher os corpos abaixo e trocar as chamadas do
   AccountContext por estas funcoes.
   ============================================================ */

import type { Account, Payment, Profile } from '@/context/AccountContext'

/** Base da API. Defina VITE_API_URL no .env quando o back-end existir. */
export const API_URL = import.meta.env.VITE_API_URL ?? ''

/** Latencia simulada, so para que os estados de carregamento sejam visiveis. */
export const fakeDelay = (ms = 900) => new Promise((r) => setTimeout(r, ms))

/* ---------------- contas ---------------- */

export async function createAccount(_profile: Profile): Promise<Account> {
  // POST `${API_URL}/accounts`
  throw new Error('createAccount: integrar com o back-end')
}

export async function fetchAccount(_id: string): Promise<Account> {
  // GET `${API_URL}/accounts/:id`
  throw new Error('fetchAccount: integrar com o back-end')
}

export async function cancelSubscription(_id: string): Promise<void> {
  // POST `${API_URL}/subscriptions/:id/cancel`
  throw new Error('cancelSubscription: integrar com o back-end')
}

/* ---------------- pagamento ----------------
   Nunca envie dados de cartao para o seu proprio servidor: use o SDK
   do gateway no navegador para gerar um token e envie apenas o token.
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

export async function createSubscription(_input: {
  accountId: string
  token: string
  payment: Payment
}): Promise<{ subscriptionId: string }> {
  // POST `${API_URL}/subscriptions`
  throw new Error('createSubscription: integrar com o gateway')
}

export async function createPixCharge(_accountId: string): Promise<{
  qrCode: string
  copyPaste: string
  expiresAt: string
}> {
  // POST `${API_URL}/charges/pix`
  throw new Error('createPixCharge: integrar com o gateway')
}

export async function createBoleto(_accountId: string): Promise<{
  barcode: string
  pdfUrl: string
  dueAt: string
}> {
  // POST `${API_URL}/charges/boleto`
  throw new Error('createBoleto: integrar com o gateway')
}

/* ---------------- outros ---------------- */

export async function sendContactMessage(_input: {
  name: string
  email: string
  role: string
  message: string
}): Promise<void> {
  // POST `${API_URL}/contact`
  throw new Error('sendContactMessage: integrar com o back-end')
}

/** URLs dos instaladores gerados pelo build do aplicativo Electron. */
export const DOWNLOADS = {
  windows: '#',
  macos: '#',
  linux: '#',
}
