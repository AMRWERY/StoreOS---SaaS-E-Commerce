import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'icon_list',
  name: 'Icon list',
  category: 'content',
  description: 'Checklist of benefits with icons',
  icon: 'ph:list-checks-bold',
  defaults: {
    variant: 'checklist',
    heading: 'What you get',
    subheading: '',
    layout: 'two',
    iconStyle: 'circle',
    iconColor: '#4f46e5',
    items: [
      { icon: 'ph:check-bold', title: 'Free shipping', text: 'On every order over $50.' },
      { icon: 'ph:check-bold', title: '30-day returns', text: 'No questions asked.' },
      { icon: 'ph:check-bold', title: 'Secure checkout', text: 'Your payment details stay safe.' },
      { icon: 'ph:check-bold', title: '24/7 support', text: 'We are always here to help.' },
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
            { value: 'checklist', label: 'Checklist', icon: 'ph:list-checks-bold', description: 'Icon beside text, no boxes' },
            { value: 'cards', label: 'Cards', icon: 'ph:cards-bold', description: 'Each item in a bordered card' },
            { value: 'icon-top', label: 'Icon on top', icon: 'ph:align-top-bold', description: 'Centered icon above the text' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        {
          key: 'items',
          label: 'Items',
          type: 'repeater',
          newItem: { icon: 'ph:check-bold', title: 'New benefit', text: '' },
          itemFields: [
            { key: 'icon', label: 'Icon (Phosphor name)', type: 'text', placeholder: 'ph:check-bold' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'text', label: 'Text', type: 'textarea', rows: 2 },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'layout', label: 'Layout', type: 'select', options: [{ value: 'one', label: '1 column' }, { value: 'two', label: '2 columns' }, { value: 'inline', label: 'Inline' }] },
        { key: 'iconStyle', label: 'Icon style', type: 'select', options: [{ value: 'plain', label: 'Plain' }, { value: 'circle', label: 'Circle' }] },
        { key: 'iconColor', label: 'Icon color', type: 'color' },
      ],
    },
  ],
}

export default def
