import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'breadcrumbs',
  name: 'Breadcrumbs',
  category: 'layout',
  description: 'Navigation trail showing where the customer is',
  icon: 'ph:path-bold',
  defaults: {
    variant: 'plain',
    items: [
      { label: 'Electronics', url: '#' },
      { label: 'Headphones', url: '#' },
      { label: 'Aero Wireless Headphones', url: '' },
    ],
    separator: '/',
    show_home: true,
    home_label: 'Home',
    home_url: '/',
    align: 'start',
  },
  groups: [
    {
      title: 'Trail',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'plain', label: 'Plain', icon: 'ph:text-align-left-bold', description: 'Simple text trail' },
            { value: 'pills', label: 'Pills', icon: 'ph:pill-bold', description: 'Rounded chips' },
            { value: 'bar', label: 'Bar', icon: 'ph:rectangle-bold', description: 'Full-width tinted strip' },
          ],
        },
        { key: 'show_home', label: 'Show Home prefix', type: 'toggle' },
        { key: 'home_label', label: 'Home label', type: 'text' },
        { key: 'home_url', label: 'Home URL', type: 'url' },
        {
          key: 'items',
          label: 'Items (last is the current page)',
          type: 'repeater',
          newItem: { label: 'New page', url: '#' },
          itemFields: [
            { key: 'label', label: 'Label', type: 'text' },
            { key: 'url', label: 'URL', type: 'url' },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'separator', label: 'Separator', type: 'select', options: [{ value: '/', label: '/' }, { value: '›', label: '›' }, { value: '→', label: '→' }] },
        { key: 'align', label: 'Alignment', type: 'select', options: [{ value: 'start', label: 'Start' }, { value: 'center', label: 'Center' }, { value: 'end', label: 'End' }] },
      ],
    },
  ],
}

export default def
