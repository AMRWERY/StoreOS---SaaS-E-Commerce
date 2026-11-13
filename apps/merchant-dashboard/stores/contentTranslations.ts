import type { TranslationRow, TranslationStatus } from '@/types/storeContent'

export const useContentTranslationsStore = defineStore('contentTranslations', () => {
  const rows = ref<TranslationRow[]>([
    { id: 't1', kind: 'product', nameEn: 'Cotton T-Shirt', nameAr: 'تيشيرت قطن', descriptionStatus: 'translated', completeness: 100 },
    { id: 't2', kind: 'product', nameEn: 'Leather Wallet', nameAr: '', descriptionStatus: 'missing', completeness: 0 },
    { id: 't3', kind: 'product', nameEn: 'Wireless Earbuds', nameAr: 'سماعات لاسلكية', descriptionStatus: 'outdated', completeness: 60 },
    { id: 't4', kind: 'collection', nameEn: 'Summer Sale', nameAr: 'تخفيضات الصيف', descriptionStatus: 'translated', completeness: 100 },
    { id: 't5', kind: 'collection', nameEn: 'New Arrivals', nameAr: '', descriptionStatus: 'missing', completeness: 25 },
    { id: 't6', kind: 'page', nameEn: 'About us', nameAr: 'من نحن', descriptionStatus: 'outdated', completeness: 70 },
    { id: 't7', kind: 'page', nameEn: 'Contact', nameAr: 'اتصل بنا', descriptionStatus: 'translated', completeness: 100 },
  ])

  function setArabic(id: string, value: string) {
    const r = rows.value.find((x) => x.id === id)
    if (!r) return
    r.nameAr = value
    r.completeness = Math.max(r.completeness, value.trim() ? 50 : 0)
  }
  function markStatus(id: string, status: TranslationStatus) {
    const r = rows.value.find((x) => x.id === id)
    if (!r) return
    r.descriptionStatus = status
    if (status === 'translated') r.completeness = 100
  }

  return { rows, setArabic, markStatus }
})
