import { Icon, StatusPill, CheckBox, SECTION_LABEL, TH } from './AdminUI'
import Drawer, { DrawerClose, DrawerFooter } from './Drawer'
import { CHECK_ICON, PLUS_ICON, SPARK_ICON, WARN_ICON } from './states'
import type { AttrPanel, BrandDetail, ShopDetail } from './types'

/* ------------------------------------------------------------- brand panel */

export function BrandPanel({ brand, onClose }: { brand: BrandDetail; onClose: () => void }) {
  return (
    <Drawer onClose={onClose}>
      <div className="flex flex-shrink-0 items-start gap-[13px] border-b border-adm-line px-5 pt-4 pb-3.5">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-[10px] border border-adm-line-2 text-sm font-bold text-adm-slate ${brand.logoBg}`}
        >
          {brand.logo}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-[9px]">
            <h2 className="text-[17px] font-bold tracking-[-0.01em]">{brand.name}</h2>
            <StatusPill dot={brand.statusDot} pill={brand.statusPill}>
              {brand.status}
            </StatusPill>
          </div>
          <p className="mt-1.5 text-xs text-adm-faint">{brand.meta}</p>
        </div>
        <DrawerClose onClose={onClose} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {brand.request && (
          <div className="border-b border-adm-line-2 bg-adm-panel px-5 py-3.5">
            <div className={`${SECTION_LABEL} mb-2.5`}>YÊU CẦU ĐĂNG KÝ THƯƠNG HIỆU MỚI</div>
            <div
              className={`flex flex-wrap items-center gap-[11px] rounded-[9px] border bg-white px-[13px] py-[11px] ${brand.request.border}`}
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-bold ${brand.request.pill}`}
              >
                <Icon d={brand.request.icon} className="text-[13px]" />
                {brand.request.label}
              </span>
              <span className="text-[12.5px] text-adm-slate">{brand.request.note}</span>
              <span className="ml-auto text-[11.5px] text-adm-faint">{brand.request.date}</span>
            </div>
          </div>
        )}

        <div className="border-b border-adm-line-2 px-5 py-3.5">
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className={SECTION_LABEL}>ÁNH XẠ THEO SÀN</span>
            <button
              type="button"
              className="ml-auto flex h-[29px] cursor-pointer items-center gap-1.5 rounded-[7px] bg-brand px-[11px] text-xs font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <Icon d={SPARK_ICON} className="text-sm" />
              Gợi ý ánh xạ thương hiệu
            </button>
          </div>

          <div className="flex flex-col gap-[9px]">
            {brand.mappings.map((mp) => (
              <div
                key={mp.code}
                className={`rounded-[9px] border bg-white px-[13px] py-3 ${mp.border}`}
              >
                <div className="flex flex-wrap items-center gap-[9px]">
                  <span
                    className={`grid size-5 place-items-center rounded-md text-[10px] font-bold text-white ${mp.dot}`}
                  >
                    {mp.code}
                  </span>
                  <span className="text-[13px] font-semibold">{mp.name}</span>
                  <span
                    className={`inline-flex items-center rounded-md px-[9px] py-[3px] text-[11.5px] font-bold ${mp.badgePill}`}
                  >
                    {mp.badge}
                  </span>
                </div>

                <div className="mt-[9px] flex flex-wrap items-baseline gap-2">
                  <span className="text-[11.5px] text-adm-faint">Thương hiệu sàn</span>
                  {mp.linked ? (
                    <>
                      <span
                        className={`text-[12.5px] font-medium ${
                          mp.brokenTarget ? 'text-err-deep line-through' : 'text-adm-ink'
                        }`}
                      >
                        {mp.target}
                      </span>
                      <span className="text-[10.5px] text-adm-faint-2">{mp.targetId}</span>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="flex cursor-pointer items-center gap-1.5 rounded-[7px] border border-dashed border-warn/70 bg-warn/10 px-[9px] py-1 text-[11.5px] font-semibold text-warn-deep transition-colors hover:bg-warn/20"
                    >
                      <Icon d={PLUS_ICON} className="text-[13px]" />
                      {mp.action}
                    </button>
                  )}
                </div>

                <div
                  className={`mt-[9px] flex items-start gap-[7px] border-t border-dashed border-adm-line-2 pt-[9px] text-xs leading-[1.5] ${mp.noteTone}`}
                >
                  <Icon d={mp.noteIcon} className="mt-px shrink-0 text-sm" />
                  <span>{mp.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pt-3.5 pb-5">
          <div className={`${SECTION_LABEL} mb-1.5`}>HIỆU LỰC THEO NGÀNH HÀNG</div>
          <p className="mb-2.5 max-w-[72ch] text-xs leading-[1.55] text-adm-muted">
            Trên các sàn, thương hiệu chỉ hợp lệ trong một số ngành hàng nhất định — thương hiệu
            được duyệt ở Thời trang có thể không tồn tại ở Bách hoá. Ánh xạ phải kiểm theo từng danh
            mục.
          </p>
          <div className="overflow-hidden rounded-[9px] border border-adm-line-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-adm-panel">
                  <th className="border-b border-adm-line-2 px-3 py-2 text-left text-[10.5px] font-bold tracking-[0.05em] text-adm-faint">
                    NGÀNH HÀNG
                  </th>
                  {['S', 'L', 'T'].map((c) => (
                    <th
                      key={c}
                      className="border-b border-adm-line-2 px-2.5 py-2 text-center text-[10.5px] font-bold text-adm-faint"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brand.scope.map((sc) => (
                  <tr key={sc.name}>
                    <td className="border-b border-adm-line-4 px-3 py-2 text-[12.5px] text-adm-ink">
                      {sc.name}
                    </td>
                    {sc.cells.map((cell, i) => (
                      <td
                        key={i}
                        className="border-b border-adm-line-4 px-2.5 py-2 text-center"
                      >
                        <span
                          title={cell.title}
                          className={`inline-grid size-[19px] place-items-center rounded-[5px] text-[11px] font-bold ${cell.chip}`}
                        >
                          {cell.mark}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DrawerFooter rollup={brand.rollup} onClose={onClose} />
    </Drawer>
  )
}

/* -------------------------------------------------------------- shop panel */

export function ShopPanel({ shop, onClose }: { shop: ShopDetail; onClose: () => void }) {
  return (
    <Drawer onClose={onClose}>
      <div className="flex flex-shrink-0 items-start gap-[13px] border-b border-adm-line px-5 pt-4 pb-3.5">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-[10px] text-[13px] font-bold text-white ${shop.chBg}`}
        >
          {shop.chCode}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-[9px]">
            <h2 className="text-[17px] font-bold tracking-[-0.01em]">{shop.name}</h2>
            <StatusPill dot={shop.statusDot} pill={shop.statusPill}>
              {shop.status}
            </StatusPill>
          </div>
          <p className="mt-1.5 text-xs text-adm-faint">{shop.meta}</p>
        </div>
        <DrawerClose onClose={onClose} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {shop.alert && (
          <div
            className={`mx-5 mt-3.5 flex items-start gap-2.5 rounded-[9px] border px-[13px] py-3 ${shop.alert.box}`}
          >
            <Icon d={WARN_ICON} className={`mt-px shrink-0 text-[17px] ${shop.alert.tone}`} />
            <div>
              <div className={`text-[13px] font-bold ${shop.alert.tone}`}>{shop.alert.title}</div>
              <p className="mt-[5px] max-w-[60ch] text-xs leading-[1.55] text-adm-slate">
                {shop.alert.body}
              </p>
              <button
                type="button"
                className={`mt-2.5 h-[30px] cursor-pointer rounded-[7px] px-3 text-xs font-semibold text-white transition-[filter] hover:brightness-110 ${shop.alert.btn}`}
              >
                {shop.alert.action}
              </button>
            </div>
          </div>
        )}

        <div className="border-b border-adm-line-2 px-5 py-3.5">
          <div className={`${SECTION_LABEL} mb-2.5`}>THÔNG TIN KẾT NỐI</div>
          <div className="grid grid-cols-1 gap-[9px] sm:grid-cols-2">
            {shop.info.map((i) => (
              <div
                key={i.label}
                className="rounded-lg border border-adm-line-2 bg-white px-[11px] py-[9px]"
              >
                <div className="text-[10.5px] font-bold tracking-[0.04em] text-adm-faint-2">
                  {i.label}
                </div>
                <div
                  className={`mt-1 text-[12.5px] ${i.strong ? 'font-bold' : 'font-medium'} ${
                    i.tone || 'text-adm-ink'
                  }`}
                >
                  {i.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pt-3.5 pb-5">
          <div className="mb-1.5 flex items-center gap-[9px]">
            <span className={SECTION_LABEL}>QUYỀN API ĐÃ CẤP (SCOPES)</span>
            <span
              className={`rounded-[5px] px-[7px] py-px text-[11px] font-semibold ${shop.scopePill}`}
            >
              {shop.scopeRatio}
            </span>
          </div>
          <p className="mb-2.5 max-w-[72ch] text-xs leading-[1.55] text-adm-muted">
            Thiếu quyền bắt buộc sẽ chặn đồng bộ sang cửa hàng này, kể cả khi danh mục, thuộc tính và
            thương hiệu đã ánh xạ đủ.
          </p>
          <div className="flex flex-col gap-1.5">
            {shop.scopes.map((sp) => (
              <div
                key={sp.name}
                className={`flex items-center gap-2.5 rounded-lg border px-[11px] py-[9px] ${sp.box}`}
              >
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-md text-xs text-white ${sp.markBg}`}
                >
                  <Icon d={sp.icon} />
                </span>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-semibold text-adm-ink">{sp.name}</div>
                  <div className="mt-0.5 text-[11px] text-adm-faint">{sp.desc}</div>
                </div>
                <span
                  className={`ml-auto rounded-md px-2 py-[2.5px] text-[11px] font-bold whitespace-nowrap ${sp.tagPill}`}
                >
                  {sp.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DrawerFooter
        rollup={shop.rollup}
        onClose={onClose}
        primary="Cấp lại quyền"
        extra={
          <button
            type="button"
            className="h-[34px] cursor-pointer rounded-lg border border-err/30 bg-white px-[13px] text-[12.5px] font-semibold text-err-deep transition-colors hover:bg-err/7"
          >
            Ngắt kết nối
          </button>
        }
      />
    </Drawer>
  )
}

/* --------------------------------------------------- attribute value panel */

export function AttributePanel({
  panel,
  suggest,
  unmappedOnly,
  onToggleSuggest,
  onToggleUnmapped,
  onClose,
}: {
  panel: AttrPanel
  suggest: boolean
  unmappedOnly: boolean
  onToggleSuggest: () => void
  onToggleUnmapped: () => void
  onClose: () => void
}) {
  return (
    <Drawer width="w-[min(860px,100%)]" onClose={onClose}>
      <div className="flex-shrink-0 border-b border-adm-line px-5 pt-4 pb-3.5">
        <div className="flex items-start gap-3.5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-[9px]">
              <h2 className="text-[17px] font-bold tracking-[-0.01em]">{panel.name}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-adm-chip px-2 py-[3px] text-[11.5px] font-semibold text-adm-slate">
                <Icon d={panel.typeIcon} className="text-[13px] text-adm-faint" />
                {panel.typeLabel}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-[9px] py-1 text-[11.5px] font-bold ${panel.roleChip}`}
              >
                <Icon d={panel.roleIcon} className="text-sm" />
                {panel.roleLabel}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-adm-faint">{panel.meta}</p>
          </div>
          <DrawerClose onClose={onClose} />
        </div>

        {panel.roleNote && (
          <div className="mt-3 flex items-start gap-2 rounded-lg border border-brand/22 bg-brand/7 px-[11px] py-[9px] text-xs leading-[1.55] text-brand-ink">
            <Icon
              d="M6 3v12 M18 6a3 3 0 1 0 0-.01 M6 21a3 3 0 1 0 0-.01 M18 9a9 9 0 0 1-9 9"
              className="mt-px text-[15px]"
            />
            <span>{panel.roleNote}</span>
          </div>
        )}
      </div>

      {/* per-marketplace completeness */}
      <div className="flex-shrink-0 border-b border-adm-line-2 bg-adm-panel px-5 py-3.5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {panel.summary.map((s) => (
            <div
              key={s.code}
              className="rounded-[9px] border border-adm-line bg-white px-3 py-[11px]"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`grid size-5 place-items-center rounded-md text-[10px] font-bold text-white ${s.fill}`}
                >
                  {s.code}
                </span>
                <span className="text-[12.5px] font-semibold">{s.name}</span>
                <span className={`ml-auto text-xs font-bold ${s.textTone}`}>{s.ratio}</span>
              </div>
              <div className="mt-[9px] h-[5px] overflow-hidden rounded-[3px] bg-adm-skel">
                <div className={`h-full rounded-[3px] ${s.fill}`} style={{ width: `${s.pct}%` }} />
              </div>
              <div className="mt-[7px] text-[11px] text-adm-faint">{s.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* value toolbar */}
      <div className="flex flex-shrink-0 flex-wrap items-center gap-[9px] border-b border-adm-line-2 px-5 py-3">
        <div className="relative max-w-[260px] min-w-[190px] flex-1">
          <Icon
            d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-4.3-4.3"
            className="absolute top-[9px] left-[11px] text-[15px] text-adm-faint-2"
          />
          <input
            placeholder="Tìm giá trị…"
            className="h-[34px] w-full rounded-lg border border-adm-border bg-white pr-3 pl-[34px] text-[12.5px] text-adm-ink outline-none focus:border-brand focus:shadow-[0_0_0_3px_oklch(0.55_0.2_264/0.12)]"
          />
        </div>
        <button
          type="button"
          onClick={onToggleUnmapped}
          className={`flex h-[34px] cursor-pointer items-center gap-[7px] rounded-lg border px-[11px] text-[12.5px] font-semibold ${
            unmappedOnly
              ? 'border-brand/35 bg-brand/9 text-brand-ink-2'
              : 'border-adm-border bg-white text-adm-slate'
          }`}
        >
          <Icon d="M3 6h18 M7 12h10 M10 18h4" className="text-sm" />
          Chỉ giá trị chưa ánh xạ
          <span className="rounded-[5px] bg-warn/20 px-1.5 py-px text-[11px] font-bold text-warn-deep">
            {panel.pendingCount}
          </span>
        </button>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            className="flex h-[34px] cursor-pointer items-center gap-[7px] rounded-lg border border-adm-border bg-white px-3 text-[12.5px] font-semibold text-adm-ink transition-colors hover:border-adm-border-2 hover:bg-adm-bg"
          >
            <Icon
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3"
              className="text-[15px]"
            />
            Nhập giá trị hàng loạt
          </button>
          <button
            type="button"
            onClick={onToggleSuggest}
            className={`flex h-[34px] cursor-pointer items-center gap-[7px] rounded-lg px-3 text-[12.5px] font-semibold text-white transition-[filter] hover:brightness-105 ${
              suggest ? 'bg-brand-800' : 'bg-brand'
            }`}
          >
            <Icon d={SPARK_ICON} className="text-[15px]" />
            {suggest ? 'Đang hiện gợi ý' : 'Gợi ý ánh xạ tự động'}
          </button>
        </div>
      </div>

      {/* value mapping table */}
      <div className="flex-1 overflow-auto">
        {panel.hasValues ? (
          <table className="w-full min-w-[780px] border-collapse">
            <thead>
              <tr>
                <th
                  className={`${TH} sticky top-0 z-1 w-[34%] bg-adm-panel pl-5 text-left`}
                >
                  GIÁ TRỊ NỘI BỘ
                </th>
                {panel.headers.map((h) => (
                  <th key={h.code} className={`${TH} sticky top-0 z-1 bg-adm-panel text-left`}>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`grid size-[17px] place-items-center rounded-[5px] text-[9.5px] font-bold text-white ${h.fill}`}
                      >
                        {h.code}
                      </span>
                      {h.name}
                    </span>
                  </th>
                ))}
                <th
                  className={`${TH} sticky top-0 z-1 w-16 bg-adm-panel pr-5 text-right`}
                >
                  ĐỦ
                </th>
              </tr>
            </thead>
            <tbody>
              {panel.values.map((v) => (
                <tr key={v.code} className={v.rowTint}>
                  <td className="border-b border-adm-line-3 py-[9px] pr-3 pl-5 align-middle">
                    <div className="flex items-center gap-[9px]">
                      <CheckBox />
                      <div className="min-w-0">
                        <div className="text-[12.5px] font-semibold text-adm-ink">{v.name}</div>
                        <div className="text-[10.5px] text-adm-faint-2">{v.code}</div>
                      </div>
                    </div>
                  </td>

                  {v.cells.map((c, i) => (
                    <td key={i} className="border-b border-adm-line-3 px-3 py-[9px] align-middle">
                      {c.mapped && (
                        <div>
                          <div className="text-[12.5px] text-adm-ink">{c.label}</div>
                          <div className="text-[10.5px] text-adm-faint-2">{c.id}</div>
                        </div>
                      )}
                      {c.broken && (
                        <div>
                          <div className="text-[12.5px] text-err-deep line-through">{c.label}</div>
                          <div className="mt-0.5 flex items-center gap-1 text-[10.5px] font-semibold text-err-deep">
                            <Icon d={WARN_ICON} className="text-xs" />
                            {c.note}
                          </div>
                        </div>
                      )}
                      {c.suggested && (
                        <button
                          type="button"
                          className="flex w-full cursor-pointer items-center gap-[7px] rounded-[7px] border border-dashed border-brand/45 bg-brand/6 px-2 py-[5px] text-left transition-colors hover:bg-brand/12"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-semibold text-brand-ink">
                              {c.suggestLabel}
                            </span>
                            <span className="block text-[10px] text-brand-600">
                              {c.suggestNote}
                            </span>
                          </span>
                          <Icon d={CHECK_ICON} className="text-[15px] text-brand-600" />
                        </button>
                      )}
                      {c.unmapped && (
                        <button
                          type="button"
                          className="flex cursor-pointer items-center gap-1.5 rounded-[7px] border border-dashed border-warn/70 bg-warn/10 px-[9px] py-[5px] text-[11.5px] font-semibold text-warn-deep transition-colors hover:bg-warn/20"
                        >
                          <Icon d={PLUS_ICON} className="text-[13px]" />
                          Chọn giá trị
                        </button>
                      )}
                    </td>
                  ))}

                  <td className="border-b border-adm-line-3 py-[9px] pr-5 pl-3 text-right align-middle">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-[2.5px] text-[11px] font-bold ${v.tallyPill}`}
                    >
                      {v.tally}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <span className="grid size-12 place-items-center rounded-[13px] bg-adm-chip text-[23px] text-adm-faint">
              <Icon d="M4 7V4h16v3 M9 20h6 M12 4v16" />
            </span>
            <h3 className="mt-3.5 text-[15px] font-bold">
              Thuộc tính kiểu {panel.typeLabel} — không có danh sách giá trị
            </h3>
            <p className="mt-[7px] max-w-[48ch] text-[12.5px] leading-[1.6] text-adm-muted">
              Chỉ cần ánh xạ ở cấp thuộc tính. Đơn vị và định dạng phải khớp yêu cầu của từng sàn
              trước khi đăng sản phẩm.
            </p>
          </div>
        )}
      </div>

      <DrawerFooter rollup={panel.rollup} onClose={onClose} />
    </Drawer>
  )
}
