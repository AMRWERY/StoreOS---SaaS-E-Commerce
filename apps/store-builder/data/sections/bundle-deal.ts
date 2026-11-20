import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'bundle_deal',
  name: 'Bundle deal',
  category: 'products',
  description: 'Frequently bought together with a bundle discount',
  icon: 'ph:stack-bold',
  defaults: {
    variant: 'cards',
    heading: 'Frequently bought together',
    product_count: '3',
    discount_percent: 10,
    total_label: 'Bundle price',
    save_label: 'You save',
    button_label: 'Add bundle to cart',
    added_label: 'Added to cart',
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
            { value: 'cards', label: 'Cards', icon: 'ph:squares-four-bold', description: 'Product cards with + separators' },
            { value: 'list', label: 'List', icon: 'ph:list-checks-bold', description: 'Checklist rows with total' },
            { value: 'banner', label: 'Banner', icon: 'ph:rectangle-bold', description: 'Full-bleed band with thumbnails' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'total_label', label: 'Total label', type: 'text' },
        { key: 'save_label', label: 'Savings label', type: 'text' },
        { key: 'button_label', label: 'Button label', type: 'text' },
        { key: 'added_label', label: 'Confirmation label', type: 'text' },
      ],
    },
    {
      title: 'Bundle',
      fields: [
        { key: 'product_count', label: 'Products', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }] },
        { key: 'discount_percent', label: 'Bundle discount', type: 'number', min: 0, max: 90, unit: '%' },
      ],
    },
  ],
}

export default def
