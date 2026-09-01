import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { BRAND } from '@/data/content'
import './footer.css'

const COLUMNS = [
  {
    title: 'A solucao',
    links: [
      { to: '/solucao', label: 'O que a IrisFlow faz' },
      { to: '/como-funciona', label: 'Como funciona' },
      { to: '/acessibilidade', label: 'Acessibilidade' },
      { to: '/planos', label: 'Planos e preco' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { to: '/sobre', label: 'Sobre a IrisFlow' },
      { to: '/contato', label: 'Fale com a gente' },
      { to: '/contato#validacao', label: 'Programa de validacao' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacidade', label: 'Politica de privacidade' },
      { to: '/termos', label: 'Termos de uso' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo variant="full" tone="negativo" size="md" />
          <p className="footer__tagline">{BRAND.tagline}</p>
          <p className="footer__note">
            Tecnologia assistiva que transforma o movimento dos olhos em comunicacao e em
            controle do computador, usando a webcam que a pessoa ja tem em casa.
          </p>
          <div className="footer__social">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer noopener">
              Instagram
            </a>
            <a href={BRAND.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
            <a href={`mailto:${BRAND.email}`}>E-mail</a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="underline-grow">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} IrisFlow — todos os direitos reservados.</p>
        <p className="footer__disclaimer">
          Produto de tecnologia assistiva em estagio de validacao. Os indicadores de precisao
          divulgados foram medidos com um unico operador em ambiente controlado e ainda nao foram
          replicados com pacientes do publico-alvo.
        </p>
      </div>
    </footer>
  )
}
