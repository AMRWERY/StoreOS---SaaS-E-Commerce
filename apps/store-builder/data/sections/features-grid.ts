import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'features_grid',
  name: 'Features grid',
  category: 'content',
  description: 'Icon cards that highlight what makes your store special',
  icon: 'ph:sparkle-bold',
  popular: true,
  defaults: {
    heading: 'Why customers love us',
    subheading: 'A few reasons to shop with confidence.',
    columns: 3,
    align: 'center',
    items: [
      { icon: 'ph:truck-bold', title: 'Fast delivery', text: 'Orders ship within 24 hours.' },
      { icon: 'ph:shield-check-bold', title: 'Secure payments', text: 'Your data is always protected.' },
      { icon: 'ph:arrow-counter-clockwise-bold', title: 'Easy returns', text: '30-day hassle-free returns.' },
    ],
  },
  groups: [
    {
      title: 'Content',
      open: true,
      fields: [
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        {
          key: 'items',
          label: 'Features',
          type: 'repeater',
          newItem: { icon: 'ph:star-bold', title: 'New feature', text: 'Describe it here.' },
          itemFields: [
            { key: 'icon', label: 'Icon (Phosphor name)', type: 'text', placeholder: 'ph:star-bold' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'text', label: 'Text', type: 'textarea', rows: 2 },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'columns', label: 'Columns', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
        { key: 'align', label: 'Alignment', type: 'select', options: [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }] },
      ],
    },
  ],
}

export default def
