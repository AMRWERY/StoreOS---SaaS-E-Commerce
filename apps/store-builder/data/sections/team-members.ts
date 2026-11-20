import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'team_members',
  name: 'Team members',
  category: 'content',
  description: 'Introduce the people behind your store',
  icon: 'ph:users-three-bold',
  defaults: {
    variant: 'cards',
    heading: 'Meet our team',
    subheading: 'The people who make it all happen.',
    columns: 3,
    photoStyle: 'circle',
    items: [
      { name: 'Sara Ahmed', role: 'Founder & CEO', photo: '/img/avatar-01.png', bio: 'Started the store to make shopping simple.', link: '' },
      { name: 'Omar Khaled', role: 'Head of Design', photo: '/img/avatar-02.png', bio: 'Obsessed with details and good packaging.', link: '' },
      { name: 'Lina Hassan', role: 'Customer Care', photo: '', bio: 'Here to help with anything you need.', link: '' },
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
            { value: 'cards', label: 'Cards', icon: 'ph:identification-card-bold', description: 'Boxed card with photo and bio' },
            { value: 'minimal-circles', label: 'Minimal circles', icon: 'ph:user-circle-bold', description: 'Large photos, no box' },
            { value: 'overlay', label: 'Overlay', icon: 'ph:image-bold', description: 'Tall photo with text on top' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        {
          key: 'items',
          label: 'People',
          type: 'repeater',
          newItem: { name: 'New member', role: 'Role', photo: '', bio: '', link: '' },
          itemFields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'role', label: 'Role', type: 'text' },
            { key: 'photo', label: 'Photo', type: 'image' },
            { key: 'bio', label: 'Short bio', type: 'textarea', rows: 2 },
            { key: 'link', label: 'Link', type: 'url' },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'columns', label: 'Columns', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
        { key: 'photoStyle', label: 'Photo style', type: 'select', options: [{ value: 'circle', label: 'Circle' }, { value: 'rounded', label: 'Rounded' }] },
      ],
    },
  ],
}

export default def
