import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'comparison_table',
  name: 'Comparison table',
  category: 'content',
  description: 'Compare products or plans feature by feature',
  icon: 'ph:table-bold',
  defaults: {
    heading: 'Compare our plans',
    subheading: 'Find the option that fits you best.',
    columns: 'Basic\nPlus\nPro',
    variant: 'table',
    highlight: '2',
    rows: [
      { label: 'Free shipping', values: 'no, yes, yes' },
      { label: 'Warranty', values: '1 year, 2 years, 5 years' },
      { label: 'Priority support', values: 'no, no, yes' },
      { label: 'Gift wrapping', values: 'yes, yes, yes' },
    ],
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
            { value: 'table', label: 'Table', icon: 'ph:table-bold', description: 'Classic grid with sticky labels' },
            { value: 'cards', label: 'Column cards', icon: 'ph:columns-bold', description: 'One card per option' },
            { value: 'rows', label: 'Feature rows', icon: 'ph:rows-bold', description: 'Stacked cards per feature' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        { key: 'columns', label: 'Columns (one per line, 2-4)', type: 'textarea', rows: 4 },
        {
          key: 'rows',
          label: 'Rows',
          type: 'repeater',
          newItem: { label: 'New feature', values: 'yes, yes, no' },
          itemFields: [
            { key: 'label', label: 'Feature', type: 'text' },
            { key: 'values', label: 'Values (comma separated; yes / no show icons)', type: 'text' },
          ],
        },
      ],
    },
    {
      title: 'Style',
      fields: [
        { key: 'highlight', label: 'Highlighted column (0 = none)', type: 'number', min: 0, max: 4 },
      ],
    },
  ],
}

export default def
