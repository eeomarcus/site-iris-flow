import { useEffect, useRef, useState } from 'react'
import { AnimatedHeadline } from '@/components/effects/AnimatedHeadline'
import { Reveal } from '@/components/effects/Reveal'
import './dwell-demo.css'

/** Ordem por frequência das letras do português, como no teclado do produto. */
const ROWS = [
  ['A', 'E', 'O', 'S', 'R', 'I'],
  ['N', 'D', 'M', 'U', 'T', 'C'],
  ['L', 'P', 'V', 'G', 'H', 'Q'],
  ['B', 'F', 'Z', 'J', 'X', 'K'],
]

const QUICK = ['Sim', 'Não', 'Obrigado', 'Estou com dor']

const DWELL_OPTIONS = [800, 1500, 2500] as const

export function DwellDemo() {
  const [text, setText] = useState('')
  const [dwellMs, setDwellMs] = useState<number>(1500)
  const [holding, setHolding] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const [spoken, setSpoken] = useState(false)
  const timer = useRef<number>()
  const cool = useRef<number>()

  useEffect(
    () => () => {
      window.clearTimeout(timer.current)
      window.clearTimeout(cool.current)
    },
    [],
  )

  const commit = (value: string) => {
    setText((prev) => {
      if (value === '␣') return prev + ' '
      if (value === '⌫') return prev.slice(0, -1)
      if (value.length > 1) return value
      return prev + value
    })
    setSpoken(false)
    // período refratário de 800 ms, igual ao do produto
    setLocked(true)
    cool.current = window.setTimeout(() => setLocked(false), 800)
  }

  const begin = (key: string) => {
    if (locked) return
    setHolding(key)
    timer.current = window.setTimeout(() => {
      setHolding(null)
      commit(key)
    }, dwellMs)
  }

  const cancel = () => {
    window.clearTimeout(timer.current)
    setHolding(null)
  }

  const speak = () => {
    setSpoken(true)
    // Síntese de voz do próprio navegador. No produto é uma voz
    // em português brasileiro embarcada, que funciona offline.
    if ('speechSynthesis' in window && text.trim()) {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'pt-BR'
      u.rate = 0.95
      window.speechSynthesis.speak(u)
    }
    window.setTimeout(() => setSpoken(false), 2200)
  }

  const keyProps = (key: string) => ({
    onMouseEnter: () => begin(key),
    onMouseLeave: cancel,
    onFocus: () => begin(key),
    onBlur: cancel,
    onClick: () => {
      cancel()
      commit(key)
    },
  })

  return (
    <section className="section demo" id="demo">
      <div className="container">
        <Reveal anim="fade">
          <span className="eyebrow">Experimente</span>
        </Reveal>

        <AnimatedHeadline
          text="Assim é escrever com o olhar."
          as="h2"
          highlight={['olhar.']}
          className="demo__title"
        />

        <Reveal anim="up" delay={140}>
          <p className="lead demo__lead">
            Na IrisFlow, o gatilho é o olhar estimado pela webcam. Aqui, para você experimentar sem
            instalar nada, o gatilho é o cursor ou a tecla Tab. O resto é idêntico: contorno de
            destaque ao entrar no alvo, mudança de cor durante a seleção, aro de progresso até a
            confirmação e um período refratário de 800 ms para impedir o disparo duplo.
          </p>
        </Reveal>

        <Reveal anim="zoom" delay={220}>
          <div className="demo__frame panel">
            {/* barra de estado, como na tela real de calibração */}
            <div className="demo__status">
              <span className="demo__chip demo__chip--ok">câmera ativa</span>
              <span className="demo__chip demo__chip--ok">rastreamento estável</span>
              <span className="demo__chip">calibração 9/9</span>
              <span className="demo__spacer" />
              <span className="demo__chip demo__chip--sos">emergência</span>
            </div>

            {/* campo de texto composto */}
            <div className="demo__screen">
              <p className="demo__output" aria-live="polite">
                {text || <span className="demo__placeholder">passe o cursor sobre uma tecla…</span>}
                <span className="demo__caret" aria-hidden="true" />
              </p>
              <button
                type="button"
                className={`demo__speak${spoken ? ' is-speaking' : ''}`}
                onClick={speak}
                disabled={!text.trim()}
              >
                {spoken ? 'falando…' : 'falar'}
              </button>
            </div>

            {/* teclado ordenado por frequência */}
            <div className="demo__keys" role="group" aria-label="Teclado ocular de demonstração">
              {ROWS.map((row, ri) => (
                <div className="demo__row" key={ri}>
                  {row.map((key) => (
                    <DemoKey
                      key={key}
                      label={key}
                      active={holding === key}
                      dwellMs={dwellMs}
                      {...keyProps(key)}
                    />
                  ))}
                </div>
              ))}
              <div className="demo__row">
                <DemoKey label="␣" wide active={holding === '␣'} dwellMs={dwellMs} {...keyProps('␣')} />
                <DemoKey label="⌫" active={holding === '⌫'} dwellMs={dwellMs} {...keyProps('⌫')} />
              </div>
            </div>

            {/* frases rápidas */}
            <div className="demo__quick" role="group" aria-label="Frases rápidas">
              {QUICK.map((phrase) => (
                <DemoKey
                  key={phrase}
                  label={phrase}
                  quick
                  active={holding === phrase}
                  dwellMs={dwellMs}
                  {...keyProps(phrase)}
                />
              ))}
            </div>

            {/* ajuste do tempo de fixação */}
            <div className="demo__settings">
              <span className="demo__settings-label">tempo de fixação</span>
              {DWELL_OPTIONS.map((ms) => (
                <button
                  key={ms}
                  type="button"
                  className={`demo__opt${dwellMs === ms ? ' is-on' : ''}`}
                  onClick={() => setDwellMs(ms)}
                  aria-pressed={dwellMs === ms}
                >
                  {ms} ms
                </button>
              ))}
              <button type="button" className="demo__opt demo__opt--clear" onClick={() => setText('')}>
                limpar
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal anim="fade" delay={320}>
          <p className="demo__note">
            O teclado real segue a frequência das letras do português (A, E, O, S, R, I, N, D, M,
            U, T, C, L), porque isso encurta a distância que o olho percorre entre teclas
            consecutivas. Os layouts alfabético e QWERTY continuam disponíveis nas configurações.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

type KeyProps = {
  label: string
  active: boolean
  dwellMs: number
  wide?: boolean
  quick?: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onFocus: () => void
  onBlur: () => void
  onClick: () => void
}

function DemoKey({ label, active, dwellMs, wide, quick, ...handlers }: KeyProps) {
  return (
    <button
      type="button"
      className={[
        'demo__key',
        active ? 'is-active' : '',
        wide ? 'demo__key--wide' : '',
        quick ? 'demo__key--quick' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      {...handlers}
    >
      <span className="demo__key-label">{label}</span>
      <span
        className="demo__key-fill"
        style={{ transitionDuration: active ? `${dwellMs}ms` : '180ms' }}
        aria-hidden="true"
      />
    </button>
  )
}
