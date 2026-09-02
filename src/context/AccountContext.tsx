import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { supabase } from '@/lib/supabase'
import * as api from '@/services/api'

/* ============================================================
   Estado de conta e assinatura.

   A fonte da verdade é o Supabase. Este contexto guarda em memória a
   conta do usuário logado e a mantém em dia com a sessão: ao entrar,
   ao sair e ao recarregar a página.

   Nada aqui grava em localStorage. Quem persiste a sessão é o próprio
   supabase-js; a conta é sempre relida do banco.
   ============================================================ */

export type Profile = {
  /** Quem paga: familiar responsável ou cuidador principal. */
  buyerName: string
  email: string
  phone: string
  document: string
  /** Quem usa: a pessoa com restrição motora severa. */
  userName: string
  relation: string
  condition: string
  os: string
  /** Profissional que acompanha o caso, opcional. */
  prescriberName?: string
  prescriberRole?: string
  newsletter: boolean
}

export type Payment = {
  method: 'cartao' | 'pix' | 'boleto'
  /** Somente os quatro últimos dígitos trafegam e são guardados. */
  cardLast4?: string
  cardBrand?: string
  holder?: string
  /** 1 para cobrança mensal, 12 para anual. */
  installments?: number
}

export type Account = {
  id: string
  profile: Profile
  payment?: Payment
  /** 'inadimplente' vem do gateway; as outras nascem no próprio site. */
  status: 'avaliacao' | 'ativa' | 'cancelada' | 'inadimplente'
  createdAt: string
  trialEndsAt: string
  nextChargeAt: string
  priceBRL: number
}

type Ctx = {
  account: Account | null
  /**
   * Há sessão do Supabase aberta. Pode ser verdadeiro com `account`
   * nulo: é o caso de quem criou o usuário mas abandonou o cadastro
   * antes de concluir, e precisa voltar para /cadastro, não para o
   * login.
   */
  authenticated: boolean
  /**
   * Verdadeiro enquanto a sessão inicial está sendo lida. As telas de
   * fluxo precisam esperar isso antes de redirecionar, senão um F5 no
   * /conta joga o usuário para o login antes da sessão carregar.
   */
  loading: boolean
  /** Cria a conta, autentica e abre o período de avaliação. */
  register: (profile: Profile, password: string) => Promise<Account>
  /** Guarda a forma de pagamento. A cobrança só ocorre ao fim da avaliação. */
  attachPayment: (payment: Payment) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  cancel: () => Promise<void>
  reactivate: () => Promise<void>
  /** Relê a conta do banco. */
  refresh: () => Promise<void>
}

const AccountContext = createContext<Ctx | null>(null)

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const { data } = (await supabase?.auth.getSession()) ?? { data: { session: null } }
      setAuthenticated(Boolean(data.session))
      setAccount(await api.fetchAccount())
    } catch {
      // sem sessão, sem configuração ou rede fora: a UI trata como deslogado
      setAuthenticated(false)
      setAccount(null)
    }
  }, [])

  // Carrega a sessão de partida e acompanha login e logout, inclusive os
  // que acontecem em outra aba.
  useEffect(() => {
    let vivo = true

    refresh().finally(() => {
      if (vivo) setLoading(false)
    })

    const { data: sub } = supabase?.auth.onAuthStateChange((evento) => {
      if (!vivo) return
      if (evento === 'SIGNED_OUT') {
        setAccount(null)
        setAuthenticated(false)
        return
      }
      if (evento === 'SIGNED_IN' || evento === 'TOKEN_REFRESHED') {
        void refresh()
      }
    }) ?? { data: { subscription: null } }

    return () => {
      vivo = false
      sub.subscription?.unsubscribe()
    }
  }, [refresh])

  const register = useCallback(async (profile: Profile, password: string) => {
    const nova = await api.signUp(profile, password)
    setAccount(nova)
    setAuthenticated(true)
    return nova
  }, [])

  const attachPayment = useCallback(async (payment: Payment) => {
    await api.attachPaymentMethod(payment)
    setAccount(await api.fetchAccount())
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    await api.signIn(email, password)
    setAccount(await api.fetchAccount())
  }, [])

  const signOut = useCallback(async () => {
    await api.signOut()
    setAccount(null)
    setAuthenticated(false)
  }, [])

  const cancel = useCallback(async () => {
    await api.cancelSubscription()
    setAccount(await api.fetchAccount())
  }, [])

  const reactivate = useCallback(async () => {
    await api.reactivateSubscription()
    setAccount(await api.fetchAccount())
  }, [])

  const value = useMemo<Ctx>(
    () => ({
      account,
      authenticated,
      loading,
      register,
      attachPayment,
      signIn,
      signOut,
      cancel,
      reactivate,
      refresh,
    }),
    [
      account,
      authenticated,
      loading,
      register,
      attachPayment,
      signIn,
      signOut,
      cancel,
      reactivate,
      refresh,
    ],
  )

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccount() {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error('useAccount precisa estar dentro de <AccountProvider>')
  return ctx
}
