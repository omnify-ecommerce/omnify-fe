/**
 * Admin Console datasets, copied verbatim from the design's logic class.
 * Content is Vietnamese, as authored.
 */
import type {
  Attr,
  Brand,
  BrandMap,
  BrandMapState,
  Cat,
  CatMapCell,
  NavGroup,
  ScopeDef,
  Shop,
  ValueCell,
} from './types'

/* Value-cell constructors: mapped / unmapped(+suggestion) / broken. */
const m = (label: string, id: string): ValueCell => ({ k: 'ok', label, id })
const u = (sugLabel: string, sugNote: string): ValueCell => ({
  k: 'none',
  sug: sugLabel ? { label: sugLabel, note: sugNote } : null,
})
const bk = (label: string, note: string): ValueCell => ({ k: 'broken', label, note })

/* Category-mapping constructors. */
const cm = (target: string, id: string): CatMapCell => ({ k: 'ok', target, id })
const cbk = (target: string, id: string): CatMapCell => ({ k: 'broken', target, id })
export const cn = (): CatMapCell => ({ k: 'none' })

export const ATTRS: Attr[] = [
  {
    code: 'TT-001',
    name: 'Màu sắc',
    type: 'single',
    role: 'variant',
    required: true,
    catCount: 42,
    unlocks: 6,
    updated: '1 giờ trước',
    values: [
      {
        name: 'Đen',
        code: 'MS-001',
        cells: [m('Đen', 'ID 100112'), m('Black', 'ID 8871'), m('Đen', 'ID 55021')],
      },
      {
        name: 'Trắng',
        code: 'MS-002',
        cells: [m('Trắng', 'ID 100113'), m('White', 'ID 8872'), m('Trắng', 'ID 55022')],
      },
      {
        name: 'Xám',
        code: 'MS-003',
        cells: [m('Xám', 'ID 100114'), m('Grey', 'ID 8873'), m('Xám', 'ID 55023')],
      },
      {
        name: 'Xanh navy',
        code: 'MS-008',
        cells: [
          m('Xanh navy', 'ID 100118'),
          bk('Navy Blue', 'Sàn đã đổi tên giá trị'),
          u('Xanh hải quân', 'độ khớp 92%'),
        ],
      },
      {
        name: 'Xanh rêu',
        code: 'MS-009',
        cells: [
          m('Xanh rêu', 'ID 100119'),
          u('Xanh ô liu', 'độ khớp 88%'),
          u('Xanh rêu', 'độ khớp 95%'),
        ],
      },
      {
        name: 'Đỏ đô',
        code: 'MS-012',
        cells: [m('Đỏ đô', 'ID 100122'), m('Burgundy', 'ID 8880'), m('Đỏ đô', 'ID 55030')],
      },
      {
        name: 'Hồng pastel',
        code: 'MS-015',
        cells: [
          m('Hồng pastel', 'ID 100125'),
          m('Pastel Pink', 'ID 8884'),
          u('Hồng nhạt', 'độ khớp 86%'),
        ],
      },
      {
        name: 'Vàng nghệ',
        code: 'MS-018',
        cells: [
          m('Vàng nghệ', 'ID 100128'),
          u('Vàng mù tạt', 'độ khớp 81%'),
          u('Vàng nghệ', 'độ khớp 97%'),
        ],
      },
      {
        name: 'Nâu cà phê',
        code: 'MS-021',
        cells: [m('Nâu cà phê', 'ID 100131'), m('Coffee Brown', 'ID 8890'), m('Nâu', 'ID 55038')],
      },
      {
        name: 'Kem',
        code: 'MS-024',
        cells: [m('Kem', 'ID 100134'), m('Cream', 'ID 8893'), m('Kem', 'ID 55041')],
      },
    ],
  },
  {
    code: 'TT-002',
    name: 'Kích cỡ',
    type: 'single',
    role: 'variant',
    required: true,
    catCount: 28,
    unlocks: 4,
    updated: '4 giờ trước',
    warning:
      '6 giá trị chưa có cặp tương ứng trên TikTok Shop — biến thể tương ứng đang tạm ngừng đăng.',
    values: [
      {
        name: 'S',
        code: 'KC-001',
        cells: [m('S', 'ID 300201'), m('S', 'ID 6601'), m('S', 'ID 71001')],
      },
      {
        name: 'M',
        code: 'KC-002',
        cells: [m('M', 'ID 300202'), m('M', 'ID 6602'), m('M', 'ID 71002')],
      },
      {
        name: 'L',
        code: 'KC-003',
        cells: [m('L', 'ID 300203'), m('L', 'ID 6603'), m('L', 'ID 71003')],
      },
      {
        name: 'XL',
        code: 'KC-004',
        cells: [m('XL', 'ID 300204'), m('XL', 'ID 6604'), m('XL', 'ID 71004')],
      },
      {
        name: '2XL',
        code: 'KC-005',
        cells: [m('2XL', 'ID 300205'), m('XXL', 'ID 6605'), u('2XL', 'độ khớp 99%')],
      },
      {
        name: '3XL',
        code: 'KC-006',
        cells: [m('3XL', 'ID 300206'), u('XXXL', 'độ khớp 90%'), u('3XL', 'độ khớp 99%')],
      },
      {
        name: 'Free size',
        code: 'KC-010',
        cells: [
          m('Free size', 'ID 300210'),
          u('One Size', 'độ khớp 84%'),
          u('Freesize', 'độ khớp 93%'),
        ],
      },
      {
        name: '38',
        code: 'KC-038',
        cells: [m('38', 'ID 300238'), m('38', 'ID 6638'), m('38', 'ID 71038')],
      },
      {
        name: '39',
        code: 'KC-039',
        cells: [m('39', 'ID 300239'), m('39', 'ID 6639'), u('39', 'độ khớp 99%')],
      },
      {
        name: '40',
        code: 'KC-040',
        cells: [m('40', 'ID 300240'), m('40', 'ID 6640'), m('40', 'ID 71040')],
      },
    ],
  },
  {
    code: 'TT-003',
    name: 'Chất liệu',
    type: 'multi',
    role: 'descriptive',
    required: true,
    catCount: 31,
    unlocks: 9,
    updated: 'Hôm qua',
    values: [
      {
        name: '100% Cotton',
        code: 'CL-001',
        cells: [m('Cotton', 'ID 200341'), m('100% Cotton', 'ID 7712'), m('Cotton', 'ID 61002')],
      },
      {
        name: 'Cotton pha',
        code: 'CL-002',
        cells: [
          m('Cotton pha', 'ID 200342'),
          m('Cotton Blend', 'ID 7713'),
          u('Cotton blend', 'độ khớp 89%'),
        ],
      },
      {
        name: 'Polyester',
        code: 'CL-003',
        cells: [m('Polyester', 'ID 200343'), m('Polyester', 'ID 7714'), m('Polyester', 'ID 61004')],
      },
      {
        name: 'Linen',
        code: 'CL-004',
        cells: [
          m('Vải lanh', 'ID 200344'),
          u('Linen', 'độ khớp 96%'),
          u('Vải lanh', 'độ khớp 91%'),
        ],
      },
      {
        name: 'Denim',
        code: 'CL-005',
        cells: [m('Denim', 'ID 200345'), m('Denim', 'ID 7716'), m('Denim', 'ID 61006')],
      },
      {
        name: 'Len',
        code: 'CL-006',
        cells: [
          m('Len', 'ID 200346'),
          bk('Wool', 'Giá trị đã bị xoá trên sàn'),
          u('Len', 'độ khớp 94%'),
        ],
      },
      {
        name: 'Lụa',
        code: 'CL-007',
        cells: [m('Lụa', 'ID 200347'), m('Silk', 'ID 7718'), u('Lụa', 'độ khớp 93%')],
      },
      {
        name: 'Da PU',
        code: 'CL-008',
        cells: [
          u('Da PU', 'độ khớp 90%'),
          m('PU Leather', 'ID 7719'),
          u('PU Leather', 'độ khớp 87%'),
        ],
      },
      {
        name: 'Nỉ',
        code: 'CL-009',
        cells: [u('Nỉ', 'độ khớp 88%'), u('Fleece', 'độ khớp 85%'), u('Nỉ', 'độ khớp 88%')],
      },
      {
        name: 'Vải thô',
        code: 'CL-010',
        cells: [m('Vải thô', 'ID 200350'), m('Canvas', 'ID 7721'), m('Vải thô', 'ID 61010')],
      },
    ],
  },
  {
    code: 'TT-004',
    name: 'Xuất xứ',
    type: 'single',
    role: 'descriptive',
    required: true,
    catCount: 96,
    unlocks: 2,
    updated: 'Hôm qua',
    values: [
      {
        name: 'Việt Nam',
        code: 'XX-001',
        cells: [m('Việt Nam', 'ID 400101'), m('Vietnam', 'ID 5501'), m('Việt Nam', 'ID 81001')],
      },
      {
        name: 'Trung Quốc',
        code: 'XX-002',
        cells: [m('Trung Quốc', 'ID 400102'), m('China', 'ID 5502'), m('Trung Quốc', 'ID 81002')],
      },
      {
        name: 'Thái Lan',
        code: 'XX-003',
        cells: [m('Thái Lan', 'ID 400103'), m('Thailand', 'ID 5503'), m('Thái Lan', 'ID 81003')],
      },
      {
        name: 'Hàn Quốc',
        code: 'XX-004',
        cells: [m('Hàn Quốc', 'ID 400104'), m('South Korea', 'ID 5504'), m('Hàn Quốc', 'ID 81004')],
      },
      {
        name: 'Nhật Bản',
        code: 'XX-005',
        cells: [m('Nhật Bản', 'ID 400105'), m('Japan', 'ID 5505'), m('Nhật Bản', 'ID 81005')],
      },
      {
        name: 'Đức',
        code: 'XX-006',
        cells: [m('Đức', 'ID 400106'), m('Germany', 'ID 5506'), u('Đức', 'độ khớp 98%')],
      },
      {
        name: 'Khác',
        code: 'XX-099',
        cells: [m('Khác', 'ID 400199'), m('Others', 'ID 5599'), m('Khác', 'ID 81099')],
      },
    ],
  },
  {
    code: 'TT-011',
    name: 'Dung tích',
    type: 'number',
    role: 'descriptive',
    required: false,
    catCount: 14,
    unlocks: 1,
    updated: '2 ngày trước',
    ch: ['ok', 'broken', 'ok'],
    warning: 'Lazada đã đổi đơn vị chuẩn từ “ml” sang “mL” — ánh xạ đơn vị không còn hợp lệ.',
    tone: 'error',
    values: [],
  },
  {
    code: 'TT-014',
    name: 'Hạn sử dụng',
    type: 'date',
    role: 'descriptive',
    required: true,
    catCount: 9,
    unlocks: 3,
    updated: '3 ngày trước',
    ch: ['ok', 'ok', 'partial'],
    values: [],
  },
  {
    code: 'TT-021',
    name: 'Bảo hành',
    type: 'text',
    role: 'descriptive',
    required: false,
    catCount: 22,
    unlocks: 0,
    updated: '1 tuần trước',
    ch: ['ok', 'none', 'none'],
    values: [],
  },
  {
    code: 'TT-030',
    name: 'Kiểu dáng',
    type: 'single',
    role: 'variant',
    required: false,
    catCount: 6,
    unlocks: 6,
    updated: '—',
    badge: 'Nháp',
    values: [
      {
        name: 'Ôm body',
        code: 'KD-001',
        cells: [u('Ôm body', 'độ khớp 91%'), u('Slim fit', 'độ khớp 78%'), u('Ôm', 'độ khớp 82%')],
      },
      {
        name: 'Suông',
        code: 'KD-002',
        cells: [
          u('Suông', 'độ khớp 94%'),
          u('Regular fit', 'độ khớp 74%'),
          u('Suông', 'độ khớp 94%'),
        ],
      },
      {
        name: 'Oversize',
        code: 'KD-003',
        cells: [
          u('Oversize', 'độ khớp 99%'),
          u('Oversized', 'độ khớp 96%'),
          u('Oversize', 'độ khớp 99%'),
        ],
      },
      {
        name: 'Croptop',
        code: 'KD-004',
        cells: [
          u('Croptop', 'độ khớp 97%'),
          u('Crop Top', 'độ khớp 95%'),
          u('Croptop', 'độ khớp 97%'),
        ],
      },
    ],
  },
]

export const CATS: Cat[] = [
  {
    code: 'DM-1000',
    name: 'Điện thoại & Phụ kiện',
    parent: null,
    skus: '1.554',
    group: true,
    desc: 'Nhóm ngành hàng cấp 1. Danh mục cha không đăng bán trực tiếp — sản phẩm được gán vào danh mục lá bên dưới.',
  },
  {
    code: 'DM-1042',
    name: 'Điện thoại di động',
    parent: 'DM-1000',
    skus: '428',
    desc: 'Điện thoại thông minh và điện thoại phổ thông nguyên seal, bảo hành chính hãng tại Việt Nam.',
    attrs: ['TT-001', 'TT-004', 'TT-021'],
    map: [cm('Điện thoại', 'ID 100601'), cm('Mobiles', 'ID 18001'), cm('Điện thoại', 'ID 55101')],
  },
  {
    code: 'DM-1043',
    name: 'Ốp lưng & Bao da',
    parent: 'DM-1000',
    skus: '1.126',
    desc: 'Phụ kiện bảo vệ điện thoại: ốp lưng, bao da, ví da đa năng.',
    attrs: ['TT-001', 'TT-003'],
    map: [
      cm('Ốp lưng & Bao da', 'ID 100612'),
      cm('Phone Cases', 'ID 18014'),
      cm('Ốp & Bao da', 'ID 55112'),
    ],
  },

  {
    code: 'DM-2000',
    name: 'Thời trang nam',
    parent: null,
    skus: '3.209',
    group: true,
    desc: 'Nhóm ngành hàng cấp 1 cho toàn bộ hàng may mặc nam.',
  },
  {
    code: 'DM-2200',
    name: 'Áo',
    parent: 'DM-2000',
    skus: '1.842',
    group: true,
    desc: 'Danh mục cấp 2 gom toàn bộ nhóm áo nam.',
  },
  {
    code: 'DM-2211',
    name: 'Áo thun nam',
    parent: 'DM-2200',
    skus: '864',
    desc: 'Áo thun nam cotton, thun lạnh và polo. Hàng sản xuất trong nước và nhập khẩu, có sẵn nhiều màu và size.',
    attrs: ['TT-001', 'TT-002', 'TT-003'],
    map: [cm('Áo thun nam', 'ID 100629'), cbk('Áo nam', 'ID 18294'), cn()],
  },
  {
    code: 'DM-2212',
    name: 'Áo sơ mi nam',
    parent: 'DM-2200',
    skus: '482',
    desc: 'Áo sơ mi nam dài tay và ngắn tay, chất liệu cotton, lanh và vải pha.',
    attrs: ['TT-001', 'TT-002', 'TT-003'],
    map: [cm('Áo sơ mi nam', 'ID 100631'), cm('Shirts', 'ID 18296'), cn()],
  },
  {
    code: 'DM-2300',
    name: 'Quần',
    parent: 'DM-2000',
    skus: '1.367',
    group: true,
    desc: 'Danh mục cấp 2 gom toàn bộ nhóm quần nam.',
  },
  {
    code: 'DM-2311',
    name: 'Quần jean nam',
    parent: 'DM-2300',
    skus: '596',
    desc: 'Quần jean nam ống đứng, slim fit và baggy.',
    attrs: ['TT-001', 'TT-002', 'TT-003'],
    map: [cm('Quần jean nam', 'ID 100645'), cm('Jeans', 'ID 18310'), cm('Quần jean', 'ID 55140')],
  },

  {
    code: 'DM-3000',
    name: 'Nhà cửa & Đời sống',
    parent: null,
    skus: '2.084',
    group: true,
    desc: 'Nhóm ngành hàng cấp 1 cho đồ gia dụng và đồ dùng gia đình.',
  },
  {
    code: 'DM-3300',
    name: 'Nhà bếp',
    parent: 'DM-3000',
    skus: '1.096',
    group: true,
    desc: 'Danh mục cấp 2 cho thiết bị và đồ dùng nhà bếp.',
  },
  {
    code: 'DM-3305',
    name: 'Nồi cơm điện',
    parent: 'DM-3300',
    skus: '212',
    desc: 'Nồi cơm điện cơ, điện tử và cao tần, dung tích 0,8–3 lít.',
    attrs: ['TT-004', 'TT-011', 'TT-021'],
    map: [
      cm('Nồi cơm điện', 'ID 100812'),
      cm('Rice Cookers', 'ID 18502'),
      cm('Nồi cơm điện', 'ID 55302'),
    ],
  },
  {
    code: 'DM-3390',
    name: 'Đồ dùng nhà bếp',
    parent: 'DM-3000',
    skus: '64',
    desc: 'Bình giữ nhiệt, hộp đựng thực phẩm và đồ dùng bàn ăn.',
    attrs: ['TT-003', 'TT-011'],
    map: [cm('Đồ dùng nhà bếp', 'ID 100840'), cn(), cm('Đồ dùng bếp', 'ID 55330')],
  },

  {
    code: 'DM-4000',
    name: 'Mẹ & Bé',
    parent: null,
    skus: '688',
    group: true,
    desc: 'Nhóm ngành hàng cấp 1 cho sản phẩm mẹ và bé.',
  },
  {
    code: 'DM-4100',
    name: 'Sữa & Thực phẩm cho bé',
    parent: 'DM-4000',
    skus: '214',
    group: true,
    desc: 'Danh mục cấp 2 cho sữa và thực phẩm dinh dưỡng.',
  },
  {
    code: 'DM-4102',
    name: 'Sữa bột cho bé',
    parent: 'DM-4100',
    skus: '96',
    desc: 'Sữa bột công thức theo độ tuổi. Ngành hàng cần chứng nhận an toàn thực phẩm khi đăng bán.',
    attrs: ['TT-004', 'TT-014'],
    map: [
      cm('Sữa bột', 'ID 100902'),
      cm('Baby Milk Powder', 'ID 18601'),
      cm('Sữa bột', 'ID 55402'),
    ],
  },

  {
    code: 'DM-5000',
    name: 'Làm đẹp',
    parent: null,
    skus: '742',
    group: true,
    desc: 'Nhóm ngành hàng cấp 1 cho mỹ phẩm và chăm sóc cá nhân.',
  },
  {
    code: 'DM-5100',
    name: 'Trang điểm',
    parent: 'DM-5000',
    skus: '418',
    group: true,
    desc: 'Danh mục cấp 2 cho sản phẩm trang điểm.',
  },
  {
    code: 'DM-5008',
    name: 'Son môi',
    parent: 'DM-5100',
    skus: '340',
    desc: 'Son kem, son thỏi và son dưỡng có màu.',
    attrs: ['TT-001', 'TT-014'],
    map: [cm('Son môi', 'ID 101002'), cm('Lipstick', 'ID 18702'), cm('Son môi', 'ID 55502')],
  },

  {
    code: 'DM-6000',
    name: 'Thời trang nữ',
    parent: null,
    skus: '178',
    group: true,
    desc: 'Nhóm ngành hàng cấp 1 mới mở, chưa ánh xạ sang sàn nào.',
  },
  {
    code: 'DM-2640',
    name: 'Giày sandal nữ',
    parent: 'DM-6000',
    skus: '178',
    desc: 'Sandal nữ quai chéo, quai ngang và sandal đế xuồng. Danh mục mới, chưa ánh xạ.',
    attrs: ['TT-001', 'TT-002'],
    map: [cn(), cn(), cn()],
  },
]

const bm = (state: BrandMapState, target: string, id: string): BrandMap => ({
  state,
  target,
  id,
})

export const BRANDS_DATA: Brand[] = [
  {
    code: 'TH-0012',
    logo: 'VNM',
    name: 'Vinamilk',
    products: '246',
    updated: '3 giờ trước',
    status: 'ready',
    maps: [
      bm('ok', 'Vinamilk', 'ID 900112'),
      bm('ok', 'Vinamilk', 'ID 44021'),
      bm('ok', 'Vinamilk', 'ID 66015'),
    ],
    scope: [
      ['Thực phẩm & Đồ uống', 1, 1, 1],
      ['Bách hoá', 1, 1, 1],
      ['Mẹ & Bé', 1, 1, 0],
      ['Sức khoẻ', 1, 0, 0],
    ],
  },
  {
    code: 'TH-0018',
    logo: 'TH',
    name: 'TH true MILK',
    products: '184',
    updated: 'Hôm qua',
    status: 'ready',
    maps: [
      bm('ok', 'TH true MILK', 'ID 900118'),
      bm('ok', 'TH True Milk', 'ID 44030'),
      bm('ok', 'TH true MILK', 'ID 66022'),
    ],
    scope: [
      ['Thực phẩm & Đồ uống', 1, 1, 1],
      ['Bách hoá', 1, 1, 1],
      ['Mẹ & Bé', 1, 1, 1],
    ],
  },
  {
    code: 'TH-0044',
    logo: 'BT',
    name: "Biti's",
    products: '392',
    updated: 'Hôm qua',
    status: 'partial',
    flag: 'THIẾU UỶ QUYỀN',
    flagKind: 'error',
    warning:
      'TikTok Shop yêu cầu giấy uỷ quyền thương hiệu cho ngành Thời trang. Hồ sơ gửi 24/07, đang chờ duyệt — 392 sản phẩm tạm đăng dưới nhãn “Không có thương hiệu”.',
    request: {
      state: 'pending',
      date: 'Gửi 24/07/2026',
      note: 'Hồ sơ uỷ quyền thương hiệu trên TikTok Shop',
    },
    maps: [
      bm('ok', "Biti's", 'ID 900244'),
      bm('ok', "Biti's", 'ID 44110'),
      bm('unauth', "Biti's", 'ID 66140'),
    ],
    scope: [
      ['Thời trang', 1, 1, 1],
      ['Giày dép', 1, 1, 1],
      ['Thể thao', 1, 0, 0],
      ['Bách hoá', 0, 0, 0],
    ],
  },
  {
    code: 'TH-0051',
    logo: 'SH',
    name: 'Sunhouse',
    products: '268',
    updated: '2 ngày trước',
    status: 'error',
    tone: 'error',
    warning:
      'Lazada đã xoá thương hiệu mục tiêu “SUNHOUSE VN”. 268 sản phẩm đang hiển thị sai nhãn — cần ánh xạ lại ngay.',
    maps: [
      bm('ok', 'Sunhouse', 'ID 900251'),
      bm('broken', 'SUNHOUSE VN', 'ID 44160'),
      bm('ok', 'Sunhouse', 'ID 66158'),
    ],
    scope: [
      ['Gia dụng', 1, 1, 1],
      ['Nhà cửa & Đời sống', 1, 1, 1],
      ['Điện máy', 1, 1, 0],
    ],
  },
  {
    code: 'TH-0077',
    logo: 'CC',
    name: 'Cocoon',
    products: '96',
    updated: '2 ngày trước',
    status: 'ready',
    maps: [
      bm('ok', 'Cocoon', 'ID 900277'),
      bm('ok', 'Cocoon Vietnam', 'ID 44190'),
      bm('ok', 'Cocoon', 'ID 66180'),
    ],
    scope: [
      ['Làm đẹp', 1, 1, 1],
      ['Chăm sóc cá nhân', 1, 1, 1],
      ['Sức khoẻ', 1, 1, 0],
    ],
  },
  {
    code: 'TH-0083',
    logo: 'KG',
    name: 'Kangaroo',
    products: '142',
    updated: '4 ngày trước',
    status: 'partial',
    flag: 'CẦN ĐĂNG KÝ',
    flagKind: 'warn',
    warning:
      'Thương hiệu chưa tồn tại trên Lazada và TikTok Shop — cần gửi yêu cầu đăng ký thương hiệu mới cho từng sàn.',
    maps: [bm('ok', 'Kangaroo', 'ID 900283'), bm('unreg', '', ''), bm('unreg', '', '')],
    scope: [
      ['Gia dụng', 1, 0, 0],
      ['Điện máy', 1, 0, 0],
      ['Nhà cửa & Đời sống', 1, 0, 0],
    ],
  },
  {
    code: 'TH-0104',
    logo: 'TK',
    name: 'Thorakao',
    products: '34',
    updated: '5 ngày trước',
    status: 'none',
    flag: 'BỊ TỪ CHỐI',
    flagKind: 'error',
    warning:
      'Shopee từ chối hồ sơ đăng ký ngày 21/07 (thiếu giấy chứng nhận nhãn hiệu). Chưa gửi hồ sơ cho hai sàn còn lại.',
    request: {
      state: 'rejected',
      date: 'Từ chối 21/07/2026',
      note: 'Hồ sơ đăng ký thương hiệu mới trên Shopee',
    },
    maps: [bm('rejected', '', ''), bm('unreg', '', ''), bm('unreg', '', '')],
    scope: [
      ['Làm đẹp', 0, 0, 0],
      ['Chăm sóc cá nhân', 0, 0, 0],
    ],
  },
  {
    code: 'TH-0000',
    logo: 'OEM',
    name: 'Không có thương hiệu (OEM)',
    products: '1.284',
    updated: '1 tuần trước',
    status: 'ready',
    flag: 'OEM / KHÔNG NHÃN',
    flagKind: 'neutral',
    maps: [
      bm('ok', 'No Brand', 'ID 900000'),
      bm('ok', 'No Brand', 'ID 44000'),
      bm('ok', 'Không có thương hiệu', 'ID 66000'),
    ],
    scope: [
      ['Bách hoá', 1, 1, 1],
      ['Nhà cửa & Đời sống', 1, 1, 1],
      ['Thời trang', 1, 1, 1],
      ['Phụ kiện', 1, 1, 1],
    ],
  },
]

export const SCOPE_DEFS: ScopeDef[] = [
  {
    key: 'product',
    name: 'Quản lý sản phẩm',
    desc: 'product.read · product.write — đăng và cập nhật sản phẩm',
    required: true,
  },
  {
    key: 'inventory',
    name: 'Cập nhật tồn kho',
    desc: 'inventory.write — đồng bộ số lượng tồn theo thời gian thực',
    required: true,
  },
  {
    key: 'price',
    name: 'Quản lý giá',
    desc: 'price.write — cập nhật giá bán và giá khuyến mãi',
    required: true,
  },
  {
    key: 'order',
    name: 'Đọc đơn hàng',
    desc: 'order.read — tải đơn về dashboard tập trung',
    required: true,
  },
  {
    key: 'promotion',
    name: 'Quản lý khuyến mãi',
    desc: 'promotion.write — tạo mã giảm giá và chương trình sàn',
    required: false,
  },
  {
    key: 'logistics',
    name: 'Vận chuyển',
    desc: 'logistics.read — tra cứu vận đơn và trạng thái giao',
    required: false,
  },
]

export const SHOPS: Shop[] = [
  {
    ch: 'S',
    name: 'Nhà Việt Official Store',
    code: 'SP-88213',
    region: 'Việt Nam · TP.HCM',
    type: 'Shopee Mall',
    status: 'active',
    expiry: '12/10/2026',
    days: 78,
    lastSync: '6 phút trước',
    connected: '14/04/2026',
    by: 'Nguyễn Thị Mai',
    granted: ['product', 'inventory', 'price', 'order', 'promotion', 'logistics'],
  },
  {
    ch: 'S',
    name: 'Nhà Việt Outlet',
    code: 'SP-90177',
    region: 'Việt Nam · Hà Nội',
    type: 'Cửa hàng thường',
    status: 'expiring',
    expiry: '31/07/2026',
    days: 5,
    lastSync: '11 phút trước',
    connected: '02/02/2026',
    by: 'Trần Quốc Huy',
    granted: ['product', 'inventory', 'price', 'order'],
    warning:
      'Token OAuth hết hạn sau 5 ngày. Khi hết hạn, toàn bộ đồng bộ sản phẩm, tồn kho và đơn hàng của cửa hàng này sẽ dừng.',
  },
  {
    ch: 'L',
    name: 'Nhà Việt Flagship',
    code: 'LZ-40551',
    region: 'Việt Nam',
    type: 'LazMall',
    status: 'active',
    expiry: '03/01/2027',
    days: 161,
    lastSync: '9 phút trước',
    connected: '21/11/2025',
    by: 'Nguyễn Thị Mai',
    granted: ['product', 'price', 'order', 'logistics'],
    warning:
      'Thiếu quyền bắt buộc “Cập nhật tồn kho” — tồn kho không đồng bộ sang cửa hàng này dù ánh xạ đã đủ.',
  },
  {
    ch: 'T',
    name: 'nhavietstore',
    code: 'TT-77120',
    region: 'Việt Nam',
    type: 'Cửa hàng chính hãng',
    status: 'expiring',
    expiry: '02/08/2026',
    days: 7,
    lastSync: '22 phút trước',
    connected: '08/03/2026',
    by: 'Lê Hoàng Nam',
    granted: ['product', 'inventory', 'price', 'order', 'logistics'],
    warning: 'Token OAuth hết hạn sau 7 ngày. Cấp lại quyền để giữ luồng đồng bộ hai chiều.',
  },
  {
    ch: 'L',
    name: 'Nhà Việt Deals',
    code: 'LZ-41902',
    region: 'Việt Nam',
    type: 'Cửa hàng thường',
    status: 'paused',
    expiry: '18/11/2026',
    days: 115,
    lastSync: 'Tạm dừng 2 ngày',
    connected: '30/05/2026',
    by: 'Trần Quốc Huy',
    granted: ['product', 'inventory', 'price', 'order'],
  },
  {
    ch: 'T',
    name: 'nhaviet.home',
    code: 'TT-79004',
    region: 'Việt Nam',
    type: 'Cửa hàng thường',
    status: 'disconnected',
    expiry: 'Đã hết hạn 20/07/2026',
    days: -6,
    lastSync: 'Thất bại 20/07',
    connected: '12/01/2026',
    by: 'Lê Hoàng Nam',
    granted: ['product', 'order'],
    warning:
      'Kết nối đã ngắt do token hết hạn ngày 20/07. Mọi thao tác đồng bộ tới cửa hàng này đang thất bại.',
  },
]

export const LEGEND: { fill: string; label: string }[] = [
  { fill: 'bg-ok', label: 'Đã ánh xạ đủ' },
  { fill: 'bg-warn', label: 'Thiếu thông tin' },
  { fill: 'bg-idle', label: 'Chưa ánh xạ' },
  { fill: 'bg-err', label: 'Lỗi ánh xạ' },
]

export const BULK_ACTIONS: { label: string; tone: string; icon: string }[] = [
  {
    label: 'Ánh xạ tự động',
    tone: 'text-adm-ink',
    icon: 'M12 3v3m0 12v3M3 12h3m12 0h3M7.8 7.8 5.6 5.6m12.8 2.2 2.2-2.2M7.8 16.2l-2.2 2.2m12.8-2.2 2.2 2.2',
  },
  {
    label: 'Gán danh mục sàn',
    tone: 'text-adm-ink',
    icon: 'M4 20h16M4 4h16M9 8h11M9 12h11M9 16h11M4 8h1M4 12h1M4 16h1',
  },
  {
    label: 'Đăng lại',
    tone: 'text-adm-ink',
    icon: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8m0-5v5h-5',
  },
  { label: 'Gỡ ánh xạ', tone: 'text-err-deep', icon: 'M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14' },
]

export const SKELETONS: { w1: number; w2: number }[] = [
  { w1: 190, w2: 92 },
  { w1: 150, w2: 110 },
  { w1: 220, w2: 80 },
  { w1: 170, w2: 100 },
  { w1: 205, w2: 86 },
  { w1: 140, w2: 120 },
  { w1: 230, w2: 94 },
  { w1: 165, w2: 104 },
]

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'TỔNG QUAN',
    items: [
      {
        name: 'Bảng điều khiển',
        icon: 'M3 13h8V3H3zm10 8h8v-6h-8zM3 21h8v-6H3zm10-10h8V3h-8z',
        key: null,
      },
    ],
  },
  {
    label: 'ÁNH XẠ',
    items: [
      { name: 'Danh mục', icon: 'M4 6h16M4 12h10M4 18h7', key: 'categories', count: '12' },
      { name: 'Thuộc tính', icon: 'M4 7h16M4 12h16M4 17h10', key: 'attributes', count: '5' },
      { name: 'Thương hiệu', icon: 'M3 7l9-4 9 4v10l-9 4-9-4z', key: 'brands', count: '2' },
    ],
  },
  {
    label: 'SẢN PHẨM',
    items: [
      {
        name: 'Sản phẩm',
        icon: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
        key: 'products',
      },
      {
        name: 'Tồn kho',
        icon: 'M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35z',
        key: null,
      },
      {
        name: 'Giá bán',
        icon: 'M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z',
        key: null,
      },
    ],
  },
  {
    label: 'VẬN HÀNH',
    items: [
      {
        name: 'Đơn hàng',
        icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
        key: null,
      },
      {
        name: 'Đồng bộ',
        icon: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8m0-5v5h-5',
        key: null,
      },
      {
        name: 'Khuyến mãi',
        icon: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z',
        key: null,
      },
    ],
  },
  {
    label: 'HỆ THỐNG',
    items: [
      {
        name: 'Kênh bán',
        icon: 'M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1',
        key: 'shops',
        count: '2',
      },
      {
        name: 'Người dùng',
        icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
        key: null,
      },
      {
        name: 'Cài đặt',
        icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2 2 2 0 1 1-4 0 1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 11.5 4a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9 2 2 0 1 1 0 4z',
        key: null,
      },
    ],
  },
]
