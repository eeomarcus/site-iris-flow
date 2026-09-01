import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { Reveal } from '@/components/effects/Reveal'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { useAccount } from '@/context/AccountContext'
import { isEmail } from '@/utils/format'
import { fakeDelay } from '@/services/api'
import './checkout.css'

export default function Entrar() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { signIn, account } = useAccount()
  const navigate = useNavigate()

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isEmail(email)) {
      setError('Informe um e-mail valido.')
      return
    }
    if (password.length < 6) {
      setError('A senha precisa ter ao menos 6 caracteres.')
      return
    }

    setLoading(true)
    // Sem back-end e sem banco: a "autenticacao" apenas confere o e-mail
    // contra a conta guardada em localStorage nesta sessao.
    await fakeDelay(800)
    setLoading(false)

    if (signIn(email)) {
      navigate('/conta')
    } else {
      setError(
        account
          ? 'Esse e-mail nao corresponde a conta criada neste navegador.'
          : 'Nenhuma conta encontrada neste navegador. Crie uma para comecar a avaliacao.',
      )
    }
  }

  return (
    <div className="flow">
      <AmbientBackground particles={12} scan={false} light />

      <div className="container flow__inner" style={{ maxWidth: 520 }}>
        <Reveal anim="fade">
          <span className="eyebrow">Acesso</span>
        </Reveal>

        <Reveal anim="up">
          <h1 className="flow__title">Entrar na sua conta</h1>
        </Reveal>

        <Reveal anim="up" delay={140}>
          <div className="flow__card panel">
            <div className="notice">
              <span className="notice__icon" aria-hidden="true">
                ⓘ
              </span>
              <p>
                Sem banco de dados, o acesso funciona apenas com a conta criada neste navegador.
                {account && (
                  <>
                    {' '}
                    Use <strong>{account.profile.email}</strong> e qualquer senha com 6 ou mais
                    caracteres.
                  </>
                )}
              </p>
            </div>

            <form onSubmit={submit} noValidate>
              <Field
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="voce@exemplo.com.br"
              />

              <Field
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                error={error ?? undefined}
              />

              <Button type="submit" full size="lg" loading={loading}>
                {loading ? 'Entrando…' : 'Entrar'}
              </Button>
            </form>

            <p className="flow__foot" style={{ marginBottom: 0 }}>
              Ainda nao tem conta?{' '}
              <Link to="/cadastro" className="underline-grow" style={{ color: 'var(--ok)' }}>
                Comecar a avaliacao gratuita
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
