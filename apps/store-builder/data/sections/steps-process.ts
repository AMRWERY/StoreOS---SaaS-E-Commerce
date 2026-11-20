import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'steps_process',
  name: 'Steps / process',
  category: 'content',
  description: 'Numbered how-it-works steps',
  icon: 'ph:list-numbers-bold',
  defaults: {
    heading: 'How it works',
    subheading: 'Three simple steps to get your order.',
    variant: 'horizontal',
    showIcons: true,
    items: [
      { icon: 'ph:magnifying-glass-bold', title: 'Browse', text: 'Find the products you love.' },
      { icon: 'ph:shopping-cart-bold', title: 'Order', text: 'Add to cart and check out securely.' },
      { icon: 'ph:package-bold', title: 'Receive', text: 'Get it delivered to your door.' },
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
            { value: 'horizontal', label: 'Timeline', icon: 'ph:dots-three-outline-bold', description: 'Numbered circles joined by a line' },
            { value: 'vertical', label: 'Vertical', icon: 'ph:list-numbers-bold', description: 'Stacked steps with a rail' },
            { value: 'cards', label: 'Cards', icon: 'ph:cards-bold', description: 'Boxed steps with big numbers' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        {
          key: 'items',
          label: 'Steps',
          type: 'repeater',
          newItem: { icon: 'ph:star-bold', title: 'New step', text: 'Describe this step.' },
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
        { key: 'showIcons', label: 'Show icons', type: 'toggle' },
      ],
    },
  ],
}

export default def
