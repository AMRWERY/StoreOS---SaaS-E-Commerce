import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'size_guide',
  name: 'Size guide',
  category: 'product_page',
  description: 'Size chart with cm/in toggle and measuring instructions',
  icon: 'ph:ruler-bold',
  pages: ['product'],
  defaults: {
    variant: 'table',
    heading: 'Size guide',
    subheading: 'Find your perfect fit. All measurements are body measurements.',
    col_size: 'Size',
    col_chest: 'Chest',
    col_waist: 'Waist',
    col_hip: 'Hip',
    rows: [
      { size: 'S', chest: 88, waist: 72, hip: 94 },
      { size: 'M', chest: 96, waist: 80, hip: 102 },
      { size: 'L', chest: 104, waist: 88, hip: 110 },
      { size: 'XL', chest: 112, waist: 96, hip: 118 },
    ],
    measure_heading: 'How to measure',
    steps: [
      { icon: 'ph:ruler-bold', title: 'Chest', text: 'Measure around the fullest part of your chest.' },
      { icon: 'ph:tape-bold', title: 'Waist', text: 'Measure around your natural waistline.' },
      { icon: 'ph:person-simple-bold', title: 'Hip', text: 'Measure around the fullest part of your hips.' },
    ],
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
            { value: 'table', label: 'Table', icon: 'ph:table-bold', description: 'Classic chart with steps below' },
            { value: 'cards', label: 'Size cards', icon: 'ph:cards-bold', description: 'One card per size' },
            { value: 'split', label: 'Split', icon: 'ph:columns-bold', description: 'Measuring guide beside the chart' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
      ],
    },
    {
      title: 'Table (values in cm)',
      open: true,
      fields: [
        { key: 'col_size', label: 'Size column', type: 'text' },
        { key: 'col_chest', label: 'Chest column', type: 'text' },
        { key: 'col_waist', label: 'Waist column', type: 'text' },
        { key: 'col_hip', label: 'Hip column', type: 'text' },
        {
          key: 'rows',
          label: 'Sizes',
          type: 'repeater',
          newItem: { size: 'XXL', chest: 120, waist: 104, hip: 126 },
          itemFields: [
            { key: 'size', label: 'Size', type: 'text' },
            { key: 'chest', label: 'Chest (cm)', type: 'number', min: 0 },
            { key: 'waist', label: 'Waist (cm)', type: 'number', min: 0 },
            { key: 'hip', label: 'Hip (cm)', type: 'number', min: 0 },
          ],
        },
      ],
    },
    {
      title: 'How to measure',
      fields: [
        { key: 'measure_heading', label: 'Heading', type: 'text' },
        {
          key: 'steps',
          label: 'Steps',
          type: 'repeater',
          newItem: { icon: 'ph:ruler-bold', title: 'New step', text: 'Describe how to measure.' },
          itemFields: [
            { key: 'icon', label: 'Icon (Phosphor name)', type: 'text', placeholder: 'ph:ruler-bold' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'text', label: 'Text', type: 'textarea', rows: 2 },
          ],
        },
      ],
    },
  ],
}

export default def
