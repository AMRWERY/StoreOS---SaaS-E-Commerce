import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'pricing_table',
  name: 'Pricing table',
  category: 'marketing',
  description: 'Plan cards with a monthly / yearly toggle',
  icon: 'ph:currency-circle-dollar-bold',
  defaults: {
    variant: 'cards',
    heading: 'Simple, transparent pricing',
    subheading: 'Pick the plan that fits you.',
    currency: '$',
    yearlyDiscount: 20,
    monthlyLabel: 'Monthly',
    yearlyLabel: 'Yearly',
    badgeLabel: 'Most popular',
    items: [
      { name: 'Basic', price: 9, period: '/mo', features: 'Free shipping on all orders\nEmail support\n1 free sample', buttonLabel: 'Get started', url: '#', highlighted: false },
      { name: 'Plus', price: 19, period: '/mo', features: 'Everything in Basic\nPriority support\nEarly access to sales\n10% off every order', buttonLabel: 'Choose Plus', url: '#', highlighted: true },
      { name: 'Premium', price: 39, period: '/mo', features: 'Everything in Plus\nDedicated account manager\nExclusive products\n20% off every order', buttonLabel: 'Choose Premium', url: '#', highlighted: false },
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
            { value: 'cards', label: 'Cards', icon: 'ph:cards-bold', description: 'Classic side-by-side plan cards' },
            { value: 'rows', label: 'Rows', icon: 'ph:rows-bold', description: 'One wide row per plan' },
            { value: 'minimal', label: 'Minimal', icon: 'ph:columns-bold', description: 'Open columns, no boxes' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        {
          key: 'items',
          label: 'Plans (2-4)',
          type: 'repeater',
          newItem: { name: 'New plan', price: 29, period: '/mo', features: 'Feature one\nFeature two', buttonLabel: 'Get started', url: '#', highlighted: false },
          itemFields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'price', label: 'Monthly price', type: 'number' },
            { key: 'period', label: 'Period label', type: 'text', placeholder: '/mo' },
            { key: 'features', label: 'Features (one per line)', type: 'textarea', rows: 5 },
            { key: 'buttonLabel', label: 'Button label', type: 'text' },
            { key: 'url', label: 'Button URL', type: 'url' },
            { key: 'highlighted', label: 'Highlighted', type: 'toggle' },
          ],
        },
      ],
    },
    {
      title: 'Billing',
      fields: [
        { key: 'currency', label: 'Currency symbol', type: 'text' },
        { key: 'yearlyDiscount', label: 'Yearly discount (%)', type: 'number' },
        { key: 'monthlyLabel', label: 'Monthly label', type: 'text' },
        { key: 'yearlyLabel', label: 'Yearly label', type: 'text' },
        { key: 'badgeLabel', label: 'Highlight badge text', type: 'text' },
      ],
    },
  ],
}

export default def
