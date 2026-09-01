import { AnimatedHeadline } from '@/components/effects/AnimatedHeadline'
import { Reveal } from '@/components/effects/Reveal'
import { Card, CardIcon } from '@/components/ui/Card'
import { DIFFERENTIATORS } from '@/data/content'
import './differentiators.css'

export function Differentiators() {
  return (
    <section className="section differentiators" id="diferenciais">
      <div className="container">
        <Reveal anim="fade">
          <span className="eyebrow">Diferenciais</span>
        </Reveal>

        <AnimatedHeadline
          text="Rastreamento por webcam nao e novidade. A diferenca esta em seis decisoes medidas."
          as="h2"
          highlight={['seis', 'decisoes', 'medidas.']}
          className="differentiators__title"
        />

        <Reveal anim="up" delay={140}>
          <p className="lead differentiators__lead">
            Cada uma das decisoes abaixo existe porque foi medida, e o conjunto delas e o que
            produz a diferenca de erro. E tambem o ativo proprietario da empresa.
          </p>
        </Reveal>

        <ul className="differentiators__grid">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} anim="up" delay={i * 90} as="li">
              <Card as="div">
                <CardIcon tone={i % 2 === 0 ? 'blue' : 'teal'}>{d.icon}</CardIcon>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
