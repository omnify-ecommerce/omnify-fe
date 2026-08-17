import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'

export default function FinalCta() {
  return (
    <section id="cta" className="mx-auto max-w-[1200px] px-7 pb-24">
      <div className="rv relative overflow-hidden rounded-3xl border border-ink/8 bg-white px-10 py-16 text-center shadow-cta">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(700px_340px_at_50%_-30%,oklch(0.55_0.2_264/0.12),transparent_60%)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-[20ch] text-[clamp(30px,4.4vw,50px)] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance">
            Stop managing marketplaces. Start scaling them.
          </h2>
          <p className="mx-auto mt-[18px] max-w-[52ch] text-lg leading-[1.55] text-muted text-pretty">
            Join thousands of merchants running their entire operation from a single, intelligent
            dashboard.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Link
              to="/signup"
              className="inline-flex items-center gap-[9px] rounded-xl bg-brand px-[30px] py-4 text-base font-bold text-white shadow-btn-lg transition-transform duration-150 hover:-translate-y-0.5"
            >
              Sign up free <ArrowRight className="text-[17px]" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-[9px] rounded-xl border border-ink/12 bg-white px-7 py-4 text-base font-bold text-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
