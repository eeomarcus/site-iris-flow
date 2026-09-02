import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { Reveal } from '@/components/effects/Reveal'
import { Button } from '@/components/ui/Button'
import { Card, CardIcon } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { SessionLoading } from '@/components/ui/Skeleton'
import { useAccount } from '@/context/AccountContext'
import { brl, daysUntil, formatDate } from '@/utils/format'
import { useDownloads } from '@/hooks/useDownloads'
import { PLAN } from '@/data/content'
import './checkout.css'
import './conta.css'

const STATUS_LABEL = {
  avaliacao: { text: 'Em avaliação gratuita', tone: 'tag--wip' },
  ativa: { text: 'Assinatura ativa', tone: 'tag--ok' },
  cancelada: { text: 'Cancelada', tone: 'tag--neutral' },
  inadimplente: { text: 'Pagamento pendente', tone: 'tag--wip' },
} as const

export default function Conta() {
  const { account, authenticated, loading, cancel, reactivate, signOut } = useAccount()
  const navigate = useNavigate()
  const downloads = useDownloads()
  const [confirming, setConfirming] = useState(false)
  const [ocupado, setOcupado] = useState(false)
  const [falha, setFalha] = useState<string | null>(null)

  const executar = async (acao: () => Promise<void>) => {
    setOcupado(true)
    setFalha(null)
    try {
      await acao()
      setConfirming(false)
    } catch (e) {
      setFalha(e instanceof Error ? e.message : 'Não foi possível concluir a operação.')
    } finally {
      setOcupado(false)
    }
  }

  if (loading) return <SessionLoading />
  // logado mas sem assinatura: o cadastro ficou pela metade
  if (!account) return <Navigate to={authenticated ? '/cadastro' : '/entrar'} replace />

  const status = STATUS_LABEL[account.status]
  const remaining = daysUntil(account.trialEndsAt)
  const progress =
    account.status === 'avaliacao'
      ? Math.min(1, (PLAN.trialDays - remaining) / PLAN.trialDays)
      : 1

  return (
    <div className="flow">
      <AmbientBackground particles={10} scan={false} light />

      <div className="container flow__inner">
        <Reveal anim="fade">
          <span className="eyebrow">Painel</span>
        </Reveal>

        <Reveal anim="up">
          <div className="conta__head">
            <div>
              <h1 className="flow__title" style={{ marginBottom: 'var(--sp-2)' }}>
                Olá, {account.profile.buyerName.split(' ')[0]}
              </h1>
              <p style={{ margin: 0, color: 'var(--text-dim)' }}>{account.profile.email}</p>
            </div>
            <Button
              variant="ghost"
              onClick={async () => {
                await signOut()
                navigate('/')
              }}
            >
              Sair
            </Button>
          </div>
        </Reveal>

        {falha && (
          <p className="field__error" role="alert" style={{ marginTop: 'var(--sp-5)' }}>
            {falha}
          </p>
        )}

          <Reveal anim="up" delay={100}>
            <div className="conta__plan panel">
              <div className="conta__plan-head">
                <div>
                  <span className={`tag ${status.tone}`}>{status.text}</span>
                  <h2 className="conta__plan-name">{PLAN.name}</h2>
                </div>
                <p className="conta__plan-price">
                  {brl(account.priceBRL)}
                  <span>/mês</span>
                </p>
              </div>

              {account.status === 'avaliacao' && (
                <div className="conta__trial">
                  <div className="conta__trial-top">
                    <span>
                      <strong>{remaining}</strong> dias restantes de avaliação
                    </span>
                    <span>termina em {formatDate(account.trialEndsAt)}</span>
                  </div>
                  <div className="conta__bar" role="presentation">
                    <span style={{ transform: `scaleX(${progress})` }} />
                  </div>
                </div>
              )}

              <dl className="summary" style={{ marginTop: 'var(--sp-5)' }}>
                <div>
                  <dt>Usuário</dt>
                  <dd>{account.profile.userName}</dd>
                </div>
                <div>
                  <dt>Forma de pagamento</dt>
                  <dd>
                    {account.payment
                      ? account.payment.cardLast4
                        ? `${account.payment.cardBrand} final ${account.payment.cardLast4}`
                        : account.payment.method === 'pix'
                          ? 'Pix mensal'
                          : 'Boleto mensal'
                      : 'Não informada'}
                  </dd>
                </div>
                <div>
                  <dt>Próxima cobrança</dt>
                  <dd>
                    {account.status === 'cancelada'
                      ? 'Nenhuma, assinatura cancelada'
                      : `${brl(account.priceBRL)} em ${formatDate(account.nextChargeAt)}`}
                  </dd>
                </div>
                <div>
                  <dt>Conta criada em</dt>
                  <dd>{formatDate(account.createdAt)}</dd>
                </div>
              </dl>

              <div className="conta__actions">
                {account.status === 'cancelada' ? (
                  <Button
                    variant="teal"
                    loading={ocupado}
                    onClick={() => executar(reactivate)}
                  >
                    Reativar assinatura
                  </Button>
                ) : confirming ? (
                  <div className="conta__confirm">
                    <p>
                      O cancelamento é imediato e sem multa. O acesso continua até{' '}
                      {formatDate(account.nextChargeAt)}.
                    </p>
                    <div>
                      <Button
                        variant="secondary"
                        loading={ocupado}
                        onClick={() => executar(cancel)}
                      >
                        Confirmar cancelamento
                      </Button>
                      <Button variant="ghost" onClick={() => setConfirming(false)}>
                        Manter assinatura
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button to="/pagamento" variant="secondary">
                      Alterar forma de pagamento
                    </Button>
                    <Button variant="ghost" onClick={() => setConfirming(true)}>
                      Cancelar assinatura
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Reveal>

          <div className="grid grid--3" style={{ marginTop: 'var(--sp-6)' }}>
            <Reveal anim="up" delay={160}>
              <Card as="div">
                <CardIcon tone="teal">
                  <Icon name="download" size={26} />
                </CardIcon>
                <h3>Instaladores</h3>
                <p>Baixe novamente o aplicativo para qualquer um dos três sistemas.</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                  <a href={downloads.windows} className="conta__link">
                    Windows
                  </a>
                  <a href={downloads.macos} className="conta__link">
                    macOS
                  </a>
                  <a href={downloads.linux} className="conta__link">
                    Linux
                  </a>
                </div>
              </Card>
            </Reveal>

            <Reveal anim="up" delay={240}>
              <Card as="div">
                <CardIcon>
                  <Icon name="alvo" size={26} />
                </CardIcon>
                <h3>Primeiros passos</h3>
                <p>
                  Prepare o posto de uso, calibre em nove pontos e comece pelo teclado e pelas
                  frases rápidas, os módulos mais usados no primeiro dia.
                </p>
                <Link to="/como-funciona" className="conta__link" style={{ marginTop: 'auto' }}>
                  Ver o guia
                </Link>
              </Card>
            </Reveal>

            <Reveal anim="up" delay={320}>
              <Card as="div">
                <CardIcon>
                  <Icon name="email" size={26} />
                </CardIcon>
                <h3>Suporte direto</h3>
                <p>
                  A equipe responde sem intermediário. Se algo não calibrou ou o rastreamento
                  está instável, descreva as condições da sala.
                </p>
                <Link to="/contato" className="conta__link" style={{ marginTop: 'auto' }}>
                  Falar com a equipe
                </Link>
              </Card>
            </Reveal>
          </div>

          <Reveal anim="fade" delay={420}>
            <p className="flow__foot">
              Os dados desta conta ficam no banco da IrisFlow, protegidos por políticas que
              limitam cada assinante às próprias informações. O cancelamento é imediato e não
              passa por atendimento.
            </p>
          </Reveal>
      </div>
    </div>
  )
}
