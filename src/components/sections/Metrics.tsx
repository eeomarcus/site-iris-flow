import { Counter } from '@/components/effects/Counter'
import { Reveal } from '@/components/effects/Reveal'
import { Icon } from '@/components/ui/Icon'
import { METRICS, METRICS_CAVEAT } from '@/data/content'
import './metrics.css'

export function Metrics() {
  return (
    <section className="section section--tight metrics" id="indicadores">
      <div className="container">
        <Reveal anim="fade">
          <span className="eyebrow">Indicadores medidos</span>
        </Reveal>

        <Reveal anim="up">
          <h2 className="metrics__title">
            Publicamos o número <span className="gradient-text">e a condição</span> em que ele foi
            obtido.
          </h2>
        </Reveal>

        <div className="metrics__grid">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} anim="zoom" delay={i * 100}>
              <div className="metric panel">
                <span className="metric__value">
                  <Counter value={m.value} decimals={m.decimals ?? 0} suffix={m.suffix ?? ''} />
                </span>
                <p>{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal anim="fade" delay={420}>
          <div className="metrics__caveat">
            <span className="metrics__caveat-mark">
              <Icon name="alerta" size={20} />
            </span>
            <p>{METRICS_CAVEAT}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
