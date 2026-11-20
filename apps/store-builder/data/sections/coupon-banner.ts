import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'coupon_banner',
  name: 'Coupon banner',
  category: 'marketing',
  description: 'Promo message with a copyable discount code',
  icon: 'ph:ticket-bold',
  defaults: {
    variant: 'ticket',
    text: 'Get 10% off your first order',
    code: 'WELCOME10',
    copy_label: 'Copy',
    copied_label: 'Copied!',
    conditions: 'Valid on orders over $50. One use per customer.',
    style: 'ticket',
    bg_color: '#eef2ff',
    text_color: '#312e81',
  },
  groups: [
    {
      title: 'Content',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'ticket', label: 'Ticket', icon: 'ph:ticket-bold', description: 'Dashed coupon with tear-off code' },
            { value: 'pill', label: 'Pill', icon: 'ph:pill-bold', description: 'Slim rounded inline strip' },
            { value: 'banner', label: 'Banner', icon: 'ph:rectangle-bold', description: 'Full-bleed centered band' },
          ],
        },
        { key: 'text', label: 'Promo text', type: 'text' },
        { key: 'code', label: 'Coupon code', type: 'text' },
        { key: 'copy_label', label: 'Copy button label', type: 'text' },
        { key: 'copied_label', label: 'Copied label', type: 'text' },
        { key: 'conditions', label: 'Conditions', type: 'textarea', rows: 2 },
      ],
    },
    {
      title: 'Style',
      fields: [
        { key: 'style', label: 'Style', type: 'select', options: [{ value: 'ticket', label: 'Dashed ticket' }, { value: 'solid', label: 'Solid' }] },
        { key: 'bg_color', label: 'Background', type: 'color' },
        { key: 'text_color', label: 'Text color', type: 'color' },
      ],
    },
  ],
}

export default def
