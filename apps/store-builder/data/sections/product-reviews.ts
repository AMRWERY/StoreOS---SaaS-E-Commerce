import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'product_reviews',
  name: 'Product reviews',
  category: 'product_page',
  description: 'Rating summary, distribution bars and customer reviews',
  icon: 'ph:star-half-bold',
  pages: ['product'],
  defaults: {
    variant: 'sidebar',
    heading: 'Customer reviews',
    writeLabel: 'Write a review',
    showDemoReviews: true,
    showDistribution: true,
    showVerified: true,
    emptyText: 'No reviews yet. Be the first to write one.',
    customReviews: [],
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
            { value: 'sidebar', label: 'Sidebar summary', icon: 'ph:sidebar-simple-bold', description: 'Summary left, review cards right' },
            { value: 'banner', label: 'Top summary', icon: 'ph:rows-bold', description: 'Summary band, two-column cards' },
            { value: 'minimal', label: 'Minimal list', icon: 'ph:list-bold', description: 'Clean divided list' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'writeLabel', label: 'Button label', type: 'text' },
        { key: 'emptyText', label: 'Empty text', type: 'text' },
        {
          key: 'customReviews',
          label: 'Custom reviews',
          type: 'repeater',
          newItem: { author: 'Customer', rating: 5, title: 'Great product', body: 'Write the review here.', date: '2026-11-01' },
          itemFields: [
            { key: 'author', label: 'Author', type: 'text' },
            { key: 'rating', label: 'Rating (1-5)', type: 'number', min: 1, max: 5 },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'body', label: 'Review', type: 'textarea', rows: 3 },
            { key: 'date', label: 'Date', type: 'text', placeholder: '2026-11-01' },
          ],
        },
      ],
    },
    {
      title: 'Options',
      fields: [
        { key: 'showDemoReviews', label: 'Include demo reviews', type: 'toggle' },
        { key: 'showDistribution', label: 'Show distribution bars', type: 'toggle' },
        { key: 'showVerified', label: 'Show verified badge', type: 'toggle' },
      ],
    },
  ],
}

export default def
