/**
 * Derived state for the Brands and Kênh bán (shops) screens, ported from the
 * design's buildBrandRows / buildBrand / buildShopRows / buildShop.
 */
import { BRANDS_DATA, SCOPE_DEFS, SHOPS } from './data'
import {
  BR_STATE,
  CHECK_ICON,
  CH_BG,
  CH_CODES,
  CH_NAME,
  CH_STATE,
  PLUS_ICON,
  SH_STATUS,
  STATUS,
  WARN_ICON,
  chips,
  rowTint,
} from './states'
import type {
  BrandDetail,
  BrandMappingCard,
  BrandRequestState,
  BrandRow,
  BrandScopeCell,
  FlagKind,
  ShopAlert,
  ShopDetail,
  ShopRow,
} from './types'

const FLAG_TONE: Record<FlagKind, string> = {
  error: 'bg-err/12 text-err-deep',
  warn: 'bg-warn/20 text-warn-deep',
  neutral: 'bg-adm-chip text-adm-muted',
}

export function buildBrandRows(): BrandRow[] {
  return BRANDS_DATA.map((b, i) => {
    const st = STATUS[b.status] || STATUS.none
    const linked = b.maps.filter((m) => m.state === 'ok').length
    return {
      index: i,
      name: b.name,
      logo: b.logo,
      logoBg: b.code === 'TH-0000' ? 'bg-adm-chip' : 'bg-white',
      meta: `MÃ ${b.code} · liên kết ${linked}/3 sàn`,
      flag: b.flag ?? '',
      flagPill: b.flagKind ? FLAG_TONE[b.flagKind] : FLAG_TONE.neutral,
      flagIcon: b.flagKind === 'neutral' ? 'M4 7h16 M4 12h10 M4 17h7' : WARN_ICON,
      productCount: b.products,
      channels: chips(b.maps.map((m) => BR_STATE[m.state].dotState)),
      channelNote: `${linked}/3 sàn đã liên kết`,
      updated: b.updated,
      warning: b.warning ?? '',
      warnBox: b.tone === 'error' ? 'bg-err/10 text-err-deep' : 'bg-warn/13 text-warn-deep',
      rowTint: rowTint(b.warning, b.tone),
      status: st.status,
      statusPill: st.pill,
      statusDot: st.dot,
    }
  })
}

const REQ_MAP: Record<
  BrandRequestState,
  { label: string; pill: string; border: string; icon: string }
> = {
  pending: {
    label: 'Chờ duyệt',
    pill: 'bg-warn/18 text-warn-deep',
    border: 'border-warn/35',
    icon: 'M12 6v6l4 2 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  },
  approved: {
    label: 'Đã duyệt',
    pill: 'bg-ok/13 text-ok-deep',
    border: 'border-ok/30',
    icon: CHECK_ICON,
  },
  rejected: {
    label: 'Bị từ chối',
    pill: 'bg-err/12 text-err-deep',
    border: 'border-err/35',
    icon: 'M18 6 6 18 M6 6l12 12',
  },
}

export function buildBrand(openBrand: number): BrandDetail | null {
  const b = BRANDS_DATA[openBrand]
  if (!b) return null
  const st = STATUS[b.status] || STATUS.none
  const linked = b.maps.filter((m) => m.state === 'ok').length

  return {
    name: b.name,
    logo: b.logo,
    logoBg: b.code === 'TH-0000' ? 'bg-adm-chip' : 'bg-white',
    meta: `MÃ ${b.code} · ${b.products} sản phẩm · liên kết ${linked}/3 sàn`,
    status: st.status,
    statusPill: st.pill,
    statusDot: st.dot,
    request: b.request
      ? { note: b.request.note, date: b.request.date, ...REQ_MAP[b.request.state] }
      : null,
    mappings: b.maps.map((m, i): BrandMappingCard => {
      const s = BR_STATE[m.state]
      const code = CH_CODES[i]
      return {
        code,
        name: CH_NAME[code],
        dot: CH_STATE[s.dotState].fill,
        border: s.border,
        badge: s.badge,
        badgePill: s.pill,
        linked: !!m.target,
        target: m.target,
        targetId: m.id,
        brokenTarget: m.state === 'broken',
        action: m.state === 'unreg' ? 'Gửi đăng ký thương hiệu' : 'Chọn thương hiệu sàn',
        note: s.note,
        noteIcon: s.noteIcon,
        noteTone: s.noteColor,
      }
    }),
    scope: (b.scope ?? []).map((r) => ({
      name: r[0],
      cells: ([1, 2, 3] as const).map((k): BrandScopeCell =>
        r[k]
          ? {
              mark: '✓',
              chip: 'bg-ok/15 text-ok-deep',
              title: 'Hợp lệ trong ngành hàng này',
            }
          : {
              mark: '—',
              chip: 'bg-adm-chip text-adm-faint-2',
              title: 'Thương hiệu không tồn tại trong ngành hàng này trên sàn',
            },
      ),
    })),
    rollup: `Thương hiệu là một trong ba điều kiện đăng bán, cùng danh mục và thuộc tính. ${b.products} sản phẩm phụ thuộc vào ánh xạ này.`,
  }
}

export function buildShopRows(): ShopRow[] {
  return SHOPS.map((s, i): ShopRow => {
    const st = SH_STATUS[s.status]
    const alarming = s.status === 'expiring' || s.status === 'disconnected'
    const missingReq = SCOPE_DEFS.filter((d) => d.required && !s.granted.includes(d.key))
    const bad = alarming || missingReq.length > 0
    return {
      index: i,
      chCode: s.ch,
      chBg: CH_BG[s.ch],
      name: s.name,
      meta: `MÃ ${s.code} · ${CH_NAME[s.ch]} · kết nối ${s.connected}`,
      region: s.region,
      type: s.type,
      status: st.label,
      statusPill: st.pill,
      statusDot: st.dot,
      expiry: s.expiry,
      expiryStrong: alarming,
      expiryTone: alarming ? 'text-err-deep' : 'text-adm-ink',
      expiryNote:
        s.days < 0
          ? 'Đã hết hạn'
          : s.days <= 7
            ? `Còn ${s.days} ngày — cấp lại ngay`
            : `Còn ${s.days} ngày`,
      expiryNoteTone: s.days <= 7 ? 'text-err-deep' : 'text-adm-faint-2',
      lastSync: s.lastSync,
      warning: s.warning ?? '',
      warnBox: bad ? 'bg-err/10 text-err-deep' : 'bg-warn/13 text-warn-deep',
      rowTint: bad ? 'bg-err/[0.04]' : 'bg-white',
    }
  })
}

export function buildShop(openShop: number): ShopDetail | null {
  const s = SHOPS[openShop]
  if (!s) return null
  const st = SH_STATUS[s.status]
  const missingReq = SCOPE_DEFS.filter((d) => d.required && !s.granted.includes(d.key))
  const grantedCount = SCOPE_DEFS.filter((d) => s.granted.includes(d.key)).length
  const expiring = s.days >= 0 && s.days <= 7
  const expired = s.days < 0

  let alert: ShopAlert | null = null
  if (expired) {
    alert = {
      title: 'Kết nối đã ngắt — token hết hạn',
      body: 'Token OAuth hết hạn ngày 20/07/2026. Mọi thao tác đồng bộ tới cửa hàng này đang thất bại, kể cả khi ánh xạ danh mục, thuộc tính và thương hiệu đã đủ.',
      action: 'Kết nối lại qua OAuth',
      tone: 'text-err-mid',
      btn: 'bg-err-mid',
      box: 'bg-err/8 border-err/28',
    }
  } else if (expiring) {
    alert = {
      title: `Token hết hạn sau ${s.days} ngày`,
      body: `Khi token hết hạn, toàn bộ đồng bộ sản phẩm, tồn kho, giá và đơn hàng của cửa hàng này sẽ dừng ngay lập tức. Cấp lại quyền trước ngày ${s.expiry}.`,
      action: 'Cấp lại quyền ngay',
      tone: 'text-err-mid',
      btn: 'bg-err-mid',
      box: 'bg-err/8 border-err/28',
    }
  } else if (missingReq.length) {
    alert = {
      title: `Thiếu quyền bắt buộc: ${missingReq.map((d) => d.name).join(', ')}`,
      body: 'Đồng bộ tới cửa hàng này sẽ thất bại ở phần tương ứng dù ánh xạ đã hoàn tất. Cấp lại quyền và chọn đầy đủ scope bắt buộc.',
      action: 'Cấp lại quyền với đủ scope',
      tone: 'text-warn-deep',
      btn: 'bg-warn-deep',
      box: 'bg-warn/12 border-warn/35',
    }
  }

  return {
    name: s.name,
    chCode: s.ch,
    chBg: CH_BG[s.ch],
    meta: `MÃ ${s.code} · ${CH_NAME[s.ch]} · ${s.type}`,
    status: st.label,
    statusPill: st.pill,
    statusDot: st.dot,
    alert,
    info: [
      { label: 'MÃ CỬA HÀNG', value: s.code, strong: true },
      { label: 'SÀN', value: CH_NAME[s.ch] },
      { label: 'KHU VỰC', value: s.region },
      { label: 'LOẠI HÌNH', value: s.type },
      { label: 'KẾT NỐI LÚC', value: `${s.connected} · ${s.by}` },
      {
        label: 'TOKEN HẾT HẠN',
        value: s.expiry,
        strong: true,
        tone: expiring || expired ? 'text-err-deep' : 'text-adm-ink',
      },
    ],
    scopes: SCOPE_DEFS.map((d) => {
      const has = s.granted.includes(d.key)
      const bad = !has && d.required
      return {
        name: d.name,
        desc: d.desc,
        box: bad ? 'border-err/30 bg-err/5' : 'border-adm-line-2 bg-white',
        markBg: has ? 'bg-ok' : d.required ? 'bg-err' : 'bg-idle',
        icon: has ? CHECK_ICON : d.required ? 'M18 6 6 18 M6 6l12 12' : PLUS_ICON,
        tag: has ? 'Đã cấp' : d.required ? 'THIẾU — CHẶN ĐỒNG BỘ' : 'Chưa cấp · không bắt buộc',
        tagPill: has
          ? 'bg-ok/13 text-ok-deep'
          : d.required
            ? 'bg-err/12 text-err-deep'
            : 'bg-adm-chip text-adm-muted',
      }
    }),
    scopeRatio: `${grantedCount}/${SCOPE_DEFS.length}`,
    scopePill: missingReq.length ? 'bg-err/12 text-err-deep' : 'bg-ok/13 text-ok-deep',
    rollup:
      'Đây là lớp nền: mọi ánh xạ và mọi lần đồng bộ trên ba màn hình còn lại đều phụ thuộc vào kết nối này còn hiệu lực.',
  }
}

export const expiringShopCount = () => SHOPS.filter((s) => s.days >= 0 && s.days <= 7).length
