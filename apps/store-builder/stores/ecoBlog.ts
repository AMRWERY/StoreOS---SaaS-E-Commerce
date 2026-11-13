import type { EcoArticle } from '@/types/ecosystem'

export const useEcoBlogStore = defineStore('ecoBlog', () => {
  const articles = ref<EcoArticle[]>([
    {
      id: 'a1', title: 'دليلك لاختيار الهدية المناسبة في رمضان', slug: 'ramadan-gift-guide', author: 'Sara Mostafa',
      tags: ['رمضان', 'هدايا'], status: 'published', publishDate: '2026-11-02',
      excerpt: 'أفكار هدايا لكل الميزانيات.', content: '## أفكار الهدايا\n\n- **ساعات** أنيقة\n- عطور', seoTitle: 'دليل هدايا رمضان | متجري', seoDescription: 'اختر أفضل هدية لأحبائك في رمضان بأسعار مناسبة.', rtl: true,
    },
    {
      id: 'a2', title: 'How to care for leather bags', slug: 'leather-bag-care', author: 'Omar Hassan',
      tags: ['care', 'leather'], status: 'scheduled', publishDate: '2026-11-20',
      excerpt: 'Simple steps to keep leather fresh.', content: '## Steps\n\n1. Wipe\n2. Condition', seoTitle: 'Leather bag care guide', seoDescription: 'Keep your leather bags looking new with these simple tips.', rtl: false,
    },
    {
      id: 'a3', title: 'Black Friday: what to expect', slug: 'black-friday-2026', author: 'Nour Adel',
      tags: ['offers'], status: 'draft', publishDate: '',
      excerpt: '', content: '', seoTitle: '', seoDescription: '', rtl: false,
    },
  ])

  function save(a: EcoArticle) {
    const i = articles.value.findIndex((x) => x.id === a.id)
    if (i >= 0) articles.value[i] = a
    else articles.value.unshift(a)
  }
  function remove(id: string) {
    articles.value = articles.value.filter((x) => x.id !== id)
  }

  return { articles, save, remove }
})
