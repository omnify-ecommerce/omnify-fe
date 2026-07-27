import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Icon } from './AdminUI'
import { ROLLUP_ICON } from './states'

/**
 * Right-hand slide-over used by all three detail panels. Clicking the
 * backdrop closes; Escape closes too (the design only had the backdrop).
 */
export default function Drawer({
  width = 'w-[min(720px,100%)]',
  onClose,
  children,
}: {
  width?: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-60 flex justify-end bg-[rgb(16_19_26/0.32)]"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`flex h-full flex-col overflow-hidden bg-white shadow-[-12px_0_40px_rgb(16_19_26/0.18)] ${width}`}
      >
        {children}
      </div>
    </div>
  )
}

export function DrawerClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      title="Đóng"
      className="ml-auto grid size-[30px] shrink-0 cursor-pointer place-items-center rounded-lg border border-adm-border bg-white text-base text-adm-muted transition-colors hover:bg-adm-bg hover:text-adm-ink"
    >
      <Icon d="M18 6 6 18 M6 6l12 12" />
    </button>
  )
}

/** Shared drawer footer: a roll-up explanation plus actions. */
export function DrawerFooter({
  rollup,
  onClose,
  primary = 'Lưu ánh xạ',
  extra,
}: {
  rollup: string
  onClose: () => void
  primary?: string
  /** Optional extra action rendered before Đóng, e.g. "Ngắt kết nối". */
  extra?: ReactNode
}) {
  return (
    <div className="flex flex-shrink-0 flex-wrap items-center gap-3.5 border-t border-adm-line bg-adm-panel px-5 py-3">
      <div className="flex max-w-[56ch] items-start gap-2 text-xs leading-[1.5] text-adm-slate">
        <Icon d={ROLLUP_ICON} className="mt-px shrink-0 text-[15px] text-adm-faint" />
        <span>{rollup}</span>
      </div>
      <div className="ml-auto flex gap-2">
        {extra}
        <button
          type="button"
          onClick={onClose}
          className="h-[34px] cursor-pointer rounded-lg border border-adm-border bg-white px-[13px] text-[12.5px] font-semibold text-adm-ink transition-colors hover:bg-[#f2f3f6]"
        >
          Đóng
        </button>
        <button
          type="button"
          className="h-[34px] cursor-pointer rounded-lg bg-brand px-[15px] text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-600"
        >
          {primary}
        </button>
      </div>
    </div>
  )
}
