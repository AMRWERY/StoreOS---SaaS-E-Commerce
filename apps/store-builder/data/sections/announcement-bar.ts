import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'announcement_bar',
  name: 'Announcement bar',
  category: 'layout',
  description: 'Slim rotating message bar for shipping and promo news',
  icon: 'ph:megaphone-bold',
  defaults: {
    variant: 'solid',
    messages: [
      { text: 'Free shipping on orders over $50', link_label: 'Shop now', url: '#' },
      { text: 'New arrivals just landed', link_label: 'Explore', url: '#' },
      { text: 'Use code WELCOME10 for 10% off', link_label: '', url: '' },
    ],
    autoplay: true,
    interval: 4,
    show_arrows: true,
    dismissible: true,
    bg_color: '#312e81',
    text_color: '#ffffff',
  },
  groups: [
    {
      title: 'Messages',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'solid', label: 'Solid', icon: 'ph:rectangle-bold', description: 'Full-width colored bar' },
            { value: 'pill', label: 'Pill', icon: 'ph:pill-bold', description: 'Floating rounded pill' },
            { value: 'minimal', label: 'Minimal', icon: 'ph:text-aa-bold', description: 'Plain text with a bottom border' },
          ],
        },
        {
          key: 'messages',
          label: 'Messages',
          type: 'repeater',
          newItem: { text: 'New announcement', link_label: '', url: '' },
          itemFields: [
            { key: 'text', label: 'Text', type: 'text' },
            { key: 'link_label', label: 'Link label', type: 'text' },
            { key: 'url', label: 'Link URL', type: 'url' },
          ],
        },
      ],
    },
    {
      title: 'Behavior',
      fields: [
        { key: 'autoplay', label: 'Autoplay', type: 'toggle' },
        { key: 'interval', label: 'Interval', type: 'number', min: 2, max: 20, unit: 's' },
        { key: 'show_arrows', label: 'Show arrows', type: 'toggle' },
        { key: 'dismissible', label: 'Dismissible', type: 'toggle' },
      ],
    },
    {
      title: 'Style',
      fields: [
        { key: 'bg_color', label: 'Background', type: 'color' },
        { key: 'text_color', label: 'Text color', type: 'color' },
      ],
    },
  ],
}

export default def
