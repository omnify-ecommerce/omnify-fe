import { Wand, Boxes, Sync, TrendingUp } from '../components/Icons'
import SectionHead from './SectionHead'

const STEPS = [
  {
    step: 'STEP 01',
    Icon: Wand,
    title: 'Connect your stores',
    body: 'Link Shopee, Lazada and TikTok Shop with secure OAuth in a few clicks — no developers required.',
  },
  {
    step: 'STEP 02',
    Icon: Boxes,
    title: 'Manage products once',
    body: 'Build your catalog with variants, images, attributes and specs in one centralized PIM.',
  },
  {
    step: 'STEP 03',
    Icon: Sync,
    title: 'Sync everywhere',
    body: 'Push products, prices and stock to every channel automatically, with real-time updates.',
  },
  {
    step: 'STEP 04',
    Icon: TrendingUp,
    title: 'Monitor & scale',
    body: 'Track sync jobs, aggregate orders and watch performance across every marketplace live.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-[1200px] px-7 pt-22 pb-5">
      <SectionHead
        kicker="How it works"
        title="Go live everywhere in four steps"
        lede="From scattered spreadsheets and browser tabs to a single source of truth — in an afternoon, not a quarter."
      />

      <div className="mt-12 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ step, Icon, title, body }) => (
          <div
            key={step}
            className="rv relative rounded-2xl border border-ink/8 bg-white px-[22px] py-[26px] shadow-card-md"
          >
            <div className="font-mono text-xs font-semibold text-faint-4">{step}</div>
            <div className="my-3.5 mb-4 grid size-[46px] place-items-center rounded-xl bg-brand/10 text-[22px] text-brand-600">
              <Icon />
            </div>
            <div className="text-[17.5px] font-bold tracking-[-0.01em]">{title}</div>
            <p className="mt-2 text-[14.5px] leading-[1.55] text-muted-2 text-pretty">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
