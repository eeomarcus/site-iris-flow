import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { AccountProvider } from '@/context/AccountContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { SkeletonCard } from '@/components/ui/Skeleton'

/* Cada pagina em seu proprio pedaco: o primeiro carregamento traz apenas
   a home, e o resto chega sob demanda. */
const Home = lazy(() => import('@/pages/Home'))
const Solucao = lazy(() => import('@/pages/Solucao'))
const ComoFunciona = lazy(() => import('@/pages/ComoFunciona'))
const Acessibilidade = lazy(() => import('@/pages/Acessibilidade'))
const Planos = lazy(() => import('@/pages/Planos'))
const Sobre = lazy(() => import('@/pages/Sobre'))
const Contato = lazy(() => import('@/pages/Contato'))
const Cadastro = lazy(() => import('@/pages/Cadastro'))
const Pagamento = lazy(() => import('@/pages/Pagamento'))
const Sucesso = lazy(() => import('@/pages/Sucesso'))
const Entrar = lazy(() => import('@/pages/Entrar'))
const Conta = lazy(() => import('@/pages/Conta'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Privacidade = lazy(() =>
  import('@/pages/Legal').then((m) => ({ default: m.Privacidade })),
)
const Termos = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Termos })))

/** Placeholder exibido enquanto o pedaco da rota chega. */
function RouteFallback() {
  return (
    <div className="container section" aria-busy="true">
      <div className="grid grid--3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AccountProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="solucao" element={<Solucao />} />
                <Route path="como-funciona" element={<ComoFunciona />} />
                <Route path="acessibilidade" element={<Acessibilidade />} />
                <Route path="planos" element={<Planos />} />
                <Route path="sobre" element={<Sobre />} />
                <Route path="contato" element={<Contato />} />

                {/* fluxo de contratacao */}
                <Route path="cadastro" element={<Cadastro />} />
                <Route path="pagamento" element={<Pagamento />} />
                <Route path="sucesso" element={<Sucesso />} />
                <Route path="entrar" element={<Entrar />} />
                <Route path="conta" element={<Conta />} />

                {/* legal */}
                <Route path="privacidade" element={<Privacidade />} />
                <Route path="termos" element={<Termos />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AccountProvider>
    </ThemeProvider>
  )
}
