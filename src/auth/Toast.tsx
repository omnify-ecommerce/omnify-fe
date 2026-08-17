import { AlertCircle, CheckCircle, X } from '../components/Icons'

export type ToastTone = 'success' | 'error'

interface ToastProps {
  tone: ToastTone
  title: string
  /** Second line — the error toast explains what went wrong, success doesn't. */
  description?: string
  /** Inline recovery affordance, e.g. "Try again" on a failed send. */
  action?: { label: string; onClick: () => void }
  onDismiss: () => void
}

const TONE = {
  success: {
    Icon: CheckCircle,
    border: 'border-toast-ok-line',
    icon: 'text-toast-ok-icon',
    title: 'font-semibold text-toast-ok-ink',
  },
  error: {
    Icon: AlertCircle,
    border: 'border-toast-err-line',
    icon: 'mt-px text-rose-mid',
    title: 'font-bold text-toast-err-ink',
  },
} as const

/**
 * Floating notice pinned inside the auth column (its parent must be relative).
 * Only one is ever mounted at a time, so it owns no stacking logic of its own.
 */
export default function Toast({ tone, title, description, action, onDismiss }: ToastProps) {
  const t = TONE[tone]

  return (
    <div
      role="status"
      className={`toast-in absolute top-[26px] right-[26px] left-[26px] z-10 flex gap-3 rounded-xl border bg-white px-4 py-3.5 shadow-toast ${t.border} ${
        description ? 'items-start' : 'items-center'
      }`}
    >
      <t.Icon className={`text-xl ${t.icon}`} />

      <div className="flex flex-1 flex-col gap-1.5">
        <span className={`text-sm ${t.title}`}>{title}</span>

        {description && (
          <span className="text-[13px] leading-[1.5] font-medium text-toast-err-body">
            {description}
          </span>
        )}

        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="-ml-1.5 self-start rounded-[7px] px-1.5 py-1 text-[13.5px] font-bold text-rose-deep transition-colors hover:bg-rose-deep/8"
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="grid place-items-center rounded-[7px] p-1 text-[17px] text-faint transition-colors hover:bg-ink/6 hover:text-ink"
      >
        <X />
      </button>
    </div>
  )
}
