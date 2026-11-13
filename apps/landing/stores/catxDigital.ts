import type { CatxDigitalProduct, CatxDownload } from '@/types/catalogDepth'

export const useCatxDigitalStore = defineStore('catxDigital', () => {
  const products = ref<CatxDigitalProduct[]>([
    { id: 'DG-01', product: 'كتاب الطبخ المصري (PDF)', files: 2, downloadLimit: 3, expiryHours: 72, licenseKeys: false },
    { id: 'DG-02', product: 'قوالب تصميم متجر', files: 5, downloadLimit: 5, expiryHours: 168, licenseKeys: true },
    { id: 'DG-03', product: 'دورة التسويق الرقمي', files: 12, downloadLimit: 10, expiryHours: 720, licenseKeys: false },
    { id: 'DG-04', product: 'برنامج إدارة المخزون', files: 1, downloadLimit: 2, expiryHours: 48, licenseKeys: true },
  ])

  const downloads = ref<CatxDownload[]>([
    { id: 'DL-01', product: 'كتاب الطبخ المصري (PDF)', customer: 'منى عبد الله', at: '2026-11-11 21:14', ip: '41.65.12.8' },
    { id: 'DL-02', product: 'قوالب تصميم متجر', customer: 'كريم السيد', at: '2026-11-11 18:02', ip: '156.200.4.77' },
    { id: 'DL-03', product: 'دورة التسويق الرقمي', customer: 'هالة إبراهيم', at: '2026-11-10 09:41', ip: '197.55.23.101' },
    { id: 'DL-04', product: 'برنامج إدارة المخزون', customer: 'أحمد حسن', at: '2026-11-09 15:30', ip: '41.33.9.54' },
  ])

  function addFiles(id: string, count: number) {
    const p = products.value.find((x) => x.id === id)
    if (p) p.files += count
  }

  function toggleLicense(id: string, value: boolean) {
    const p = products.value.find((x) => x.id === id)
    if (p) p.licenseKeys = value
  }

  return { products, downloads, addFiles, toggleLicense }
})
