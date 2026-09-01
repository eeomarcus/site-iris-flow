import { AnimatedHeadline } from '@/components/effects/AnimatedHeadline'
import { Counter } from '@/components/effects/Counter'
import { Reveal } from '@/components/effects/Reveal'
import { Parallax } from '@/components/effects/Parallax'
import { PROBLEM } from '@/data/content'
import './problem.css'

export function ProblemSection() {
  return (
    <section className="section problem" id="problema">
      <div className="container">
        <Reveal anim="fade">
          <span className="eyebrow">O problema</span>
        </Reveal>

        <AnimatedHeadline
          text={PROBLEM.title}
          as="h2"
          highlight={['preco']}
          className="problem__title"
        />

        <Reveal anim="up" delay={160}>
          <p className="lead problem__lead">{PROBLEM.lead}</p>
        </Reveal>

        <div className="problem__stats">
          {PROBLEM.stats.map((s, i) => (
            <Reveal key={s.label} anim="up" delay={200 + i * 110}>
              <div className="problem__stat">
                <span className="problem__stat-value">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </span>
                <p>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal anim="fade" delay={520}>
          <p className="problem__note">{PROBLEM.note}</p>
        </Reveal>

        <Parallax speed={-0.05}>
          <div className="problem__contrast">
            <Reveal anim="right" delay={120}>
              <div className="contrast-card contrast-card--them">
                <span className="contrast-card__label">{PROBLEM.contrast.them.label}</span>
                <span className="contrast-card__price">{PROBLEM.contrast.them.price}</span>
                <p>{PROBLEM.contrast.them.detail}</p>
              </div>
            </Reveal>

            <Reveal anim="fade" delay={280}>
              <div className="contrast-vs" aria-hidden="true">
                <span>vs</span>
              </div>
            </Reveal>

            <Reveal anim="left" delay={120}>
              <div className="contrast-card contrast-card--us">
                <span className="contrast-card__label">{PROBLEM.contrast.us.label}</span>
                <span className="contrast-card__price">{PROBLEM.contrast.us.price}</span>
                <p>{PROBLEM.contrast.us.detail}</p>
              </div>
            </Reveal>
          </div>
        </Parallax>
      </div>
    </section>
  )
}
