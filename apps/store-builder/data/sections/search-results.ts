import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'search_results',
  name: 'Search results',
  category: 'collection',
  description: 'Search box with live results and suggestion chips',
  icon: 'ph:magnifying-glass-bold',
  pages: ['search'],
  defaults: {
    variant: 'grid',
    heading: 'Search',
    placeholder: 'Search products...',
    initialQuery: '',
    columns: 4,
    showSuggestions: true,
    suggestionsLabel: 'Popular searches',
    suggestions: [
      { label: 'Headphones' },
      { label: 'Shoes' },
      { label: 'Sports' },
      { label: 'Accessories' },
    ],
    showRating: true,
    emptyTitle: 'No results found',
    emptyText: 'Try a different keyword or check the spelling.',
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
            { value: 'grid', label: 'Grid', icon: 'ph:squares-four-bold', description: 'Product cards' },
            { value: 'list', label: 'List', icon: 'ph:list-bullets-bold', description: 'Rows with image and button' },
            { value: 'minimal', label: 'Minimal', icon: 'ph:text-align-left-bold', description: 'Big centered search, text results' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'placeholder', label: 'Input placeholder', type: 'text' },
        { key: 'initialQuery', label: 'Initial query', type: 'text' },
        { key: 'suggestionsLabel', label: 'Suggestions label', type: 'text' },
        {
          key: 'suggestions',
          label: 'Suggestions',
          type: 'repeater',
          newItem: { label: 'New suggestion' },
          itemFields: [{ key: 'label', label: 'Label', type: 'text' }],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'columns', label: 'Columns', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
        { key: 'showSuggestions', label: 'Show suggestions', type: 'toggle' },
        { key: 'showRating', label: 'Show rating', type: 'toggle' },
      ],
    },
    {
      title: 'Empty state',
      fields: [
        { key: 'emptyTitle', label: 'Title', type: 'text' },
        { key: 'emptyText', label: 'Text', type: 'text' },
      ],
    },
  ],
}

export default def
