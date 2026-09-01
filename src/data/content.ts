/* ============================================================
   Conteudo do site, extraido do Plano de Negocios IrisFlow 2026.
   Centralizado aqui para que texto e numeros possam ser revisados
   sem tocar em componente. Todos os dados sao verificaveis no plano.
   ============================================================ */

export const BRAND = {
  company: 'IrisFlow',
  solution: 'a solucao da IrisFlow',
  tagline: 'Seu olhar tem voz.',
  claim: 'Comunicacao e controle do computador pelo olhar, com a webcam que voce ja tem.',
  email: 'irisflowteam@gmail.com',
  instagram: 'https://instagram.com/irisflow',
  linkedin: 'https://linkedin.com/company/irisflow',
  repo: 'https://github.com/ZambePy/Blink',
}

/** Frases que a maquina de escrever compoe no hero. */
export const HERO_PHRASES = [
  'Estou com sede.',
  'Quero falar com a minha filha.',
  'Pode aumentar o volume?',
  'Hoje eu estou bem.',
  'Chama a enfermeira, por favor.',
]

/* ---------------- o problema ---------------- */

export const PROBLEM = {
  title: 'A tecnologia existe ha vinte anos. O preco e que nao deixa ela chegar.',
  lead: 'Pessoas com ELA, tetraplegia alta, paralisia cerebral severa, sequela grave de AVC ou distrofia muscular avancada perdem a fala e o movimento, mas seguem conscientes, lucidas e com o controle dos olhos preservado.',
  stats: [
    {
      value: 60.5,
      decimals: 1,
      suffix: '%',
      label: 'apontam o preco como a principal limitacao das solucoes existentes',
    },
    {
      value: 23.7,
      decimals: 1,
      suffix: '%',
      label: 'declararam nao ter acesso a nenhuma solucao adequada',
    },
    {
      value: 84.2,
      decimals: 1,
      suffix: '%',
      label: 'somados, enfrentam uma barreira economica, e nao tecnologica',
    },
  ],
  note: 'Amostra nao probabilistica, por conveniencia, de 38 respondentes, majoritariamente profissionais de saude, coletada por formulario eletronico. E evidencia de percepcao qualificada, e nao estimativa estatistica da populacao brasileira.',
  contrast: {
    them: {
      label: 'Sistema de rastreamento ocular dedicado',
      price: 'R$ 15.000 a R$ 80.000',
      detail: 'Hardware proprietario, licenca de software a parte, revenda fisica.',
    },
    us: {
      label: 'A solucao da IrisFlow',
      price: 'R$ 250 por mes',
      detail: 'Sem equipamento, sem fidelidade, com periodo de avaliacao gratuito antes da primeira cobranca.',
    },
  },
}

/* ---------------- modulos da solucao (Quadro 7 do plano) ---------------- */

export type ModuleState = 'Implementado' | 'Em realizacao'

export const MODULES: {
  icon: string
  name: string
  description: string
  state: ModuleState
}[] = [
  {
    icon: '◎',
    name: 'Onboarding e calibracao',
    description:
      'Tela inicial, selecao de perfil, acesso protegido do cuidador, calibracao guiada de nove pontos e verificacao rapida antes de cada sessao.',
    state: 'Implementado',
  },
  {
    icon: '⌨',
    name: 'Comunicacao',
    description:
      'Teclado virtual ordenado pela frequencia das letras do portugues, campo de texto com sintese de voz, frases rapidas e pictogramas.',
    state: 'Implementado',
  },
  {
    icon: '🖥',
    name: 'Computador',
    description:
      'Mouse virtual que assume o cursor do sistema operacional, permitindo abrir programas, navegar e clicar em alvos de tamanho razoavel.',
    state: 'Implementado',
  },
  {
    icon: '◆',
    name: 'Lazer e bem-estar',
    description:
      'Jogos adaptados ao olhar — Estoura Bolhas, Jogo da Memoria, Desenho e Siga o Alvo — alem de galeria de imagens e conteudo de estimulacao.',
    state: 'Implementado',
  },
  {
    icon: '♡',
    name: 'Cuidador',
    description:
      'Painel com status da sessao, tela de confirmacao rapida de estado e historico de solicitacoes de ajuda.',
    state: 'Implementado',
  },
  {
    icon: '!',
    name: 'Emergencia',
    description:
      'Celula de pedido de ajuda em posicao fixa em todas as telas, com escalonamento automatico para contato externo caso nao haja resposta.',
    state: 'Implementado',
  },
  {
    icon: '⚙',
    name: 'Configuracoes',
    description:
      'Ajuste de tempo de fixacao, sensibilidade, predefinicao do filtro de suavizacao, layout de teclado, voz e idioma.',
    state: 'Implementado',
  },
  {
    icon: '✦',
    name: 'Assistente de conversacao',
    description:
      'Composicao assistida de frases por inteligencia artificial, reduzindo o custo motor de escrever letra a letra.',
    state: 'Em realizacao',
  },
  {
    icon: '🎙',
    name: 'Clonagem de voz',
    description:
      'Reproducao das frases do usuario com a sua propria voz, gerada a partir de amostras de audio anteriores a perda da fala.',
    state: 'Em realizacao',
  },
]

/* ---------------- como funciona: os seis estagios do pipeline ---------------- */

export const PIPELINE = [
  {
    step: '01',
    title: 'Captura',
    text: 'A webcam comum entrega video continuo a 1280 por 720 pixels, com taxa-alvo de trinta quadros por segundo. Nenhum equipamento adicional.',
  },
  {
    step: '02',
    title: 'Deteccao facial',
    text: 'O MediaPipe, executado localmente em WebAssembly, extrai 478 marcos faciais tridimensionais por quadro, incluindo o contorno da iris de ambos os olhos.',
  },
  {
    step: '03',
    title: 'Engenharia de caracteristicas',
    text: 'Um vetor compacto de cerca de 37 dimensoes por olho reune deslocamento da iris, abertura palpebral, angulos da cabeca e termos de interacao entre pose e deslocamento.',
  },
  {
    step: '04',
    title: 'Calibracao e regressao',
    text: 'A partir da calibracao de nove pontos, o sistema treina em tempo real um modelo de regressao Ridge individual — ele aprende o olho daquela pessoa, naquele computador, naquela posicao.',
  },
  {
    step: '05',
    title: 'Filtragem',
    text: 'Um filtro One Euro bidimensional com tres predefinicoes — estavel, balanceada e responsiva — arbitra o compromisso entre ruido e latencia conforme o perfil motor do usuario.',
  },
  {
    step: '06',
    title: 'Interacao',
    text: 'O cursor de fixacao entra na interface, com deteccao de alvo, temporizador configuravel e periodo refratario que evita reativacao acidental.',
  },
]

/* ---------------- indicadores tecnicos ---------------- */

export const METRICS = [
  { value: 0.9, decimals: 1, suffix: '°', label: 'erro angular na melhor sessao registrada' },
  { value: 57, suffix: ' px', label: 'erro medio em pixels na mesma sessao' },
  { value: 478, label: 'marcos faciais extraidos por quadro de video' },
  { value: 333, label: 'testes automatizados verdes no repositorio' },
]

export const METRICS_CAVEAT =
  'Numeros medidos com um unico operador, membro da propria equipe, em um unico equipamento domestico, com a cabeca em posicao estavel. Ainda nao houve teste com pacientes do publico-alvo — essa e a proxima tarefa do roteiro tecnico. Publicamos as condicoes junto com o resultado, inclusive quando desfavoravel.'

/* ---------------- diferenciais ---------------- */

export const DIFFERENTIATORS = [
  {
    icon: '◈',
    title: 'Modelo treinado para cada olho',
    text: 'Regressao Ridge com penalidade anisotropica derivada da covariancia das amostras, regularizacao escolhida por validacao cruzada deixando um alvo inteiro de fora e deteccao de pontos de calibracao contaminados. E o ativo tecnico proprietario da empresa.',
  },
  {
    icon: '◇',
    title: 'Compensacao geometrica de pose',
    text: 'A correcao da inclinacao da cabeca e aplicada na saida, sem coeficiente ajustavel, correta por construcao mesmo fora da faixa vista na calibracao. Colocar a pose como caracteristica de entrada piorava o erro em 8,6% — foi medido e descartado.',
  },
  {
    icon: '◉',
    title: 'Preparacao automatica do posto de uso',
    text: 'Antes de calibrar, o sistema mede distancia, enquadramento, postura, iluminacao, contraste, reflexo em lentes e cintilacao da rede, e ajusta a camera em malha fechada. Quando o driver nao permite, informa a providencia fisica em vez de fingir que ajustou.',
  },
  {
    icon: '⌨',
    title: 'Teclado ordenado pelo portugues',
    text: 'As teclas seguem a frequencia das letras do idioma — A, E, O, S, R, I, N, D, M, U, T, C, L — e nao a ordem QWERTY, o que encurta a distancia media que o olho percorre entre teclas consecutivas. Layout alfabetico e QWERTY seguem disponiveis.',
  },
  {
    icon: '⬒',
    title: 'Funciona sem internet',
    text: 'Nucleo de rastreamento, teclado e frases rapidas operam offline. Atributo apontado como essencial por 57,9% dos respondentes da pesquisa, a frente ate da sintese de voz.',
  },
  {
    icon: '🔒',
    title: 'Privacidade por desenho',
    text: 'Quadros da camera, posicao bruta da iris e coeficientes do modelo de calibracao permanecem no dispositivo. Nenhuma imagem e nenhum vetor de calibracao trafega pela rede.',
  },
]

/* ---------------- principios de acessibilidade ---------------- */

export const A11Y_PRINCIPLES = [
  {
    n: '1',
    title: 'Retorno de fixacao em tres estagios',
    text: 'Contorno de destaque ao entrar no alvo, mudanca de cor indicando selecao em progresso e barra de progresso ate a confirmacao. O usuario tem uma janela explicita para desistir.',
  },
  {
    n: '2',
    title: 'Posicao fixa dos elementos de escape',
    text: 'O botao de retorno e a celula de emergencia ocupam sempre o mesmo lugar, em todas as telas, sem excecao.',
  },
  {
    n: '3',
    title: 'Poucos alvos, grandes e bem espacados',
    text: 'Reduz o erro de selecao causado por tremor ocular ou fadiga ao longo de horas de uso.',
  },
  {
    n: '4',
    title: 'Trilha de contexto permanente',
    text: 'Quem navega por fixacao nao dispoe da barra do sistema operacional como referencia, entao a etapa atual fica sempre visivel.',
  },
]

/* ---------------- comparativo ---------------- */

export const COMPARISON = {
  columns: ['IrisFlow', 'Eye tracker dedicado', 'App por piscada'],
  rows: [
    { feature: 'Custo no primeiro ano', values: ['R$ 3.000 em assinatura', 'R$ 15.000 a R$ 80.000', 'Assinatura mais baixa'] },
    { feature: 'Hardware proprietario', values: ['nao', 'sim', 'nao'] },
    { feature: 'Apontamento direto pelo olhar', values: ['sim', 'sim', 'nao'] },
    { feature: 'Eventos por caractere', values: ['1', '1', '2'] },
    { feature: 'Teclado adaptado ao portugues', values: ['sim', 'nao', 'nao'] },
    { feature: 'Controle do sistema operacional', values: ['sim', 'sim', 'nao'] },
    { feature: 'Painel do cuidador e emergencia', values: ['sim', 'parcial', 'nao'] },
    { feature: 'Funciona offline', values: ['sim', 'sim', 'parcial'] },
    { feature: 'Validacao clinica publicada', values: ['nao', 'sim', 'parcial'] },
  ],
  honesty:
    'A IrisFlow nao e a solucao mais barata do mercado brasileiro de tecnologia assistiva. A afirmacao correta e mais restrita: entre as solucoes que oferecem apontamento direto pelo olhar, e a mais barata do pais. E a IrisFlow ainda nao tem estudo clinico publicado, atributo em que perde para as solucoes internacionais — distancia que so se fecha com execucao.',
}

/* ---------------- plano de assinatura ---------------- */

export const PLAN = {
  name: 'Assinatura IrisFlow',
  price: 250,
  period: 'por mes',
  trialDays: 15,
  summary:
    'Uma unica assinatura, com todos os modulos incluidos. Sem fidelidade, sem taxa de adesao e sem compra de equipamento.',
  includes: [
    'Todos os modulos: comunicacao, computador, lazer, cuidador e emergencia',
    'Instaladores para Windows, macOS e Linux',
    'Calibracao guiada e preparacao automatica do posto de uso',
    'Teclado ocular otimizado para o portugues e banco de frases',
    'Sintese de voz em portugues brasileiro',
    'Funcionamento offline do nucleo de rastreamento',
    'Atualizacoes continuas enquanto a assinatura estiver ativa',
    'Suporte por e-mail e canal direto com a equipe',
  ],
  guarantees: [
    { icon: '◷', title: 'Avaliacao gratuita', text: 'Voce testa antes de qualquer cobranca. Se o paciente nao conseguir operar, nao ha pagamento.' },
    { icon: '⤫', title: 'Sem fidelidade', text: 'Cancele quando quiser, direto no painel, sem multa e sem ligacao de retencao.' },
    { icon: '⬒', title: 'Sem hardware', text: 'Roda na webcam do computador que a familia ja tem em casa.' },
  ],
}

/* ---------------- perguntas frequentes ---------------- */

export const FAQ = [
  {
    q: 'Preciso comprar algum equipamento?',
    a: 'Nao. A IrisFlow foi construida sob a restricao de funcionar com uma webcam comum, e foi essa restricao autoimposta que definiu toda a arquitetura tecnica. Se o computador da familia tem camera e roda Windows, macOS ou Linux, ele roda a IrisFlow.',
  },
  {
    q: 'Funciona com quem usa oculos?',
    a: 'Sim. A equipe esperava que as lentes fossem um fator de degradacao, mas apos a correcao de um problema especifico no processamento, a melhor sessao com lentes registrou o mesmo erro em pixels da melhor sessao sem lentes.',
  },
  {
    q: 'E se a cabeca do usuario escorregar durante a sessao?',
    a: 'O sistema mede os tres angulos da cabeca a cada quadro e aplica a correcao geometrica na saida. Alem disso, quando o desvio postural acumulado passa do equivalente a sessenta pixels, o cuidador recebe um aviso que distingue o desvio lento, que so exige reapoiar a nuca, do desvio erratico, que indica necessidade de recalibrar.',
  },
  {
    q: 'A IrisFlow controla qualquer programa do computador?',
    a: 'Ele entrega controle pleno dentro das proprias telas e controle do cursor do sistema operacional em nivel funcional — abrir um programa, navegar em uma pagina, clicar em botoes de tamanho razoavel. Interfaces de terceiros com alvos pequenos, menus densos ou arraste preciso ficam fora do alcance confortavel do rastreamento por webcam, e preferimos declarar isso a prometer o que a fisica do sensor nao permite.',
  },
  {
    q: 'As imagens da camera sao enviadas para algum servidor?',
    a: 'Nao. Quadros da camera, posicao bruta da iris e coeficientes do modelo de calibracao sao processados e permanecem exclusivamente no dispositivo do usuario. Nenhuma imagem e nenhum vetor de calibracao e transmitido pela rede.',
  },
  {
    q: 'Quanto tempo leva a calibracao?',
    a: 'Entre dezenove e vinte e nove segundos, em uma grade de nove pontos com ordem embaralhada. A faixa e deliberada: acima de aproximadamente quarenta segundos, a fadiga ocular comeca a degradar a qualidade dos proprios dados coletados.',
  },
  {
    q: 'Ja existe validacao clinica do produto?',
    a: 'Ainda nao. O produto minimo viavel esta construido e funcionando, com protocolo de medicao reproduzivel, mas os testes de precisao foram feitos com um unico operador da equipe. O teste com pacientes do publico-alvo e a proxima tarefa do roteiro tecnico, seguido de um programa de validacao de noventa dias com parceiros clinicos.',
  },
  {
    q: 'Como funciona o cancelamento?',
    a: 'Pelo painel da conta, a qualquer momento, sem multa. Nao ha equipamento adquirido que prenda o cliente. A retencao depende de utilidade percebida mes a mes, e nao de aprisionamento contratual.',
  },
]

/* ---------------- equipe e empresa ---------------- */

export const VALUES = [
  { title: 'Acessibilidade', text: 'A solucao foi construida para rodar em webcam comum, e nao em hardware dedicado. Essa restricao autoimposta definiu toda a arquitetura tecnica.' },
  { title: 'Empatia', text: 'A posicao fixa do botao de emergencia e o retorno de fixacao em tres estagios existem porque o usuario precisa de tempo para desistir de uma selecao.' },
  { title: 'Inovacao com proposito', text: 'A inteligencia artificial empregada resolve um problema humano concreto e nao e adorno de posicionamento.' },
  { title: 'Autonomia e dignidade', text: 'O usuario e representado como agente da propria comunicacao, e nao como objeto de cuidado.' },
  { title: 'Transparencia', text: 'Publicamos os resultados de precisao junto com as condicoes em que foram obtidos, inclusive quando desfavoraveis.' },
  { title: 'Colaboracao', text: 'A relacao com profissionais de saude, associacoes e familias e de prescricao e validacao, e nao de compra.' },
]

export const ROADMAP = [
  { when: 'Concluido', title: 'Fluxo de rastreamento completo', text: 'Captura, deteccao de 478 marcos faciais, calibracao, predicao e selecao por fixacao em sessao real de uso.' },
  { when: 'Concluido', title: 'Sete modulos funcionais', text: 'Onboarding, comunicacao, computador, lazer, cuidador, emergencia e configuracoes, com instaladores para os tres sistemas.' },
  { when: 'Concluido', title: 'Infraestrutura de medicao', text: 'Gravacao de sessoes sem video, reproducao determinista fora de linha e protocolo formal de acuracia com grade de validacao separada.' },
  { when: 'Em realizacao', title: 'Assistente, voz e site de compra', text: 'Composicao assistida de frases, clonagem da voz do proprio paciente e o ambiente web de contratacao — este site.' },
  { when: 'Proxima tarefa', title: 'Teste com o publico-alvo', text: 'Precisao e usabilidade com dois pacientes com restricao motora severa, comparados ao baseline atual.' },
  { when: 'Pendente', title: 'Programa de validacao de 90 dias', text: 'Com parceiros clinicos, medicao de acuracia em uso continuado e documentacao de casos.' },
]

export const MARQUEE_ITEMS = [
  'webcam comum',
  'processamento local',
  'sem hardware proprietario',
  'teclado em portugues',
  'sintese de voz',
  'funciona offline',
  'painel do cuidador',
  'emergencia sempre acessivel',
  'codigo auditavel',
]
