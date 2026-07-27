import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLogoMark, Info } from '../components/Icons'
import BrandPanel from '../auth/BrandPanel'
import Field, { PasswordField } from '../auth/Field'
import { ChannelAuth, LanguagePicker, SubmitButton } from '../auth/AuthExtras'

interface SignUpProps {
  /** Mirror the design's `showChannelAuth` / `showReferral` props. */
  showChannelAuth?: boolean
  showReferral?: boolean
}

export default function SignUp({ showChannelAuth = true, showReferral = true }: SignUpProps) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[1.4fr_1fr]">
      <BrandPanel />

      <section className="flex items-center justify-center bg-page px-9 py-12">
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/"
              aria-label="Omnify home"
              className="grid size-14 place-items-center rounded-[17px] bg-brand text-[28px] text-white shadow-brand-lg"
            >
              <AuthLogoMark />
            </Link>
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em]">Sign up</h2>
          </div>

          <form onSubmit={onSubmit} className="mt-[30px] flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3.5">
              <Field
                id="su-first"
                name="firstName"
                label="First name"
                required
                autoComplete="given-name"
                placeholder="Maya"
              />
              <Field
                id="su-last"
                name="lastName"
                label="Last name"
                required
                autoComplete="family-name"
                placeholder="Sunaryo"
              />
            </div>

            <Field
              id="su-email"
              name="email"
              type="email"
              label="Email"
              required
              autoComplete="email"
              placeholder="maya@kiranahome.co"
            />

            <PasswordField
              id="su-password"
              name="password"
              label="Password"
              required
              autoComplete="new-password"
              placeholder="At least 10 characters"
            />

            <PasswordField
              id="su-confirm"
              name="confirmPassword"
              label="Confirm password"
              required
              autoComplete="new-password"
              placeholder="Repeat your password"
            />

            {showReferral && (
              <Field
                id="su-referral"
                name="referral"
                label="Referral code (optional)"
                placeholder="Referral code"
                hint={<Info className="text-[15px] text-faint" />}
              />
            )}

            <label className="mt-0.5 flex cursor-pointer items-start gap-[11px] text-[13.5px] leading-[1.55] text-muted">
              <input
                type="checkbox"
                name="terms"
                className="mt-px size-[18px] shrink-0 cursor-pointer accent-brand"
              />
              <span>
                I agree to the{' '}
                <a href="#" className="text-brand hover:text-brand-700">
                  Terms of Service
                </a>
                ,{' '}
                <a href="#" className="text-brand hover:text-brand-700">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-brand hover:text-brand-700">
                  Cookie Policy
                </a>
                .
              </span>
            </label>

            <div className="mt-1">
              <SubmitButton>Sign up</SubmitButton>
            </div>

            {showChannelAuth && <ChannelAuth label="OR SIGN UP WITH" />}

            <p className="mt-1.5 text-center text-[14.5px] font-medium text-muted">
              Already have an account?{' '}
              <Link to="/signin" className="font-bold text-brand hover:text-brand-700">
                Sign in
              </Link>
            </p>
          </form>

          <LanguagePicker />
        </div>
      </section>
    </div>
  )
}
