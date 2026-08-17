import { LayoutDashboard, Package, Inventory, Cart, Sync, Tag } from '../components/Icons'
import { bars } from '../data/landing'

const SIDE_NAV = [
  { label: 'Dashboard', Icon: LayoutDashboard, active: true },
  { label: 'Products', Icon: Package },
  { label: 'Inventory', Icon: Inventory },
  { label: 'Orders', Icon: Cart },
  { label: 'Sync jobs', Icon: Sync },
  { label: 'Pricing', Icon: Tag },
]

const KPIS = [
  { label: 'Revenue (30d)', value: '$248,190', delta: '▲ 18.4%', good: true },
  { label: 'Orders', value: '3,417', delta: '▲ 9.1%', good: true },
  { label: 'Synced SKUs', value: '12,860', delta: 'across 4 stores' },
]

export default function DashboardMock() {
  return (
    <div className="rv relative mx-auto mt-13 max-w-[1120px]">
      <div className="overflow-hidden rounded-[18px] border border-ink/9 bg-white shadow-mock">
        {/* Browser chrome */}
        <div className="flex h-11 items-center gap-2 border-b border-ink/6 bg-[#fcfcfe] px-4">
          <span className="size-[11px] rounded-full bg-[#ff5f57]" />
          <span className="size-[11px] rounded-full bg-[#febc2e]" />
          <span className="size-[11px] rounded-full bg-[#28c840]" />
          <span className="ml-3.5 font-mono text-xs text-faint-2">app.omnify.io/dashboard</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[212px_1fr]">
          {/* Sidebar */}
          <aside className="hidden flex-col gap-1 border-r border-ink/6 bg-panel px-3.5 py-[18px] sm:flex">
            <div className="px-2.5 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-faint-3">
              WORKSPACE
            </div>
            {SIDE_NAV.map(({ label, Icon, active }) => (
              <div
                key={label}
                className={
                  active
                    ? 'flex items-center gap-2.5 rounded-[9px] bg-brand/10 px-[11px] py-[9px] text-[13.5px] font-semibold text-brand-700'
                    : 'flex items-center gap-2.5 rounded-[9px] px-[11px] py-[9px] text-[13.5px] font-medium text-muted-2'
                }
              >
                <Icon className="text-base" /> {label}
              </div>
            ))}
          </aside>

          {/* Panel body */}
          <div className="flex flex-col gap-[18px] px-6 py-[22px]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[17px] font-bold tracking-[-0.01em]">
                  Good morning, Maya 👋
                </div>
                <div className="mt-0.5 text-[13px] text-faint">
                  All channels synced · last run 2 min ago
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-[9px] bg-green/12 px-[13px] py-[7px] text-[12.5px] font-semibold text-green-deep">
                <span className="size-2 rounded-full bg-green" /> 4 channels healthy
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {KPIS.map((kpi) => (
                <div key={kpi.label} className="rounded-[13px] border border-ink/8 px-4 py-[15px]">
                  <div className="text-xs font-semibold text-faint">{kpi.label}</div>
                  <div className="mt-1.5 text-[23px] font-extrabold tracking-[-0.02em]">
                    {kpi.value}
                  </div>
                  <div
                    className={`mt-1 text-xs font-semibold ${
                      kpi.good ? 'text-green-mid' : 'text-faint'
                    }`}
                  >
                    {kpi.delta}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[13px] border border-ink/8 px-[18px] pt-[18px] pb-3.5">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="text-sm font-bold">Sales by channel</div>
                <div className="font-mono text-[11px] text-faint-3">last 14 days</div>
              </div>
              <div className="flex h-24 items-end gap-2.5">
                {bars.map((height, i) => (
                  <div
                    key={i}
                    title={`${height}%`}
                    /* Data-driven geometry — the one place an inline style is
                       unavoidable, since Tailwind cannot generate a class per value. */
                    style={{ height: `${height}%` }}
                    className="flex-1 rounded-t-[5px] rounded-b-[2px] bg-gradient-to-b from-brand-400 to-brand"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
