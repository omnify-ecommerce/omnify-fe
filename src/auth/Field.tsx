import { useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Eye, EyeOff } from '../components/Icons'

const INPUT =
  'h-[50px] w-full rounded-[10px] border border-transparent bg-field px-3.5 text-[15px] text-ink outline-none transition-[border-color,background] duration-150 focus:border-brand focus:bg-white placeholder:text-faint'

/** Native input attributes, minus the ones these wrappers own. */
type InputAttrs = Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'className'>

interface LabelProps {
  htmlFor: string
  children: ReactNode
  required?: boolean
  /** Trailing adornment, e.g. the info icon beside "Referral code". */
  hint?: ReactNode
}

export function Label({ htmlFor, children, required, hint }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-[7px] flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-700"
    >
      {children}
      {required && <span className="text-rose">*</span>}
      {hint}
    </label>
  )
}

interface FieldProps extends InputAttrs {
  id: string
  label: string
  required?: boolean
  hint?: ReactNode
}

/** Labelled text input. */
export default function Field({ id, label, required, hint, ...inputProps }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <input id={id} className={INPUT} {...inputProps} />
    </div>
  )
}

/**
 * Password input with a show/hide toggle. The design did this by mutating the
 * DOM (input.type / svg.style.display); React drives it from state instead.
 */
export function PasswordField({
  id,
  label,
  required,
  ...inputProps
}: Omit<FieldProps, 'hint' | 'type'>) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`${INPUT} pr-12`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute top-1.5 right-1.5 grid size-[38px] place-items-center rounded-[9px] text-[19px] text-faint transition-colors hover:bg-brand/8 hover:text-brand"
        >
          {visible ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  )
}
