import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'order_tracking',
  name: 'Order tracking',
  category: 'cart',
  description: 'Let customers look up an order and see its delivery progress',
  icon: 'ph:package-bold',
  pages: ['track'],
  defaults: {
    variant: 'stepper',
    heading: 'Track your order',
    subheading: 'Enter your order number and email to see where your package is.',
    order_label: 'Order number',
    order_placeholder: '#1001',
    email_label: 'Email address',
    email_placeholder: 'you@example.com',
    button_label: 'Track order',
    error_text: 'Please enter both your order number and email.',
    step_1: 'Placed',
    step_2: 'Confirmed',
    step_3: 'Shipped',
    step_4: 'Out for delivery',
    step_5: 'Delivered',
    current_step: '3',
    eta_label: 'Estimated delivery',
    eta_days: 3,
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
            { value: 'stepper', label: 'Stepper', icon: 'ph:dots-three-outline-bold', description: 'Horizontal progress steps' },
            { value: 'timeline', label: 'Timeline', icon: 'ph:list-dashes-bold', description: 'Vertical timeline in a card' },
            { value: 'compact', label: 'Compact', icon: 'ph:magnifying-glass-bold', description: 'Inline search with progress bar' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        { key: 'order_label', label: 'Order field label', type: 'text' },
        { key: 'order_placeholder', label: 'Order field placeholder', type: 'text' },
        { key: 'email_label', label: 'Email field label', type: 'text' },
        { key: 'email_placeholder', label: 'Email field placeholder', type: 'text' },
        { key: 'button_label', label: 'Button label', type: 'text' },
        { key: 'error_text', label: 'Error message', type: 'text' },
      ],
    },
    {
      title: 'Timeline',
      fields: [
        { key: 'step_1', label: 'Step 1', type: 'text' },
        { key: 'step_2', label: 'Step 2', type: 'text' },
        { key: 'step_3', label: 'Step 3', type: 'text' },
        { key: 'step_4', label: 'Step 4', type: 'text' },
        { key: 'step_5', label: 'Step 5', type: 'text' },
        {
          key: 'current_step',
          label: 'Current step (demo)',
          type: 'select',
          options: [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `Step ${n}` })),
        },
        { key: 'eta_label', label: 'ETA label', type: 'text' },
        { key: 'eta_days', label: 'ETA (days from today)', type: 'number', min: 0, max: 30 },
      ],
    },
  ],
}

export default def
