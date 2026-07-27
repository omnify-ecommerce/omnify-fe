import { Plus } from '../components/Icons'
import { faqs } from '../data/landing'
import SectionHead from './SectionHead'

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-[820px] px-7 pt-5 pb-24">
      <SectionHead kicker="FAQ" title="Questions, answered" width="max-w-none" />

      <div className="mt-10 flex flex-col gap-3">
        {faqs.map((item) => (
          /* Native <details> keeps the accordion scriptless, as in the design.
             The open/height animation lives in index.css (Tailwind can't
             express the [open] + grid-template-rows transition). */
          <details
            key={item.question}
            className="faq rv overflow-hidden rounded-[14px] border border-ink/9 bg-white shadow-card"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-[18px] px-[22px] py-5 text-[17px] font-bold tracking-[-0.01em] text-ink">
              {item.question}
              <span className="faq-ico grid size-7 shrink-0 place-items-center rounded-lg bg-ink/6 text-muted-2 transition-[transform,background,color] duration-200">
                <Plus className="text-[17px]" />
              </span>
            </summary>
            <div className="faq-body">
              <div className="min-h-0 overflow-hidden">
                <p className="px-[22px] pb-5 text-[15.5px] leading-[1.62] text-muted text-pretty">
                  {item.answer}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
