import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'cta_banner',
  name: 'CTA banner',
  category: 'marketing',
  description: 'A strong call-to-action band with buttons',
  icon: 'ph:megaphone-bold',
  popular: true,
  defaults: {
    variant: 'centered',
    heading: 'Ready to get started?',
    text: 'Join thousands of happy customers and shop our latest collection today.',
    primaryLabel: 'Shop now',
    primaryUrl: '#',
    secondaryLabel: 'Learn more',
    secondaryUrl: '#',
    backgroundColor: '#4f46e5',
    textColor: '#ffffff',
    backgroundImage: '',
    overlay: 50,
    align: 'center',
    size: 'md',
  },
  groups: [
    {
      title: 'Content',
      open: true,
      fields: [
        {
          key: 'variant', label: 'Design', type: 'select', display: 'cards',
          options: [
            { value: 'centered', label: 'Centered', icon: 'ph:align-center-horizontal-bold', description: 'Boxed band with centered text' },
            { value: 'split', label: 'Split with image', icon: 'ph:columns-bold', description: 'Text on one side, image on the other' },
            { value: 'floating-card', label: 'Floating card', icon: 'ph:cards-bold', description: 'Full-bleed backdrop with a white card' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'text', label: 'Text', type: 'textarea', rows: 3 },
        { key: 'primaryLabel', label: 'Primary button label', type: 'text' },
        { key: 'primaryUrl', label: 'Primary button URL', type: 'url' },
        { key: 'secondaryLabel', label: 'Secondary button label', type: 'text' },
        { key: 'secondaryUrl', label: 'Secondary button URL', type: 'url' },
      ],
    },
    {
      title: 'Background',
      fields: [
        { key: 'backgroundColor', label: 'Background color', type: 'color' },
        { key: 'textColor', label: 'Text color', type: 'color' },
        { key: 'backgroundImage', label: 'Background image', type: 'image' },
        { key: 'overlay', label: 'Image overlay (%)', type: 'number' },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'align', label: 'Alignment', type: 'select', options: [{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }] },
        { key: 'size', label: 'Size', type: 'select', options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }] },
      ],
    },
  ],
}

export default def
