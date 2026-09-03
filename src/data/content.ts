/* ============================================================
   Conteúdo do site, extraído do Plano de Negócios IrisFlow 2026.
   Fica centralizado aqui para que texto e números possam ser
   revisados sem abrir nenhum componente. Todos os dados são
   verificáveis no plano.
   ============================================================ */

import type { IconName } from '@/components/ui/Icon'

export const BRAND = {
  company: 'IrisFlow',
  solution: 'a solução da IrisFlow',
  tagline: 'Seu olhar tem voz.',
  claim: 'Comunicação e controle do computador pelo olhar, com a webcam que você já tem.',
  email: 'irisflowteam@gmail.com',
  instagram: 'https://instagram.com/irisflow',
  linkedin: 'https://linkedin.com/company/irisflow',
  repo: 'https://github.com/ZambePy/Blink',
}

/** Frases que a máquina de escrever compõe no hero. */
export const HERO_PHRASES = [
  'Estou com sede.',
  'Quero falar com a minha filha.',
  'Pode aumentar o volume?',
  'Hoje eu estou bem.',
  'Chama a enfermeira, por favor.',
]

/* ---------------- o problema ---------------- */

export const PROBLEM = {
  title: 'A tecnologia existe há vinte anos. O preço é que não deixa ela chegar.',
  lead: 'Pessoas com ELA, tetraplegia alta, paralisia cerebral severa, sequela grave de AVC ou distrofia muscular avançada perdem a fala e o movimento, mas seguem conscientes, lúcidas e com o controle dos olhos preservado.',
  stats: [
    {
      value: 60.5,
      decimals: 1,
      suffix: '%',
      label: 'apontam o preço como a principal limitação das soluções existentes',
    },
    {
      value: 23.7,
      decimals: 1,
      suffix: '%',
      label: 'declararam não ter acesso a nenhuma solução adequada',
    },
    {
      value: 84.2,
      decimals: 1,
      suffix: '%',
      label: 'somados, enfrentam uma barreira econômica antes da barreira tecnológica',
    },
  ],
  note: 'Amostra não probabilística, por conveniência, de 38 respondentes, a maioria profissionais de saúde, coletada por formulário eletrônico. Serve como indício de percepção qualificada. Não vale como estimativa estatística da população brasileira.',
  contrast: {
    them: {
      label: 'Sistema de rastreamento ocular dedicado',
      price: 'R$ 15.000 a R$ 80.000',
      detail: 'Hardware proprietário, licença de software à parte, revenda física.',
    },
    us: {
      label: 'A solução da IrisFlow',
      price: 'A partir de R$ 249 por mês',
      detail: 'Sem equipamento, sem fidelidade, com período de avaliação gratuito antes da primeira cobrança.',
    },
  },
}

/* ---------------- módulos da solução (Quadro 7 do plano) ---------------- */

export type ModuleState = 'Implementado' | 'Em realização'

export const MODULES: {
  icon: IconName
  name: string
  description: string
  state: ModuleState
}[] = [
    {
      icon: 'alvo',
      name: 'Onboarding e calibração',
      description:
        'Tela inicial, seleção de perfil, acesso protegido do cuidador, calibração guiada de nove pontos e verificação rápida antes de cada sessão.',
      state: 'Implementado',
    },
    {
      icon: 'teclado',
      name: 'Comunicação',
      description:
        'Teclado virtual ordenado pela frequência das letras do português, campo de texto com síntese de voz, frases rápidas e pictogramas.',
      state: 'Implementado',
    },
    {
      icon: 'monitor',
      name: 'Computador',
      description:
        'Mouse virtual que assume o cursor do sistema operacional, permitindo abrir programas, navegar e clicar em alvos de tamanho razoável.',
      state: 'Implementado',
    },
    {
      icon: 'lazer',
      name: 'Lazer e bem-estar',
      description:
        'Jogos adaptados ao olhar (Estoura Bolhas, Jogo da Memória, Desenho e Siga o Alvo), galeria de imagens e conteúdo de estimulação.',
      state: 'Implementado',
    },
    {
      icon: 'pessoas',
      name: 'Cuidador',
      description:
        'Painel com status da sessão, tela de confirmação rápida de estado e histórico de solicitações de ajuda.',
      state: 'Implementado',
    },
    {
      icon: 'alerta',
      name: 'Emergência',
      description:
        'Célula de pedido de ajuda em posição fixa em todas as telas, com escalonamento automático para contato externo caso não haja resposta.',
      state: 'Implementado',
    },
    {
      icon: 'ajustes',
      name: 'Configurações',
      description:
        'Ajuste de tempo de fixação, sensibilidade, predefinição do filtro de suavização, layout de teclado, voz e idioma.',
      state: 'Implementado',
    },
    {
      icon: 'conversa',
      name: 'Assistente de conversação',
      description:
        'Composição assistida de frases por inteligência artificial, para reduzir o custo motor de escrever letra a letra.',
      state: 'Em realização',
    },
    {
      icon: 'voz',
      name: 'Clonagem de voz',
      description:
        'Reprodução das frases do usuário com a sua própria voz, gerada a partir de amostras de áudio anteriores à perda da fala.',
      state: 'Em realização',
    },
  ]

/* ---------------- como funciona: os seis estágios do pipeline ---------------- */

export const PIPELINE = [
  {
    step: '01',
    title: 'Captura',
    text: 'A webcam comum entrega vídeo contínuo a 1280 por 720 pixels, com taxa-alvo de trinta quadros por segundo. Nenhum equipamento adicional.',
  },
  {
    step: '02',
    title: 'Detecção facial',
    text: 'O MediaPipe, executado localmente em WebAssembly, extrai 478 marcos faciais tridimensionais por quadro, incluindo o contorno da íris de ambos os olhos.',
  },
  {
    step: '03',
    title: 'Engenharia de características',
    text: 'Um vetor compacto de cerca de 37 dimensões por olho reúne deslocamento da íris, abertura palpebral, ângulos da cabeça e termos de interação entre pose e deslocamento.',
  },
  {
    step: '04',
    title: 'Calibração e regressão',
    text: 'A partir da calibração de nove pontos, o sistema treina em tempo real um modelo de regressão Ridge individual. Ele aprende o olho daquela pessoa, naquele computador, naquela posição.',
  },
  {
    step: '05',
    title: 'Filtragem',
    text: 'Um filtro One Euro bidimensional, com três predefinições (estável, balanceada e responsiva), arbitra o compromisso entre ruído e latência conforme o perfil motor do usuário.',
  },
  {
    step: '06',
    title: 'Interação',
    text: 'O cursor de fixação entra na interface, com detecção de alvo, temporizador configurável e período refratário que evita reativação acidental.',
  },
]

/* ---------------- indicadores técnicos ---------------- */

export const METRICS = [
  { value: 0.9, decimals: 1, suffix: '°', label: 'erro angular na melhor sessão interna registrada' },
  { value: 57, suffix: ' px', label: 'erro em pixels na mesma sessão, em tela de 1920 × 1080' },
  { value: 104, suffix: ' px', label: 'erro máximo por ponto no pior dos nove alvos de validação' },
  { value: 97, suffix: '%', label: 'taxa de acerto em alvo de raio 150 px, equivalente aos da interface' },
  { value: 478, label: 'marcos faciais extraídos por quadro de vídeo' },
  { value: 333, label: 'testes automatizados verdes no repositório' },
]

export const METRICS_CAVEAT =
  'Medição em andamento. Todos os números acima foram registrados com um único operador, membro da própria equipe, em um único equipamento doméstico, com a cabeça em posição estável. Nenhum teste foi realizado até aqui com pacientes do público-alvo, e essa é a próxima tarefa do roteiro técnico. Erro em pixels depende do tamanho da tela e erro em graus depende da distância: por isso publicamos as condições ao lado do resultado, inclusive quando ele é desfavorável.'

/* ---------------- diferenciais ---------------- */

export const DIFFERENTIATORS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'olho',
    title: 'Modelo treinado para cada olho',
    text: 'Regressão Ridge com penalidade anisotrópica derivada da covariância das amostras, regularização escolhida por validação cruzada deixando um alvo inteiro de fora e detecção de pontos de calibração contaminados. É o ativo técnico proprietário da empresa.',
  },
  {
    icon: 'inclinacao',
    title: 'Compensação geométrica de pose',
    text: 'A correção da inclinação da cabeça é aplicada na saída, sem coeficiente ajustável, correta por construção mesmo fora da faixa vista na calibração. Colocar a pose como característica de entrada piorava o erro em 8,6%. Foi medido e descartado.',
  },
  {
    icon: 'webcam',
    title: 'Preparação automática do posto de uso',
    text: 'Antes de calibrar, o sistema mede distância, enquadramento, postura, iluminação, contraste, reflexo em lentes e cintilação da rede, e ajusta a câmera em malha fechada. Quando o driver não permite, informa a providência física em vez de fingir que ajustou.',
  },
  {
    icon: 'teclado',
    title: 'Teclado ordenado pelo português',
    text: 'As teclas seguem a frequência das letras do idioma (A, E, O, S, R, I, N, D, M, U, T, C, L) em vez da ordem QWERTY, o que encurta a distância média que o olho percorre entre teclas consecutivas. Os layouts alfabético e QWERTY seguem disponíveis.',
  },
  {
    icon: 'offline',
    title: 'Funciona sem internet',
    text: 'Núcleo de rastreamento, teclado e frases rápidas operam offline. Foi o atributo apontado como essencial por 57,9% dos respondentes da pesquisa, à frente até da síntese de voz.',
  },
  {
    icon: 'cadeado',
    title: 'Privacidade por desenho',
    text: 'Quadros da câmera, posição bruta da íris e coeficientes do modelo de calibração permanecem no dispositivo. Nenhuma imagem e nenhum vetor de calibração trafega pela rede.',
  },
]

/* ---------------- princípios de acessibilidade ---------------- */

export const A11Y_PRINCIPLES = [
  {
    n: '1',
    title: 'Retorno de fixação em três estágios',
    text: 'Contorno de destaque ao entrar no alvo, mudança de cor indicando seleção em progresso e barra de progresso até a confirmação. O usuário tem uma janela explícita para desistir.',
  },
  {
    n: '2',
    title: 'Posição fixa dos elementos de escape',
    text: 'O botão de retorno e a célula de emergência ocupam sempre o mesmo lugar, em todas as telas, sem exceção.',
  },
  {
    n: '3',
    title: 'Poucos alvos, grandes e bem espaçados',
    text: 'Reduz o erro de seleção causado por tremor ocular ou fadiga ao longo de horas de uso.',
  },
  {
    n: '4',
    title: 'Trilha de contexto permanente',
    text: 'Quem navega por fixação não dispõe da barra do sistema operacional como referência, então a etapa atual fica sempre visível.',
  },
]

/* ---------------- comparativo ---------------- */

export const COMPARISON = {
  columns: ['IrisFlow', 'Eye tracker dedicado', 'App por piscada'],
  rows: [
    { feature: 'Custo no primeiro ano', values: ['R$ 2.988 a R$ 7.788 em assinatura', 'R$ 15.000 a R$ 80.000', 'Assinatura mais baixa'] },
    { feature: 'Hardware proprietário', values: ['não', 'sim', 'não'] },
    { feature: 'Apontamento direto pelo olhar', values: ['sim', 'sim', 'não'] },
    { feature: 'Eventos por caractere', values: ['1', '1', '2'] },
    { feature: 'Teclado adaptado ao português', values: ['sim', 'não', 'não'] },
    { feature: 'Controle do sistema operacional', values: ['sim', 'sim', 'não'] },
    { feature: 'Painel do cuidador e emergência', values: ['sim', 'parcial', 'não'] },
    { feature: 'Funciona offline', values: ['sim', 'sim', 'parcial'] },
    { feature: 'Validação clínica publicada', values: ['não', 'sim', 'parcial'] },
  ],
  honesty:
    'A IrisFlow não é a solução mais barata do mercado brasileiro de tecnologia assistiva. A afirmação correta é mais restrita: entre as soluções que oferecem apontamento direto pelo olhar, é a mais barata do país. A IrisFlow também ainda não tem estudo clínico publicado, atributo em que perde para as soluções internacionais. Essa distância só se fecha com execução.',
}

/* ---------------- planos de assinatura ---------------- */

/**
 * Trial compartilhado por todos os planos. O banco (tabela `plans`) tem
 * `trial_days` por plano, mas hoje o site oferece o mesmo período para
 * as três faixas. Mantido como constante para o header, hero e o
 * componente de garantias exibirem o mesmo número.
 */
export const TRIAL_DAYS = 15

export type PlanId = 'essencial' | 'completo' | 'voz'

export type Plan = {
  id: PlanId
  name: string
  /** Valor em reais, sem centavos exibidos porque os três planos são inteiros. */
  price: number
  period: string
  /** Frase curta que aparece no card, abaixo do nome do plano. */
  tagline: string
  /** Quantos dispositivos podem estar ativos ao mesmo tempo. */
  devices: string
  /** Modalidade de suporte incluída no plano. */
  support: string
  /** Bullets que descrevem o que o plano inclui. */
  includes: string[]
  /** Marca o plano recomendado — usado como destaque no card. */
  recommended?: boolean
}

/**
 * Fonte da verdade dos planos no frontend. O id casa com o campo `id`
 * da tabela `public.plans` no Supabase, e é o que a página de cadastro
 * envia para o RPC `complete_registration` para que a `subscriptions`
 * fique com o plano certo. Alterar o preço aqui sem atualizar o banco
 * quebra a coerência entre o que o site mostra e o que a `my_account`
 * devolve.
 */
export const PLANS: Plan[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 249,
    period: 'por mês',
    tagline: 'A porta de entrada. Comunicação e controle do computador para um único usuário.',
    devices: '1 dispositivo ativo',
    support: 'Suporte por e-mail e tutoriais',
    includes: [
      'Comunicação por olhar, teclado em português e frases rápidas',
      'Controle do cursor do sistema operacional',
      'Painel do cuidador e acionamento de emergência',
      'Instaladores para Windows, macOS e Linux',
      'Calibração guiada e preparação automática do posto',
      'Funcionamento offline do núcleo de rastreamento',
    ],
  },
  {
    id: 'completo',
    name: 'Completo',
    price: 399,
    period: 'por mês',
    tagline: 'O plano recomendado. Inclui os módulos com inteligência artificial e lazer terapêutico.',
    devices: 'Até 3 dispositivos ativos',
    support: 'Suporte prioritário por mensagem',
    recommended: true,
    includes: [
      'Tudo do plano Essencial',
      'Assistente de conversação com inteligência artificial',
      'Módulo de lazer e bem-estar com jogos adaptados',
      'Relatórios de sessão e histórico de uso',
      'Sincronização de perfis entre dispositivos',
      'Atualizações contínuas enquanto a assinatura estiver ativa',
    ],
  },
  {
    id: 'voz',
    name: 'Voz',
    price: 649,
    period: 'por mês',
    tagline: 'A voz do próprio paciente, reconstruída a partir de gravações anteriores à perda da fala.',
    devices: 'Até 5 dispositivos ativos',
    support: 'Suporte dedicado com resposta em até 4 h úteis',
    includes: [
      'Tudo do plano Completo',
      'Clonagem da voz do próprio paciente',
      'Perfis múltiplos por assinatura',
      'Backup em nuvem dos perfis de calibração',
      'Prioridade no acesso a novos módulos',
      'Canal direto com a equipe técnica',
    ],
  },
]

/** Garantias comuns a todos os planos, exibidas ao lado da grade. */
export const PLAN_GUARANTEES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'relogio',
    title: 'Avaliação gratuita',
    text: 'Você testa antes de qualquer cobrança. Se o paciente não conseguir operar, não há pagamento.',
  },
  {
    icon: 'cadeado-aberto',
    title: 'Sem fidelidade',
    text: 'Cancele quando quiser, direto no painel, sem multa e sem ligação de retenção.',
  },
  {
    icon: 'notebook',
    title: 'Sem hardware',
    text: 'Roda na webcam do computador que a família já tem em casa.',
  },
]

/** Busca um plano pelo id, com fallback silencioso no recomendado. */
export function getPlan(id: string | null | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.recommended) ?? PLANS[0]
}

/** Plano exibido como padrão em CTAs onde o usuário ainda não escolheu. */
export const DEFAULT_PLAN: Plan = getPlan('completo')

/** Menor preço da grade — usado em copy do tipo "a partir de R$ X". */
export const CHEAPEST_PLAN: Plan = PLANS.reduce((a, b) => (a.price < b.price ? a : b))

/* ---------------- perguntas frequentes ---------------- */

export const FAQ = [
  {
    q: 'Preciso comprar algum equipamento?',
    a: 'Não. A IrisFlow foi construída sob a restrição de funcionar com uma webcam comum, e foi essa restrição autoimposta que definiu toda a arquitetura técnica. Se o computador da família tem câmera e roda Windows, macOS ou Linux, ele roda a IrisFlow.',
  },
  {
    q: 'Funciona com quem usa óculos?',
    a: 'Sim. A equipe esperava que as lentes fossem um fator de degradação, mas, depois da correção de um problema específico no processamento, a melhor sessão com lentes registrou o mesmo erro em pixels da melhor sessão sem lentes.',
  },
  {
    q: 'E se a cabeça do usuário escorregar durante a sessão?',
    a: 'O sistema mede os três ângulos da cabeça a cada quadro e aplica a correção geométrica na saída. Além disso, quando o desvio postural acumulado passa do equivalente a sessenta pixels, o cuidador recebe um aviso que distingue o desvio lento, que só exige reapoiar a nuca, do desvio errático, que indica necessidade de recalibrar.',
  },
  {
    q: 'A IrisFlow controla qualquer programa do computador?',
    a: 'Ela entrega controle pleno dentro das próprias telas e controle do cursor do sistema operacional em nível funcional: abrir um programa, navegar em uma página, clicar em botões de tamanho razoável. Interfaces de terceiros com alvos pequenos, menus densos ou arraste preciso ficam fora do alcance confortável do rastreamento por webcam, e preferimos declarar isso a prometer o que a física do sensor não permite.',
  },
  {
    q: 'As imagens da câmera são enviadas para algum servidor?',
    a: 'Não. Quadros da câmera, posição bruta da íris e coeficientes do modelo de calibração são processados e permanecem exclusivamente no dispositivo do usuário. Nenhuma imagem e nenhum vetor de calibração é transmitido pela rede.',
  },
  {
    q: 'Quanto tempo leva a calibração?',
    a: 'Entre dezenove e vinte e nove segundos, em uma grade de nove pontos com ordem embaralhada. A faixa é deliberada: acima de aproximadamente quarenta segundos, a fadiga ocular começa a degradar a qualidade dos próprios dados coletados.',
  },
  {
    q: 'Já existe validação clínica do produto?',
    a: 'Ainda não. O produto mínimo viável está construído e funcionando, com protocolo de medição reproduzível, mas os testes de precisão foram feitos com um único operador da equipe. O teste com pacientes do público-alvo é a próxima tarefa do roteiro técnico, seguido de um programa de validação de noventa dias com parceiros clínicos.',
  },
  {
    q: 'Como funciona o cancelamento?',
    a: 'Pelo painel da conta, a qualquer momento, sem multa. Não há equipamento adquirido que prenda o cliente. A retenção depende da utilidade percebida mês a mês.',
  },
]

/* ---------------- equipe e empresa ---------------- */

export const VALUES = [
  {
    title: 'Acessibilidade',
    text: 'A solução foi construída para rodar em webcam comum. Essa restrição, assumida no começo do projeto, definiu toda a arquitetura técnica.',
  },
  {
    title: 'Empatia',
    text: 'A posição fixa do botão de emergência e o retorno de fixação em três estágios existem porque o usuário precisa de tempo para desistir de uma seleção.',
  },
  {
    title: 'Inovação com propósito',
    text: 'A inteligência artificial entrou no produto para resolver um problema motor concreto, e é avaliada por esse resultado.',
  },
  {
    title: 'Autonomia e dignidade',
    text: 'O usuário é tratado como agente da própria comunicação. Toda a interface parte disso.',
  },
  {
    title: 'Transparência',
    text: 'Publicamos os resultados de precisão junto com as condições em que foram obtidos, inclusive quando desfavoráveis.',
  },
  {
    title: 'Colaboração',
    text: 'A relação com profissionais de saúde, associações e famílias se apoia em prescrição e validação, antes de qualquer venda.',
  },
]

export const ROADMAP = [
  {
    when: 'Concluído',
    title: 'Fluxo de rastreamento completo',
    text: 'Captura, detecção de 478 marcos faciais, calibração, predição e seleção por fixação em sessão real de uso.',
  },
  {
    when: 'Concluído',
    title: 'Sete módulos funcionais',
    text: 'Onboarding, comunicação, computador, lazer, cuidador, emergência e configurações, com instaladores para os três sistemas.',
  },
  {
    when: 'Concluído',
    title: 'Infraestrutura de medição',
    text: 'Gravação de sessões sem vídeo, reprodução determinista fora de linha e protocolo formal de acurácia com grade de validação separada.',
  },
  {
    when: 'Em realização',
    title: 'Assistente, voz e site de compra',
    text: 'Composição assistida de frases, clonagem da voz do próprio paciente e o ambiente web de contratação, que é este site.',
  },
  {
    when: 'Próxima tarefa',
    title: 'Teste com o público-alvo',
    text: 'Precisão e usabilidade com dois pacientes com restrição motora severa, comparados ao baseline atual.',
  },
  {
    when: 'Pendente',
    title: 'Programa de validação de 90 dias',
    text: 'Com parceiros clínicos, medição de acurácia em uso continuado e documentação de casos.',
  },
]

export const MARQUEE_ITEMS = [
  'webcam comum',
  'processamento local',
  'sem hardware proprietário',
  'teclado em português',
  'síntese de voz',
  'funciona offline',
  'painel do cuidador',
  'emergência sempre acessível',
  'código auditável',
]
