import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { Reveal } from '@/components/effects/Reveal'
import { Stepper } from '@/components/ui/Stepper'
import { Field, SelectField, CheckField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { useAccount, type Profile } from '@/context/AccountContext'
import { isCPF, isEmail, isPhone, maskCPF, maskPhone } from '@/utils/format'
import { fakeDelay } from '@/services/api'
import { PLAN } from '@/data/content'
import './checkout.css'

const STEPS = ['Quem paga', 'Quem usa', 'Confirmacao']

type Form = Profile & { terms: boolean }

const EMPTY: Form = {
  buyerName: '',
  email: '',
  phone: '',
  document: '',
  userName: '',
  relation: '',
  condition: '',
  os: '',
  prescriberName: '',
  prescriberRole: '',
  newsletter: true,
  terms: false,
}

type Errors = Partial<Record<keyof Form, string>>

export default function Cadastro() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [saving, setSaving] = useState(false)
  const { register } = useAccount()
  const navigate = useNavigate()

  const set =
    (key: keyof Form, mask?: (v: string) => string) =>
    (e: { target: { value: string } }) => {
      const value = mask ? mask(e.target.value) : e.target.value
      setForm((f) => ({ ...f, [key]: value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const toggle = (key: keyof Form) => (e: { target: { checked: boolean } }) => {
    setForm((f) => ({ ...f, [key]: e.target.checked }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateStep = (s: number) => {
    const next: Errors = {}

    if (s === 0) {
      if (form.buyerName.trim().split(' ').length < 2)
        next.buyerName = 'Informe nome e sobrenome.'
      if (!isEmail(form.email)) next.email = 'Informe um e-mail valido.'
      if (!isPhone(form.phone)) next.phone = 'Informe um telefone com DDD.'
      if (!isCPF(form.document)) next.document = 'CPF invalido — confira os digitos.'
    }

    if (s === 1) {
      if (form.userName.trim().length < 3) next.userName = 'Informe o nome de quem vai usar.'
      if (!form.relation) next.relation = 'Selecione a relacao com o usuario.'
      if (!form.condition) next.condition = 'Selecione a condicao principal.'
      if (!form.os) next.os = 'Selecione o sistema operacional do computador.'
    }

    if (s === 2) {
      if (!form.terms) next.terms = 'E preciso aceitar os termos para continuar.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const next = () => {
    if (!validateStep(step)) return
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => {
    setStep((s) => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateStep(2)) return
    setSaving(true)
    // Sem back-end: a conta e criada apenas no estado local.
    // Trocar por createAccount(profile) de src/services/api.ts.
    await fakeDelay(1000)
    const { terms: _terms, ...profile } = form
    void _terms
    register(profile)
    setSaving(false)
    navigate('/pagamento')
  }

  return (
    <div className="flow">
      <AmbientBackground particles={14} scan={false} light />

      <div className="container container--narrow flow__inner">
        <Reveal anim="fade">
          <span className="eyebrow">Avaliacao gratuita</span>
        </Reveal>

        <Reveal anim="up">
          <h1 className="flow__title">
            {PLAN.trialDays} dias para descobrir se a IrisFlow funciona para o seu caso.
          </h1>
        </Reveal>

        <Reveal anim="up" delay={120}>
          <p className="lead flow__lead">
            Nao pedimos cartao agora. A forma de pagamento so entra na etapa seguinte, e a primeira
            cobranca acontece depois dos {PLAN.trialDays} dias — se voces decidirem continuar.
          </p>
        </Reveal>

        <Reveal anim="up" delay={200}>
          <div className="flow__card panel">
            <Stepper steps={STEPS} current={step} />

            <form onSubmit={submit} noValidate>
              {step === 0 && (
                <fieldset className="flow__fieldset">
                  <legend className="flow__legend">
                    Dados de quem responde pela assinatura
                    <span>
                      Normalmente o familiar responsavel ou o cuidador principal — quem decide e
                      paga.
                    </span>
                  </legend>

                  <Field
                    label="Nome completo"
                    value={form.buyerName}
                    onChange={set('buyerName')}
                    error={errors.buyerName}
                    autoComplete="name"
                    placeholder="Maria Aparecida Souza"
                  />

                  <div className="flow__row">
                    <Field
                      label="E-mail"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      error={errors.email}
                      autoComplete="email"
                      placeholder="voce@exemplo.com.br"
                      hint="Usado para acessar a conta e receber o link de download."
                    />
                    <Field
                      label="Telefone"
                      type="tel"
                      value={form.phone}
                      onChange={set('phone', maskPhone)}
                      error={errors.phone}
                      autoComplete="tel"
                      placeholder="(11) 90000-0000"
                      inputMode="numeric"
                    />
                  </div>

                  <Field
                    label="CPF"
                    value={form.document}
                    onChange={set('document', maskCPF)}
                    error={errors.document}
                    placeholder="000.000.000-00"
                    inputMode="numeric"
                    hint="Necessario para emissao da nota fiscal da assinatura."
                  />
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className="flow__fieldset">
                  <legend className="flow__legend">
                    Dados de quem vai usar a IrisFlow
                    <span>
                      Quem opera a solucao e a beneficiaria direta. Esses dados ajustam o perfil
                      inicial de calibracao e de sensibilidade.
                    </span>
                  </legend>

                  <Field
                    label="Nome da pessoa que vai usar"
                    value={form.userName}
                    onChange={set('userName')}
                    error={errors.userName}
                    placeholder="Como ela gosta de ser chamada"
                  />

                  <div className="flow__row">
                    <SelectField
                      label="Sua relacao com ela"
                      value={form.relation}
                      onChange={set('relation')}
                      error={errors.relation}
                    >
                      <option value="">Selecione…</option>
                      <option value="conjuge">Conjuge</option>
                      <option value="filho">Filho ou filha</option>
                      <option value="pai-mae">Pai ou mae</option>
                      <option value="irmao">Irmao ou irma</option>
                      <option value="cuidador">Cuidador contratado</option>
                      <option value="proprio">Sou eu quem vai usar</option>
                      <option value="outro">Outro</option>
                    </SelectField>

                    <SelectField
                      label="Condicao principal"
                      value={form.condition}
                      onChange={set('condition')}
                      error={errors.condition}
                    >
                      <option value="">Selecione…</option>
                      <option value="ela">Esclerose lateral amiotrofica (ELA)</option>
                      <option value="tetraplegia">Tetraplegia alta</option>
                      <option value="pc">Paralisia cerebral severa</option>
                      <option value="avc">Sequela grave de AVC</option>
                      <option value="distrofia">Distrofia muscular avancada</option>
                      <option value="outra">Outra</option>
                      <option value="prefiro-nao">Prefiro nao informar</option>
                    </SelectField>
                  </div>

                  <SelectField
                    label="Sistema do computador onde a IrisFlow sera instalado"
                    value={form.os}
                    onChange={set('os')}
                    error={errors.os}
                    hint="Uma webcam comum ja e suficiente — nao e preciso comprar camera."
                  >
                    <option value="">Selecione…</option>
                    <option value="windows">Windows</option>
                    <option value="macos">macOS</option>
                    <option value="linux">Linux</option>
                    <option value="nao-sei">Nao sei dizer</option>
                  </SelectField>

                  <div className="flow__optional">
                    <p className="flow__optional-title">
                      Profissional que acompanha o caso <span>opcional</span>
                    </p>
                    <div className="flow__row">
                      <Field
                        label="Nome do profissional"
                        value={form.prescriberName ?? ''}
                        onChange={set('prescriberName')}
                        placeholder="Terapeuta ocupacional, fono, neuro…"
                      />
                      <Field
                        label="Especialidade"
                        value={form.prescriberRole ?? ''}
                        onChange={set('prescriberRole')}
                        placeholder="Fonoaudiologia, por exemplo"
                      />
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="flow__fieldset">
                  <legend className="flow__legend">
                    Confira antes de comecar
                    <span>Nada e cobrado nesta etapa.</span>
                  </legend>

                  <dl className="summary">
                    <div>
                      <dt>Responsavel</dt>
                      <dd>{form.buyerName}</dd>
                    </div>
                    <div>
                      <dt>E-mail</dt>
                      <dd>{form.email}</dd>
                    </div>
                    <div>
                      <dt>Telefone</dt>
                      <dd>{form.phone}</dd>
                    </div>
                    <div>
                      <dt>Quem vai usar</dt>
                      <dd>{form.userName}</dd>
                    </div>
                    <div>
                      <dt>Sistema</dt>
                      <dd style={{ textTransform: 'capitalize' }}>{form.os}</dd>
                    </div>
                    <div>
                      <dt>Plano</dt>
                      <dd>
                        {PLAN.name} — {PLAN.trialDays} dias gratis, depois R$ {PLAN.price} por mes
                      </dd>
                    </div>
                  </dl>

                  <CheckField
                    label={
                      <>
                        Li e aceito os{' '}
                        <Link to="/termos" style={{ color: 'var(--ok)', fontWeight: 600 }}>
                          termos de uso
                        </Link>{' '}
                        e a{' '}
                        <Link to="/privacidade" style={{ color: 'var(--ok)', fontWeight: 600 }}>
                          politica de privacidade
                        </Link>
                        .
                      </>
                    }
                    checked={form.terms}
                    onChange={toggle('terms')}
                    error={errors.terms}
                  />

                  <CheckField
                    label="Quero receber novidades sobre o desenvolvimento do produto e do programa de validacao clinica."
                    checked={form.newsletter}
                    onChange={toggle('newsletter')}
                  />
                </fieldset>
              )}

              <div className="flow__actions">
                {step > 0 ? (
                  <Button type="button" variant="ghost" onClick={back}>
                    ← Voltar
                  </Button>
                ) : (
                  <Button to="/planos" variant="ghost">
                    ← Ver o plano
                  </Button>
                )}

                {step < STEPS.length - 1 ? (
                  <Button type="button" onClick={next}>
                    Continuar
                  </Button>
                ) : (
                  <Button type="submit" loading={saving}>
                    {saving ? 'Criando conta…' : 'Criar conta e comecar'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Reveal>

        <Reveal anim="fade" delay={320}>
          <p className="flow__foot">
            Ja tem conta?{' '}
            <Link to="/entrar" className="underline-grow" style={{ color: 'var(--ok)' }}>
              Entrar
            </Link>
          </p>
        </Reveal>
      </div>
    </div>
  )
}
