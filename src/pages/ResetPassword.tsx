import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, AuthLogoMark } from '../components/Icons'
import BrandPanel from '../auth/BrandPanel'
import Field from '../auth/Field'
import OtpInput from '../auth/OtpInput'
import Toast from '../auth/Toast'
import type { ToastTone } from '../auth/Toast'
import { SubmitButton } from '../auth/AuthExtras'

type Step = 'request' | 'verify'

const CODE_LENGTH = 6
/** Cooldown before "Resend code" unlocks, as in the design. */
const RESEND_SECONDS = 89
const TOAST_MS = 4500

const emptyCode = () => Array<string>(CODE_LENGTH).fill('')

const mmss = (total: number) =>
  `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`

interface ResetPasswordProps {
  /** Mirrors the design's `startStep` / `sendFails` props. */
  startStep?: Step
  sendFails?: boolean
}

export default function ResetPassword({
  startStep = 'request',
  sendFails = false,
}: ResetPasswordProps) {
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>(startStep)
  const [email, setEmail] = useState('maya@kiranahome.co')
  const [code, setCode] = useState<string[]>(emptyCode)
  const [error, setError] = useState(false)
  const [toast, setToast] = useState<ToastTone | null>(
    startStep === 'verify' ? 'success' : null,
  )
  // 0 means the cooldown has run out; the design counts down from 89.
  const [seconds, setSeconds] = useState(startStep === 'verify' ? RESEND_SECONDS : 0)

  // One timeout per tick rather than a long-lived interval, so the countdown
  // cleans itself up on unmount and restarts simply by re-seeding `seconds`.
  useEffect(() => {
    if (seconds <= 0) return
    const id = window.setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => window.clearTimeout(id)
  }, [seconds])

  // Only the success toast self-dismisses; the error one waits for the user.
  useEffect(() => {
    if (toast !== 'success') return
    const id = window.setTimeout(() => setToast(null), TOAST_MS)
    return () => window.clearTimeout(id)
  }, [toast])

  const deliverCode = () => {
    setStep('verify')
    setError(false)
    setToast('success')
    setSeconds(RESEND_SECONDS)
  }

  const sendCode = () => {
    if (sendFails) {
      setToast('error')
      return
    }
    deliverCode()
  }

  const onRequest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendCode()
  }

  const onVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(code.join('').length !== CODE_LENGTH)
  }

  const onResend = () => {
    if (seconds > 0) return
    sendCode()
  }

  const goBack = () => {
    if (step === 'verify') {
      setStep('request')
      setCode(emptyCode())
      setToast(null)
      setError(false)
      setSeconds(0)
      return
    }
    void navigate('/signin')
  }

  const isVerify = step === 'verify'
  const locked = seconds > 0

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[1.4fr_1fr]">
      <BrandPanel />

      <section className="relative flex items-center justify-center bg-page px-9 py-12">
        {toast === 'success' && (
          <Toast tone="success" title="Verification code sent" onDismiss={() => setToast(null)} />
        )}

        {toast === 'error' && (
          <Toast
            tone="error"
            title="Couldn't send the code"
            description="Something went wrong on our end. Check the address and try again."
            // The design's retry always succeeds, so the demo can show recovery.
            action={{ label: 'Try again', onClick: deliverCode }}
            onDismiss={() => setToast(null)}
          />
        )}

        <div className="w-full max-w-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/"
              aria-label="Omnify home"
              className="grid size-14 place-items-center rounded-[17px] bg-brand text-[28px] text-white shadow-brand-lg"
            >
              <AuthLogoMark />
            </Link>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em]">
              {isVerify ? 'Enter the code' : 'Forgot password?'}
            </h2>
            <p className="text-center text-[14.5px] leading-[1.55] font-medium text-pretty text-muted">
              {isVerify ? (
                <>
                  We sent a 6-digit code to <strong className="font-bold text-ink">{email}</strong>.
                  It expires in 10 minutes.
                </>
              ) : (
                'Enter the email on your Omnify account and we’ll send you a code to reset your password.'
              )}
            </p>
          </div>

          {isVerify ? (
            <form onSubmit={onVerify} className="mt-[30px] flex flex-col gap-[18px]">
              <div>
                <div className="mb-[9px] flex items-baseline justify-between gap-3">
                  {/* Not the shared <Label> — the row below owns the spacing. */}
                  <label htmlFor="otp-0" className="text-[13.5px] font-semibold text-ink-700">
                    Verification code
                  </label>
                  <span className="text-[13px] font-semibold text-faint">
                    {locked ? `Resend in ${mmss(seconds)}` : 'Code expired'}
                  </span>
                </div>

                <OtpInput value={code} onChange={setCode} autoFocus />

                {error && (
                  <p className="mt-2.5 text-[13px] font-semibold text-rose-deep">
                    That code doesn&apos;t match. Check your inbox and try again.
                  </p>
                )}
              </div>

              <SubmitButton>Verify</SubmitButton>

              <div className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted">
                <span>Didn&apos;t get it?</span>
                <button
                  type="button"
                  onClick={onResend}
                  disabled={locked}
                  className="rounded-[7px] px-1.5 py-1 text-sm font-bold text-brand transition-colors enabled:hover:bg-ink/5 disabled:cursor-not-allowed disabled:text-faint-2"
                >
                  Resend code
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={onRequest} className="mt-[30px] flex flex-col gap-[18px]">
              <Field
                id="fp-email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                placeholder="maya@kiranahome.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <SubmitButton>Send code</SubmitButton>
            </form>
          )}

          <p className="mt-[22px] text-center">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-[7px] rounded-[9px] px-2.5 py-1.5 text-[14.5px] font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <ArrowLeft className="text-base" />
              {isVerify ? 'Use a different email' : 'Back to sign in'}
            </button>
          </p>
        </div>
      </section>
    </div>
  )
}
