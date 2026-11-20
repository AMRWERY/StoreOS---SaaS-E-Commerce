import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'product_tabs',
  name: 'Product tabs',
  category: 'product_page',
  description: 'Description, specifications and shipping info in tabs',
  icon: 'ph:tabs-bold',
  pages: ['product'],
  defaults: {
    variant: 'tabs',
    descriptionTitle: 'Description',
    descriptionText:
      'Thoughtfully designed and built to last. Crafted from premium materials with attention to every detail, so it looks great and feels even better in everyday use.',
    specsTitle: 'Specifications',
    specs: [
      { label: 'Material', value: 'Premium recycled blend' },
      { label: 'Weight', value: '320 g' },
      { label: 'Warranty', value: '2 years' },
    ],
    shippingTitle: 'Shipping & returns',
    shippingText:
      'Free standard shipping on orders over $100. Orders ship within 24 hours and arrive in 3-5 business days. Return any item within 30 days for a full refund.',
  },
  groups: [
    {
      title: 'Description tab',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'tabs', label: 'Underline tabs', icon: 'ph:tabs-bold', description: 'Classic tab bar' },
            { value: 'pills', label: 'Pills', icon: 'ph:toggle-left-bold', description: 'Rounded segmented control' },
            { value: 'accordion', label: 'Accordion', icon: 'ph:list-plus-bold', description: 'Expandable sections' },
          ],
        },
        { key: 'descriptionTitle', label: 'Tab title', type: 'text' },
        { key: 'descriptionText', label: 'Content', type: 'textarea', rows: 5 },
      ],
    },
    {
      title: 'Specifications tab',
      fields: [
        { key: 'specsTitle', label: 'Tab title', type: 'text' },
        {
          key: 'specs',
          label: 'Specifications',
          type: 'repeater',
          newItem: { label: 'Label', value: 'Value' },
          itemFields: [
            { key: 'label', label: 'Label', type: 'text' },
            { key: 'value', label: 'Value', type: 'text' },
          ],
        },
      ],
    },
    {
      title: 'Shipping tab',
      fields: [
        { key: 'shippingTitle', label: 'Tab title', type: 'text' },
        { key: 'shippingText', label: 'Content', type: 'textarea', rows: 5 },
      ],
    },
  ],
}

export default def
