import { Link } from 'react-router-dom'
import { LogoMark } from '../components/Icons'

const NAV = [
  { label: 'How it works', href: '#how' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Marketplaces', href: '#marketplaces' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/7 bg-page/78 backdrop-blur-[14px] backdrop-saturate-180">
      <nav className="mx-auto flex h-[70px] max-w-[1200px] items-center gap-9 px-7">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em]"
        >
          <span className="grid size-[30px] place-items-center rounded-[9px] bg-brand text-base text-white">
            <LogoMark />
          </span>
          Omnify
        </a>

        <div className="ml-2 hidden gap-[30px] text-[14.5px] font-medium text-slate md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3.5">
          <Link
            to="/signin"
            className="hidden text-[14.5px] font-semibold text-slate hover:text-brand sm:block"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-[10px] bg-brand px-[18px] py-2.5 text-[14.5px] font-bold text-white shadow-btn transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-btn-hover"
          >
            Sign up free
          </Link>
        </div>
      </nav>
    </header>
  )
}
