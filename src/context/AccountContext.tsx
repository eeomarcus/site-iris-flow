import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { PLAN } from '@/data/content'

/* ============================================================
   Estado de conta e assinatura.

   Este projeto NAO usa banco de dados: tudo vive em memoria e em
   localStorage, apenas para que os fluxos de cadastro, checkout e
   painel sejam navegaveis de ponta a ponta.

   Para integrar de verdade, troque as funcoes deste arquivo por
   chamadas aos endpoints de src/services/api.ts — a forma dos dados
   ja esta desenhada para isso.
   ============================================================ */

export type Profile = {
  /** Quem paga: familiar responsavel, cuidador principal. */
  buyerName: string
  email: string
  phone: string
  document: string
  /** Quem usa: a pessoa com restricao motora severa. */
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
  /** Somente os quatro ultimos digitos sao guardados no estado local. */
  cardLast4?: string
  cardBrand?: string
  holder?: string
  installments?: number
}

export type Account = {
  id: string
  profile: Profile
  payment?: Payment
  status: 'avaliacao' | 'ativa' | 'cancelada'
  createdAt: string
  trialEndsAt: string
  nextChargeAt: string
  priceBRL: number
}

type Ctx = {
  account: Account | null
  /** Cria a conta a partir do formulario de cadastro e inicia a avaliacao gratuita. */
  register: (profile: Profile) => Account
  /** Confirma o meio de pagamento — a cobranca so ocorre ao fim da avaliacao. */
  attachPayment: (payment: Payment) => void
  /** Entrar: neste mock, apenas confere o e-mail contra a conta salva. */
  signIn: (email: string) => boolean
  signOut: () => void
  cancel: () => void
  reactivate: () => void
}

const AccountContext = createContext<Ctx | null>(null)

const addDays = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString()
}

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount, clearAccount] = useLocalStorage<Account | null>(
    'irisflow:account',
    null,
  )

  const register = useCallback(
    (profile: Profile) => {
      const next: Account = {
        id: `irisflow_${Math.random().toString(36).slice(2, 10)}`,
        profile,
        status: 'avaliacao',
        createdAt: new Date().toISOString(),
        trialEndsAt: addDays(PLAN.trialDays),
        nextChargeAt: addDays(PLAN.trialDays),
        priceBRL: PLAN.price,
      }
      setAccount(next)
      return next
    },
    [setAccount],
  )

  const attachPayment = useCallback(
    (payment: Payment) => {
      setAccount((prev) => (prev ? { ...prev, payment } : prev))
    },
    [setAccount],
  )

  const signIn = useCallback(
    (email: string) => {
      if (!account) return false
      return account.profile.email.trim().toLowerCase() === email.trim().toLowerCase()
    },
    [account],
  )

  const cancel = useCallback(() => {
    setAccount((prev) => (prev ? { ...prev, status: 'cancelada' } : prev))
  }, [setAccount])

  const reactivate = useCallback(() => {
    setAccount((prev) =>
      prev ? { ...prev, status: prev.payment ? 'ativa' : 'avaliacao' } : prev,
    )
  }, [setAccount])

  const value = useMemo<Ctx>(
    () => ({ account, register, attachPayment, signIn, signOut: clearAccount, cancel, reactivate }),
    [account, register, attachPayment, signIn, clearAccount, cancel, reactivate],
  )

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccount() {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error('useAccount precisa estar dentro de <AccountProvider>')
  return ctx
}
