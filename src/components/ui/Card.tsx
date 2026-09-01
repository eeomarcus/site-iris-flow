import type { ReactNode } from 'react'
import './card.css'

type Props = {
  children: ReactNode
  className?: string
  /** Mantido por compatibilidade; a superficie ja se adapta ao fundo. */
  glass?: boolean
  /** Ativa elevacao e brilho no hover. */
  interactive?: boolean
  as?: 'div' | 'article' | 'li' | 'section'
}

/**
 * Cartao base do site. A classe .panel le os tokens do contexto: no
 * fundo claro e um cartao branco com sombra suave; dentro de uma faixa
 * .on-dark vira um painel translucido, sem nenhuma troca de prop.
 */
export function Card({
  children,
  className = '',
  glass: _glass,
  interactive = true,
  as: Tag = 'div',
}: Props) {
  void _glass
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag
      className={['card', 'panel', interactive ? 'lift hover-glow' : '', className]
        .filter(Boolean)
        .join(' ')}
      onMouseMove={onMove}
    >
      {children}
    </Tag>
  )
}

export function CardIcon({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'teal' }) {
  return <span className={`card__icon card__icon--${tone}`}>{children}</span>
}
