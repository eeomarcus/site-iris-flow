# IrisFlow — site institucional e de contratação

Site da **IrisFlow**, startup de tecnologia assistiva que transforma o movimento dos olhos em
comunicação e em controle do computador usando a webcam que a pessoa já tem em casa.
Todo o conteúdo vem do Plano de Negócios IrisFlow 2026.

> **Banco no Supabase, pagamento ainda não.** Cadastro, login, assinatura, cancelamento e o
> formulário de contato gravam de verdade, via Supabase (esquema em `supabase/schema.sql`).
> O que continua mockado é só a cobrança: nenhum gateway está conectado, nenhum cartão é
> processado e nada é cobrado. Toda a conversa com o banco está isolada em
> `src/services/api.ts`.

> **O produto ainda não tem nome próprio no site.** Empresa e solução aparecem sob a mesma marca,
> como o próprio plano faz ("A IrisFlow é um programa de computador que estima para onde a pessoa
> está olhando"). Quando o nome do produto entrar, os pontos a ajustar são `src/data/content.ts`,
> o rótulo da rota `/solucao` e o `<Logo />`.

---

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento com HMR |
| `npm run build` | checagem de tipos (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | serve o build de produção |
| `npm run typecheck` | só a checagem de tipos |

**Stack:** React 18 · TypeScript · Vite 5 · React Router 6 · CSS puro com custom properties.
Sem Tailwind, sem styled-components, sem biblioteca de animação — tudo em CSS nativo.

---

## Identidade visual

A marca é a que vocês enviaram, usada como arquivo, sem redesenho.

```
public/brand/
├── irisflow-logo.png             assinatura horizontal, positivo
├── irisflow-logo-negativo.png    assinatura horizontal, para fundo escuro
├── irisflow-symbol.png           símbolo da íris, positivo
└── irisflow-symbol-negativo.png  símbolo da íris, para fundo escuro
```

As versões em **negativo** foram derivadas das originais: o azul-marinho da assinatura
desapareceria sobre o fundo escuro, então ele vira branco e o azul institucional recebe um tom
mais claro da mesma matiz. Os quatro arquivos foram recortados até a caixa útil do desenho — a
margem transparente original fazia a marca aparecer pequena demais em qualquer altura definida.

O componente `<Logo />` (`src/components/layout/Logo.tsx`) recebe `variant` (`full` | `symbol`),
`tone` (`positivo` | `negativo`) e `size`. O `<IrisMark />` usa o símbolo como elemento gráfico,
com halo e anéis — nenhum desenho por cima da marca.

### Cor

O tema padrão é **claro**, como define o tópico 2.3 do plano: *"o branco e os neutros claros
compõem os fundos da interface e do material institucional… requisito que não é apenas estético
mas funcional em uma interface operada por fixação ocular"*.

As faixas escuras — hero, chamada final, rodapé e a abertura de cada página interna — recebem a
classe `.on-dark`, que **apenas redefine os mesmos tokens** dentro daquela subárvore. Nenhum
componente precisa saber em que fundo está: `.panel`, `.card`, `.btn` e todo o resto leem
`var(--surface)`, `var(--text)`, `var(--accent)` e se adaptam sozinhos.

| Token | Claro | Escuro |
| --- | --- | --- |
| `--bg` | `#ffffff` | `#061223` |
| `--text` | `#0b1b3a` | `#f2f6fd` |
| `--accent` | `#1b54a8` (azul institucional) | `#8fb4f0` |
| `--ok` | `#018476` | `#3fd6c2` (teal `#00a693`) |

Todos os pares de texto e fundo passam WCAG AA (o mais apertado é `--ok` sobre branco, 4,60:1).

### Ícones

Todos os ícones do site são SVG desenhados em `src/components/ui/Icon.tsx`, na mesma grade de
24×24, traço de 1,6 e sem preenchimento. A cor vem sempre do contexto (`currentColor`), então o
mesmo ícone serve nas faixas claras e nas escuras, e nenhum deles precisa de variante.

```tsx
import { Icon } from '@/components/ui/Icon'

<Icon name="teclado" size={26} />
```

Os nomes são semânticos (`alvo`, `teclado`, `olho`, `webcam`, `offline`, `cadeado`…), e os dados
em `content.ts` guardam o nome do ícone, não o desenho. Para acrescentar um, basta somar a chave
ao tipo `IconName` e o caminho ao mapa `PATHS`.

Fonte de display: **Boldonse** (SIL OFL, licença em `public/fonts/Boldonse-OFL.txt`).
Corpo de texto: pilha sans-serif do sistema.

---

## Back-end

O banco é um projeto Supabase. O esquema inteiro está em **`supabase/schema.sql`**: cole no SQL
Editor e execute uma vez. Ele é idempotente.

```
plans              preço e dias de avaliação (deixam de ser constantes no código)
profiles           quem paga, 1:1 com auth.users
beneficiaries      quem usa — separado porque `condition` é dado sensível de saúde (LGPD)
subscriptions      status, trial, próxima cobrança, preço acertado na contratação
payment_methods    método, bandeira e os quatro últimos dígitos; nunca o cartão
charges            histórico de cobranças, para o webhook do gateway
contact_messages   formulário de /contato
app_releases       URLs dos instaladores
```

**Row Level Security está ligada em todas as tabelas.** A chave anônima vai no bundle e é
pública: quem impede um assinante de ler os dados de outro são as políticas, não o segredo da
chave. Assinatura e pagamento são somente leitura para o cliente; toda mudança de estado passa
por funções `security definer` (`complete_registration`, `attach_payment_method`,
`request_cancellation`, `reactivate_subscription`), porque senão qualquer pessoa com a chave
marcaria a própria assinatura como paga.

O painel lê a view `my_account`, que devolve perfil, beneficiário, assinatura e forma de
pagamento em uma linha só, no formato que as telas já usavam.

### Configuração

```bash
cp .env.example .env.local   # e preencha com Project Settings > API
npm run dev
```

A `service_role key` **não** entra no `.env.local`: ela ignora a RLS e, com prefixo `VITE_`,
seria publicada no bundle. Ela só existe do lado do servidor.

Em **Authentication > Sign In / Providers > Email**, a opção *Confirm email* precisa estar
desligada para o fluxo ir direto do cadastro ao checkout. Com ela ligada, o `signUp` não devolve
sessão e o cadastro para com uma mensagem explicando isso.

---

## Estrutura

```
src/
├── main.tsx                 entrypoint
├── App.tsx                  rotas (lazy loading por página)
│
├── styles/
│   ├── tokens.css           paleta clara + bloco .on-dark, tipografia, espaçamento
│   ├── animations.css       @keyframes + utilitários (.panel, .lift, .hover-glow…)
│   └── global.css           reset, layout, acessibilidade, prefers-reduced-motion
│
├── data/content.ts          TODO o texto de venda do site, em um só lugar
├── lib/supabase.ts          cliente do Supabase e tradução das mensagens de erro
├── services/api.ts          única parte do site que conhece o banco
├── utils/format.ts          máscaras (CPF, telefone, cartão) e validações reais
│
├── context/AccountContext   sessão, conta e assinatura, lidas do Supabase
├── hooks/                   useInView, useCountUp, useDownloads, usePointer…
│
├── components/
│   ├── effects/             AmbientBackground, DwellTarget, Reveal, AnimatedHeadline,
│   │                        Typewriter, Counter, Parallax, Marquee
│   ├── ui/                  Button, Card, Field, Stepper, Skeleton, Icon
│   ├── layout/              Header, Footer, Layout, Logo + IrisMark, PageHead
│   └── sections/            Hero, ProblemSection, DwellDemo, Pipeline, Modules,
│                            Metrics, Differentiators, Comparison, Pricing, Faq, CTA
│
└── pages/                   Home, Solucao, ComoFunciona, Acessibilidade, Planos, Sobre,
                             Contato, Cadastro, Pagamento, Sucesso, Entrar, Conta,
                             Legal (Privacidade + Termos), NotFound
```

---

## Rotas

| Rota | Página | Abertura |
| --- | --- | --- |
| `/` | Hero com a marca, problema, demo interativa, módulos, indicadores, diferenciais, comparativo, plano, FAQ | escura |
| `/solucao` | O que a IrisFlow entrega e o que ainda não entrega, módulos, downloads | escura |
| `/como-funciona` | Jornada do usuário, pipeline de 6 estágios, demo, mecanismos anti-acionamento acidental | escura |
| `/acessibilidade` | Os 4 princípios, comparação dos 3 tempos de fixação, compromissos do site | escura |
| `/planos` | Preço, garantias, comparativo, FAQ | escura |
| `/sobre` | Valores, roadmap com estágio real de cada frente | escura |
| `/contato` | Formulário validado + programa de validação clínica | escura |
| `/cadastro` | Cadastro em 3 etapas (quem paga → quem usa → confirmação) | clara |
| `/pagamento` | Checkout: cartão, Pix ou boleto | clara |
| `/sucesso` | Confirmação, resumo da conta e downloads | clara |
| `/entrar` · `/conta` | Login e painel da assinatura | clara |
| `/privacidade` · `/termos` | Páginas legais | escura |
| `*` | 404 | escura |

O cabeçalho é fixo e transparente sobre as aberturas escuras, com a marca em negativo; ao rolar
ou nas rotas de fluxo, ele ganha fundo branco e a marca volta ao positivo. A lista está em
`LIGHT_ROUTES`, no topo de `Header.tsx`.

---

## Efeitos aplicados

Repertório retirado de *"31 Website Animation Examples and Effects"* (SVGator), adaptado ao tema
do produto — o símbolo da íris, o scan da webcam, a seleção por fixação.

| # do artigo | Efeito | Onde |
| --- | --- | --- |
| 2, 15 | Scrollytelling e parallax | `Reveal`, `Parallax`, `Pipeline` (linha que se desenha com o scroll) |
| 4 | Tipografia expressiva / glitch | `AnimatedHeadline` (palavras sobem), `.glitch` no 404 |
| 6, 20 | Movimento ambiente de fundo | `AmbientBackground` — partículas, malha, linha de varredura |
| 7, 8 | Line animation e self-drawing | Filete do hero, anéis do `IrisMark` |
| 9 | Morphing | Blobs líquidos do fundo, ícone +/− do FAQ, hambúrguer → X |
| 10 | Logo animado | `IrisMark` — o símbolo gira lentamente, com halo pulsante |
| 12, 26 | Microinterações e hover | Botões com brilho que segue o ponteiro, cards que elevam, sublinhados |
| 14 | Faux 3D | Camadas do hero, cartão de crédito, `.lift` |
| 17, 18 | Liquid motion e gradiente animado | `gradient-drift`, `blob-morph`, `.accent-text` |
| 23 | Hero animation | Marca em destaque com revelação por linha do título |
| 24, 25 | Skeleton e loaders | `Skeleton`, `SkeletonCard`, `Spinner`, fallback das rotas |
| 22 | Transição de página | `Layout` remonta o `<main>` a cada rota |
| 27, 28 | Neumorfismo e glassmorfismo | Utilitário `.panel` — sólido no claro, translúcido no escuro |

**Toda animação respeita `prefers-reduced-motion`.** Com a preferência ativa no sistema, o site
fica estático — requisito, e não cortesia, para o público atendido.

---

## O que falta para ir a produção

1. **Gateway de pagamento** — `tokenizeCard`, `createPixCharge` e `createBoleto` em
   `src/services/api.ts` continuam vazios. A tokenização tem que rodar **no navegador** (Stripe,
   Mercado Pago, Pagar.me); dados de cartão nunca devem passar pelo seu servidor. O token
   resultante vai em `attach_payment_method`, no campo `p_gateway_token`.
2. **Webhook do gateway** — precisa de uma Edge Function com a `service_role key` para escrever
   em `charges` e mover `subscriptions.status` quando um pagamento entrar ou falhar. É a única
   parte que a RLS deliberadamente não deixa o cliente fazer.
3. **Cobrança do fim do trial** — hoje `next_charge_at` é gravado, mas nada roda na data. Um
   cron do Supabase (`pg_cron`) ou uma rotina externa precisa disparar a cobrança.
4. **Instaladores** — publicar o build Electron e trocar os `'#'` da tabela `app_releases`.
5. **Recuperação de senha** — `resetPasswordForEmail` ainda não está na tela de acesso.
6. **Páginas legais** — `src/pages/Legal.tsx` traz um rascunho de referência que precisa de
   revisão jurídica antes de publicar.
7. **Nome do produto**, quando existir: `src/data/content.ts`, o rótulo `/solucao` no `NAV` e no
   `Footer`, e a variante do `<Logo />`.

---

## Nota sobre os números

Os indicadores técnicos exibidos (0,9° de erro angular, 57 px, 478 marcos faciais, 333 testes)
foram medidos **com um único operador da equipe, em um único equipamento doméstico, com a cabeça
em posição estável**. Ainda não houve teste com pacientes do público-alvo. O site declara essa
ressalva em toda seção onde os números aparecem — mantenha isso ao editar o conteúdo.
