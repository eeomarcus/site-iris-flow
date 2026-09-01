import { PageHead } from '@/components/layout/PageHead'
import { Pricing } from '@/components/sections/Pricing'
import { Comparison } from '@/components/sections/Comparison'
import { Faq } from '@/components/sections/Faq'
import { CallToAction } from '@/components/sections/CallToAction'
import { Reveal } from '@/components/effects/Reveal'
import { Counter } from '@/components/effects/Counter'
import { PLAN } from '@/data/content'

export default function Planos() {
  return (
    <>
      <PageHead
        eyebrow="Planos"
        title="R$ 250 por mes, contra R$ 15.000 a R$ 80.000 de entrada."
        highlight={['250']}
        lead="A diferenca nao e de preco, e de risco. No modelo de equipamento, a familia desembolsa dezenas de milhares de reais antes de saber se a solucao funciona para o seu caso. Aqui ela testa gratuitamente no computador que ja tem e so passa a pagar se o paciente conseguir operar o sistema."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--3">
            {[
              { v: PLAN.trialDays, s: ' dias', l: 'de avaliacao gratuita antes da primeira cobranca' },
              { v: 0, s: '', l: 'reais de taxa de adesao, de equipamento e de multa por cancelamento' },
              { v: 3, s: '', l: 'sistemas operacionais atendidos por uma unica assinatura' },
            ].map((item, i) => (
              <Reveal key={item.l} anim="up" delay={i * 110}>
                <div style={{ padding: 'var(--sp-5)', borderLeft: '2px solid var(--line-strong)' }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 4.6vw, 3.2rem)',
                      lineHeight: 1,
                      marginBottom: 'var(--sp-3)',
                      color: 'var(--text)',
                    }}
                  >
                    <Counter value={item.v} suffix={item.s} />
                  </span>
                  <p style={{ margin: 0, fontSize: '0.98rem', maxWidth: '32ch' }}>{item.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <Comparison />
      <Faq />
      <CallToAction />
    </>
  )
}
