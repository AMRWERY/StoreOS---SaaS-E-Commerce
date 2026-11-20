import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'stats_counter',
  name: 'Stats counter',
  category: 'content',
  description: 'Big animated numbers that show your store at a glance',
  icon: 'ph:chart-line-up-bold',
  defaults: {
    variant: 'plain',
    heading: 'Trusted by shoppers everywhere',
    subheading: '',
    columns: 4,
    style: 'light',
    items: [
      { prefix: '', value: 12000, suffix: '+', label: 'Happy customers' },
      { prefix: '', value: 350, suffix: '+', label: 'Products' },
      { prefix: '', value: 98, suffix: '%', label: 'Satisfaction rate' },
      { prefix: '', value: 24, suffix: '/7', label: 'Support' },
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
            { value: 'plain', label: 'Plain', icon: 'ph:text-aa-bold', description: 'Big numbers, no boxes' },
            { value: 'cards', label: 'Cards', icon: 'ph:cards-bold', description: 'Each stat in its own card' },
            { value: 'divided-band', label: 'Divided band', icon: 'ph:columns-bold', description: 'Full-width band with dividers' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        {
          key: 'items',
          label: 'Stats',
          type: 'repeater',
          newItem: { prefix: '', value: 100, suffix: '+', label: 'New stat' },
          itemFields: [
            { key: 'prefix', label: 'Prefix', type: 'text', placeholder: '$' },
            { key: 'value', label: 'Number', type: 'number' },
            { key: 'suffix', label: 'Suffix', type: 'text', placeholder: '+' },
            { key: 'label', label: 'Label', type: 'text' },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'columns', label: 'Columns', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
        { key: 'style', label: 'Style', type: 'select', options: [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }] },
      ],
    },
  ],
}

export default def
