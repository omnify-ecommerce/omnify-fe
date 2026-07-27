import type { ChangeEvent } from 'react'
import {
  ChannelChips,
  CheckBox,
  Icon,
  StatusPill,
  Tag,
  TD,
  TH,
  WarningNote,
} from './AdminUI'
import { WARN_ICON } from './states'
import type { AttrRow, BrandRow, Column, GenericRow, ShopRow } from './types'

const CHEVRON = 'm9 18 6-6-6-6'

/** Selection wiring shared by all four tables. */
interface SelectionProps {
  /** Indices of the currently selected rows. */
  selected: Set<number>
  onToggleRow: (index: number) => void
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void
  allChecked: boolean
}

function SelectAllTh({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <th className="w-[38px] border-b border-adm-line py-[9px] pl-3.5">
      <CheckBox checked={checked} onChange={onChange} />
    </th>
  )
}

function RowCheck({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <td className="border-b border-adm-line-3 py-[11px] pl-3.5 align-top">
      <CheckBox
        checked={checked}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        className="mt-0.5"
      />
    </td>
  )
}

function ChevronCell() {
  return (
    <td className="border-b border-adm-line-3 py-2.5 pr-3.5 text-right align-top">
      <span className="inline-grid size-[26px] place-items-center rounded-md text-[15px] text-adm-faint-3">
        <Icon d={CHEVRON} />
      </span>
    </td>
  )
}

/* ------------------------------------------------- generic (categories / products) */

export function GenericTable({
  columns,
  rows,
  selected,
  onToggleRow,
  onSelectAll,
  allChecked,
}: SelectionProps & { columns: Column[]; rows: GenericRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[940px] border-collapse">
        <thead>
          <tr className="bg-adm-panel">
            <SelectAllTh checked={allChecked} onChange={onSelectAll} />
            {columns.map((c) => (
              <th
                key={c.label}
                className={`${TH} ${c.w || ''} ${c.align === 'right' ? 'text-right' : 'text-left'}`}
              >
                {c.label}
              </th>
            ))}
            <th className="w-11 border-b border-adm-line py-[9px] pr-3.5" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className={`${r.rowTint} hover:bg-[#fafbfc]`}>
              <RowCheck checked={selected.has(i)} onChange={() => onToggleRow(i)} />
              <td className={TD}>
                <div className="flex items-start gap-[9px]">
                  {r.thumb && (
                    <span className="grid size-8 shrink-0 place-items-center rounded-[7px] bg-adm-skel text-[11px] font-bold text-adm-muted">
                      {r.thumb}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-[7px]">
                      <span className="text-[13px] font-semibold text-adm-ink">{r.name}</span>
                      {r.badge && <Tag pill={r.badgePill}>{r.badge}</Tag>}
                    </div>
                    <div className="mt-[3px] text-[11.5px] text-adm-faint">{r.meta}</div>
                    {r.warning && <WarningNote tone={r.warnBox}>{r.warning}</WarningNote>}
                  </div>
                </div>
              </td>
              <td className={`${TD} text-[12.5px] whitespace-nowrap text-adm-slate`}>{r.col2}</td>
              <td className={`${TD} text-right text-[12.5px] whitespace-nowrap text-adm-slate`}>
                {r.col3}
              </td>
              <td className={TD}>
                <ChannelChips channels={r.channels} />
              </td>
              <td className={`${TD} whitespace-nowrap`}>
                <StatusPill dot={r.statusDot} pill={r.statusPill}>
                  {r.status}
                </StatusPill>
              </td>
              <td className={`${TD} text-[11.5px] whitespace-nowrap text-adm-faint`}>
                {r.updated}
              </td>
              <td className="border-b border-adm-line-3 py-2.5 pr-3.5 text-right align-top">
                <button
                  type="button"
                  title="Tác vụ"
                  className="grid size-[26px] cursor-pointer place-items-center rounded-md border border-transparent text-[15px] text-adm-faint transition-colors hover:border-adm-border hover:bg-[#f2f3f6] hover:text-adm-ink"
                >
                  <Icon d="M12 5h.01 M12 12h.01 M12 19h.01" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ brands */

export function BrandsTable({
  rows,
  selected,
  onToggleRow,
  onSelectAll,
  allChecked,
  onOpen,
}: SelectionProps & { rows: BrandRow[]; onOpen: (index: number) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1040px] border-collapse">
        <thead>
          <tr className="bg-adm-panel">
            <SelectAllTh checked={allChecked} onChange={onSelectAll} />
            <th className={`${TH} text-left`}>THƯƠNG HIỆU</th>
            <th className={`${TH} w-[190px] text-left`}>TRẠNG THÁI</th>
            <th className={`${TH} w-[100px] text-right`}>SẢN PHẨM</th>
            <th className={`${TH} w-[150px] text-left`}>ÁNH XẠ SÀN</th>
            <th className={`${TH} w-[118px] text-left`}>CẬP NHẬT</th>
            <th className="w-10 border-b border-adm-line py-[9px] pr-3.5" />
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr
              key={b.index}
              onClick={() => onOpen(b.index)}
              className={`${b.rowTint} cursor-pointer hover:bg-[#fafbfc]`}
            >
              <RowCheck checked={selected.has(b.index)} onChange={() => onToggleRow(b.index)} />
              <td className={TD}>
                <div className="flex items-start gap-2.5">
                  <span
                    className={`grid size-[34px] shrink-0 place-items-center rounded-lg border border-adm-line-2 text-[11.5px] font-bold text-adm-slate ${b.logoBg}`}
                  >
                    {b.logo}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-semibold text-adm-ink">{b.name}</span>
                      {b.flag && (
                        <span
                          className={`inline-flex items-center gap-[5px] rounded-[5px] px-[7px] py-0.5 text-[10.5px] font-bold ${b.flagPill}`}
                        >
                          <Icon d={b.flagIcon} className="text-xs" />
                          {b.flag}
                        </span>
                      )}
                    </div>
                    <div className="mt-[3px] text-[11.5px] text-adm-faint">{b.meta}</div>
                    {b.warning && <WarningNote tone={b.warnBox}>{b.warning}</WarningNote>}
                  </div>
                </div>
              </td>
              <td className={TD}>
                <StatusPill dot={b.statusDot} pill={b.statusPill}>
                  {b.status}
                </StatusPill>
              </td>
              <td className={`${TD} text-right`}>
                <div className="text-[12.5px] font-semibold">{b.productCount}</div>
                <div className="text-[10.5px] text-adm-faint-2">sản phẩm</div>
              </td>
              <td className={TD}>
                <div className="mb-[5px]">
                  <ChannelChips channels={b.channels} />
                </div>
                <div className="text-[10.5px] text-adm-faint">{b.channelNote}</div>
              </td>
              <td className={`${TD} text-[11.5px] whitespace-nowrap text-adm-faint`}>{b.updated}</td>
              <ChevronCell />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------- shops */

export function ShopsTable({
  rows,
  selected,
  onToggleRow,
  onSelectAll,
  allChecked,
  onOpen,
  alert,
}: SelectionProps & {
  rows: ShopRow[]
  onOpen: (index: number) => void
  /** Banner text when connections are expiring; empty string hides it. */
  alert: string
}) {
  return (
    <>
      {alert && (
        <div className="flex items-center gap-[11px] border-b border-err/25 bg-err/8 px-3.5 py-[11px]">
          <span className="grid size-6 shrink-0 place-items-center rounded-[7px] bg-err text-sm text-white">
            <Icon d={WARN_ICON} />
          </span>
          <span className="text-[12.5px] leading-[1.5] text-err-deep">
            <strong>{alert}</strong> — mọi đồng bộ sang cửa hàng đó sẽ dừng khi token hết hạn. Cấp
            lại quyền trước ngày hết hạn để không mất đơn.
          </span>
          <button
            type="button"
            className="ml-auto h-[29px] cursor-pointer rounded-[7px] bg-err-mid px-[11px] text-xs font-semibold whitespace-nowrap text-white transition-[filter] hover:brightness-110"
          >
            Cấp lại quyền ngay
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1040px] border-collapse">
          <thead>
            <tr className="bg-adm-panel">
              <SelectAllTh checked={allChecked} onChange={onSelectAll} />
              <th className={`${TH} text-left`}>CỬA HÀNG</th>
              <th className={`${TH} w-[150px] text-left`}>KHU VỰC / LOẠI</th>
              <th className={`${TH} w-[186px] text-left`}>KẾT NỐI</th>
              <th className={`${TH} w-[176px] text-left`}>TOKEN HẾT HẠN</th>
              <th className={`${TH} w-[118px] text-left`}>ĐỒNG BỘ CUỐI</th>
              <th className="w-10 border-b border-adm-line py-[9px] pr-3.5" />
            </tr>
          </thead>
          <tbody>
            {rows.map((sh) => (
              <tr
                key={sh.index}
                onClick={() => onOpen(sh.index)}
                className={`${sh.rowTint} cursor-pointer hover:bg-[#fafbfc]`}
              >
                <RowCheck checked={selected.has(sh.index)} onChange={() => onToggleRow(sh.index)} />
                <td className={TD}>
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`grid size-[30px] shrink-0 place-items-center rounded-lg text-[11px] font-bold text-white ${sh.chBg}`}
                    >
                      {sh.chCode}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-adm-ink">{sh.name}</div>
                      <div className="mt-[3px] text-[11.5px] text-adm-faint">{sh.meta}</div>
                      {sh.warning && (
                        <WarningNote tone={sh.warnBox} max="max-w-[64ch]">
                          {sh.warning}
                        </WarningNote>
                      )}
                    </div>
                  </div>
                </td>
                <td className={`${TD} text-[12.5px] text-adm-slate`}>
                  <div>{sh.region}</div>
                  <div className="mt-0.5 text-[11px] text-adm-faint-2">{sh.type}</div>
                </td>
                <td className={TD}>
                  <StatusPill dot={sh.statusDot} pill={sh.statusPill}>
                    {sh.status}
                  </StatusPill>
                </td>
                <td className={TD}>
                  <div
                    className={`text-[12.5px] ${sh.expiryStrong ? 'font-bold' : 'font-medium'} ${sh.expiryTone}`}
                  >
                    {sh.expiry}
                  </div>
                  <div className={`mt-0.5 text-[11px] ${sh.expiryNoteTone}`}>{sh.expiryNote}</div>
                </td>
                <td className={`${TD} text-[11.5px] whitespace-nowrap text-adm-faint`}>
                  {sh.lastSync}
                </td>
                <ChevronCell />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

/* -------------------------------------------------------------- attributes */

export function AttributesTable({
  rows,
  selected,
  onToggleRow,
  onSelectAll,
  allChecked,
  onOpen,
}: SelectionProps & { rows: AttrRow[]; onOpen: (index: number) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1040px] border-collapse">
        <thead>
          <tr className="bg-adm-panel">
            <SelectAllTh checked={allChecked} onChange={onSelectAll} />
            <th className={`${TH} text-left`}>THUỘC TÍNH</th>
            <th className={`${TH} w-[124px] text-left`}>KIỂU DỮ LIỆU</th>
            <th className={`${TH} w-[170px] text-left`}>VAI TRÒ</th>
            <th className={`${TH} w-[100px] text-right`}>DANH MỤC</th>
            <th className={`${TH} w-[150px] text-left`}>ÁNH XẠ SÀN</th>
            <th className={`${TH} w-[118px] text-left`}>CẬP NHẬT</th>
            <th className="w-10 border-b border-adm-line py-[9px] pr-3.5" />
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr
              key={a.index}
              onClick={() => onOpen(a.index)}
              className={`${a.rowTint} cursor-pointer hover:bg-[#fafbfc]`}
            >
              <RowCheck checked={selected.has(a.index)} onChange={() => onToggleRow(a.index)} />
              <td className={TD}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-semibold text-adm-ink">{a.name}</span>
                  {a.required && <Tag pill="bg-err/10 text-err-deep">BẮT BUỘC</Tag>}
                  {a.badge && <Tag>{a.badge}</Tag>}
                </div>
                <div className="mt-[3px] text-[11.5px] text-adm-faint">{a.meta}</div>
                {a.warning && (
                  <WarningNote tone={a.warnBox} max="max-w-[60ch]">
                    {a.warning}
                  </WarningNote>
                )}
              </td>
              <td className={TD}>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-adm-chip px-2 py-[3px] text-[11.5px] font-semibold whitespace-nowrap text-adm-slate">
                  <Icon d={a.typeIcon} className="text-[13px] text-adm-faint" />
                  {a.typeLabel}
                </span>
              </td>
              <td className={TD}>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md border px-[9px] py-1 text-[11.5px] font-bold whitespace-nowrap ${a.roleChip}`}
                >
                  <Icon d={a.roleIcon} className="text-sm" />
                  {a.roleLabel}
                </span>
              </td>
              <td className={`${TD} text-right`}>
                <div className="text-[12.5px] font-semibold text-adm-ink">{a.catCount}</div>
                <div className="text-[10.5px] text-adm-faint-2">danh mục</div>
              </td>
              <td className={TD}>
                <div className="mb-[5px]">
                  <ChannelChips channels={a.channels} />
                </div>
                <div className="text-[10.5px] text-adm-faint">{a.valueProgress}</div>
              </td>
              <td className={`${TD} text-[11.5px] whitespace-nowrap text-adm-faint`}>{a.updated}</td>
              <ChevronCell />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
