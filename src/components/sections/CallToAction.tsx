import { Reveal } from '@/components/effects/Reveal'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { IrisMark } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { PLAN } from '@/data/content'
import './cta.css'

export function CallToAction() {
  return (
    <section className="cta on-dark">
      <AmbientBackground particles={16} scan={false} />

      <div className="container cta__inner">
        <Reveal anim="zoom">
          <IrisMark size={92} />
        </Reveal>

        <Reveal anim="up" delay={140}>
          <h2 className="cta__title">
            A pessoa continua lá. <span className="accent-text">Só falta a voz.</span>
          </h2>
        </Reveal>

        <Reveal anim="up" delay={240}>
          <p className="cta__lead">
            Instale no computador que vocês já têm, calibre em menos de trinta segundos e veja se
            funciona para o seu caso. Sem cartão, sem compromisso e sem risco financeiro na
            tentativa.
          </p>
        </Reveal>

        <Reveal anim="up" delay={340}>
          <div className="cta__actions">
            <Button to="/cadastro" size="lg" variant="teal">
              Começar os {PLAN.trialDays} dias gratuitos
            </Button>
            <Button to="/contato" size="lg" variant="secondary">
              Falar com a equipe
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
