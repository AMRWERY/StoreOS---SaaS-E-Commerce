import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'columns_text',
  name: 'Text columns',
  category: 'content',
  description: '1-4 columns of text with optional image and link',
  icon: 'ph:columns-bold',
  defaults: {
    variant: 'plain',
    heading: '',
    align: 'left',
    divider: false,
    items: [
      { heading: 'Our story', text: 'We started small with a simple idea: great products, honest prices.', image: '', linkLabel: 'Read more', linkUrl: '#' },
      { heading: 'Our promise', text: 'Every order is packed with care and backed by our guarantee.', image: '', linkLabel: '', linkUrl: '' },
      { heading: 'Our community', text: 'Thousands of customers trust us. Join them today.', image: '', linkLabel: '', linkUrl: '' },
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
            { value: 'plain', label: 'Plain', icon: 'ph:text-columns-bold', description: 'Open columns of text' },
            { value: 'cards', label: 'Cards', icon: 'ph:cards-bold', description: 'Each column in a boxed card' },
            { value: 'feature-rows', label: 'Feature rows', icon: 'ph:rows-bold', description: 'Stacked rows, image beside text' },
          ],
        },
        { key: 'heading', label: 'Section heading', type: 'text' },
        {
          key: 'items',
          label: 'Columns (1-4)',
          type: 'repeater',
          newItem: { heading: 'New column', text: 'Write something here.', image: '', linkLabel: '', linkUrl: '' },
          itemFields: [
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'text', label: 'Text', type: 'textarea', rows: 4 },
            { key: 'image', label: 'Image', type: 'image' },
            { key: 'linkLabel', label: 'Link label', type: 'text' },
            { key: 'linkUrl', label: 'Link URL', type: 'url' },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'align', label: 'Alignment', type: 'select', options: [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }] },
        { key: 'divider', label: 'Vertical dividers', type: 'toggle' },
      ],
    },
  ],
}

export default def
