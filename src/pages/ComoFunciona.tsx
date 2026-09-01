import { PageHead } from '@/components/layout/PageHead'
import { Pipeline } from '@/components/sections/Pipeline'
import { DwellDemo } from '@/components/sections/DwellDemo'
import { Metrics } from '@/components/sections/Metrics'
import { CallToAction } from '@/components/sections/CallToAction'
import { Reveal } from '@/components/effects/Reveal'
import { Card, CardIcon } from '@/components/ui/Card'
import { IrisMark } from '@/components/layout/Logo'
import { Parallax } from '@/components/effects/Parallax'

const STEPS_USER = [
  {
    n: '01',
    title: 'Instale no computador que ja existe em casa',
    text: 'Instalador para Windows, macOS ou Linux. Nenhum equipamento novo, nenhuma camera especial — a webcam do notebook basta.',
  },
  {
    n: '02',
    title: 'Deixe o sistema preparar o posto de uso',
    text: 'Antes de calibrar, a IrisFlow mede distancia, enquadramento, postura, iluminacao, contraste, reflexo em lentes e cintilacao da rede, e ajusta zoom, brilho e contraste da camera em malha fechada. Quando o driver nao permite o ajuste, informa qual providencia fisica e necessaria.',
  },
  {
    n: '03',
    title: 'Calibre em menos de trinta segundos',
    text: 'Nove pontos em grade de tres por tres, com ordem embaralhada. Os primeiros quatrocentos milissegundos de cada ponto sao descartados, porque correspondem a sacada e a acomodacao do olho. O procedimento leva de dezenove a vinte e nove segundos.',
  },
  {
    n: '04',
    title: 'Comece a falar',
    text: 'Teclado ordenado pela frequencia do portugues, banco de frases, pictogramas, sintese de voz e o cursor do sistema operacional. A emergencia fica sempre no mesmo lugar, em todas as telas.',
  },
]

const SAFETY = [
  {
    icon: '◷',
    title: 'Tempo de fixacao configuravel',
    text: 'De 800 a 2500 milissegundos, com retorno visual em tres estagios. O usuario tem uma janela explicita para desistir antes que a selecao se complete.',
  },
  {
    icon: '⟳',
    title: 'Periodo refratario de 800 ms',
    text: 'Depois de cada acionamento, o mesmo alvo fica bloqueado, o que impede o disparo duplo enquanto o olho ainda esta sobre ele.',
  },
  {
    icon: '⊘',
    title: 'Bloqueio em estado degradado',
    text: 'Quando o rastreamento perde confiabilidade, nenhuma selecao e aceita — com uma excecao deliberada: o botao de emergencia continua acionavel, com tempo de fixacao ampliado.',
  },
  {
    icon: '◨',
    title: 'Monitoramento de postura e fadiga',
    text: 'Acima de sessenta pixels de desvio acumulado, o cuidador recebe um aviso que distingue desvio lento, que so exige reapoiar a nuca, de desvio erratico, que pede recalibracao. A taxa de piscadas indica fadiga.',
  },
]

export default function ComoFunciona() {
  return (
    <>
      <PageHead
        eyebrow="Como funciona"
        title="Do olho ate a palavra, sem nada sair do computador."
        highlight={['sem', 'nada', 'sair']}
        lead="Quadros da camera, posicao bruta da iris e coeficientes do modelo de calibracao sao processados e permanecem exclusivamente no dispositivo do usuario. Nenhuma imagem e nenhum vetor de calibracao trafega pela rede."
      />

      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
              gap: 'var(--sp-7)',
              alignItems: 'center',
            }}
            className="how__split"
          >
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--sp-5)' }}>
              {STEPS_USER.map((s, i) => (
                <Reveal key={s.n} anim="right" delay={i * 110} as="li">
                  <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
                    <span
                      style={{
                        flex: 'none',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        color: 'var(--ok)',
                        paddingTop: '4px',
                      }}
                    >
                      {s.n}
                    </span>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--sp-2)' }}>{s.title}</h3>
                      <p style={{ margin: 0, maxWidth: '58ch' }}>{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Parallax speed={-0.08}>
              <IrisMark size={320} tone="positivo" />
            </Parallax>
          </div>
        </div>
      </section>

      <Pipeline />
      <DwellDemo />

      <section className="section">
        <div className="container">
          <Reveal anim="fade">
            <span className="eyebrow">Seguranca da selecao</span>
          </Reveal>
          <Reveal anim="up">
            <h2 style={{ maxWidth: '24ch', marginBottom: 'var(--sp-4)' }}>
              Quatro mecanismos contra o acionamento acidental.
            </h2>
          </Reveal>
          <Reveal anim="up" delay={120}>
            <p className="lead" style={{ maxWidth: '72ch', marginBottom: 'var(--sp-7)' }}>
              A taxa de falsos cliques ainda nao foi medida em uso continuo real — medi-la exige
              sessoes longas com o publico-alvo, que e justamente o objetivo do programa de
              validacao. A meta declarada e ficar abaixo de um acionamento acidental por hora.
            </p>
          </Reveal>

          <div className="grid grid--2">
            {SAFETY.map((s, i) => (
              <Reveal key={s.title} anim="up" delay={i * 90}>
                <Card as="div">
                  <CardIcon tone={i % 2 === 0 ? 'teal' : 'blue'}>{s.icon}</CardIcon>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Metrics />
      <CallToAction />
    </>
  )
}
