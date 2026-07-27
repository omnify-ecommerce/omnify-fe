/**
 * The Admin Console's state vocabulary. In the design these maps held raw
 * color strings that were interpolated into inline styles; here each state
 * carries Tailwind class names instead, so the JIT can see every class and
 * the palette stays in @theme (src/index.css).
 */
import type {
  AttrRole,
  AttrType,
  BrandMapState,
  ChannelCode,
  Chip,
  MapState,
  ShopStatusKey,
  StatusKey,
  StatusView,
  Tone,
} from './types'

export const CH_NAME: Record<ChannelCode, string> = {
  S: 'Shopee',
  L: 'Lazada',
  T: 'TikTok Shop',
}

export const CH_CODES: readonly ChannelCode[] = ['S', 'L', 'T']

/** Per-marketplace mapping state, shown as a dot or lettered chip. */
export const CH_STATE: Record<MapState, { fill: string; label: string }> = {
  ok: { fill: 'bg-ok', label: 'Đã ánh xạ' },
  partial: { fill: 'bg-warn', label: 'Thiếu thông tin bắt buộc' },
  none: { fill: 'bg-idle', label: 'Chưa ánh xạ' },
  broken: { fill: 'bg-err', label: 'Lỗi — sàn đã thay đổi mục tiêu' },
}

/** Builds the three channel chips from a [S, L, T] state triple. */
export function chips(spec: readonly MapState[]): Chip[] {
  return CH_CODES.map((code, i) => {
    const st = CH_STATE[spec[i]] ?? CH_STATE.none
    return { code, fill: st.fill, title: `${CH_NAME[code]}: ${st.label}` }
  })
}

/** Row-level roll-up status pill. */
export const STATUS: Record<StatusKey, StatusView> = {
  ready: { status: 'Sẵn sàng', pill: 'bg-ok/12 text-ok-deep', dot: 'bg-ok' },
  partial: { status: 'Thiếu', pill: 'bg-warn/16 text-warn-deep', dot: 'bg-warn' },
  none: { status: 'Chưa ánh xạ', pill: 'bg-adm-chip text-adm-muted', dot: 'bg-idle' },
  error: { status: 'Lỗi', pill: 'bg-err/12 text-err-deep', dot: 'bg-err' },
}

/** Inline warning banner tones. */
export const WARN = { warnBox: 'bg-warn/13 text-warn-deep' }
export const ERROR = { warnBox: 'bg-err/10 text-err-deep' }

/** Tinted row backgrounds for rows carrying a warning. */
export const ROW_TINT = { warn: 'bg-warn/5', error: 'bg-err/[0.035]', none: 'bg-white' }

export function rowTint(warning: string | undefined, tone: Tone | undefined): string {
  if (!warning) return ROW_TINT.none
  return tone === 'error' ? ROW_TINT.error : ROW_TINT.warn
}

/** Attribute data types. */
export const TYPES: Record<AttrType, { label: string; icon: string }> = {
  text: { label: 'Văn bản', icon: 'M4 7V5h16v2 M9 19h6 M12 5v14' },
  number: { label: 'Số', icon: 'M4 9h16 M4 15h16 M10 3 8 21 M16 3l-2 18' },
  date: {
    label: 'Ngày',
    icon: 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  },
  single: {
    label: 'Chọn một',
    icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  },
  multi: { label: 'Chọn nhiều', icon: 'M20 6 9 17l-5-5 M3 6h6' },
}

interface RoleView {
  label: string
  chip: string
  icon: string
  note: string
}

/** Whether an attribute generates variants (a SKU per value) or just describes. */
export const ROLES: Record<AttrRole, RoleView> = {
  variant: {
    label: 'Sinh biến thể',
    chip: 'bg-brand/10 text-brand-ink border-brand/35',
    icon: 'M6 3v12 M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 9a9 9 0 0 1-9 9',
    note: 'Thuộc tính sinh biến thể — mỗi giá trị tạo một SKU riêng. Giá trị chưa ánh xạ sẽ chặn đúng biến thể đó khi đăng sang sàn tương ứng.',
  },
  descriptive: {
    label: 'Mô tả',
    chip: 'bg-white text-adm-muted border-adm-border',
    icon: 'M4 7h16 M4 12h10 M4 17h7',
    note: '',
  },
}

interface BrandStateView {
  badge: string
  pill: string
  border: string
  dotState: MapState
  note: string
  noteIcon: string
  noteColor: string
}

/** Brand approval state per marketplace. */
export const BR_STATE: Record<BrandMapState, BrandStateView> = {
  ok: {
    badge: 'Đã liên kết',
    pill: 'bg-ok/13 text-ok-deep',
    border: 'border-adm-line-2',
    dotState: 'ok',
    note: 'Thương hiệu đã được sàn phê duyệt cho các ngành hàng đang bán.',
    noteIcon: 'M20 6 9 17l-5-5',
    noteColor: 'text-ok-deep',
  },
  pending: {
    badge: 'Chờ duyệt',
    pill: 'bg-warn/18 text-warn-deep',
    border: 'border-warn/35',
    dotState: 'partial',
    note: 'Hồ sơ đăng ký đã gửi, sàn đang xét duyệt. Sản phẩm tạm đăng dưới nhãn “Không có thương hiệu”.',
    noteIcon: 'M12 6v6l4 2 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    noteColor: 'text-warn-deep',
  },
  unauth: {
    badge: 'Thiếu uỷ quyền',
    pill: 'bg-err/12 text-err-deep',
    border: 'border-err/35',
    dotState: 'partial',
    note: 'Shop chưa có giấy uỷ quyền thương hiệu. Sàn có thể hạ sản phẩm hoặc khoá ngành hàng nếu tiếp tục đăng.',
    noteIcon: 'm21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3 M12 9v4 M12 17h.01',
    noteColor: 'text-err-deep',
  },
  unreg: {
    badge: 'Chưa có trên sàn',
    pill: 'bg-adm-chip text-adm-muted',
    border: 'border-adm-line-2',
    dotState: 'none',
    note: 'Thương hiệu chưa tồn tại trong danh mục thương hiệu của sàn — cần gửi yêu cầu đăng ký mới.',
    noteIcon: 'M12 5v14 M5 12h14',
    noteColor: 'text-adm-muted',
  },
  broken: {
    badge: 'Lỗi — đã bị xoá',
    pill: 'bg-err/12 text-err-deep',
    border: 'border-err/35',
    dotState: 'broken',
    note: 'Sàn đã xoá thương hiệu mục tiêu. Sản phẩm đang hiển thị sai nhãn — cần ánh xạ lại ngay.',
    noteIcon: 'm21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3 M12 9v4 M12 17h.01',
    noteColor: 'text-err-deep',
  },
  rejected: {
    badge: 'Bị từ chối',
    pill: 'bg-err/12 text-err-deep',
    border: 'border-err/35',
    dotState: 'none',
    note: 'Sàn từ chối hồ sơ đăng ký (thiếu giấy chứng nhận nhãn hiệu). Bổ sung hồ sơ và gửi lại.',
    noteIcon: 'M18 6 6 18 M6 6l12 12',
    noteColor: 'text-err-deep',
  },
}

/** Shop connection status. */
export const SH_STATUS: Record<ShopStatusKey, { label: string; pill: string; dot: string }> = {
  active: { label: 'Đang hoạt động', pill: 'bg-ok/13 text-ok-deep', dot: 'bg-ok' },
  expiring: { label: 'Token sắp hết hạn', pill: 'bg-err/12 text-err-deep', dot: 'bg-err' },
  paused: { label: 'Tạm dừng', pill: 'bg-warn/18 text-warn-deep', dot: 'bg-warn' },
  disconnected: {
    label: 'Đã ngắt kết nối',
    pill: 'bg-adm-chip text-adm-muted',
    dot: 'bg-idle',
  },
}

/** Marketplace chip color per channel letter. */
export const CH_BG: Record<ChannelCode, string> = {
  S: 'bg-shopee',
  L: 'bg-lazada',
  T: 'bg-tiktok',
}

export const WARN_ICON =
  'm21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3 M12 9v4 M12 17h.01'
export const CHECK_ICON = 'M20 6 9 17l-5-5'
export const PLUS_ICON = 'M12 5v14 M5 12h14'
export const SPARK_ICON =
  'M12 3v3m0 12v3M3 12h3m12 0h3M7.8 7.8 5.6 5.6m12.8 2.2 2.2-2.2M7.8 16.2l-2.2 2.2m12.8-2.2 2.2 2.2'
export const ROLLUP_ICON = 'M3 12h4l3 8 4-16 3 8h4'
