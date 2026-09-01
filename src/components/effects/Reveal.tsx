import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

type Anim = 'up' | 'fade' | 'zoom' | 'left' | 'right'

const KEYFRAMES: Record<Anim, string> = {
  up: 'fade-up',
  fade: 'fade-in',
  zoom: 'zoom-in',
  left: 'slide-left',
  right: 'slide-right',
}

type Props = {
  children: ReactNode
  /** Direcao do reveal. */
  anim?: Anim
  /** Atraso em ms — use para escalonar itens de uma lista. */
  delay?: number
  duration?: number
  as?: ElementType
  className?: string
  style?: CSSProperties
}

/**
 * Reveal de scrollytelling: o conteudo entra quando cruza a viewport.
 * Efeito 2 e 15 do catalogo da SVGator (scrollytelling / scrolling effects).
 */
export function Reveal({
  children,
  anim = 'up',
  delay = 0,
  duration = 760,
  as: Tag = 'div',
  className = '',
  style,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? undefined : 0,
        animation: inView
          ? `${KEYFRAMES[anim]} ${duration}ms var(--ease-out) ${delay}ms both`
          : undefined,
      }}
    >
      {children}
    </Tag>
  )
}
