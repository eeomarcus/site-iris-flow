import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import './layout.css'

/** Rola para o topo, ou para a âncora, a cada mudança de rota. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <ScrollManager />
      <Header />
      {/* A key remonta o <main> a cada rota, o que dá a transição de página.
          Sem padding-top: cada rota abre com a própria faixa escura, que
          corre por baixo do cabeçalho transparente. */}
      <main id="conteudo" key={pathname} className="main anim-page">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
