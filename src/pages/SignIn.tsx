import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLogoMark } from '../components/Icons'
import BrandPanel from '../auth/BrandPanel'
import Field, { PasswordField } from '../auth/Field'
import { ChannelAuth, LanguagePicker, SubmitButton } from '../auth/AuthExtras'

interface SignInProps {
  /** Mirrors the design's `showChannelAuth` prop. */
  showChannelAuth?: boolean
}

export default function SignIn({ showChannelAuth = true }: SignInProps) {
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
            <h2 className="text-[26px] font-extrabold tracking-[-0.025em]">Sign in</h2>
          </div>

          <form onSubmit={onSubmit} className="mt-[30px] flex flex-col gap-[18px]">
            <Field
              id="si-email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              placeholder="maya@kiranahome.co"
            />

            <div>
              <PasswordField
                id="si-password"
                name="password"
                label="Password"
                autoComplete="current-password"
                placeholder="••••••••••"
              />
              <div className="mt-2.5 flex justify-end">
                <Link
                  to="/reset-password"
                  className="text-[13.5px] font-semibold text-brand hover:text-brand-700"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <SubmitButton>Sign in</SubmitButton>

            {showChannelAuth && <ChannelAuth label="OR SIGN IN WITH" />}

            <p className="mt-1.5 text-center text-[14.5px] font-medium text-muted">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-bold text-brand hover:text-brand-700">
                Sign up
              </Link>
            </p>
          </form>

          <LanguagePicker />
        </div>
      </section>
    </div>
  )
}
