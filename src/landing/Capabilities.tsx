import { Layers, Inventory, Tag, ShoppingBag, Ticket, BarChart } from '../components/Icons'
import SectionHead from './SectionHead'

/* The design cycles three icon tints across the six cards: brand, cyan, green. */
const CAPABILITIES = [
  {
    Icon: Layers,
    tint: 'bg-brand/10 text-brand-700',
    title: 'Product Information',
    body: 'Manage SKUs, variants, categories, brands, attributes, images and descriptions from a single source of truth.',
  },
  {
    Icon: Inventory,
    tint: 'bg-cyan-soft/13 text-cyan-deep',
    title: 'Inventory Sync',
    body: 'Centralized stock with real-time synchronization across every channel to eliminate overselling.',
  },
  {
    Icon: Tag,
    tint: 'bg-green/13 text-green-deeper',
    title: 'Price Management',
    body: 'Base prices, channel-specific pricing, scheduled changes and promotions that sync automatically.',
  },
  {
    Icon: ShoppingBag,
    tint: 'bg-brand/10 text-brand-700',
    title: 'Order Management',
    body: 'Aggregate orders from every marketplace into one dashboard for faster fulfillment and tracking.',
  },
  {
    Icon: Ticket,
    tint: 'bg-cyan-soft/13 text-cyan-deep',
    title: 'Promotions & Vouchers',
    body: 'Create discounts, vouchers and marketplace campaigns across all your stores from one place.',
  },
  {
    Icon: BarChart,
    tint: 'bg-green/13 text-green-deeper',
    title: 'Analytics Dashboard',
    body: 'Real-time insight into sales, revenue, inventory and channel performance in one view.',
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-[1200px] px-7 py-20">
      <SectionHead
        kicker="Capabilities"
        title="Everything your ecommerce ops need"
        lede="One centralized system for products, stock, pricing, orders and promotions — built to keep every channel in sync and error-free."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map(({ Icon, tint, title, body }) => (
          <div
            key={title}
            className="rv rounded-[18px] border border-ink/8 bg-white px-[26px] py-7 shadow-cap transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-1 hover:shadow-cap-hover"
          >
            <div
              className={`mb-[18px] grid size-[50px] place-items-center rounded-[13px] text-2xl ${tint}`}
            >
              <Icon />
            </div>
            <div className="text-[19px] font-bold tracking-[-0.015em]">{title}</div>
            <p className="mt-2.5 text-[15px] leading-[1.6] text-muted-2 text-pretty">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
