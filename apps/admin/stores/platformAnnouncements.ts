import type { PlatformAnnouncement } from '@/types/platformOps'

export const usePlatformAnnouncementsStore = defineStore('platformAnnouncements', () => {
  const items = ref<PlatformAnnouncement[]>([
    {
      id: 'an_104', titleEn: 'Scheduled maintenance on Friday', titleAr: 'صيانة مجدولة يوم الجمعة',
      bodyEn: 'The dashboard will be read-only from 02:00 to 03:00 Cairo time.',
      bodyAr: 'ستكون لوحة التحكم للقراءة فقط من 2:00 إلى 3:00 صباحاً بتوقيت القاهرة.',
      audience: 'all', plan: 'trial', segment: 'egyptMerchants', severity: 'warning',
      startAt: '2026-11-13', endAt: '2026-11-14', status: 'scheduled',
    },
    {
      id: 'an_103', titleEn: 'Fawry payments are back to normal', titleAr: 'عادت مدفوعات فوري إلى وضعها الطبيعي',
      bodyEn: 'Delayed settlements have been cleared. No action needed.',
      bodyAr: 'تمت تسوية جميع المدفوعات المتأخرة. لا يلزم أي إجراء.',
      audience: 'segment', plan: 'trial', segment: 'egyptMerchants', severity: 'info',
      startAt: '2026-11-10', endAt: '2026-11-17', status: 'live',
    },
    {
      id: 'an_102', titleEn: 'Update your tax details before 30 Nov', titleAr: 'حدّث بياناتك الضريبية قبل 30 نوفمبر',
      bodyEn: 'Growth and Enterprise stores must confirm their tax registration.',
      bodyAr: 'يجب على متاجر باقتي النمو والمؤسسات تأكيد التسجيل الضريبي.',
      audience: 'plan', plan: 'growth', segment: 'highGmv', severity: 'critical',
      startAt: '2026-11-05', endAt: '2026-11-30', status: 'live',
    },
    {
      id: 'an_099', titleEn: 'New themes are available', titleAr: 'قوالب جديدة متاحة الآن',
      bodyEn: 'Browse the new Ramadan collection in the theme library.',
      bodyAr: 'تصفح مجموعة رمضان الجديدة في مكتبة القوالب.',
      audience: 'all', plan: 'trial', segment: 'egyptMerchants', severity: 'info',
      startAt: '2026-10-01', endAt: '2026-10-15', status: 'expired',
    },
  ])

  const add = (item: Omit<PlatformAnnouncement, 'id'>) => {
    items.value.unshift({ ...item, id: `an_${105 + items.value.length - 4}` })
  }
  const expire = (id: string) => {
    const target = items.value.find((a) => a.id === id)
    if (target) target.status = 'expired'
  }

  return { items, add, expire }
})
