import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'related_products',
  name: 'Related products',
  category: 'product_page',
  description: 'Suggest more products below the product details',
  icon: 'ph:squares-four-bold',
  pages: ['product'],
  defaults: {
    variant: 'grid',
    heading: 'You may also like',
    source: 'category',
    columns: 4,
    limit: 4,
    showRating: true,
    showAddToCart: true,
    addLabel: 'Add to cart',
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
            { value: 'grid', label: 'Grid', icon: 'ph:squares-four-bold', description: 'Responsive product cards' },
            { value: 'carousel', label: 'Carousel', icon: 'ph:arrows-horizontal-bold', description: 'Swipeable row' },
            { value: 'list', label: 'List', icon: 'ph:list-bullets-bold', description: 'Compact horizontal rows' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        {
          key: 'source',
          label: 'Source',
          type: 'select',
          options: [
            { value: 'category', label: 'Same category' },
            { value: 'best', label: 'Best sellers' },
            { value: 'recent', label: 'Recently viewed' },
          ],
        },
        { key: 'limit', label: 'Number of products', type: 'number', min: 2, max: 8 },
        { key: 'addLabel', label: 'Add to cart label', type: 'text' },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'columns', label: 'Columns', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
        { key: 'showRating', label: 'Show rating', type: 'toggle' },
        { key: 'showAddToCart', label: 'Show Add to cart', type: 'toggle' },
      ],
    },
  ],
}

export default def
