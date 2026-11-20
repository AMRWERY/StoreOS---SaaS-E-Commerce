import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'marquee_text',
  name: 'Marquee text',
  category: 'layout',
  description: 'An infinitely scrolling text ticker',
  icon: 'ph:text-aa-bold',
  defaults: {
    items: [
      { text: 'Free shipping over $50' },
      { text: 'New arrivals every week' },
      { text: '30-day easy returns' },
    ],
    variant: 'ticker',
    separator: 'ph:star-four-fill',
    speed: 30,
    direction: 'left',
    bg_color: '#111827',
    text_color: '#ffffff',
    uppercase: true,
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
            { value: 'ticker', label: 'Ticker', icon: 'ph:minus-bold', description: 'Slim announcement strip' },
            { value: 'pills', label: 'Pills', icon: 'ph:pill-bold', description: 'Each phrase in a pill' },
            { value: 'display', label: 'Big display', icon: 'ph:text-aa-bold', description: 'Large headline marquee' },
          ],
        },
        {
          key: 'items',
          label: 'Phrases',
          type: 'repeater',
          newItem: { text: 'New phrase' },
          itemFields: [{ key: 'text', label: 'Text', type: 'text' }],
        },
        { key: 'separator', label: 'Separator (ph: icon name or character)', type: 'text', placeholder: 'ph:star-four-fill' },
        { key: 'uppercase', label: 'Uppercase', type: 'toggle' },
      ],
    },
    {
      title: 'Motion',
      fields: [
        { key: 'speed', label: 'Duration of one loop (seconds)', type: 'number', min: 5, max: 120 },
        { key: 'direction', label: 'Direction', type: 'select', options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }] },
      ],
    },
    {
      title: 'Colors',
      fields: [
        { key: 'bg_color', label: 'Background', type: 'color' },
        { key: 'text_color', label: 'Text', type: 'color' },
      ],
    },
  ],
}

export default def
