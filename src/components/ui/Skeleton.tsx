import './skeleton.css'

type Props = {
  width?: string
  height?: string
  radius?: string
  className?: string
}

/**
 * Placeholder animado. Efeitos 24 e 25 do catalogo da SVGator
 * (loading skeleton screens / loading animations).
 */
export function Skeleton({ width = '100%', height = '1rem', radius = '8px', className = '' }: Props) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}

/** Cartao inteiro em estado de carregamento, usado no painel da conta. */
export function SkeletonCard() {
  return (
    <div className="skeleton-card" role="status" aria-label="Carregando conteudo">
      <Skeleton width="52px" height="52px" radius="14px" />
      <Skeleton width="62%" height="1.1rem" />
      <Skeleton width="94%" height="0.8rem" />
      <Skeleton width="76%" height="0.8rem" />
      <span className="sr-only">Carregando…</span>
    </div>
  )
}

/** Spinner circular para botoes em processamento. */
export function Spinner({ size = 18 }: { size?: number }) {
  return (
    <span
      className="spinner anim-spin"
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}
