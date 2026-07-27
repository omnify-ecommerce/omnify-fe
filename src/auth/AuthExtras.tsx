import type { ReactNode } from 'react'
import { ChevronDown, Globe } from '../components/Icons'

/** Marketplace OAuth buttons. Colors are Tailwind classes so the JIT sees them. */
const CHANNELS: { abbr: string; title: string; color: string }[] = [
  { abbr: 'SP', title: 'Continue with Shopee', color: 'text-shopee' },
  { abbr: 'LZ', title: 'Continue with Lazada', color: 'text-lazada' },
  { abbr: 'TT', title: 'Continue with TikTok Shop', color: 'text-tiktok' },
]

export function ChannelAuth({ label }: { label: string }) {
  return (
    <div>
      <div className="mt-1 mb-[18px] flex items-center gap-3.5">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="text-[11.5px] font-bold tracking-[0.1em] text-faint">{label}</span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>
      <div className="flex justify-center gap-3">
        {CHANNELS.map((c) => (
          <button
            key={c.abbr}
            type="button"
            title={c.title}
            className={`grid h-[46px] w-[52px] place-items-center rounded-[11px] border border-ink/12 bg-white text-[13.5px] font-extrabold transition-[border-color,transform] duration-150 hover:-translate-y-px hover:border-brand ${c.color}`}
          >
            {c.abbr}
          </button>
        ))}
      </div>
    </div>
  )
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="h-[52px] w-full rounded-[10px] bg-brand text-[15.5px] font-bold text-white shadow-brand transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-brand-600 active:translate-y-0 active:bg-brand-800"
    >
      {children}
    </button>
  )
}

export function LanguagePicker() {
  return (
    <button
      type="button"
      className="mx-auto mt-[22px] flex items-center gap-2 rounded-[9px] px-3 py-2 text-[13.5px] font-semibold text-muted transition-colors hover:bg-ink/5"
    >
      <Globe className="text-base" />
      English (US)
      <ChevronDown className="text-[15px]" />
    </button>
  )
}
