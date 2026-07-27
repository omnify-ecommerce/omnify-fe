import { ChannelChips, ChannelDots, Icon, StatusPill, SECTION_LABEL } from './AdminUI'
import { CATS } from './data'
import { PLUS_ICON, SPARK_ICON } from './states'
import type { CatDetail, TreeNode } from './types'

const CHEVRON = 'm9 18 6-6-6-6'

interface TreeRowProps {
  node: TreeNode
  onSelect: (code: string) => void
  onToggle: (code: string) => void
}

function TreeRow({ node, onSelect, onToggle }: TreeRowProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(node.code)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(node.code)
        }
      }}
      style={{ paddingLeft: 12 + node.depth * 16 }}
      className={`flex cursor-pointer items-center gap-2 border-l-2 py-1.5 pr-3 ${
        node.selected ? 'border-brand bg-brand/9' : 'border-transparent hover:bg-adm-bg'
      }`}
    >
      {node.hasChildren ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggle(node.code)
          }}
          aria-label={node.open ? 'Thu gọn' : 'Mở rộng'}
          className={`grid size-[18px] shrink-0 cursor-pointer place-items-center text-sm text-adm-faint-2 transition-transform duration-[120ms] ${
            node.open ? 'rotate-90' : ''
          }`}
        >
          <Icon d={CHEVRON} />
        </button>
      ) : (
        <span className="w-[18px] shrink-0" />
      )}

      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-[12.5px] ${node.bold ? 'font-semibold' : 'font-medium'} ${
            node.selected ? 'text-brand-ink' : 'text-adm-ink'
          }`}
        >
          {node.name}
        </span>
        <span className="block text-[10.5px] text-adm-faint-2">
          {node.code} · {node.skus} SKU
        </span>
      </span>

      <ChannelDots channels={node.channels} />
    </div>
  )
}

interface CategoryPaneProps {
  tree: TreeNode[]
  cat: CatDetail
  expandLabel: string
  onExpandAll: () => void
  onSelect: (code: string) => void
  onToggle: (code: string) => void
  /** Jump to an attribute's mapping panel by attribute code. */
  onOpenAttr: (code: string) => void
  onGoAttributes: () => void
}

export default function CategoryPane({
  tree,
  cat,
  expandLabel,
  onExpandAll,
  onSelect,
  onToggle,
  onOpenAttr,
  onGoAttributes,
}: CategoryPaneProps) {
  return (
    <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-[minmax(290px,368px)_1fr]">
      {/* tree */}
      <div className="flex min-w-0 flex-col border-r border-adm-line-2">
        <div className="flex items-center gap-[9px] border-b border-adm-line-2 bg-adm-panel px-3 py-2.5">
          <span className={SECTION_LABEL}>CÂY DANH MỤC NỘI BỘ</span>
          <span className="rounded-[5px] bg-adm-chip px-[7px] py-px text-[11px] font-semibold text-adm-muted">
            {CATS.length}
          </span>
          <button
            type="button"
            onClick={onExpandAll}
            className="ml-auto h-[26px] cursor-pointer rounded-md border border-adm-border bg-white px-[9px] text-[11.5px] font-semibold text-adm-slate transition-colors hover:bg-[#f2f3f6]"
          >
            {expandLabel}
          </button>
        </div>
        <div className="max-h-[560px] flex-1 overflow-y-auto py-1.5">
          {tree.map((node) => (
            <TreeRow key={node.code} node={node} onSelect={onSelect} onToggle={onToggle} />
          ))}
        </div>
      </div>

      {/* detail */}
      <div className="flex min-w-0 flex-col overflow-hidden">
        <div className="border-b border-adm-line-2 px-5 pt-4 pb-3.5">
          <div className="flex flex-wrap items-start gap-3.5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-[9px]">
                <h2 className="text-[17px] font-bold tracking-[-0.01em]">{cat.name}</h2>
                <StatusPill dot={cat.statusDot} pill={cat.statusPill}>
                  {cat.status}
                </StatusPill>
              </div>
              <p className="mt-1.5 text-xs text-adm-faint">{cat.meta}</p>
            </div>
            <div className="ml-auto flex flex-wrap gap-[7px]">
              <button
                type="button"
                className="flex h-[31px] cursor-pointer items-center gap-1.5 rounded-[7px] border border-adm-border bg-white px-[11px] text-xs font-semibold text-adm-ink transition-colors hover:bg-adm-bg"
              >
                <Icon d={PLUS_ICON} className="text-sm" />
                Thêm danh mục con
              </button>
              <button
                type="button"
                className="flex h-[31px] cursor-pointer items-center gap-1.5 rounded-[7px] border border-adm-border bg-white px-[11px] text-xs font-semibold text-adm-ink transition-colors hover:bg-adm-bg"
              >
                <Icon d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" className="text-sm" />
                Sửa
              </button>
              <button
                type="button"
                className="flex h-[31px] cursor-pointer items-center gap-1.5 rounded-[7px] border border-err/30 bg-white px-[11px] text-xs font-semibold text-err-deep transition-colors hover:bg-err/7"
              >
                <Icon d="M3 6h18 M8 6V4h8v2 M7 6l1 14h8l1-14" className="text-sm" />
                Xoá
              </button>
            </div>
          </div>
          <p className="mt-3 max-w-[76ch] text-[12.5px] leading-[1.6] text-adm-slate">{cat.desc}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* per-marketplace mapping + readiness */}
          {cat.mappings.length > 0 && (
            <div className="border-b border-adm-line-2 bg-adm-panel px-5 py-3.5">
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className={SECTION_LABEL}>ÁNH XẠ SÀN &amp; MỨC SẴN SÀNG</span>
                <button
                  type="button"
                  className="ml-auto flex h-[29px] cursor-pointer items-center gap-1.5 rounded-[7px] bg-brand px-[11px] text-xs font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  <Icon d={SPARK_ICON} className="text-sm" />
                  Gợi ý ánh xạ danh mục
                </button>
              </div>

              <div className="flex flex-col gap-[9px]">
                {cat.mappings.map((mp) => (
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
                        className={`inline-flex items-center gap-1.5 rounded-md px-[9px] py-[3px] text-[11.5px] font-bold ${mp.badgePill}`}
                      >
                        {mp.badge}
                      </span>
                    </div>

                    <div className="mt-[9px] flex flex-wrap items-baseline gap-2">
                      <span className="text-[11.5px] text-adm-faint">Danh mục sàn</span>
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
                          Chọn danh mục sàn
                        </button>
                      )}
                    </div>

                    <div className="mt-2.5 flex flex-col gap-1.5 border-t border-dashed border-adm-line-2 pt-2.5">
                      {mp.checks.map((k) => (
                        <div
                          key={k.label}
                          className={`flex items-start gap-[7px] text-xs leading-[1.5] ${k.tone}`}
                        >
                          <Icon d={k.icon} className="mt-px shrink-0 text-sm" />
                          <span>{k.label}</span>
                        </div>
                      ))}
                      {mp.gaps.length > 0 && (
                        <div className="mt-0.5 flex flex-wrap items-center gap-[7px]">
                          <span className="text-[11px] text-adm-faint">Thuộc tính cần xử lý</span>
                          {mp.gaps.map((g) => (
                            <button
                              key={g.code}
                              type="button"
                              onClick={() => onOpenAttr(g.code)}
                              className="flex h-6 cursor-pointer items-center gap-[5px] rounded-md border border-brand/30 bg-brand/7 px-2 text-[11.5px] font-semibold text-brand-ink-2 transition-colors hover:bg-brand/15"
                            >
                              {g.label}
                              <Icon d="M7 17 17 7 M7 7h10v10" className="text-xs" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* required attributes */}
          {cat.attrs.length > 0 && (
            <div className="border-b border-adm-line-2 px-5 py-3.5">
              <div className="mb-2.5 flex flex-wrap items-center gap-[9px]">
                <span className={SECTION_LABEL}>THUỘC TÍNH BẮT BUỘC CỦA DANH MỤC</span>
                <span className="text-[11px] text-adm-faint-2">
                  — gán từ hệ thống Thuộc tính, không định nghĩa tại đây
                </span>
                <button
                  type="button"
                  onClick={onGoAttributes}
                  className="ml-auto flex h-[27px] cursor-pointer items-center gap-[5px] rounded-md border border-adm-border bg-white px-[9px] text-[11.5px] font-semibold text-brand-ink-2 transition-colors hover:bg-adm-bg"
                >
                  Mở màn hình Thuộc tính
                  <Icon d="M7 17 17 7 M7 7h10v10" className="text-xs" />
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                {cat.attrs.map((at) => (
                  <button
                    key={at.rawCode}
                    type="button"
                    onClick={() => onOpenAttr(at.rawCode)}
                    className="flex w-full cursor-pointer flex-wrap items-center gap-2.5 rounded-lg border border-adm-line-2 bg-white px-2.5 py-2 text-left transition-colors hover:border-adm-border-2 hover:bg-adm-panel"
                  >
                    <span className="text-[12.5px] font-semibold text-adm-ink">{at.name}</span>
                    <span className="text-[10.5px] text-adm-faint-2">{at.code}</span>
                    <span
                      className={`inline-flex items-center rounded-[5px] border px-[7px] py-0.5 text-[10.5px] font-bold ${at.roleChip}`}
                    >
                      {at.roleLabel}
                    </span>
                    <span className="ml-auto">
                      <ChannelChips channels={at.channels} size={20} />
                    </span>
                    <span className="min-w-[104px] text-right text-[11px] text-adm-faint">
                      {at.progress}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* children */}
          <div className="px-5 pt-3.5 pb-5">
            <div className={`${SECTION_LABEL} mb-2.5`}>DANH MỤC CON ({cat.childCount})</div>
            {cat.childCount > 0 ? (
              <div className="flex flex-col gap-[5px]">
                {cat.children.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => onSelect(c.code)}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg border border-adm-line-2 px-2.5 py-2 text-left transition-colors hover:border-adm-border-2 hover:bg-adm-panel"
                  >
                    <Icon d="M4 4v12a4 4 0 0 0 4 4h12" className="text-sm text-adm-faint-3" />
                    <span className="text-[12.5px] font-semibold">{c.name}</span>
                    <span className="text-[10.5px] text-adm-faint-2">
                      {c.code} · {c.skus} SKU
                    </span>
                    <span className="ml-auto">
                      <ChannelDots channels={c.channels} />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[12.5px] text-adm-faint">
                Danh mục lá — không có danh mục con. Sản phẩm được gán trực tiếp vào đây.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
