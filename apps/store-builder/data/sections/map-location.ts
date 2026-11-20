import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'map_location',
  name: 'Map & location',
  category: 'forms',
  description: 'Store address, opening hours and an embedded map',
  icon: 'ph:map-pin-bold',
  defaults: {
    heading: 'Visit our store',
    address: '123 Market Street, Cairo, Egypt',
    phone: '+20 100 000 0000',
    email: 'hello@yourstore.com',
    hours: [
      { day: 'Sunday - Thursday', hours: '9:00 - 18:00' },
      { day: 'Friday', hours: 'Closed' },
      { day: 'Saturday', hours: '10:00 - 16:00' },
    ],
    map_embed_url: '',
    directions_label: 'Get directions',
    variant: 'split',
    map_side: 'end',
  },
  groups: [
    {
      title: 'Details',
      open: true,
      fields: [
        {
          key: 'variant',
          label: 'Design',
          type: 'select',
          display: 'cards',
          options: [
            { value: 'split', label: 'Split', icon: 'ph:columns-bold', description: 'Details beside the map' },
            { value: 'stacked', label: 'Stacked', icon: 'ph:rows-bold', description: 'Map above details' },
            { value: 'overlay', label: 'Overlay card', icon: 'ph:stack-bold', description: 'Floating card over a full map' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'address', label: 'Address', type: 'textarea', rows: 2 },
        { key: 'phone', label: 'Phone', type: 'text' },
        { key: 'email', label: 'Email', type: 'text' },
        {
          key: 'hours',
          label: 'Opening hours',
          type: 'repeater',
          newItem: { day: 'Monday', hours: '9:00 - 18:00' },
          itemFields: [
            { key: 'day', label: 'Day(s)', type: 'text' },
            { key: 'hours', label: 'Hours', type: 'text' },
          ],
        },
      ],
    },
    {
      title: 'Map',
      fields: [
        { key: 'map_embed_url', label: 'Map embed URL (https only)', type: 'url', placeholder: 'https://www.google.com/maps/embed?...' },
        { key: 'directions_label', label: 'Directions button label', type: 'text' },
        { key: 'map_side', label: 'Card / map side (split and overlay)', type: 'select', options: [{ value: 'end', label: 'Map at end' }, { value: 'start', label: 'Map at start' }] },
      ],
    },
  ],
}

export default def
