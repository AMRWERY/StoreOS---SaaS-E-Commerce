import type { BuilderSectionTemplate } from '@/types/builder'

export const builderSectionTemplates: BuilderSectionTemplate[] = [
  {
    id: 'blank',
    title: 'Blank Section',
    description: 'Start from scratch with a custom container',
    variant: 'blank',
  },
  {
    id: 'split-hero',
    title: 'Split Hero',
    description: 'Image right with clean CTA layout',
    popular: true,
    variant: 'split',
  },
  {
    id: 'feature-grid',
    title: 'Feature Grid',
    description: '3-column product showcase',
    variant: 'grid',
  },
  {
    id: 'simple-text',
    title: 'Simple Text',
    description: 'Centered paragraph block',
    variant: 'text',
  },
  {
    id: 'metrics-row',
    title: 'Metrics Row',
    description: 'Data-dense statistics display',
    popular: true,
    variant: 'metrics',
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    description: 'Advanced multi-input capture',
    variant: 'form',
  },
  {
    id: 'logo-cloud',
    title: 'Logo Cloud',
    description: 'Trust indicators for partners',
    variant: 'logos',
  },
]
