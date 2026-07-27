import { stats } from '../data/landing'

export default function Stats() {
  return (
    <section className="mx-auto max-w-[1200px] px-7 pt-2 pb-20">
      <div className="rv relative overflow-hidden rounded-[22px] bg-linear-135 from-brand-deep to-brand-deeper px-10 py-13 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(600px_300px_at_85%_-20%,oklch(0.6_0.2_264/0.45),transparent_60%)]"
        />
        <div className="relative grid grid-cols-2 gap-7 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-[clamp(34px,4.4vw,50px)] leading-none font-extrabold tracking-[-0.03em]">
                {s.value}
              </div>
              <div className="mt-2.5 text-[14.5px] font-medium text-white/72 text-balance">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
