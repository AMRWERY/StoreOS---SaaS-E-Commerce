import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'quote_block',
  name: 'Quote block',
  category: 'content',
  description: 'A large pull quote with author details',
  icon: 'ph:quotes-bold',
  defaults: {
    quote: 'The best purchase I have made all year. The quality speaks for itself.',
    author: 'Sara M.',
    role: 'Verified customer',
    avatar: '',
    align: 'center',
    variant: 'plain',
    show_icon: true,
    show_avatar: true,
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
            { value: 'plain', label: 'Plain', icon: 'ph:text-align-center-bold', description: 'Large open quote' },
            { value: 'boxed', label: 'Boxed', icon: 'ph:square-bold', description: 'Quote inside a card' },
            { value: 'bar', label: 'Accent bar', icon: 'ph:text-indent-bold', description: 'Side bar accent' },
          ],
        },
        { key: 'quote', label: 'Quote', type: 'textarea', rows: 4 },
        { key: 'author', label: 'Author', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'avatar', label: 'Avatar image', type: 'image' },
      ],
    },
    {
      title: 'Style',
      fields: [
        { key: 'align', label: 'Alignment', type: 'select', options: [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }] },
        { key: 'show_icon', label: 'Show quote mark', type: 'toggle' },
        { key: 'show_avatar', label: 'Show avatar', type: 'toggle' },
      ],
    },
  ],
}

export default def
