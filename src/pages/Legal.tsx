import { PageHead } from '@/components/layout/PageHead'
import { Reveal } from '@/components/effects/Reveal'
import { BRAND } from '@/data/content'

type Block = { h: string; p: string[] }

const PRIVACIDADE: Block[] = [
  {
    h: 'Processamento local por desenho',
    p: [
      'Os quadros captados pela webcam, a posicao bruta da iris e os coeficientes do modelo de calibracao sao processados e permanecem exclusivamente no dispositivo do usuario. Nenhuma imagem e nenhum vetor de calibracao e transmitido pela rede.',
      'Essa decisao retira o dado biometrico do trafego em vez de administra-lo por politica interna, o que reduz o risco na origem. Ela nao elimina, contudo, as obrigacoes da Lei Geral de Protecao de Dados, e a IrisFlow trata as demais bases de dados sob esse regime.',
    ],
  },
  {
    h: 'Quais dados a IrisFlow coleta',
    p: [
      'Dados de contratacao informados no cadastro: nome, e-mail, telefone e documento do responsavel, alem do primeiro nome e do perfil de uso da pessoa que vai operar a solucao.',
      'Dados de suporte que o proprio usuario enviar ao descrever um problema.',
      'Dados de sessao tecnica, quando o usuario autorizar expressamente o envio: vetores de caracteristicas e alvos, sem qualquer imagem, usados para reproduzir a sessao e avaliar mudancas de algoritmo.',
    ],
  },
  {
    h: 'O que a IrisFlow nao faz',
    p: [
      'Nao vende, aluga nem compartilha dados pessoais com terceiros para fins publicitarios.',
      'Nao armazena imagens de rosto, de olho ou de ambiente em servidor.',
      'Nao condiciona o funcionamento do nucleo de rastreamento, do teclado ou das frases rapidas a conexao com a internet.',
    ],
  },
  {
    h: 'Direitos do titular',
    p: [
      'O titular pode solicitar confirmacao de tratamento, acesso, correcao, anonimizacao, portabilidade e eliminacao dos dados, alem de revogar consentimento a qualquer momento, pelo e-mail de contato abaixo.',
      'O pedido de eliminacao de conta remove os dados de contratacao e encerra a assinatura sem multa.',
    ],
  },
  {
    h: 'Contato do encarregado',
    p: [
      `Pedidos relacionados a dados pessoais devem ser enviados para ${BRAND.email}, com resposta em ate quinze dias.`,
    ],
  },
]

const TERMOS: Block[] = [
  {
    h: 'Objeto',
    p: [
      'Estes termos regem o uso da plataforma de comunicacao assistiva por rastreamento ocular desenvolvida pela IrisFlow, licenciada por assinatura mensal e entregue como aplicacao instalavel para Windows, macOS e Linux.',
    ],
  },
  {
    h: 'Periodo de avaliacao e cobranca',
    p: [
      'Toda nova conta comeca com periodo de avaliacao gratuito, sem exigencia de cartao para iniciar. A primeira cobranca ocorre apenas ao fim desse periodo, caso o assinante nao cancele antes.',
      'A assinatura e mensal, sem fidelidade, sem taxa de adesao e sem multa por cancelamento. O cancelamento pode ser feito pelo painel da conta a qualquer momento e produz efeito ao fim do ciclo ja pago.',
    ],
  },
  {
    h: 'Limites declarados do produto',
    p: [
      'A IrisFlow entrega controle pleno dentro das proprias telas e controle do cursor do sistema operacional em nivel funcional. Interfaces de terceiros com alvos pequenos, menus densos ou elementos que exigem arraste preciso permanecem fora do alcance confortavel do rastreamento por webcam.',
      'Os indicadores de precisao divulgados foram obtidos com um unico operador, em equipamento domestico, com a cabeca em posicao estavel, e ainda nao foram replicados com pacientes do publico-alvo. O desempenho real varia com a camera, a iluminacao, a distancia e o quadro clinico.',
      'A IrisFlow e um recurso de comunicacao e de autonomia. Nao e dispositivo medico, nao substitui avaliacao clinica e nao deve ser o unico meio disponivel para pedido de socorro em situacao de risco a vida.',
    ],
  },
  {
    h: 'Responsabilidades do assinante',
    p: [
      'Manter o equipamento em condicoes minimas de funcionamento, incluindo webcam operante e iluminacao adequada.',
      'Nao redistribuir, sublicenciar ou realizar engenharia reversa dos componentes proprietarios da solucao.',
      'Informar dados verdadeiros no cadastro, especialmente o e-mail, que e o canal de acesso a conta.',
    ],
  },
  {
    h: 'Suporte e evolucao',
    p: [
      'Enquanto a assinatura estiver ativa, o assinante recebe atualizacoes continuas e suporte pelo canal de e-mail informado no site.',
      'Funcionalidades listadas como em realizacao neste site — assistente de conversacao e clonagem de voz — sao previsoes de roteiro e nao constituem obrigacao contratual de prazo.',
    ],
  },
  {
    h: 'Foro e alteracoes',
    p: [
      'Alteracoes destes termos serao comunicadas por e-mail com antecedencia minima de trinta dias, e o assinante que nao concordar pode cancelar sem custo.',
      'Fica eleito o foro do domicilio do consumidor para dirimir controversias, conforme o Codigo de Defesa do Consumidor.',
    ],
  },
]

function LegalPage({
  eyebrow,
  title,
  lead,
  blocks,
}: {
  eyebrow: string
  title: string
  lead: string
  blocks: Block[]
}) {
  return (
    <>
      <PageHead eyebrow={eyebrow} title={title} lead={lead} />
      <section className="section">
        <div className="container container--narrow">
          {blocks.map((b, i) => (
            <Reveal key={b.h} anim="up" delay={i * 70}>
              <div style={{ marginBottom: 'var(--sp-6)' }}>
                <h2 style={{ fontSize: '1.32rem', marginBottom: 'var(--sp-3)' }}>{b.h}</h2>
                {b.p.map((text) => (
                  <p key={text.slice(0, 30)}>{text}</p>
                ))}
              </div>
            </Reveal>
          ))}
          <Reveal anim="fade">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              Documento de referencia para o ambiente de demonstracao deste site. Antes de entrar
              em producao, deve passar por revisao juridica.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export function Privacidade() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Politica de privacidade"
      lead="A arquitetura da IrisFlow foi desenhada para que o dado biometrico nunca saia do computador do usuario. Esta politica descreve o que isso significa na pratica e o que ainda e tratado pela empresa."
      blocks={PRIVACIDADE}
    />
  )
}

export function Termos() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Termos de uso"
      lead="Condicoes da assinatura, limites declarados do produto e responsabilidades de cada parte."
      blocks={TERMOS}
    />
  )
}
