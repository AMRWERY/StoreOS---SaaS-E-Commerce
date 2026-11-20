import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'tabs_content',
  name: 'Tabs',
  category: 'content',
  description: 'Switchable tabs for details, care guides or FAQs',
  icon: 'ph:tabs-bold',
  defaults: {
    heading: 'Product details',
    variant: 'underline',
    defaultTab: 1,
    items: [
      { title: 'Description', content: 'Crafted with care from premium materials.\n\nDesigned to last and easy to love every day.' },
      { title: 'Shipping', content: 'Orders ship within 24 hours.\n\nFree delivery on orders over $50.' },
      { title: 'Returns', content: 'Not happy? Return it within 30 days for a full refund.' },
    ],
  },
  groups: [
    {
      title: 'Content',
      open: true,
      fields: [
        {
          key: 'variant', label: 'Design', type: 'select', display: 'cards',
          options: [
            { value: 'underline', label: 'Underline', icon: 'ph:minus-bold', description: 'Tab row with an underline' },
            { value: 'pills', label: 'Pills', icon: 'ph:pill-bold', description: 'Rounded centered pill tabs' },
            { value: 'vertical', label: 'Vertical', icon: 'ph:sidebar-simple-bold', description: 'Side tab list with a content panel' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        {
          key: 'items',
          label: 'Tabs',
          type: 'repeater',
          newItem: { title: 'New tab', content: 'Tab content goes here.' },
          itemFields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'content', label: 'Content (blank line = new paragraph)', type: 'textarea', rows: 5 },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'defaultTab', label: 'Default tab (1 = first)', type: 'number' },
      ],
    },
  ],
}

export default def
