interface SectionHeadProps {
  kicker: string
  title: string
  /** Optional — the FAQ section shows only a kicker and heading. */
  lede?: string
  width?: string
}

/** Shared kicker / heading / lede block used by the how-it-works, capabilities and FAQ sections. */
export default function SectionHead({
  kicker,
  title,
  lede,
  width = 'max-w-[640px]',
}: SectionHeadProps) {
  return (
    <div className={`mx-auto text-center ${width}`}>
      <p className="rv font-mono text-[12.5px] font-semibold tracking-[0.12em] text-brand uppercase">
        {kicker}
      </p>
      <h2 className="rv mt-3.5 text-[clamp(30px,4vw,44px)] leading-[1.08] font-extrabold tracking-[-0.03em]">
        {title}
      </h2>
      {lede && <p className="rv mt-4 text-[17px] leading-[1.55] text-muted text-pretty">{lede}</p>}
    </div>
  )
}
