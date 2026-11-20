import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'floating_chat',
  name: 'Floating chat button',
  category: 'forms',
  description: 'Floating WhatsApp, Messenger, phone or email shortcut',
  icon: 'ph:chat-circle-dots-bold',
  defaults: {
    variant: 'pill',
    channel: 'whatsapp',
    label: 'Chat with us',
    contact: '+1234567890',
    position: 'end',
    color: '#16a34a',
    fixed: false,
    preview_caption: 'Floating button preview',
  },
  groups: [
    {
      title: 'Button',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'pill', label: 'Pill', icon: 'ph:pill-bold', description: 'Icon with label' },
            { value: 'circle', label: 'Circle', icon: 'ph:circle-bold', description: 'Round icon-only button' },
            { value: 'card', label: 'Card', icon: 'ph:chat-teardrop-text-bold', description: 'Small popup card with a button' },
          ],
        },
        {
          key: 'channel',
          label: 'Channel',
          type: 'select',
          options: [
            { value: 'whatsapp', label: 'WhatsApp' },
            { value: 'messenger', label: 'Messenger' },
            { value: 'phone', label: 'Phone' },
            { value: 'email', label: 'Email' },
          ],
        },
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'contact', label: 'Number / username / email', type: 'text', hint: 'Phone digits, Messenger page name or email address' },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'position', label: 'Position', type: 'select', options: [{ value: 'start', label: 'Start' }, { value: 'end', label: 'End' }] },
        { key: 'fixed', label: 'Fix to viewport on live store', type: 'toggle' },
        { key: 'preview_caption', label: 'Editor caption', type: 'text' },
        { key: 'color', label: 'Color', type: 'color' },
      ],
    },
  ],
}

export default def
