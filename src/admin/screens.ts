/**
 * Per-screen chrome (title, filters, columns) and the generic table rows,
 * from the design's `screens` / `shopScreen` maps.
 */
import { STATUS, chips, rowTint } from './states'
import type { GenericRow, MapState, ScreenDef, ScreenKey, StatusKey, Tone } from './types'

/** The literal shape written per row below, before derivation. */
interface RowInput {
  name: string
  meta: string
  col2: string
  col3: string
  /** [S, L, T] mapping states. */
  ch: MapState[]
  state: StatusKey
  updated: string
  thumb?: string
  badge?: string
  badgeTone?: 'accent'
  warning?: string
  tone?: Tone
}

/** Generic row shape shared by the categories / products tables. */
function row(o: RowInput): GenericRow {
  const st = STATUS[o.state]
  return {
    ...o,
    thumb: o.thumb ?? '',
    badge: o.badge ?? '',
    badgePill:
      o.badgeTone === 'accent' ? 'bg-brand/10 text-brand-ink-2' : 'bg-adm-chip text-adm-muted',
    warning: o.warning ?? '',
    warnBox: o.tone === 'error' ? 'bg-err/10 text-err-deep' : 'bg-warn/13 text-warn-deep',
    rowTint: rowTint(o.warning, o.tone),
    channels: chips(o.ch),
    status: st.status,
    statusPill: st.pill,
    statusDot: st.dot,
  }
}

export const SCREENS: Record<ScreenKey, ScreenDef> = {
  categories: {
    title: 'Danh mục',
    subtitle:
      'Liên kết từng danh mục nội bộ với danh mục tương ứng trên Shopee, Lazada và TikTok Shop. Sản phẩm chỉ đăng được khi danh mục đã ánh xạ đủ.',
    primaryAction: 'Tạo ánh xạ',
    searchPlaceholder: 'Tìm theo tên hoặc mã danh mục…',
    unitLabel: 'danh mục',
    totalCount: '1.284',
    emptyTitle: 'Chưa có danh mục nào được ánh xạ',
    emptyBody:
      'Tạo ánh xạ đầu tiên để bắt đầu đăng sản phẩm sang ba sàn, hoặc nhập bảng ánh xạ có sẵn từ Excel.',
    filters: [
      { label: 'Trạng thái:', value: 'Tất cả' },
      { label: 'Kênh bán:', value: '3 sàn' },
      { label: 'Cấp:', value: 'Tất cả' },
    ],
    columns: [
      { label: 'DANH MỤC NỘI BỘ', align: 'left' },
      { label: 'CẤP', align: 'left', w: 'w-[90px]' },
      { label: 'SKU', align: 'right', w: 'w-20' },
      { label: 'ÁNH XẠ SÀN', align: 'left', w: 'w-28' },
      { label: 'TRẠNG THÁI', align: 'left', w: 'w-[132px]' },
      { label: 'CẬP NHẬT', align: 'left', w: 'w-[118px]' },
    ],
    rows: [
      row({ name: 'Điện thoại di động', meta: 'Điện thoại & Phụ kiện › Điện thoại di động · MÃ DM-1042', col2: 'Cấp 2', col3: '428', ch: ['ok', 'ok', 'ok'], state: 'ready', updated: '2 giờ trước' }),
      row({ name: 'Ốp lưng & Bao da', meta: 'Điện thoại & Phụ kiện › Ốp lưng & Bao da · MÃ DM-1043', col2: 'Cấp 2', col3: '1.126', ch: ['ok', 'ok', 'partial'], state: 'partial', updated: '5 giờ trước',
        warning: 'TikTok Shop yêu cầu thuộc tính “Chất liệu” cho nhóm này — hiện chưa được ánh xạ.' }),
      row({ name: 'Áo thun nam', meta: 'Thời trang nam › Áo › Áo thun nam · MÃ DM-2211', col2: 'Cấp 3', col3: '864', ch: ['ok', 'broken', 'none'], state: 'error', tone: 'error', updated: 'Hôm qua',
        warning: 'Lazada đã gộp danh mục mục tiêu (ID 18294) vào “Áo nam”. Ánh xạ bị hỏng — 864 SKU đang tạm ngừng đăng.' }),
      row({ name: 'Nồi cơm điện', meta: 'Nhà cửa & Đời sống › Nhà bếp · MÃ DM-3305', col2: 'Cấp 3', col3: '212', ch: ['ok', 'ok', 'ok'], state: 'ready', updated: 'Hôm qua' }),
      row({ name: 'Sữa bột cho bé', meta: 'Mẹ & Bé › Sữa & Thực phẩm · MÃ DM-4102', col2: 'Cấp 3', col3: '96', ch: ['ok', 'partial', 'ok'], state: 'partial', updated: '2 ngày trước',
        warning: 'Lazada bắt buộc chứng nhận ATTP cho ngành hàng này. Bổ sung giấy tờ trước khi đăng.' }),
      row({ name: 'Son môi', meta: 'Làm đẹp › Trang điểm › Môi · MÃ DM-5008', col2: 'Cấp 3', col3: '340', ch: ['ok', 'ok', 'partial'], state: 'partial', updated: '3 ngày trước' }),
      row({ name: 'Giày sandal nữ', meta: 'Thời trang nữ › Giày dép · MÃ DM-2640', col2: 'Cấp 3', col3: '178', ch: ['none', 'none', 'none'], state: 'none', updated: '—', badge: 'Mới', badgeTone: 'accent' }),
      row({ name: 'Bình giữ nhiệt', meta: 'Nhà cửa & Đời sống › Đồ dùng · MÃ DM-3390', col2: 'Cấp 3', col3: '64', ch: ['ok', 'none', 'ok'], state: 'partial', updated: '1 tuần trước' }),
    ],
  },

  attributes: {
    title: 'Thuộc tính',
    subtitle:
      'Ánh xạ thuộc tính và giá trị nội bộ sang thuộc tính tương ứng của từng sàn. Thuộc tính bắt buộc thiếu ánh xạ sẽ chặn việc đăng sản phẩm.',
    primaryAction: 'Thêm thuộc tính',
    searchPlaceholder: 'Tìm theo tên thuộc tính…',
    unitLabel: 'thuộc tính',
    totalCount: '186',
    emptyTitle: 'Chưa có thuộc tính nào',
    emptyBody:
      'Tạo thuộc tính nội bộ rồi ánh xạ sang ba sàn, hoặc để hệ thống gợi ý ánh xạ tự động từ danh mục đã liên kết.',
    filters: [
      { label: 'Trạng thái:', value: 'Tất cả' },
      { label: 'Kiểu:', value: 'Tất cả' },
      { label: 'Bắt buộc:', value: 'Có' },
    ],
    columns: [],
    rows: [],
  },

  brands: {
    title: 'Thương hiệu',
    subtitle:
      'Liên kết thương hiệu nội bộ với thương hiệu đã được sàn phê duyệt. Thương hiệu chưa ánh xạ sẽ được đăng dưới dạng “Không có thương hiệu”.',
    primaryAction: 'Thêm thương hiệu',
    searchPlaceholder: 'Tìm theo tên thương hiệu…',
    unitLabel: 'thương hiệu',
    totalCount: '312',
    emptyTitle: 'Chưa có thương hiệu nào được ánh xạ',
    emptyBody:
      'Thêm thương hiệu và liên kết với danh sách đã phê duyệt của từng sàn để sản phẩm hiển thị đúng nhãn.',
    filters: [
      { label: 'Trạng thái:', value: 'Tất cả' },
      { label: 'Phê duyệt:', value: 'Tất cả' },
      { label: 'Ngành hàng:', value: 'Tất cả' },
    ],
    columns: [],
    rows: [],
  },

  products: {
    title: 'Sản phẩm',
    subtitle:
      'Trạng thái đăng bán của từng sản phẩm trên ba sàn. Sản phẩm chỉ lên kênh khi danh mục, thuộc tính và thương hiệu của nó đã ánh xạ đủ.',
    primaryAction: 'Thêm sản phẩm',
    searchPlaceholder: 'Tìm theo tên, SKU hoặc mã sản phẩm…',
    unitLabel: 'sản phẩm',
    totalCount: '12.860',
    emptyTitle: 'Chưa có sản phẩm nào trong kho tổng',
    emptyBody:
      'Thêm sản phẩm vào kho tổng hoặc nhập từ Excel. Sau khi ánh xạ đủ, hệ thống sẽ tự đăng sang ba sàn.',
    filters: [
      { label: 'Trạng thái:', value: 'Tất cả' },
      { label: 'Kênh bán:', value: '3 sàn' },
      { label: 'Kho:', value: 'Kho Tổng' },
    ],
    columns: [
      { label: 'SẢN PHẨM', align: 'left' },
      { label: 'GIÁ BÁN', align: 'left', w: 'w-[130px]' },
      { label: 'TỒN', align: 'right', w: 'w-20' },
      { label: 'ĐĂNG BÁN', align: 'left', w: 'w-28' },
      { label: 'TRẠNG THÁI', align: 'left', w: 'w-[132px]' },
      { label: 'ĐỒNG BỘ', align: 'left', w: 'w-[118px]' },
    ],
    rows: [
      row({ thumb: 'NC', name: 'Nồi cơm điện Sunhouse SHD8602 1.8L', meta: 'SKU SH-NC8602 · Nhà cửa › Nhà bếp › Nồi cơm điện', col2: '1.290.000 ₫', col3: '184', ch: ['ok', 'ok', 'ok'], state: 'ready', updated: '6 phút trước' }),
      row({ thumb: 'SV', name: 'Sữa tươi tiệt trùng Vinamilk 1L (lốc 4)', meta: 'SKU VNM-ST1000-4 · Mẹ & Bé › Sữa', col2: '128.000 ₫', col3: '2.412', ch: ['ok', 'ok', 'ok'], state: 'ready', updated: '8 phút trước' }),
      row({ thumb: 'AT', name: "Áo thun nam cotton co giãn Biti's", meta: 'SKU BTS-AT204 · Thời trang nam › Áo thun nam', col2: '249.000 ₫', col3: '0', ch: ['ok', 'broken', 'none'], state: 'error', tone: 'error', updated: 'Thất bại 12:04',
        warning: 'Không đăng được sang Lazada: danh mục “Áo thun nam” đã hỏng ánh xạ. Tồn kho bằng 0 trên cả ba sàn.' }),
      row({ thumb: 'SK', name: 'Son kem lì Cocoon Bí Đao 5ml', meta: 'SKU CCN-SK05 · Làm đẹp › Trang điểm › Môi', col2: '185.000 ₫', col3: '96', ch: ['ok', 'ok', 'partial'], state: 'partial', updated: '22 phút trước',
        warning: 'TikTok Shop thiếu thuộc tính bắt buộc “Chất liệu”. Sản phẩm đang chờ đăng.' }),
      row({ thumb: 'BG', name: 'Bình giữ nhiệt Lock&Lock 500ml', meta: 'SKU LL-BG500 · Nhà cửa › Đồ dùng', col2: '329.000 ₫', col3: '58', ch: ['ok', 'none', 'ok'], state: 'partial', updated: '1 giờ trước' }),
      row({ thumb: 'CF', name: 'Cà phê rang xay Trung Nguyên Legend 500g', meta: 'SKU TN-CF500 · Thực phẩm › Cà phê', col2: '165.000 ₫', col3: '740', ch: ['ok', 'ok', 'ok'], state: 'ready', updated: '1 giờ trước' }),
      row({ thumb: 'GS', name: 'Giày sandal nữ quai chéo Vento', meta: 'SKU VT-GS118 · Thời trang nữ › Giày dép', col2: '459.000 ₫', col3: '26', ch: ['none', 'none', 'none'], state: 'none', updated: '—', badge: 'Nháp' }),
      row({ thumb: 'MG', name: 'Máy lọc nước Kangaroo KG10G4 10 lõi', meta: 'SKU KG-10G4 · Gia dụng › Máy lọc nước', col2: '6.490.000 ₫', col3: '12', ch: ['ok', 'partial', 'none'], state: 'partial', updated: '3 giờ trước',
        warning: 'Lazada cảnh báo giá cao hơn 15% so với sàn khác — có thể bị hạ hiển thị.' }),
    ],
  },

  shops: {
    title: 'Kênh bán',
    section: 'Hệ thống',
    subtitle:
      'Kết nối OAuth và khoá API tới từng cửa hàng trên sàn. Đây là lớp nền — mọi ánh xạ và đồng bộ đều phụ thuộc vào kết nối còn hiệu lực và đủ quyền.',
    primaryAction: 'Kết nối cửa hàng',
    searchPlaceholder: 'Tìm theo tên hoặc mã cửa hàng…',
    unitLabel: 'cửa hàng',
    totalCount: '6',
    emptyTitle: 'Chưa kết nối cửa hàng nào',
    emptyBody:
      'Kết nối cửa hàng đầu tiên qua OAuth để bắt đầu ánh xạ và đồng bộ. Một workspace có thể kết nối nhiều cửa hàng, kể cả nhiều cửa hàng trên cùng một sàn.',
    filters: [
      { label: 'Sàn:', value: 'Tất cả' },
      { label: 'Trạng thái:', value: 'Tất cả' },
      { label: 'Khu vực:', value: 'Việt Nam' },
    ],
    columns: [],
    rows: [],
  },
}
