import { LogoMark, Twitter, LinkedIn, GitHub } from '../components/Icons'
import { footcols } from '../data/landing'

const SOCIALS = [
  { label: 'Twitter', Icon: Twitter },
  { label: 'LinkedIn', Icon: LinkedIn },
  { label: 'GitHub', Icon: GitHub },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-panel px-7 pt-14 pb-[34px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a
            href="#top"
            className="flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em]"
          >
            <span className="grid size-[30px] place-items-center rounded-[9px] bg-brand text-base text-white">
              <LogoMark />
            </span>
            Omnify
          </a>
          <p className="mt-4 max-w-[34ch] text-[14.5px] leading-[1.6] text-muted-3 text-pretty">
            One intelligent platform to manage every sales channel — automated, centralized, and
            built to scale.
          </p>
          <div className="mt-[18px] flex gap-2.5">
            {SOCIALS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-[38px] place-items-center rounded-[10px] border border-ink/10 text-muted-3 hover:text-brand"
              >
                <Icon className="text-[17px]" />
              </a>
            ))}
          </div>
        </div>

        {footcols.map((col) => (
          <div key={col.title}>
            <div className="text-[13px] font-bold tracking-[0.04em] text-faint-2 uppercase">
              {col.title}
            </div>
            <div className="mt-3.5 flex flex-col gap-[11px]">
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[14.5px] font-medium text-muted-2 hover:text-brand"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-11 flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-ink/7 pt-6 text-[13.5px] font-medium text-faint-2">
        <span>© 2026 Omnify, Inc. All rights reserved.</span>
        <span className="flex gap-5">
          <a href="#" className="hover:text-brand">
            Privacy
          </a>
          <a href="#" className="hover:text-brand">
            Terms
          </a>
          <a href="#" className="hover:text-brand">
            Status
          </a>
        </span>
      </div>
    </footer>
  )
}
