import { useEffect, useRef } from 'react'
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react'

interface OtpInputProps {
  /** One entry per box; '' for an empty box. Length sets the box count. */
  value: string[]
  onChange: (value: string[]) => void
  /** Ids become `${idPrefix}-0` … so a <label> can point at the first box. */
  idPrefix?: string
  autoFocus?: boolean
}

/**
 * Six single-digit boxes that behave as one field. The design drove focus by
 * reading `document.getElementById('otp-N')` inside delegated container
 * handlers; React holds the digits in the parent's state and the elements in a
 * ref array instead.
 */
export default function OtpInput({
  value,
  onChange,
  idPrefix = 'otp',
  autoFocus = false,
}: OtpInputProps) {
  const boxes = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (autoFocus) boxes.current[0]?.focus()
  }, [autoFocus])

  const focusBox = (i: number) => boxes.current[i]?.focus()

  const setAt = (i: number, digit: string) => {
    const next = [...value]
    next[i] = digit
    onChange(next)
  }

  // Taking the *last* digit rather than the first lets a filled box be retyped
  // over; the design's uncontrolled maxlength=1 inputs simply rejected the key.
  const onInput = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1)
    setAt(i, digit)
    if (digit) focusBox(i + 1)
  }

  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      e.preventDefault()
      setAt(i - 1, '')
      focusBox(i - 1)
    }
    if (e.key === 'ArrowLeft') focusBox(i - 1)
    if (e.key === 'ArrowRight') focusBox(i + 1)
  }

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, value.length)
    if (!digits) return
    e.preventDefault()
    onChange(value.map((d, i) => digits[i] ?? d))
    focusBox(Math.min(digits.length, value.length - 1))
  }

  return (
    <div className="grid grid-cols-6 gap-2.5">
      {value.map((digit, i) => (
        <input
          key={i}
          id={`${idPrefix}-${i}`}
          ref={(el) => {
            boxes.current[i] = el
          }}
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          value={digit}
          onChange={onInput(i)}
          onKeyDown={onKeyDown(i)}
          onPaste={onPaste}
          className="h-14 w-full rounded-[11px] border border-ink/14 bg-white text-center text-[22px] font-bold text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-brand focus:ring-[3px] focus:ring-brand/14"
        />
      ))}
    </div>
  )
}
