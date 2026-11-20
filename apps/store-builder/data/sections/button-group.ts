import type { SectionDefinition } from '@/types/sections'

const styleOptions = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'outline', label: 'Outline' },
  { value: 'link', label: 'Link' },
]

const def: SectionDefinition = {
  type: 'button_group',
  name: 'Button group',
  category: 'layout',
  description: 'A row of call-to-action buttons',
  icon: 'ph:cursor-click-bold',
  defaults: {
    buttons: [
      { label: 'Shop now', url: '#', style: 'primary', icon: 'ph:shopping-bag-bold' },
      { label: 'Learn more', url: '#', style: 'outline', icon: '' },
    ],
    variant: 'rounded',
    align: 'center',
    size: 'md',
    gap: 12,
    stack_mobile: true,
  },
  groups: [
    {
      title: 'Buttons',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'rounded', label: 'Rounded', icon: 'ph:rectangle-bold', description: 'Standard rounded buttons' },
            { value: 'pills', label: 'Pills', icon: 'ph:pill-bold', description: 'Fully rounded buttons' },
            { value: 'bar', label: 'Joined bar', icon: 'ph:squares-four-bold', description: 'Segmented bar of actions' },
          ],
        },
        {
          key: 'buttons',
          label: 'Buttons',
          type: 'repeater',
          newItem: { label: 'Button', url: '#', style: 'primary', icon: '' },
          itemFields: [
            { key: 'label', label: 'Label', type: 'text' },
            { key: 'url', label: 'Link', type: 'url' },
            { key: 'style', label: 'Style', type: 'select', options: styleOptions },
            { key: 'icon', label: 'Icon (Phosphor name)', type: 'text', placeholder: 'ph:arrow-right-bold' },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'align', label: 'Alignment', type: 'select', options: [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }] },
        { key: 'size', label: 'Size', type: 'select', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }] },
        { key: 'gap', label: 'Gap (px)', type: 'number', min: 0, max: 48 },
        { key: 'stack_mobile', label: 'Stack on mobile', type: 'toggle' },
      ],
    },
  ],
}

export default def
