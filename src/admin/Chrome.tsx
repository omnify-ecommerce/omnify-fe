import { AuthLogoMark, ChevronDown, ChevronRight, Sync } from '../components/Icons'
import { BULK_ACTIONS, LEGEND, NAV_GROUPS, SKELETONS } from './data'
import { Icon, GhostButton, BrandButton } from './AdminUI'
import type { Filter, ScreenKey, ViewKey } from './types'

const SEARCH_ICON = 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-4.3-4.3'

/* --------------------------------------------------------------- sidebar */

export function Sidebar({
  screen,
  onNavigate,
}: {
  screen: ScreenKey
  onNavigate: (key: ScreenKey) => void
}) {
  return (
    <aside className="flex flex-col overflow-hidden border-r border-adm-line bg-white">
      <div className="flex h-13 shrink-0 items-center gap-2.5 border-b border-adm-line-2 px-4">
        <span className="grid size-[26px] shrink-0 place-items-center rounded-lg bg-brand text-[15px] text-white">
          <AuthLogoMark />
        </span>
        <span className="hidden text-[14.5px] font-bold tracking-[-0.01em] lg:block">Omnify</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-3.5">
            <div className="hidden px-2 pb-1.5 text-[10.5px] font-bold tracking-[0.09em] text-adm-faint-2 lg:block">
              {group.label}
            </div>
            {group.items.map((item) => {
              const active = item.key && item.key === screen
              return (
                <button
                  key={item.name}
                  type="button"
                  title={item.name}
                  onClick={() => item.key && onNavigate(item.key)}
                  className={`mb-px flex w-full cursor-pointer items-center gap-2.5 rounded-[7px] px-2 py-[7px] text-left text-[13px] transition-colors ${
                    active
                      ? 'bg-brand/9 font-semibold text-brand-ink-2'
                      : item.key
                        ? 'font-medium text-ink-700 hover:bg-[#f2f3f6]'
                        : 'font-medium text-adm-faint hover:bg-[#f2f3f6]'
                  }`}
                >
                  <span
                    className={`grid place-items-center text-base ${
                      active ? 'text-brand-600' : 'text-adm-faint-2'
                    }`}
                  >
                    <Icon d={item.icon} />
                  </span>
                  <span className="hidden flex-1 truncate lg:block">{item.name}</span>
                  {item.count && (
                    <span className="hidden rounded-[5px] bg-warn/18 px-1.5 py-px text-[11px] font-semibold text-warn-deep lg:block">
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2.5 border-t border-adm-line-2 p-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-avatar text-[11.5px] font-bold text-white">
          NM
        </span>
        <div className="hidden min-w-0 flex-1 lg:block">
          <div className="truncate text-[12.5px] font-semibold">Nguyễn Thị Mai</div>
          <div className="text-[11px] text-adm-faint">Quản trị vận hành</div>
        </div>
      </div>
    </aside>
  )
}

/* ---------------------------------------------------------------- topbar */

export function Topbar({ screenTitle, section }: { screenTitle: string; section: string }) {
  return (
    <header className="flex h-13 shrink-0 items-center gap-3.5 border-b border-adm-line bg-white px-[18px]">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-[9px] rounded-lg border border-adm-border bg-white py-[5px] pr-2.5 pl-[7px] text-[12.5px] font-semibold text-adm-ink transition-colors hover:border-adm-border-2 hover:bg-adm-bg"
      >
        <span className="grid size-5 place-items-center rounded-md bg-workspace text-[10px] font-bold text-white">
          NV
        </span>
        Nhà Việt Retail
        <ChevronDown className="text-sm text-adm-faint-2" />
      </button>

      <div className="hidden min-w-0 items-center gap-[7px] text-[12.5px] text-adm-faint sm:flex">
        <span>Bảng điều khiển</span>
        <ChevronRight className="text-[13px]" />
        <span>{section}</span>
        <ChevronRight className="text-[13px]" />
        <span className="font-semibold text-adm-ink">{screenTitle}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden h-8 items-center gap-[7px] rounded-lg border border-adm-border bg-adm-panel px-2.5 text-adm-faint md:flex">
          <Icon d={SEARCH_ICON} className="text-sm" />
          <span className="text-[12.5px]">Tìm kiếm</span>
          <span className="rounded border border-adm-border bg-white px-[5px] py-px text-[10.5px] font-semibold">
            ⌘K
          </span>
        </div>
        <button
          type="button"
          title="Đồng bộ"
          className="relative grid size-8 cursor-pointer place-items-center rounded-lg border border-adm-border bg-white text-base text-adm-slate transition-colors hover:bg-adm-bg"
        >
          <Sync />
          <span className="absolute -top-[3px] -right-[3px] grid size-[15px] place-items-center rounded-full border-2 border-white bg-err text-[9px] font-bold text-white">
            3
          </span>
        </button>
        <button
          type="button"
          title="Trợ giúp"
          className="grid size-8 cursor-pointer place-items-center rounded-lg border border-adm-border bg-white text-base text-adm-slate transition-colors hover:bg-adm-bg"
        >
          <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4 M12 17h.01" />
        </button>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------- page head */

export function PageHead({
  title,
  subtitle,
  primaryAction,
}: {
  title: string
  subtitle: string
  primaryAction: string
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start gap-[18px]">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-[-0.015em]">{title}</h1>
        <p className="mt-[5px] max-w-[74ch] text-[13px] text-adm-muted">{subtitle}</p>
      </div>
      <div className="ml-auto flex flex-wrap gap-2">
        <GhostButton>
          <Icon
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3"
            className="text-[15px]"
          />
          Nhập Excel
        </GhostButton>
        <GhostButton>
          <Icon
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12"
            className="text-[15px]"
          />
          Xuất
        </GhostButton>
        <BrandButton className="shadow-[0_1px_2px_rgb(20_23_30/0.14)]">
          <Icon d="M12 5v14 M5 12h14" className="text-[15px]" />
          {primaryAction}
        </BrandButton>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- legend */

export function Legend() {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-[18px] rounded-[9px] border border-adm-line bg-white px-3.5 py-2.5">
      <span className="text-[11.5px] font-bold tracking-[0.05em] text-adm-faint">
        TRẠNG THÁI ÁNH XẠ
      </span>
      {LEGEND.map((l) => (
        <span key={l.label} className="flex items-center gap-[7px] text-[12.5px] text-adm-slate">
          <span className={`size-[18px] rounded-md ${l.fill}`} />
          {l.label}
        </span>
      ))}
      <span className="ml-auto hidden items-center gap-1.5 text-xs text-adm-faint xl:flex">
        {[
          ['S', 'Shopee'],
          ['L', 'Lazada'],
          ['T', 'TikTok Shop'],
        ].map(([code, name]) => (
          <span key={code} className="flex items-center gap-1.5">
            <span className="ml-1.5 grid size-[18px] place-items-center rounded-md bg-adm-skel text-[10px] font-bold text-adm-muted">
              {code}
            </span>
            {name}
          </span>
        ))}
      </span>
    </div>
  )
}

/* --------------------------------------------------------------- toolbar */

export function Toolbar({
  filters,
  searchPlaceholder,
  view,
  onView,
}: {
  filters: Filter[]
  searchPlaceholder: string
  view: ViewKey
  onView: (view: ViewKey) => void
}) {
  const TABS: { key: ViewKey; label: string }[] = [
    { key: 'data', label: 'Dữ liệu' },
    { key: 'loading', label: 'Đang tải' },
    { key: 'empty', label: 'Trống' },
  ]

  return (
    <div className="mb-3 flex flex-wrap items-center gap-[9px]">
      <div className="relative max-w-[340px] min-w-[230px] flex-1">
        <Icon
          d={SEARCH_ICON}
          className="absolute top-[9px] left-[11px] text-[15px] text-adm-faint-2"
        />
        <input
          placeholder={searchPlaceholder}
          className="h-[34px] w-full rounded-lg border border-adm-border bg-white pr-3 pl-[34px] text-[12.5px] text-adm-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_oklch(0.55_0.2_264/0.12)]"
        />
      </div>

      {filters.map((f) => (
        <button
          key={f.label}
          type="button"
          className="flex h-[34px] cursor-pointer items-center gap-[7px] rounded-lg border border-adm-border bg-white px-[11px] text-[12.5px] text-adm-slate transition-colors hover:border-adm-border-2 hover:bg-adm-bg"
        >
          {f.label}
          <span className="font-semibold text-adm-ink">{f.value}</span>
          <ChevronDown className="text-sm text-adm-faint-2" />
        </button>
      ))}

      <button
        type="button"
        className="flex h-[34px] cursor-pointer items-center gap-[7px] rounded-lg border border-brand/35 bg-brand/7 px-[11px] text-[12.5px] font-semibold text-brand-ink-2 transition-colors hover:bg-brand/12"
      >
        <Icon d="M3 6h18 M7 12h10 M10 18h4" className="text-sm" />
        Bộ lọc nâng cao
      </button>

      <div className="ml-auto flex overflow-hidden rounded-lg border border-adm-border bg-white">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onView(t.key)}
            className={`h-[34px] cursor-pointer px-3 text-xs font-semibold ${
              i > 0 ? 'border-l border-adm-border' : ''
            } ${view === t.key ? 'bg-brand/10 text-brand-ink-2' : 'bg-white text-adm-muted'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- bulk bar */

export function BulkBar({ count, onClear }: { count: number; onClear: () => void }) {
  return (
    <div className="mb-2.5 flex flex-wrap items-center gap-3 rounded-[9px] border border-brand/28 bg-brand/6 px-3.5 py-[9px]">
      <span className="text-[12.5px] font-semibold text-brand-ink">Đã chọn {count} mục</span>
      <span className="h-[18px] w-px bg-brand/25" />
      {BULK_ACTIONS.map((b) => (
        <button
          key={b.label}
          type="button"
          className={`flex h-7 cursor-pointer items-center gap-1.5 rounded-[7px] border border-adm-border bg-white px-2.5 text-xs font-semibold transition-colors hover:border-[#c9cfd8] ${b.tone}`}
        >
          <Icon d={b.icon} className="text-sm" />
          {b.label}
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="ml-auto h-7 cursor-pointer px-2 text-xs font-semibold text-adm-muted"
      >
        Bỏ chọn
      </button>
    </div>
  )
}

/* -------------------------------------------------- loading / empty / pager */

export function LoadingState() {
  return (
    <div>
      <div className="flex items-center gap-3.5 border-b border-adm-line-2 bg-adm-panel px-3.5 py-[11px]">
        <div className="sk size-3.5" />
        <div className="sk h-[9px] w-[150px]" />
        <div className="sk ml-auto h-[9px] w-[90px]" />
        <div className="sk h-[9px] w-[74px]" />
      </div>
      {SKELETONS.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-3.5 border-b border-adm-line-3 px-3.5 py-[13px]"
        >
          <div className="sk size-3.5" />
          <div className="sk h-2.5" style={{ width: s.w1 }} />
          <div className="sk h-2.5" style={{ width: s.w2 }} />
          <div className="ml-auto flex gap-[5px]">
            <div className="sk size-[22px] rounded-md" />
            <div className="sk size-[22px] rounded-md" />
            <div className="sk size-[22px] rounded-md" />
          </div>
          <div className="sk h-2.5 w-[70px]" />
        </div>
      ))}
      <div className="flex items-center justify-center gap-[9px] p-3.5 text-[12.5px] text-adm-faint">
        <Icon d="M21 12a9 9 0 1 1-6.22-8.56" className="text-[15px]" />
        Đang tải dữ liệu ánh xạ từ ba sàn…
      </div>
    </div>
  )
}

export function EmptyState({
  title,
  body,
  primaryAction,
}: {
  title: string
  body: string
  primaryAction: string
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="grid size-13 place-items-center rounded-[14px] bg-brand/9 text-[26px] text-brand-600">
        <Icon d="M14 3v4a1 1 0 0 0 1 1h4 M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z M9 14h6 M9 17h3" />
      </span>
      <h3 className="mt-4 text-base font-bold">{title}</h3>
      <p className="mt-[7px] max-w-[46ch] text-[13px] leading-[1.6] text-adm-muted">{body}</p>
      <div className="mt-[18px] flex flex-wrap justify-center gap-[9px]">
        <BrandButton className="px-3.5">
          <Icon d="M12 5v14 M5 12h14" className="text-[15px]" />
          {primaryAction}
        </BrandButton>
        <GhostButton>
          <Icon
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3"
            className="text-[15px]"
          />
          Nhập từ Excel
        </GhostButton>
      </div>
      <p className="mt-4 text-xs text-adm-faint-2">
        Cần hướng dẫn? Xem{' '}
        <a href="#" className="text-brand hover:text-brand-700">
          tài liệu ánh xạ danh mục
        </a>
        .
      </p>
    </div>
  )
}

export function Pager({
  rowCount,
  totalCount,
  unitLabel,
}: {
  rowCount: number
  totalCount: string
  unitLabel: string
}) {
  const PAGES = ['1', '2', '3', '…', '161']
  return (
    <div className="flex flex-wrap items-center gap-3.5 border-t border-adm-line-2 bg-adm-panel px-3.5 py-[11px]">
      <span className="text-xs text-adm-muted">
        Hiển thị <strong className="font-semibold text-adm-ink">1–{rowCount}</strong> trên{' '}
        <strong className="font-semibold text-adm-ink">{totalCount}</strong> {unitLabel}
      </span>
      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          disabled
          className="h-7 cursor-not-allowed rounded-[7px] border border-adm-border bg-white px-2.5 text-xs text-adm-faint-3"
        >
          Trước
        </button>
        {PAGES.map((p) => (
          <button
            key={p}
            type="button"
            className={`h-7 min-w-7 cursor-pointer rounded-[7px] border px-2 text-xs font-semibold ${
              p === '1'
                ? 'border-brand bg-brand text-white'
                : 'border-adm-border bg-white text-adm-slate'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className="h-7 cursor-pointer rounded-[7px] border border-adm-border bg-white px-2.5 text-xs font-semibold text-adm-ink transition-colors hover:bg-adm-bg"
        >
          Sau
        </button>
      </div>
    </div>
  )
}
