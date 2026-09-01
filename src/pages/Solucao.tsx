import { PageHead } from '@/components/layout/PageHead'
import { Modules } from '@/components/sections/Modules'
import { Differentiators } from '@/components/sections/Differentiators'
import { Metrics } from '@/components/sections/Metrics'
import { Comparison } from '@/components/sections/Comparison'
import { CallToAction } from '@/components/sections/CallToAction'
import { Reveal } from '@/components/effects/Reveal'
import { Card, CardIcon } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DOWNLOADS } from '@/services/api'

const LIMITS = [
  {
    title: 'O que a IrisFlow entrega',
    tone: 'ok' as const,
    items: [
      'Controle pleno dentro das proprias telas, desenhadas com alvos grandes e bem espacados',
      'Controle do cursor do sistema operacional em nivel funcional: abrir um programa, navegar, clicar em botoes de tamanho razoavel',
      'Composicao de texto por fixacao, com um evento por caractere e tempo aproximadamente constante',
      'Funcionamento offline do nucleo de rastreamento, do teclado e das frases rapidas',
    ],
  },
  {
    title: 'O que ele ainda nao entrega',
    tone: 'warn' as const,
    items: [
      'Interfaces de terceiros com alvos pequenos, menus densos ou elementos que exigem arraste preciso',
      'Uso confortavel por quem apresenta movimento involuntario acentuado, espasticidade ou tremor — condicoes ainda nao avaliadas',
      'Taxa de acionamento acidental medida em uso continuo real, que so o programa de validacao vai responder',
      'Estudo clinico publicado, atributo em que as solucoes internacionais tem decadas de vantagem',
    ],
  },
]

export default function Solucao() {
  return (
    <>
      <PageHead
        eyebrow="O produto"
        title="IrisFlow: uma plataforma de comunicacao, nao um rastreador."
        highlight={['comunicacao,']}
        lead="Aplicacao instalavel para Windows, macOS e Linux, construida sobre Electron, que roda integralmente no dispositivo do usuario. O rastreamento ocular e a camada de entrada; sobre ela foram construidos ambientes completos de comunicacao, controle, lazer, cuidado e emergencia."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="grid grid--2">
            {LIMITS.map((block, i) => (
              <Reveal key={block.title} anim={i === 0 ? 'right' : 'left'} delay={i * 120}>
                <Card as="div">
                  <CardIcon tone={block.tone === 'ok' ? 'teal' : 'blue'}>
                    {block.tone === 'ok' ? '✓' : '!'}
                  </CardIcon>
                  <h3>{block.title}</h3>
                  <ul style={{ paddingLeft: '1.1rem', margin: 0 }}>
                    {block.items.map((it) => (
                      <li key={it} style={{ fontSize: '0.96rem' }}>
                        {it}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal anim="fade" delay={280}>
            <p
              style={{
                marginTop: 'var(--sp-6)',
                maxWidth: '88ch',
                fontSize: '0.96rem',
                color: 'var(--text-dim)',
                paddingLeft: 'var(--sp-5)',
                borderLeft: '2px solid var(--line)',
              }}
            >
              Preferimos declarar o limite a prometer o que a fisica do sensor nao permite. Essa e
              a mesma razao pela qual publicamos os indicadores de precisao junto com as condicoes
              em que foram medidos.
            </p>
          </Reveal>
        </div>
      </section>

      <Modules />
      <Metrics />
      <Differentiators />
      <Comparison />

      <section className="section section--tight">
        <div className="container center">
          <Reveal anim="up">
            <h2>Disponivel para os tres sistemas</h2>
            <p className="lead" style={{ maxWidth: '58ch', marginInline: 'auto' }}>
              Uma base de codigo unica gera instaladores para Windows, macOS e Linux. O download
              fica liberado assim que a conta e criada.
            </p>
          </Reveal>
          <Reveal anim="up" delay={160}>
            <div
              style={{
                display: 'flex',
                gap: 'var(--sp-3)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: 'var(--sp-5)',
              }}
            >
              <Button href={DOWNLOADS.windows} variant="secondary">
                Windows
              </Button>
              <Button href={DOWNLOADS.macos} variant="secondary">
                macOS
              </Button>
              <Button href={DOWNLOADS.linux} variant="secondary">
                Linux
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
