/**
 * Types for the Admin Console.
 *
 * Split in two halves: the *source* shapes (what the design's data literals
 * contain) and the *view-model* shapes the `build*` functions derive from them
 * and the components render. Keeping them separate is what lets the roll-up
 * logic be checked — a source `MapState` can never be mistaken for a CSS class.
 */

/* ------------------------------------------------------------ source shapes */

export type ChannelCode = 'S' | 'L' | 'T'

/** Per-marketplace mapping readiness. The console's core vocabulary. */
export type MapState = 'ok' | 'partial' | 'none' | 'broken'

/** Row-level roll-up status. */
export type StatusKey = 'ready' | 'partial' | 'none' | 'error'

/** Rows carrying a warning are tinted; `error` is the louder of the two. */
export type Tone = 'error'

export type AttrType = 'text' | 'number' | 'date' | 'single' | 'multi'
export type AttrRole = 'variant' | 'descriptive'

export interface Suggestion {
  label: string
  note: string
}

/** One internal value's mapping on one marketplace. */
export type ValueCell =
  | { k: 'ok'; label: string; id: string }
  | { k: 'none'; sug: Suggestion | null }
  | { k: 'broken'; label: string; note: string }

export interface AttrValue {
  name: string
  code: string
  /** Always three, one per marketplace, in S/L/T order. */
  cells: ValueCell[]
}

export interface Attr {
  code: string
  name: string
  type: AttrType
  role: AttrRole
  required: boolean
  catCount: number
  unlocks: number
  updated: string
  values: AttrValue[]
  /** Attribute-level state, used only when `values` is empty. */
  ch?: MapState[]
  warning?: string
  tone?: Tone
  badge?: string
}

/** A category's mapping to one marketplace's category tree. */
export type CatMapCell =
  | { k: 'ok'; target: string; id: string }
  | { k: 'broken'; target: string; id: string }
  | { k: 'none' }

export interface Cat {
  code: string
  name: string
  parent: string | null
  skus: string
  desc: string
  /** True for grouping categories that products are never assigned to. */
  group?: boolean
  /** Codes of the required attributes; drives the readiness roll-up. */
  attrs?: string[]
  map?: CatMapCell[]
}

export type BrandMapState = 'ok' | 'pending' | 'unauth' | 'unreg' | 'broken' | 'rejected'
export type BrandRequestState = 'pending' | 'approved' | 'rejected'
export type FlagKind = 'error' | 'warn' | 'neutral'

export interface BrandMap {
  state: BrandMapState
  target: string
  id: string
}

/** [industry name, valid on S, valid on L, valid on T] — 1 or 0 per channel. */
export type BrandScopeRow = [string, number, number, number]

export interface Brand {
  code: string
  logo: string
  name: string
  products: string
  updated: string
  status: StatusKey
  maps: BrandMap[]
  scope?: BrandScopeRow[]
  flag?: string
  flagKind?: FlagKind
  warning?: string
  tone?: Tone
  request?: { state: BrandRequestState; date: string; note: string }
}

export type ShopStatusKey = 'active' | 'expiring' | 'paused' | 'disconnected'
export type ScopeKey =
  | 'product'
  | 'inventory'
  | 'price'
  | 'order'
  | 'promotion'
  | 'logistics'

export interface Shop {
  ch: ChannelCode
  name: string
  code: string
  region: string
  type: string
  status: ShopStatusKey
  expiry: string
  /** Days until the OAuth token expires; negative means already expired. */
  days: number
  lastSync: string
  connected: string
  by: string
  granted: ScopeKey[]
  warning?: string
}

export interface ScopeDef {
  key: ScopeKey
  name: string
  desc: string
  required: boolean
}

export interface NavItem {
  name: string
  icon: string
  /** null for the nav entries the design leaves inert. */
  key: ScreenKey | null
  count?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

/* -------------------------------------------------------- view-model shapes */

/**
 * Strings on view-model types are Tailwind class names, not colors. Tailwind's
 * JIT cannot generate a class from a runtime value, so the data layer must
 * carry class names rather than hexes.
 */
export interface Chip {
  code: ChannelCode
  fill: string
  title: string
}

/** Shape of a STATUS / SH_STATUS map entry. */
export interface StatusView {
  status: string
  pill: string
  dot: string
}

/** The same status once flattened onto a row for rendering. */
export interface RowStatus {
  status: string
  statusPill: string
  statusDot: string
}

export interface TreeNode {
  code: string
  name: string
  skus: string
  depth: number
  hasChildren: boolean
  open: boolean
  selected: boolean
  bold: boolean
  channels: Chip[]
}

export interface MappingCheck {
  label: string
  icon: string
  tone: string
}

export interface AttrGap {
  label: string
  code: string
}

export interface CatMappingCard {
  code: ChannelCode
  name: string
  dot: string
  border: string
  badge: string
  badgePill: string
  linked: boolean
  target: string
  targetId: string
  brokenTarget: boolean
  checks: MappingCheck[]
  gaps: AttrGap[]
}

export interface CatAttrRow {
  name: string
  code: string
  rawCode: string
  roleLabel: string
  roleChip: string
  channels: Chip[]
  progress: string
}

export interface CatChildRow {
  name: string
  code: string
  skus: string
  channels: Chip[]
}

export interface CatDetail {
  name: string
  desc: string
  meta: string
  status: string
  statusPill: string
  statusDot: string
  mappings: CatMappingCard[]
  attrs: CatAttrRow[]
  children: CatChildRow[]
  childCount: number
}

export interface AttrRow {
  index: number
  name: string
  meta: string
  required: boolean
  badge: string
  typeLabel: string
  typeIcon: string
  roleLabel: string
  roleChip: string
  roleIcon: string
  catCount: number
  channels: Chip[]
  valueProgress: string
  updated: string
  warning: string
  warnBox: string
  rowTint: string
  tone?: Tone
}

export interface PanelCell {
  mapped: boolean
  broken: boolean
  unmapped: boolean
  suggested: boolean
  label: string
  id: string
  note: string
  suggestLabel: string
  suggestNote: string
}

export interface PanelValueRow {
  name: string
  code: string
  rowTint: string
  tally: string
  tallyPill: string
  pending: boolean
  cells: PanelCell[]
}

export interface PanelSummary {
  code: ChannelCode
  name: string
  fill: string
  textTone: string
  ratio: string
  pct: number
  note: string
}

export interface AttrPanel {
  name: string
  meta: string
  typeLabel: string
  typeIcon: string
  roleLabel: string
  roleChip: string
  roleIcon: string
  roleNote: string
  summary: PanelSummary[]
  headers: { code: ChannelCode; name: string; fill: string }[]
  values: PanelValueRow[]
  hasValues: boolean
  pendingCount: number
  rollup: string
}

export interface BrandRow extends RowStatus {
  index: number
  name: string
  logo: string
  logoBg: string
  meta: string
  flag: string
  flagPill: string
  flagIcon: string
  productCount: string
  channels: Chip[]
  channelNote: string
  updated: string
  warning: string
  warnBox: string
  rowTint: string
}

export interface BrandMappingCard {
  code: ChannelCode
  name: string
  dot: string
  border: string
  badge: string
  badgePill: string
  linked: boolean
  target: string
  targetId: string
  brokenTarget: boolean
  action: string
  note: string
  noteIcon: string
  noteTone: string
}

export interface BrandScopeCell {
  mark: string
  chip: string
  title: string
}

export interface BrandDetail {
  name: string
  logo: string
  logoBg: string
  meta: string
  status: string
  statusPill: string
  statusDot: string
  request: {
    note: string
    date: string
    label: string
    pill: string
    border: string
    icon: string
  } | null
  mappings: BrandMappingCard[]
  scope: { name: string; cells: BrandScopeCell[] }[]
  rollup: string
}

export interface ShopRow {
  index: number
  chCode: ChannelCode
  chBg: string
  name: string
  meta: string
  region: string
  type: string
  status: string
  statusPill: string
  statusDot: string
  expiry: string
  expiryStrong: boolean
  expiryTone: string
  expiryNote: string
  expiryNoteTone: string
  lastSync: string
  warning: string
  warnBox: string
  rowTint: string
}

export interface ShopAlert {
  title: string
  body: string
  action: string
  tone: string
  btn: string
  box: string
}

export interface ShopInfoField {
  label: string
  value: string
  strong?: boolean
  tone?: string
}

export interface ShopScopeRow {
  name: string
  desc: string
  box: string
  markBg: string
  icon: string
  tag: string
  tagPill: string
}

export interface ShopDetail {
  name: string
  chCode: ChannelCode
  chBg: string
  meta: string
  status: string
  statusPill: string
  statusDot: string
  alert: ShopAlert | null
  info: ShopInfoField[]
  scopes: ShopScopeRow[]
  scopeRatio: string
  scopePill: string
  rollup: string
}

/* ------------------------------------------------------------------ screens */

export type ScreenKey = 'categories' | 'attributes' | 'brands' | 'products' | 'shops'
export type ViewKey = 'data' | 'loading' | 'empty'

export interface Column {
  label: string
  align: 'left' | 'right'
  w?: string
}

export interface Filter {
  label: string
  value: string
}

/** A row of the generic (categories / products) table. */
export interface GenericRow extends RowStatus {
  name: string
  meta: string
  col2: string
  col3: string
  thumb: string
  badge: string
  badgePill: string
  warning: string
  warnBox: string
  rowTint: string
  channels: Chip[]
  updated: string
}

export interface ScreenDef {
  title: string
  section?: string
  subtitle: string
  primaryAction: string
  searchPlaceholder: string
  unitLabel: string
  totalCount: string
  emptyTitle: string
  emptyBody: string
  filters: Filter[]
  columns: Column[]
  rows: GenericRow[]
}
