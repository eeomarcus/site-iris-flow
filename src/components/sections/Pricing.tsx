import { Reveal } from '@/components/effects/Reveal'
import { Button } from '@/components/ui/Button'
import { PLAN } from '@/data/content'
import './pricing.css'

export function Pricing({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section pricing${compact ? ' pricing--compact' : ''}`} id="planos">
      <div className="container">
        <Reveal anim="fade">
          <span className="eyebrow">Plano</span>
        </Reveal>

        <Reveal anim="up">
          <h2 className="pricing__title">
            Uma assinatura. <span className="gradient-text">Tudo incluido.</span>
          </h2>
        </Reveal>

        <Reveal anim="up" delay={120}>
          <p className="lead pricing__lead">{PLAN.summary}</p>
        </Reveal>

        <div className="pricing__layout">
          <Reveal anim="zoom" delay={180}>
            <div className="plan panel">
              <span className="plan__ribbon">{PLAN.trialDays} dias gratis</span>

              <header className="plan__head">
                <h3 className="plan__name">{PLAN.name}</h3>
                <p className="plan__price">
                  <span className="plan__currency">R$</span>
                  <span className="plan__amount">{PLAN.price}</span>
                  <span className="plan__period">{PLAN.period}</span>
                </p>
                <p className="plan__sub">
                  Sem taxa de adesao, sem fidelidade e sem compra de equipamento. A primeira
                  cobranca so acontece depois dos {PLAN.trialDays} dias de avaliacao.
                </p>
              </header>

              <ul className="plan__list">
                {PLAN.includes.map((item, i) => (
                  <li key={item} style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="plan__check" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M4 12.5 9.5 18 20 6.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Button to="/cadastro" size="lg" full>
                Comecar avaliacao gratuita
              </Button>
              <p className="plan__fine">
                Nao pedimos cartao para comecar. Voce so informa a forma de pagamento se decidir
                continuar.
              </p>
            </div>
          </Reveal>

          <div className="pricing__aside">
            {PLAN.guarantees.map((g, i) => (
              <Reveal key={g.title} anim="left" delay={240 + i * 110}>
                <div className="guarantee">
                  <span className="guarantee__icon" aria-hidden="true">
                    {g.icon}
                  </span>
                  <div>
                    <h3>{g.title}</h3>
                    <p>{g.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal anim="left" delay={580}>
              <div className="guarantee guarantee--note">
                <p>
                  Para clinicas, associacoes de pacientes e profissionais prescritores, o acesso
                  durante o programa de validacao e gratuito.{' '}
                  <a href="/contato#validacao" className="underline-grow">
                    Fale com a equipe
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
