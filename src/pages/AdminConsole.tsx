import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  BulkBar,
  EmptyState,
  Legend,
  LoadingState,
  PageHead,
  Pager,
  Sidebar,
  Toolbar,
  Topbar,
} from '../admin/Chrome'
import CategoryPane from '../admin/CategoryPane'
import { AttributePanel, BrandPanel, ShopPanel } from '../admin/Panels'
import { AttributesTable, BrandsTable, GenericTable, ShopsTable } from '../admin/Tables'
import { ATTRS, BRANDS_DATA, CATS, SHOPS } from '../admin/data'
import { buildAttrRows, buildCat, buildPanel, buildTree, childrenOf } from '../admin/logic'
import {
  buildBrand,
  buildBrandRows,
  buildShop,
  buildShopRows,
  expiringShopCount,
} from '../admin/logicBrandShop'
import { SCREENS } from '../admin/screens'
import type { ScreenKey, ViewKey } from '../admin/types'

const DEFAULT_EXPANDED: string[] = [
  'DM-1000', 'DM-2000', 'DM-2200', 'DM-3000', 'DM-3300',
  'DM-4000', 'DM-4100', 'DM-5000', 'DM-5100', 'DM-6000',
]

/** Codes of every category that has children — the "expand all" target set. */
const EXPANDABLE = CATS.filter((c) => childrenOf(c.code).length > 0).map((c) => c.code)

export default function AdminConsole() {
  const [screen, setScreen] = useState<ScreenKey>('categories')
  const [view, setView] = useState<ViewKey>('data')
  const [selected, setSelected] = useState<Set<number>>(() => new Set())
  const [selectedCat, setSelectedCat] = useState('DM-2211')
  const [expanded, setExpanded] = useState<string[]>(DEFAULT_EXPANDED)
  const [openAttr, setOpenAttr] = useState<number | null>(null)
  const [openBrand, setOpenBrand] = useState<number | null>(null)
  const [openShop, setOpenShop] = useState<number | null>(null)
  const [suggest, setSuggest] = useState(false)
  const [unmappedOnly, setUnmappedOnly] = useState(false)

  const s = SCREENS[screen]
  const isCategories = screen === 'categories'
  const isAttributes = screen === 'attributes'
  const isBrands = screen === 'brands'
  const isShops = screen === 'shops'

  const tree = useMemo(
    () => (isCategories ? buildTree(expanded, selectedCat) : []),
    [isCategories, expanded, selectedCat],
  )
  const cat = useMemo(() => buildCat(selectedCat), [selectedCat])
  const attrRows = useMemo(() => (isAttributes ? buildAttrRows() : []), [isAttributes])
  const brandRows = useMemo(() => (isBrands ? buildBrandRows() : []), [isBrands])
  const shopRows = useMemo(() => (isShops ? buildShopRows() : []), [isShops])

  const panel = openAttr !== null ? buildPanel(openAttr, suggest, unmappedOnly) : null
  const brand = openBrand !== null ? buildBrand(openBrand) : null
  const shop = openShop !== null ? buildShop(openShop) : null

  const rowCount = isShops
    ? SHOPS.length
    : isBrands
      ? BRANDS_DATA.length
      : isAttributes
        ? ATTRS.length
        : s.rows.length

  const closePanels = () => {
    setOpenAttr(null)
    setOpenBrand(null)
    setOpenShop(null)
  }

  const navigate = (key: ScreenKey) => {
    setScreen(key)
    setSelected(new Set())
    closePanels()
  }

  /** Jump from a category's attribute gap straight into that attribute's panel. */
  const openAttrByCode = (code: string) => {
    const i = ATTRS.findIndex((a) => a.code === code)
    setScreen('attributes')
    setSelected(new Set())
    setSuggest(false)
    setUnmappedOnly(false)
    setOpenAttr(i >= 0 ? i : null)
  }

  const toggleRow = (i: number) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const selectAll = (e: ChangeEvent<HTMLInputElement>) =>
    setSelected(
      e.target.checked ? new Set(Array.from({ length: rowCount }, (_, i) => i)) : new Set(),
    )

  const toggleNode = (code: string) =>
    setExpanded((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]))

  const tableProps = {
    selected,
    onToggleRow: toggleRow,
    onSelectAll: selectAll,
    allChecked: rowCount > 0 && selected.size === rowCount,
  }

  return (
    <div className="grid h-screen grid-cols-[64px_1fr] overflow-hidden bg-adm-bg font-admin text-[13px] text-adm-ink lg:grid-cols-[244px_1fr]">
      <Sidebar screen={screen} onNavigate={navigate} />

      <main className="flex min-w-0 flex-col overflow-hidden">
        <Topbar screenTitle={s.title} section={s.section || 'Ánh xạ'} />

        <div className="flex-1 overflow-y-auto px-[22px] pt-5 pb-8">
          <PageHead title={s.title} subtitle={s.subtitle} primaryAction={s.primaryAction} />

          {!isShops && <Legend />}

          <Toolbar
            filters={s.filters}
            searchPlaceholder={s.searchPlaceholder}
            view={view}
            onView={setView}
          />

          {selected.size > 0 && (
            <BulkBar count={selected.size} onClear={() => setSelected(new Set())} />
          )}

          <div className="overflow-hidden rounded-[10px] border border-adm-line bg-white">
            {view === 'loading' && <LoadingState />}

            {view === 'empty' && (
              <EmptyState
                title={s.emptyTitle}
                body={s.emptyBody}
                primaryAction={s.primaryAction}
              />
            )}

            {view === 'data' && (
              <>
                {isCategories && (
                  <CategoryPane
                    tree={tree}
                    cat={cat}
                    expandLabel={expanded.length ? 'Thu gọn' : 'Mở tất cả'}
                    onExpandAll={() => setExpanded(expanded.length ? [] : EXPANDABLE)}
                    onSelect={setSelectedCat}
                    onToggle={toggleNode}
                    onOpenAttr={openAttrByCode}
                    onGoAttributes={() => navigate('attributes')}
                  />
                )}

                {isAttributes && (
                  <AttributesTable
                    rows={attrRows}
                    {...tableProps}
                    onOpen={(i) => {
                      setOpenAttr(i)
                      setSuggest(false)
                      setUnmappedOnly(false)
                    }}
                  />
                )}

                {isBrands && (
                  <BrandsTable rows={brandRows} {...tableProps} onOpen={setOpenBrand} />
                )}

                {isShops && (
                  <ShopsTable
                    rows={shopRows}
                    {...tableProps}
                    onOpen={setOpenShop}
                    alert={
                      expiringShopCount()
                        ? `${expiringShopCount()} kết nối sắp hết hạn trong 7 ngày`
                        : ''
                    }
                  />
                )}

                {screen === 'products' && (
                  <GenericTable columns={s.columns} rows={s.rows} {...tableProps} />
                )}

                {!isCategories && (
                  <Pager
                    rowCount={rowCount}
                    totalCount={s.totalCount}
                    unitLabel={s.unitLabel}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {brand && <BrandPanel brand={brand} onClose={closePanels} />}
      {shop && <ShopPanel shop={shop} onClose={closePanels} />}
      {panel && (
        <AttributePanel
          panel={panel}
          suggest={suggest}
          unmappedOnly={unmappedOnly}
          onToggleSuggest={() => setSuggest((v) => !v)}
          onToggleUnmapped={() => setUnmappedOnly((v) => !v)}
          onClose={closePanels}
        />
      )}
    </div>
  )
}
