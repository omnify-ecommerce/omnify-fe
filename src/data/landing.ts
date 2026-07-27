/**
 * Content extracted from the `class Component extends DCLogic` block of
 * "Omnisync Landing.dc.html". Values are verbatim; the design's raw hex
 * marketplace colors are carried as Tailwind class names so the JIT can see
 * them (a dynamic `bg-[${hex}]` would never be generated).
 */

export const bars = [42, 58, 50, 72, 64, 80, 70, 92, 84, 68, 96, 88, 74, 90]

export const marketplaces = [
  { name: 'Shopee', abbr: 'SP', swatch: 'bg-shopee' },
  { name: 'Lazada', abbr: 'LZ', swatch: 'bg-lazada' },
  { name: 'TikTok Shop', abbr: 'TT', swatch: 'bg-tiktok' },
  { name: 'Shopify', abbr: 'SH', swatch: 'bg-shopify', soon: true },
  { name: 'WooCommerce', abbr: 'WC', swatch: 'bg-woo', soon: true },
  { name: 'Amazon', abbr: 'AZ', swatch: 'bg-amazon', soon: true },
  { name: 'eBay', abbr: 'EB', swatch: 'bg-ebay', soon: true },
]

export const stats = [
  { value: '12+ hrs', label: 'saved per week on manual updates' },
  { value: '99.9%', label: 'sync reliability across channels' },
  { value: '4×', label: 'faster product publishing' },
  { value: '0', label: 'overselling incidents' },
]

export const faqs = [
  {
    question: 'Which marketplaces are supported today?',
    answer:
      'Omnify supports Shopee, Lazada and TikTok Shop out of the box. Shopify, WooCommerce, Amazon and eBay are rolling out next, with additional channels available via our open API.',
  },
  {
    question: 'How does inventory synchronization prevent overselling?',
    answer:
      'We maintain a centralized stock count as the single source of truth. Every sale on any channel decrements it in real time and pushes the update everywhere, so two customers can never buy the last unit twice.',
  },
  {
    question: 'Do I need a developer to get set up?',
    answer:
      'No. Connecting stores uses secure OAuth and takes a few clicks. Most merchants import their catalog and go live across channels within an afternoon.',
  },
  {
    question: 'Can I set different prices per marketplace?',
    answer:
      'Yes. Set a base price and override it per channel, schedule future price changes, and layer on promotions — all of which sync automatically to the right stores.',
  },
  {
    question: 'What happens when a sync fails?',
    answer:
      'The Sync Jobs monitor logs every task with full detail. Failed jobs are flagged with the reason and can be retried in one click, individually or in bulk.',
  },
  {
    question: 'Does it support teams and permissions?',
    answer:
      'Absolutely. Invite unlimited teammates with role-based access control, granular permissions and full activity logs for accountability.',
  },
]

export const footcols = [
  {
    title: 'Product',
    links: ['Capabilities', 'Marketplaces', 'Integrations', 'Pricing', 'Changelog'],
  },
  { title: 'Company', links: ['About', 'Customers', 'Careers', 'Blog', 'Contact'] },
  {
    title: 'Resources',
    links: ['Documentation', 'API reference', 'Help center', 'System status'],
  },
]
