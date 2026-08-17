/**
 * Derived state for the Admin Console — ported from the design's DCLogic
 * methods as pure functions.
 *
 * The core idea of the design: readiness rolls *up*. A value's three cells
 * determine an attribute's per-marketplace state; a category is only "ready"
 * on a marketplace when its own mapping is linked AND every required
 * attribute is fully mapped there; a parent category aggregates its children.
 */
import { ATTRS, CATS, cn } from './data'
import {
  CH_CODES,
  CH_NAME,
  CH_STATE,
  ERROR,
  ROLES,
  STATUS,
  TYPES,
  WARN,
  chips,
  rowTint,
} from './states'
import type {
  Attr,
  AttrGap,
  AttrPanel,
  AttrRow,
  AttrValue,
  Cat,
  CatDetail,
  CatMappingCard,
  Chip,
  MapState,
  MappingCheck,
  PanelCell,
  PanelSummary,
  PanelValueRow,
  TreeNode,
} from './types'

/** Tally of one marketplace column across an attribute's values. */
export interface ColState {
  ok: number
  broken: number
  total: number
}

export function colState(values: AttrValue[], i: number): ColState | null {
  if (!values.length) return null
  let ok = 0
  let broken = 0
  values.forEach((v) => {
    const k = v.cells[i].k
    if (k === 'ok') ok++
    if (k === 'broken') broken++
  })
  return { ok, broken, total: values.length }
}

function rollupCol(c: ColState): MapState {
  if (c.broken) return 'broken'
  if (c.ok === c.total) return 'ok'
  if (c.ok === 0) return 'none'
  return 'partial'
}

const NO_STATE: MapState[] = ['none', 'none', 'none']

/**
 * Column tally for an attribute that is known to have values. `colState` only
 * returns null for an empty list, which every caller checks first.
 */
function requireColState(values: AttrValue[], i: number): ColState {
  const c = colState(values, i)
  if (!c) throw new Error('requireColState called with no values')
  return c
}

/** One attribute's readiness on marketplace i. */
export function attrStateOn(code: string, i: number): MapState {
  const a = ATTRS.find((x) => x.code === code)
  if (!a) return 'none'
  if (!a.values.length) return (a.ch ?? NO_STATE)[i]
  return rollupCol(requireColState(a.values, i))
}

export function attrChannels(a: Attr): Chip[] {
  if (!a.values.length) return chips(a.ch ?? NO_STATE)
  return chips([0, 1, 2].map((i) => rollupCol(requireColState(a.values, i))))
}

export const childrenOf = (code: string): Cat[] => CATS.filter((c) => c.parent === code)

/** A category's readiness on marketplace i — mapping AND every required attribute. */
export function catStateOn(cat: Cat, i: number): MapState {
  const kids = childrenOf(cat.code)
  if (kids.length) {
    const states = kids.map((k) => catStateOn(k, i))
    if (states.includes('broken')) return 'broken'
    if (states.every((s) => s === 'ok')) return 'ok'
    if (states.every((s) => s === 'none')) return 'none'
    return 'partial'
  }
  const mp = (cat.map ?? [cn(), cn(), cn()])[i]
  if (mp.k === 'none') return 'none'
  if (mp.k === 'broken') return 'broken'
  const gaps = (cat.attrs ?? []).filter((code) => attrStateOn(code, i) !== 'ok')
  return gaps.length ? 'partial' : 'ok'
}

/** Flattened, indentation-aware category tree honoring expanded state. */
export function buildTree(expanded: string[], selectedCat: string): TreeNode[] {
  const out: TreeNode[] = []
  const walk = (parent: string | null, depth: number): void => {
    CATS.filter((c) => c.parent === parent).forEach((c) => {
      const kids = childrenOf(c.code)
      const open = expanded.includes(c.code)
      const sel = selectedCat === c.code
      out.push({
        code: c.code,
        name: c.name,
        skus: c.skus,
        depth,
        hasChildren: kids.length > 0,
        open,
        selected: sel,
        bold: sel || kids.length > 0,
        channels: chips([0, 1, 2].map((i) => catStateOn(c, i))),
      })
      if (kids.length && open) walk(c.code, depth + 1)
    })
  }
  walk(null, 0)
  return out
}

const MAP_BADGE: Record<MapState, { label: string; pill: string; border: string }> = {
  ok: { label: 'Sẵn sàng đăng', pill: 'bg-ok/13 text-ok-deep', border: 'border-adm-line-2' },
  broken: { label: 'Lỗi ánh xạ', pill: 'bg-err/12 text-err-deep', border: 'border-err/30' },
  none: { label: 'Chưa ánh xạ', pill: 'bg-adm-chip text-adm-muted', border: 'border-adm-line-2' },
  partial: {
    label: 'Thiếu điều kiện',
    pill: 'bg-warn/18 text-warn-deep',
    border: 'border-warn/35',
  },
}

const CHECK = 'M20 6 9 17l-5-5'
const ALERT =
  'm21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3 M12 9v4 M12 17h.01'
const PLUS = 'M12 5v14 M5 12h14'

/** Everything the category detail pane needs for the selected category. */
export function buildCat(selectedCat: string): CatDetail {
  const cat = CATS.find((c) => c.code === selectedCat) ?? CATS[0]
  const parent = cat.parent ? CATS.find((c) => c.code === cat.parent) : null
  const kids = childrenOf(cat.code)
  const states = [0, 1, 2].map((i) => catStateOn(cat, i))
  const ready = states.filter((s) => s === 'ok').length
  const broken = states.includes('broken')

  const st = broken
    ? STATUS.error
    : ready === 3
      ? STATUS.ready
      : ready === 0
        ? STATUS.none
        : STATUS.partial

  const statusLabel = broken
    ? 'Có lỗi ánh xạ'
    : ready === 3
      ? 'Sẵn sàng đăng 3/3 sàn'
      : ready === 0
        ? 'Chưa sẵn sàng'
        : `Sẵn sàng ${ready}/3 sàn`

  const mappings: CatMappingCard[] = kids.length
    ? []
    : CH_CODES.map((code, i) => {
        const mp = (cat.map ?? [cn(), cn(), cn()])[i]
        const state = catStateOn(cat, i)
        const gapCodes =
          mp.k === 'ok' ? (cat.attrs ?? []).filter((c) => attrStateOn(c, i) !== 'ok') : []
        const bd = MAP_BADGE[state]

        const checks: MappingCheck[] = []
        if (mp.k === 'ok')
          checks.push({ label: 'Danh mục đã liên kết', icon: CHECK, tone: 'text-ok-deep' })
        if (mp.k === 'broken')
          checks.push({
            label: 'Danh mục mục tiêu đã bị sàn gộp hoặc xoá — cần chọn lại',
            icon: ALERT,
            tone: 'text-err-deep',
          })
        if (mp.k === 'none')
          checks.push({
            label: 'Chưa liên kết danh mục sàn',
            icon: PLUS,
            tone: 'text-adm-muted',
          })
        if (mp.k === 'ok') {
          checks.push(
            gapCodes.length
              ? {
                  label: `${gapCodes.length} thuộc tính bắt buộc chưa ánh xạ đủ (gồm cả ánh xạ cấp giá trị)`,
                  icon: ALERT,
                  tone: 'text-warn-deep',
                }
              : {
                  label: 'Toàn bộ thuộc tính bắt buộc đã ánh xạ đủ',
                  icon: CHECK,
                  tone: 'text-ok-deep',
                },
          )
        }

        return {
          code,
          name: CH_NAME[code],
          dot: CH_STATE[state].fill,
          border: bd.border,
          badge: bd.label,
          badgePill: bd.pill,
          linked: mp.k !== 'none',
          target: mp.k === 'none' ? '' : mp.target,
          targetId: mp.k === 'none' ? '' : mp.id,
          brokenTarget: mp.k === 'broken',
          checks,
          gaps: gapCodes.map((c): AttrGap => {
            const a = ATTRS.find((x) => x.code === c)
            return { label: a ? a.name : c, code: c }
          }),
        }
      })

  const attrs = (cat.attrs ?? []).map((code) => {
    const found = ATTRS.find((x) => x.code === code)
    const a: Pick<Attr, 'name' | 'role' | 'values'> = found ?? {
      name: code,
      role: 'descriptive',
      values: [],
    }
    const r = ROLES[a.role]
    const full = a.values.filter((v) => v.cells.every((c) => c.k === 'ok')).length
    return {
      name: a.name,
      code: `MÃ ${code}`,
      rawCode: code,
      roleLabel: r.label,
      roleChip: r.chip,
      channels: chips([0, 1, 2].map((i) => attrStateOn(code, i))),
      progress: a.values.length ? `${full}/${a.values.length} giá trị` : 'cấp thuộc tính',
    }
  })

  return {
    name: cat.name,
    desc: cat.desc,
    meta: `MÃ ${cat.code} · ${parent ? `Danh mục cha: ${parent.name}` : 'Danh mục gốc'} · ${cat.skus} SKU`,
    status: statusLabel,
    statusPill: st.pill,
    statusDot: st.dot,
    mappings,
    attrs,
    children: kids.map((k) => ({
      name: k.name,
      code: k.code,
      skus: k.skus,
      channels: chips([0, 1, 2].map((i) => catStateOn(k, i))),
    })),
    childCount: kids.length,
  }
}

/** Attribute table rows. */
export function buildAttrRows(): AttrRow[] {
  return ATTRS.map((a, i) => {
    const t = TYPES[a.type]
    const r = ROLES[a.role]
    const full = a.values.filter((v) => v.cells.every((c) => c.k === 'ok')).length
    return {
      index: i,
      name: a.name,
      meta: `MÃ ${a.code}${
        a.values.length ? ` · ${a.values.length} giá trị nội bộ` : ' · không liệt kê giá trị'
      }`,
      required: a.required,
      badge: a.badge || '',
      typeLabel: t.label,
      typeIcon: t.icon,
      roleLabel: r.label,
      roleChip: r.chip,
      roleIcon: r.icon,
      catCount: a.catCount,
      channels: attrChannels(a),
      valueProgress: a.values.length
        ? `${full}/${a.values.length} giá trị đủ 3 sàn`
        : 'cấp thuộc tính',
      updated: a.updated,
      warning: a.warning ?? '',
      warnBox: a.tone === 'error' ? ERROR.warnBox : WARN.warnBox,
      rowTint: rowTint(a.warning, a.tone),
      tone: a.tone,
    }
  })
}

/** The two-level (attribute → value) mapping panel. */
export function buildPanel(
  openAttr: number,
  suggest: boolean,
  unmappedOnly: boolean,
): AttrPanel | null {
  const a = ATTRS[openAttr]
  if (!a) return null
  const t = TYPES[a.type]
  const r = ROLES[a.role]
  const all = a.values

  const values: PanelValueRow[] = all.map((v) => {
    const okCount = v.cells.filter((c) => c.k === 'ok').length
    const hasBroken = v.cells.some((c) => c.k === 'broken')
    return {
      name: v.name,
      code: `MÃ ${v.code}`,
      rowTint: hasBroken ? 'bg-err/[0.035]' : 'bg-white',
      tally: `${okCount}/3`,
      tallyPill:
        okCount === 3
          ? 'bg-ok/13 text-ok-deep'
          : hasBroken
            ? 'bg-err/12 text-err-deep'
            : 'bg-warn/17 text-warn-deep',
      pending: okCount < 3,
      cells: v.cells.map((c): PanelCell => {
        // Narrow the cell union once, then read only the fields that variant has.
        const sug = c.k === 'none' ? c.sug : null
        const showSuggest = suggest && sug !== null
        return {
          mapped: c.k === 'ok',
          broken: c.k === 'broken',
          unmapped: c.k === 'none' && !showSuggest,
          suggested: showSuggest,
          label: c.k === 'none' ? '' : c.label,
          id: c.k === 'ok' ? c.id : '',
          note: c.k === 'broken' ? c.note : '',
          suggestLabel: showSuggest && sug ? sug.label : '',
          suggestNote: showSuggest && sug ? sug.note : '',
        }
      }),
    }
  })

  const shown = unmappedOnly ? values.filter((v) => v.pending) : values
  const pendingCount = all.reduce((n, v) => n + v.cells.filter((c) => c.k !== 'ok').length, 0)

  const summary: PanelSummary[] = CH_CODES.map((code, i) => {
    // colState returns null only for a value-less attribute, i.e. one mapped at
    // attribute level rather than per value.
    const c = colState(all, i)
    const done = c?.ok ?? 0
    const total = c?.total ?? 0
    const state: MapState = c ? rollupCol(c) : 'none'
    let note = 'Đã ánh xạ đủ'
    if (!c) note = 'Ánh xạ ở cấp thuộc tính'
    else if (c.broken) note = `${c.broken} giá trị bị sàn xoá/đổi tên`
    else if (done < total) note = `${total - done} giá trị còn thiếu`
    return {
      code,
      name: CH_NAME[code],
      fill: CH_STATE[state].fill,
      textTone:
        state === 'ok'
          ? 'text-ok-deep'
          : state === 'broken'
            ? 'text-err-deep'
            : state === 'partial'
              ? 'text-warn-deep'
              : 'text-adm-muted',
      ratio: total ? `${done}/${total}` : '—',
      pct: total ? Math.round((done / total) * 100) : 0,
      note,
    }
  })

  return {
    name: a.name,
    meta: `MÃ ${a.code} · ${t.label} · ${a.catCount} danh mục sử dụng${
      all.length ? ` · ${all.length} giá trị` : ''
    }`,
    typeLabel: t.label,
    typeIcon: t.icon,
    roleLabel: r.label,
    roleChip: r.chip,
    roleIcon: r.icon,
    roleNote: r.note,
    summary,
    headers: summary.map((s) => ({ code: s.code, name: s.name, fill: s.fill })),
    values: shown,
    hasValues: all.length > 0,
    pendingCount,
    rollup: `${a.catCount} danh mục đang dùng thuộc tính này${
      a.required ? ' (bắt buộc)' : ''
    }. Hoàn tất ${pendingCount} ánh xạ còn thiếu sẽ chuyển ${a.unlocks} danh mục sang “Sẵn sàng đăng”.`,
  }
}
