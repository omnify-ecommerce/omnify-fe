import { Link } from 'react-router-dom'
import { ArrowRight, Play } from '../components/Icons'
import DashboardMock from './DashboardMock'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-7 pt-[92px] pb-15">
      {/* Ambient brand wash behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_72%_-8%,oklch(0.55_0.2_264/0.10),transparent_60%),radial-gradient(700px_420px_at_8%_12%,oklch(0.62_0.14_205/0.08),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1080px] text-center">
        <div className="rv inline-flex items-center gap-[9px] rounded-full border border-ink/10 bg-white py-[7px] pr-3.5 pl-2 text-[13px] font-semibold text-slate shadow-card">
          <span className="rounded-full bg-brand/12 px-[9px] py-[3px] text-[11.5px] font-bold tracking-[0.02em] text-brand-600">
            NEW
          </span>
          TikTok Shop integration is now live
          <ArrowRight className="text-[14px]" />
        </div>

        <h1 className="rv mx-auto mt-6 max-w-[16ch] text-[clamp(40px,6.2vw,68px)] leading-[1.03] font-extrabold tracking-[-0.035em] text-balance">
          Run every marketplace from <span className="text-brand">one platform</span>
        </h1>

        <p className="rv mx-auto mt-[22px] max-w-[60ch] text-[clamp(17px,2.1vw,20px)] leading-[1.55] text-muted text-pretty">
          Omnify centralizes your products, inventory, pricing, and orders — then syncs
          them across Shopee, Lazada, TikTok Shop, and more in real time. Manage once, sell
          everywhere, oversell never.
        </p>

        <div className="rv mt-8 flex flex-wrap justify-center gap-3.5">
          <Link
            to="/signup"
            className="inline-flex items-center gap-[9px] rounded-xl bg-brand px-[26px] py-[15px] text-base font-bold text-white shadow-btn-lg transition-transform duration-150 hover:-translate-y-0.5"
          >
            Sign up free <ArrowRight className="text-[17px]" />
          </Link>
          <a
            href="#how"
            className="inline-flex items-center gap-[9px] rounded-xl border border-ink/12 bg-white px-6 py-[15px] text-base font-bold text-ink shadow-card transition-transform duration-150 hover:-translate-y-0.5"
          >
            <Play className="text-base" /> See how it works
          </a>
        </div>

        <p className="rv mt-[18px] text-[13.5px] font-medium text-faint">
          No credit card required · 14-day free trial · Cancel anytime
        </p>
      </div>

      <DashboardMock />
    </section>
  )
}
