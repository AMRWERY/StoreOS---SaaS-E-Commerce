import type { ProductReview, ReviewStatus } from '@/types/marketing'

export const useMktReviewsStore = defineStore('mktReviews', () => {
  const reviews = ref<ProductReview[]>([
    { id: 'RV-501', product: 'Cotton Abaya', customer: 'منى إبراهيم', rating: 5, text: 'جودة القماش ممتازة والتوصيل كان سريع جدا. أنصح بها بشدة.', hasPhoto: true, status: 'pending', date: '2026-11-10', reply: '' },
    { id: 'RV-502', product: 'Oud Perfume 50ml', customer: 'أحمد حسن', rating: 4, text: 'الريحة حلوة وثابتة بس العبوة صغيرة شوية.', hasPhoto: false, status: 'pending', date: '2026-11-09', reply: '' },
    { id: 'RV-503', product: 'Leather Sandals', customer: 'سارة مصطفى', rating: 2, text: 'المقاس أصغر من المتوقع وتأخر الشحن.', hasPhoto: true, status: 'pending', date: '2026-11-08', reply: '' },
    { id: 'RV-504', product: 'Silk Hijab', customer: 'نور عادل', rating: 5, text: 'ناعم جدا وألوانه زي الصور تماما.', hasPhoto: false, status: 'published', date: '2026-11-02', reply: 'شكرا لكي نور، سعداء برضاكي!' },
    { id: 'RV-505', product: 'Argan Oil Set', customer: 'كريم فتحي', rating: 4, text: 'منتج جيد والسعر مناسب.', hasPhoto: false, status: 'published', date: '2026-10-28', reply: '' },
    { id: 'RV-506', product: 'Cotton Abaya', customer: 'هدى سالم', rating: 1, text: 'تقييم يحتوي على ألفاظ غير لائقة.', hasPhoto: false, status: 'rejected', date: '2026-10-20', reply: '' },
  ])

  function setStatus(id: string, status: ReviewStatus) {
    const r = reviews.value.find((x) => x.id === id)
    if (r) r.status = status
  }
  function reply(id: string, text: string) {
    const r = reviews.value.find((x) => x.id === id)
    if (r) r.reply = text
  }

  return { reviews, setStatus, reply }
})
