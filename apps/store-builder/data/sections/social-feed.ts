import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'social_feed',
  name: 'Social feed',
  category: 'media',
  description: 'Instagram-style photo grid with follow links',
  icon: 'ph:instagram-logo-bold',
  defaults: {
    heading: 'Follow us on Instagram',
    variant: 'grid',
    handle: '@yourstore',
    follow_label: 'Follow',
    follow_url: '',
    images: [],
    columns: 6,
    gap: 8,
    instagram: '',
    tiktok: '',
    facebook: '',
    x: '',
    youtube: '',
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
            { value: 'grid', label: 'Square grid', icon: 'ph:squares-four-bold', description: 'Even Instagram-style tiles' },
            { value: 'mosaic', label: 'Mosaic', icon: 'ph:layout-bold', description: 'First photo spans 2x2' },
            { value: 'circles', label: 'Circles strip', icon: 'ph:circle-bold', description: 'Scrollable round story strip' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'handle', label: 'Handle', type: 'text' },
        { key: 'follow_label', label: 'Follow button label', type: 'text' },
        { key: 'follow_url', label: 'Follow button link', type: 'url' },
        {
          key: 'images',
          label: 'Photos (empty = demo photos)',
          type: 'repeater',
          newItem: { image: '', link: '' },
          itemFields: [
            { key: 'image', label: 'Image', type: 'image' },
            { key: 'link', label: 'Link', type: 'url' },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'columns', label: 'Columns', type: 'select', options: [3, 4, 5, 6].map((n) => ({ value: String(n), label: String(n) })) },
        { key: 'gap', label: 'Gap (px)', type: 'number', min: 0, max: 32 },
      ],
    },
    {
      title: 'Other platforms',
      fields: [
        { key: 'instagram', label: 'Instagram URL', type: 'text' },
        { key: 'tiktok', label: 'TikTok URL', type: 'text' },
        { key: 'facebook', label: 'Facebook URL', type: 'text' },
        { key: 'x', label: 'X URL', type: 'text' },
        { key: 'youtube', label: 'YouTube URL', type: 'text' },
      ],
    },
  ],
}

export default def
