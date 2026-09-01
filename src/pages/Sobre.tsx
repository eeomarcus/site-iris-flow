import { PageHead } from '@/components/layout/PageHead'
import { Reveal } from '@/components/effects/Reveal'
import { Card } from '@/components/ui/Card'
import { CallToAction } from '@/components/sections/CallToAction'
import { Logo } from '@/components/layout/Logo'
import { VALUES, ROADMAP, BRAND } from '@/data/content'

const ROLES: Record<string, string> = {
  Concluido: 'tag--ok',
  'Em realizacao': 'tag--wip',
  'Proxima tarefa': 'tag--wip',
  Pendente: 'tag--neutral',
}

export default function Sobre() {
  return (
    <>
      <PageHead
        eyebrow="A empresa"
        title="A IrisFlow existe porque a barreira e economica, e nao tecnologica."
        highlight={['economica,']}
        lead="Somos uma startup de tecnologia assistiva com uma equipe pequena e uma restricao autoimposta que definiu toda a arquitetura do produto: funcionar na webcam que a pessoa ja tem, sem hardware dedicado."
      />

      <section className="section">
        <div className="container">
          <Reveal anim="fade">
            <span className="eyebrow">Valores</span>
          </Reveal>
          <Reveal anim="up">
            <h2 style={{ maxWidth: '26ch', marginBottom: 'var(--sp-4)' }}>
              Cada valor aqui corresponde a uma decisao de produto ja tomada.
            </h2>
          </Reveal>
          <Reveal anim="up" delay={120}>
            <p className="lead" style={{ maxWidth: '70ch', marginBottom: 'var(--sp-7)' }}>
              Nao sao declaracoes genericas — sao verificaveis no codigo e nas telas.
            </p>
          </Reveal>

          <div className="grid grid--3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} anim="up" delay={i * 80}>
                <Card as="div">
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal anim="fade">
            <span className="eyebrow">Estagio do projeto</span>
          </Reveal>
          <Reveal anim="up">
            <h2 style={{ maxWidth: '24ch', marginBottom: 'var(--sp-6)' }}>
              O que ja esta pronto, o que esta em construcao e o que ainda falta.
            </h2>
          </Reveal>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--sp-4)' }}>
            {ROADMAP.map((r, i) => (
              <Reveal key={r.title} anim="right" delay={i * 90} as="li">
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--sp-5)',
                    padding: 'var(--sp-5)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r-lg)',
                    background: 'var(--surface)',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className={`tag ${ROLES[r.when] ?? 'tag--neutral'}`} style={{ flex: 'none' }}>
                    {r.when}
                  </span>
                  <div style={{ flex: '1 1 320px' }}>
                    <h3 style={{ fontSize: '1.14rem', marginBottom: '6px' }}>{r.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.97rem' }}>{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow center">
          <Reveal anim="zoom">
            <div style={{ display: 'grid', placeItems: 'center', gap: 'var(--sp-4)' }}>
              <Logo variant="full" size="lg" link={false} />
              <h2 style={{ maxWidth: '20ch' }}>{BRAND.tagline}</h2>
              <p className="lead" style={{ maxWidth: '58ch' }}>
                O codigo do produto, o protocolo de medicao e a documentacao tecnica permanecem
                publicos, em coerencia com o compromisso de auditabilidade declarado na politica de
                privacidade.
              </p>
              <a
                href={BRAND.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="underline-grow"
                style={{ color: 'var(--ok)', fontWeight: 600 }}
              >
                Ver o repositorio do produto
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
