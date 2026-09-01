import { Link } from 'react-router-dom'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { Logo } from '@/components/layout/Logo'
import { Typewriter } from '@/components/effects/Typewriter'
import { Reveal } from '@/components/effects/Reveal'
import { Button } from '@/components/ui/Button'
import { HERO_PHRASES, PLAN } from '@/data/content'
import './hero.css'

export function Hero() {
  return (
    <section className="hero on-dark">
      <AmbientBackground particles={26} />

      <div className="container hero__inner">
        <Reveal anim="zoom" duration={1000}>
          <Logo variant="full" tone="negativo" size="xl" link={false} className="hero__logo" />
        </Reveal>

        <Reveal anim="fade" delay={260}>
          <p className="hero__tagline">Seu olhar tem voz.</p>
        </Reveal>

        {/* Uma janela por linha: cada mascara revela exatamente uma linha,
            entao o texto e quebrado a mao em vez de deixado ao acaso. */}
        <h1 className="hero__title">
          <span className="hero__title-mask">
            <span className="hero__title-line" style={{ animationDelay: '420ms' }}>
              Tecnologia assistiva
            </span>
          </span>
          <span className="hero__title-mask">
            <span className="hero__title-line" style={{ animationDelay: '520ms' }}>
              que devolve a fala
            </span>
          </span>
          <span className="hero__title-mask">
            <span className="hero__title-line" style={{ animationDelay: '620ms' }}>
              a quem <span className="accent-text">ainda tem o olhar</span>.
            </span>
          </span>
        </h1>

        <Reveal anim="up" delay={700}>
          <p className="lead hero__lead">
            A IrisFlow transforma o movimento dos olhos em comunicacao e em controle do computador
            usando apenas a webcam que a pessoa ja tem em casa. Sem equipamento de dezenas de
            milhares de reais. Sem enviar uma unica imagem para a internet.
          </p>
        </Reveal>

        <Reveal anim="up" delay={820}>
          <div className="hero__say" aria-label="Exemplo de frase composta pelo olhar">
            <span className="hero__say-label">escrevendo com o olhar</span>
            <p className="hero__say-text">
              <Typewriter phrases={HERO_PHRASES} />
            </p>
          </div>
        </Reveal>

        <Reveal anim="up" delay={920}>
          <div className="hero__actions">
            <Button to="/cadastro" size="lg">
              Testar gratis por {PLAN.trialDays} dias
            </Button>
            <Button to="/como-funciona" variant="secondary" size="lg">
              Ver como funciona
            </Button>
          </div>
        </Reveal>

        <Reveal anim="fade" delay={1040}>
          <p className="hero__fine">
            Sem cartao para comecar · Sem fidelidade · R$ {PLAN.price} por mes depois da avaliacao ·{' '}
            <Link to="/planos" className="underline-grow">
              ver o plano
            </Link>
          </p>
        </Reveal>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">role</span>
      </div>
    </section>
  )
}
