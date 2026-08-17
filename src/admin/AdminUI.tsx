import type { ChangeEvent, MouseEvent, ReactNode } from 'react'
import { WARN_ICON } from './states'
import type { Chip } from './types'

/**
 * Shared Admin Console primitives. The console's icons are stored as `d`
 * path strings in the data maps (several hold multiple subpaths in one
 * string, which a single <path> renders correctly), so Icon takes a string.
 */
export function Icon({ d, className = '' }: { d: string; className?: string }) {
  return (
    <svg className={`ic ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

interface StatusPillProps {
  /** Tailwind class for the dot's background. */
  dot: string
  /** Tailwind classes for the pill's ground and text. */
  pill: string
  children: ReactNode
  className?: string
}

/** Status pill: a colored dot plus a label, on a tinted ground. */
export function StatusPill({ dot, pill, children, className = '' }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-[9px] py-[3px] text-[11.5px] font-semibold whitespace-nowrap ${pill} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  )
}

/** The three lettered marketplace chips (S / L / T). */
export function ChannelChips({ channels, size = 23 }: { channels: Chip[]; size?: number }) {
  return (
    <div className="flex gap-[5px]">
      {channels.map((ch) => (
        <span
          key={ch.code}
          title={ch.title}
          className={`grid place-items-center rounded-md text-[10.5px] font-bold text-white ${ch.fill}`}
          style={{ width: size, height: size }}
        >
          {ch.code}
        </span>
      ))}
    </div>
  )
}

/** Compact dot form of the same three states, used in the category tree. */
export function ChannelDots({ channels }: { channels: Chip[] }) {
  return (
    <span className="flex shrink-0 gap-1">
      {channels.map((ch) => (
        <span key={ch.code} title={ch.title} className={`size-[9px] rounded-full ${ch.fill}`} />
      ))}
    </span>
  )
}

/** Inline warning strip shown beneath a row's name. */
export function WarningNote({
  children,
  tone,
  max = 'max-w-[62ch]',
}: {
  children: ReactNode
  tone: string
  max?: string
}) {
  return (
    <div
      className={`mt-1.5 flex items-start gap-1.5 rounded-md px-2 py-[5px] text-[11.5px] leading-[1.5] ${tone} ${max}`}
    >
      <Icon d={WARN_ICON} className="mt-px text-sm" />
      <span>{children}</span>
    </div>
  )
}

/** Small neutral or accented tag (BẮT BUỘC, Nháp, Mới…). */
export function Tag({
  pill = 'bg-adm-chip text-adm-muted',
  children,
  className = '',
}: {
  pill?: string
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`rounded-[5px] px-[7px] py-[1.5px] text-[10.5px] font-bold whitespace-nowrap ${pill} ${className}`}
    >
      {children}
    </span>
  )
}

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  title?: string
}

/** Secondary (outlined) console button. */
export function GhostButton({ children, onClick, className = '', title }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-[34px] cursor-pointer items-center gap-[7px] rounded-lg border border-adm-border bg-white px-3 text-[12.5px] font-semibold text-adm-ink transition-colors hover:border-adm-border-2 hover:bg-adm-bg ${className}`}
    >
      {children}
    </button>
  )
}

/** Primary (filled brand) console button. */
export function BrandButton({ children, onClick, className = '' }: Omit<ButtonProps, 'title'>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[34px] cursor-pointer items-center gap-[7px] rounded-lg bg-brand px-[13px] text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-600 ${className}`}
    >
      {children}
    </button>
  )
}

interface CheckBoxProps {
  checked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  className?: string
}

/** Row checkbox / select-all checkbox. */
export function CheckBox({ checked, onChange, onClick, className = '' }: CheckBoxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onClick={onClick}
      className={`size-3.5 shrink-0 cursor-pointer accent-brand ${className}`}
    />
  )
}

export const TH =
  'border-b border-adm-line px-3 py-[9px] text-[11px] font-bold tracking-[0.05em] whitespace-nowrap text-adm-faint'
export const TD = 'border-b border-adm-line-3 px-3 py-2.5 align-top'
export const SECTION_LABEL = 'text-[11px] font-bold tracking-[0.05em] text-adm-faint uppercase'
