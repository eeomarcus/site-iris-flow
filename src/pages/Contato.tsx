import { useState, type FormEvent } from 'react'
import { PageHead } from '@/components/layout/PageHead'
import { Reveal } from '@/components/effects/Reveal'
import { Field, SelectField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { Card, CardIcon } from '@/components/ui/Card'
import { isEmail } from '@/utils/format'
import { fakeDelay } from '@/services/api'
import { BRAND } from '@/data/content'

type Form = { name: string; email: string; role: string; message: string }
type Errors = Partial<Record<keyof Form, string>>

export default function Contato() {
  const [form, setForm] = useState<Form>({ name: '', email: '', role: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (key: keyof Form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next: Errors = {}
    if (form.name.trim().length < 3) next.name = 'Informe seu nome completo.'
    if (!isEmail(form.email)) next.email = 'Informe um e-mail valido.'
    if (!form.role) next.role = 'Escolha a opcao que melhor descreve voce.'
    if (form.message.trim().length < 15) next.message = 'Conte um pouco mais — pelo menos 15 caracteres.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    // Sem back-end: apenas simulamos a latencia do envio.
    // Trocar por sendContactMessage(form) de src/services/api.ts.
    await fakeDelay(1100)
    setSending(false)
    setSent(true)
  }

  return (
    <>
      <PageHead
        eyebrow="Contato"
        title="Fale com quem construiu a IrisFlow."
        highlight={['construiu']}
        lead="A equipe e pequena e responde direto, sem intermediario. Familias, profissionais de saude, clinicas e associacoes tem canal aberto."
      />

      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
              gap: 'var(--sp-7)',
              alignItems: 'start',
            }}
          >
            <Reveal anim="right">
              <div className="panel" style={{ padding: 'var(--sp-6)' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: 'var(--sp-5) 0' }}>
                    <span
                      style={{
                        display: 'grid',
                        placeItems: 'center',
                        width: 68,
                        height: 68,
                        borderRadius: '50%',
                        margin: '0 auto var(--sp-4)',
                        background: 'var(--ok-soft)',
                        color: 'var(--ok)',
                        animation: 'pop-check 480ms var(--ease-spring) both',
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="30" height="30">
                        <path
                          d="M4 12.5 9.5 18 20 6.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <h2 style={{ fontSize: '1.5rem' }}>Mensagem registrada</h2>
                    <p style={{ maxWidth: '46ch', marginInline: 'auto' }}>
                      Este projeto ainda nao tem back-end conectado, entao a mensagem ficou apenas
                      nesta tela. Com a integracao ativa, ela chegaria em {BRAND.email}.
                    </p>
                    <Button variant="secondary" onClick={() => setSent(false)}>
                      Escrever outra
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--sp-5)' }}>
                      Envie uma mensagem
                    </h2>

                    <Field
                      label="Nome completo"
                      value={form.name}
                      onChange={set('name')}
                      error={errors.name}
                      autoComplete="name"
                      placeholder="Como devemos chamar voce"
                    />

                    <Field
                      label="E-mail"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      error={errors.email}
                      autoComplete="email"
                      placeholder="voce@exemplo.com.br"
                    />

                    <SelectField
                      label="Voce e"
                      value={form.role}
                      onChange={set('role')}
                      error={errors.role}
                    >
                      <option value="">Selecione…</option>
                      <option value="familiar">Familiar ou cuidador</option>
                      <option value="usuario">Pessoa que vai usar a IrisFlow</option>
                      <option value="profissional">Profissional de saude</option>
                      <option value="clinica">Clinica ou associacao</option>
                      <option value="imprensa">Imprensa</option>
                      <option value="outro">Outro</option>
                    </SelectField>

                    <div className="field">
                      <label className="field__label" htmlFor="msg">
                        Mensagem
                      </label>
                      <textarea
                        id="msg"
                        className="field__input"
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Conte o contexto: quem vai usar, qual a condicao, o que voces ja tentaram."
                        style={{ resize: 'vertical', fontFamily: 'inherit' }}
                      />
                      {errors.message && (
                        <p className="field__error" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" full size="lg" loading={sending}>
                      {sending ? 'Enviando…' : 'Enviar mensagem'}
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>

            <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
              <Reveal anim="left" delay={120}>
                <Card as="div">
                  <CardIcon tone="teal">◈</CardIcon>
                  <h3 id="validacao">Programa de validacao</h3>
                  <p>
                    Clinicas de reabilitacao neurologica, associacoes de pacientes e profissionais
                    prescritores recebem acesso gratuito durante todo o periodo de validacao,
                    treinamento da equipe, canal direto com os fundadores e influencia real sobre
                    as prioridades do produto.
                  </p>
                  <p>
                    Em contrapartida, pedimos acesso a pacientes reais mediante consentimento,
                    observacao clinica qualificada, retorno estruturado e autorizacao para
                    documentar o caso de forma anonimizada.
                  </p>
                </Card>
              </Reveal>

              <Reveal anim="left" delay={220}>
                <Card as="div">
                  <CardIcon>✉</CardIcon>
                  <h3>Canais diretos</h3>
                  <p>
                    E-mail:{' '}
                    <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--ok)' }}>
                      {BRAND.email}
                    </a>
                  </p>
                  <p>
                    Redes:{' '}
                    <a href={BRAND.instagram} target="_blank" rel="noreferrer noopener" style={{ color: 'var(--ok)' }}>
                      Instagram
                    </a>{' '}
                    ·{' '}
                    <a href={BRAND.linkedin} target="_blank" rel="noreferrer noopener" style={{ color: 'var(--ok)' }}>
                      LinkedIn
                    </a>
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
