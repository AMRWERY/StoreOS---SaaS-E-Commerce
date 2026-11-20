import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'collection_header',
  name: 'Collection header',
  category: 'collection',
  description: 'Breadcrumb, title, description and optional banner',
  icon: 'ph:text-h-bold',
  pages: ['category', 'search'],
  defaults: {
    variant: 'banner',
    homeLabel: 'Home',
    title: 'All products',
    description: 'Browse our full range of carefully selected products.',
    showBreadcrumb: true,
    showCount: true,
    countText: '8 products',
    bannerImage: '',
    showBanner: true,
    overlay: 40,
    align: 'start',
    pills: [
      { label: 'Electronics' },
      { label: 'Sports' },
      { label: 'Home & Living' },
    ],
    showPills: true,
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
            { value: 'banner', label: 'Banner', icon: 'ph:image-bold', description: 'Full-width image with overlay' },
            { value: 'split', label: 'Split', icon: 'ph:columns-bold', description: 'Text beside the image' },
            { value: 'minimal', label: 'Minimal', icon: 'ph:text-aa-bold', description: 'Text only, no image' },
          ],
        },
        { key: 'homeLabel', label: 'Breadcrumb home label', type: 'text' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
        { key: 'countText', label: 'Product count text', type: 'text' },
        {
          key: 'pills',
          label: 'Sub-categories',
          type: 'repeater',
          newItem: { label: 'New category' },
          itemFields: [{ key: 'label', label: 'Label', type: 'text' }],
        },
      ],
    },
    {
      title: 'Banner',
      fields: [
        { key: 'showBanner', label: 'Show banner', type: 'toggle' },
        { key: 'bannerImage', label: 'Banner image', type: 'image' },
        { key: 'overlay', label: 'Overlay darkness (%)', type: 'number', min: 0, max: 80, step: 5 },
      ],
    },
    {
      title: 'Options',
      fields: [
        { key: 'showBreadcrumb', label: 'Show breadcrumb', type: 'toggle' },
        { key: 'showCount', label: 'Show product count', type: 'toggle' },
        { key: 'showPills', label: 'Show sub-category pills', type: 'toggle' },
        { key: 'align', label: 'Alignment', type: 'select', options: [{ value: 'start', label: 'Start' }, { value: 'center', label: 'Center' }] },
      ],
    },
  ],
}

export default def
