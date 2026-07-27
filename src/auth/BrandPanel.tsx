import {
  AuthLogoMark,
  Sync,
  Package,
  Cart,
  Tag,
  Ticket,
  BarChart,
} from '../components/Icons'
import ImageSlot from '../components/ImageSlot'

const FEATURES = [
  { label: 'Product sync', Icon: Sync },
  { label: 'Inventory', Icon: Package },
  { label: 'Orders', Icon: Cart },
  { label: 'Pricing', Icon: Tag },
  { label: 'Promotions', Icon: Ticket },
  { label: 'Analytics', Icon: BarChart },
]

/** The left-hand marketing panel, identical across Sign In and Sign Up. */
export default function BrandPanel() {
  return (
    <section className="relative hidden items-center justify-center overflow-hidden bg-white px-12 py-14 lg:flex">
      {/* Three organic gradient blobs bleeding off the left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-14%] left-[-24%] h-[128%] w-[64%] rounded-[52%_44%_48%_56%/58%_52%_48%_42%] bg-blob-1/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[2%] left-[-30%] h-[110%] w-[52%] rounded-[48%_52%_44%_56%/54%_46%_54%_46%] bg-blob-2/75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[18%] left-[-34%] h-[88%] w-[40%] rounded-[50%_50%_46%_54%/52%_48%_52%_48%] bg-blob-3/60"
      />

      <div className="relative flex w-full max-w-[560px] flex-col items-center gap-[34px] text-center">
        <h1 className="text-[clamp(26px,2.6vw,34px)] leading-[1.2] font-extrabold tracking-[-0.028em] text-balance">
          Sell on every marketplace,
          <br />
          manage it all with
          <span className="ml-1.5 inline-flex items-center gap-[9px] align-[-6px]">
            <span className="grid size-8 place-items-center rounded-[10px] bg-brand text-lg text-white">
              <AuthLogoMark />
            </span>
            <span className="text-brand-600">Omnify</span>
          </span>
        </h1>

        <div className="grid grid-cols-2 justify-items-start gap-x-11 gap-y-4">
          {FEATURES.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-[11px]">
              <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-brand text-[17px] text-white">
                <Icon />
              </span>
              <span className="text-[12.5px] font-bold tracking-[0.05em] whitespace-nowrap text-ink-800 uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="aspect-3/2 w-full max-w-[420px]">
          <ImageSlot />
        </div>

        <div className="flex items-center gap-[13px]">
          <span className="rounded-full bg-brand px-3 py-1.5 text-[11.5px] font-extrabold tracking-[0.08em] text-white">
            14 DAYS FREE
          </span>
          <span className="text-[14.5px] font-medium text-muted">
            on every new merchant account
          </span>
        </div>
      </div>
    </section>
  )
}
