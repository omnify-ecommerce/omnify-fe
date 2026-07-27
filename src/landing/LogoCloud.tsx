import { marketplaces } from '../data/landing'

export default function LogoCloud() {
  return (
    <section id="marketplaces" className="px-7 pt-11 pb-2">
      <p className="rv text-center font-mono text-[12.5px] font-semibold tracking-[0.12em] text-faint-2 uppercase">
        Connect the marketplaces you already sell on
      </p>
      <div className="rv mx-auto mt-[26px] flex max-w-[960px] flex-wrap justify-center gap-3.5">
        {marketplaces.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-[11px] rounded-xl border border-ink/9 bg-white px-5 py-3 shadow-hair"
          >
            <span
              className={`grid size-[30px] place-items-center rounded-lg text-sm font-extrabold text-white ${m.swatch}`}
            >
              {m.abbr}
            </span>
            <span className="text-[15px] font-bold text-ink-800">{m.name}</span>
            {m.soon && (
              <span className="rounded-full border border-ink/12 px-[7px] py-0.5 text-[10.5px] font-bold tracking-[0.04em] text-faint-2">
                SOON
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
