import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'flash_sale',
  name: 'Flash sale',
  category: 'marketing',
  description: 'Time-limited deals with a live countdown and discounted products',
  icon: 'ph:lightning-bold',
  popular: true,
  defaults: {
    variant: 'grid',
    heading: 'Flash sale',
    subheading: 'Grab these deals before the clock runs out.',
    hours_left: 24,
    percent_off: 30,
    product_count: '4',
    badge_text: 'off',
    button_label: 'Add to cart',
    added_label: 'Added',
    ended_text: 'This sale has ended.',
    label_days: 'Days',
    label_hours: 'Hours',
    label_minutes: 'Min',
    label_seconds: 'Sec',
    accent_color: '#e11d48',
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
            { value: 'grid', label: 'Grid', icon: 'ph:squares-four-bold', description: 'Centered countdown above cards' },
            { value: 'banner', label: 'Banner', icon: 'ph:rectangle-bold', description: 'Colored band with countdown beside products' },
            { value: 'list', label: 'List', icon: 'ph:rows-bold', description: 'Compact horizontal deal rows' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        { key: 'badge_text', label: 'Badge suffix', type: 'text', hint: 'Shown after the percentage, e.g. "off"' },
        { key: 'button_label', label: 'Button label', type: 'text' },
        { key: 'added_label', label: 'Added label', type: 'text' },
        { key: 'ended_text', label: 'Ended message', type: 'text' },
      ],
    },
    {
      title: 'Sale',
      fields: [
        { key: 'hours_left', label: 'Hours until end', type: 'number', min: 0, max: 720, unit: 'h' },
        { key: 'percent_off', label: 'Discount', type: 'number', min: 1, max: 90, unit: '%' },
        { key: 'product_count', label: 'Products', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
      ],
    },
    {
      title: 'Countdown labels',
      fields: [
        { key: 'label_days', label: 'Days', type: 'text' },
        { key: 'label_hours', label: 'Hours', type: 'text' },
        { key: 'label_minutes', label: 'Minutes', type: 'text' },
        { key: 'label_seconds', label: 'Seconds', type: 'text' },
      ],
    },
    {
      title: 'Style',
      fields: [{ key: 'accent_color', label: 'Accent color', type: 'color' }],
    },
  ],
}

export default def
