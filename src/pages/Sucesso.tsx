import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { Reveal } from '@/components/effects/Reveal'
import { Button } from '@/components/ui/Button'
import { Card, CardIcon } from '@/components/ui/Card'
import { useAccount } from '@/context/AccountContext'
import { brl, daysUntil, formatDate } from '@/utils/format'
import { DOWNLOADS } from '@/services/api'
import { PLAN } from '@/data/content'
import './checkout.css'
import './sucesso.css'

const NEXT_STEPS = [
  {
    icon: '⤓',
    title: 'Baixe e instale',
    text: 'O instalador do sistema que voce escolheu esta liberado abaixo. A instalacao nao pede permissao especial nem drivers de camera.',
  },
  {
    icon: '◎',
    title: 'Prepare o posto de uso',
    text: 'Deixe a IrisFlow medir distancia, enquadramento e iluminacao antes de calibrar. Ele indica o que ajustar quando nao consegue corrigir sozinho.',
  },
  {
    icon: '✓',
    title: 'Calibre e experimente',
    text: 'Nove pontos, menos de trinta segundos. Depois disso, comece pelo teclado e pelas frases rapidas — sao os modulos mais usados no primeiro dia.',
  },
]

export default function Sucesso() {
  const { account } = useAccount()
  const [ready, setReady] = useState(false)

  // Pequena espera para que a animacao de confirmacao seja percebida.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 450)
    return () => window.clearTimeout(t)
  }, [])

  if (!account) return <Navigate to="/cadastro" replace />

  return (
    <div className="flow">
      <AmbientBackground particles={18} light />

      <div className="container container--narrow flow__inner">
        <div className="success">
          <span className="success__badge" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M4 12.5 9.5 18 20 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="success__ring" />
            <span className="success__ring success__ring--2" />
          </span>

          <Reveal anim="up" delay={200}>
            <h1 className="success__title">
              Pronto, {account.profile.buyerName.split(' ')[0]}.
            </h1>
          </Reveal>

          <Reveal anim="up" delay={300}>
            <p className="lead success__lead">
              A avaliacao de {PLAN.trialDays} dias comecou. Ate{' '}
              <strong>{formatDate(account.trialEndsAt)}</strong> voces tem acesso completo a
              plataforma, sem nenhuma cobranca.
            </p>
          </Reveal>
        </div>

        <Reveal anim="zoom" delay={380}>
          <div className="flow__card panel" style={{ marginBottom: 'var(--sp-5)' }}>
            <dl className="summary" style={{ marginBottom: 0 }}>
              <div>
                <dt>Conta</dt>
                <dd>{account.profile.email}</dd>
              </div>
              <div>
                <dt>Usuario</dt>
                <dd>{account.profile.userName}</dd>
              </div>
              <div>
                <dt>Situacao</dt>
                <dd style={{ color: 'var(--ok)' }}>
                  Em avaliacao — {daysUntil(account.trialEndsAt)} dias restantes
                </dd>
              </div>
              <div>
                <dt>Primeira cobranca</dt>
                <dd>
                  {brl(PLAN.price)} em {formatDate(account.nextChargeAt)}
                  {account.payment?.cardLast4
                    ? ` · ${account.payment.cardBrand} final ${account.payment.cardLast4}`
                    : account.payment
                      ? ` · via ${account.payment.method}`
                      : ''}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal anim="up" delay={460}>
          <div className="download">
            <h2 className="download__title">Baixe o aplicativo</h2>
            <p className="download__note">
              Estes links apontam para o build de distribuicao do aplicativo Electron. Configure as
              URLs em <code>src/services/api.ts</code>.
            </p>
            <div className="download__buttons">
              <Button href={DOWNLOADS.windows} variant="teal" loading={!ready}>
                Windows
              </Button>
              <Button href={DOWNLOADS.macos} variant="secondary" loading={!ready}>
                macOS
              </Button>
              <Button href={DOWNLOADS.linux} variant="secondary" loading={!ready}>
                Linux
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="grid grid--3" style={{ marginTop: 'var(--sp-7)' }}>
          {NEXT_STEPS.map((s, i) => (
            <Reveal key={s.title} anim="up" delay={560 + i * 100}>
              <Card as="div">
                <CardIcon tone={i === 2 ? 'teal' : 'blue'}>{s.icon}</CardIcon>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal anim="fade" delay={900}>
          <p className="flow__foot">
            <Link to="/conta" className="underline-grow" style={{ color: 'var(--ok)' }}>
              Ir para o painel da conta
            </Link>{' '}
            · Duvidas na instalacao?{' '}
            <Link to="/contato" className="underline-grow">
              Fale com a equipe
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  )
}
