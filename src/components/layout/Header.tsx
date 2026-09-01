import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/Button'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useAccount } from '@/context/AccountContext'
import { PLAN } from '@/data/content'
import './header.css'

const NAV = [
  { to: '/solucao', label: 'A solucao' },
  { to: '/como-funciona', label: 'Como funciona' },
  { to: '/acessibilidade', label: 'Acessibilidade' },
  { to: '/planos', label: 'Planos' },
  { to: '/sobre', label: 'A empresa' },
  { to: '/contato', label: 'Contato' },
]

/** Rotas que comecam com fundo claro, sem faixa escura de abertura. */
const LIGHT_ROUTES = ['/cadastro', '/pagamento', '/sucesso', '/entrar', '/conta']

export function Header() {
  const { scrolled, progress } = useScrollProgress()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { account } = useAccount()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // As paginas de conteudo abrem com uma faixa escura; as de fluxo
  // (cadastro, pagamento, conta) sao claras desde o topo. O cabecalho
  // so entra no modo negativo quando esta de fato sobre a faixa escura.
  const opensLight = LIGHT_ROUTES.some((r) => pathname.startsWith(r))
  const onLightBackdrop = scrolled || open || opensLight

  return (
    <header className={`header${onLightBackdrop ? ' is-scrolled' : ''}`}>
      <span
        className="header__progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <div className="container header__inner">
        <Logo size="sm" tone={onLightBackdrop ? 'positivo' : 'negativo'} />

        <nav className="header__nav" aria-label="Navegacao principal">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className="header__link underline-grow">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <ThemeToggle />
          {account ? (
            <Button to="/conta" variant="secondary">
              Minha conta
            </Button>
          ) : (
            <>
              <Button to="/entrar" variant="ghost">
                Entrar
              </Button>
              <Button to="/cadastro">Testar gratis</Button>
            </>
          )}
        </div>

        <button
          type="button"
          className={`burger${open ? ' is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="menu-mobile" className={`drawer${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Navegacao mobile">
          {NAV.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="drawer__link"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="drawer__actions">
          <ThemeToggle full />
          {account ? (
            <Button to="/conta" full variant="secondary">
              Minha conta
            </Button>
          ) : (
            <>
              <Button to="/entrar" full variant="secondary">
                Entrar
              </Button>
              <Button to="/cadastro" full>
                Testar gratis por {PLAN.trialDays} dias
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
