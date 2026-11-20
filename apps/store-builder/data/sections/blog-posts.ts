import type { SectionDefinition } from '@/types/sections'

const def: SectionDefinition = {
  type: 'blog_posts',
  name: 'Blog posts',
  category: 'content',
  description: 'Latest articles as a card grid',
  icon: 'ph:article-bold',
  defaults: {
    heading: 'From the journal',
    subheading: 'Stories, guides and inspiration.',
    variant: 'cards',
    use_custom: false,
    posts: [],
    columns: 3,
    show_date: true,
    show_author: true,
    show_category: true,
    read_more_label: 'Read more',
    view_all_label: 'View all posts',
    view_all_url: '',
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
            { value: 'cards', label: 'Cards', icon: 'ph:squares-four-bold', description: 'Image-top card grid' },
            { value: 'list', label: 'List', icon: 'ph:list-bold', description: 'Image-left rows' },
            { value: 'featured', label: 'Featured first', icon: 'ph:layout-bold', description: 'Large lead post and a side list' },
          ],
        },
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subheading', label: 'Subheading', type: 'textarea', rows: 2 },
        { key: 'use_custom', label: 'Use custom posts', type: 'toggle' },
        {
          key: 'posts',
          label: 'Custom posts',
          type: 'repeater',
          newItem: { title: 'New post', excerpt: 'A short summary.', image: '', date: '', url: '', category: 'News', author: '' },
          itemFields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
            { key: 'image', label: 'Image', type: 'image' },
            { key: 'date', label: 'Date', type: 'text', placeholder: '2026-10-12' },
            { key: 'url', label: 'Link', type: 'url' },
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'author', label: 'Author', type: 'text' },
          ],
        },
      ],
    },
    {
      title: 'Layout',
      fields: [
        { key: 'columns', label: 'Columns', type: 'select', options: [{ value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }] },
        { key: 'show_date', label: 'Show date', type: 'toggle' },
        { key: 'show_author', label: 'Show author', type: 'toggle' },
        { key: 'show_category', label: 'Show category', type: 'toggle' },
      ],
    },
    {
      title: 'Links',
      fields: [
        { key: 'read_more_label', label: 'Read more label', type: 'text' },
        { key: 'view_all_label', label: 'View all label', type: 'text' },
        { key: 'view_all_url', label: 'View all link', type: 'url' },
      ],
    },
  ],
}

export default def
