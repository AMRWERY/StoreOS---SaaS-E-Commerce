import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'collection_products',
  name: 'Collection products',
  category: 'collection',
  description: 'Filterable, sortable product grid with pagination',
  icon: 'ph:funnel-bold',
  popular: true,
  pages: ['category', 'search'],
  defaults: {
    variant: 'sidebar',
    columns: 3,
    pageSize: 6,
    showSidebar: true,
    showSort: true,
    showPagination: true,
    showRating: true,
    addLabel: 'Add to cart',
    filtersTitle: 'Filters',
    emptyText: 'No products match your filters.',
  },
  groups: [
    {
      title: 'Layout',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'sidebar', label: 'Sidebar filters', icon: 'ph:sidebar-simple-bold', description: 'Filters beside the grid' },
            { value: 'top', label: 'Top filters', icon: 'ph:sliders-horizontal-bold', description: 'Filter bar above the grid' },
            { value: 'minimal', label: 'Minimal grid', icon: 'ph:squares-four-bold', description: 'Borderless grid, sort only' },
          ],
        },
        { key: 'columns', label: 'Columns', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
        { key: 'pageSize', label: 'Products per page', type: 'number', min: 2, max: 24 },
        { key: 'showSidebar', label: 'Show filter sidebar', type: 'toggle' },
        { key: 'showSort', label: 'Show sort', type: 'toggle' },
        { key: 'showPagination', label: 'Show pagination', type: 'toggle' },
        { key: 'showRating', label: 'Show rating', type: 'toggle' },
      ],
    },
    {
      title: 'Text',
      fields: [
        { key: 'filtersTitle', label: 'Filters title', type: 'text' },
        { key: 'addLabel', label: 'Add to cart label', type: 'text' },
        { key: 'emptyText', label: 'Empty text', type: 'text' },
      ],
    },
  ],
}

export default def
