import type { IncidentSeverity, IncidentStatus, PlatformIncident, PlatformSla } from '@/types/platformOps'

const NOW = '2026-11-12 10:40'

export const usePlatformIncidentsStore = defineStore('platformIncidents', () => {
  const sla = ref<PlatformSla>({
    uptimeTarget: 99.9, uptimeActual: 99.94,
    rpoTargetMin: 15, rpoActualMin: 9,
    rtoTargetMin: 60, rtoActualMin: 74,
  })

  const incidents = ref<PlatformIncident[]>([
    {
      id: 'inc_2026_017', title: 'Delayed Fawry payment confirmations', titleAr: 'تأخر تأكيد مدفوعات فوري',
      severity: 'sev2', status: 'monitoring', startedAt: '2026-11-12 08:15', durationMin: 145, published: true, postmortem: '',
      updates: [
        { id: 'u3', at: '2026-11-12 10:00', status: 'monitoring', message: 'A fix was deployed. We are monitoring confirmation latency.', messageAr: 'تم نشر إصلاح ونراقب زمن تأكيد المدفوعات.' },
        { id: 'u2', at: '2026-11-12 09:05', status: 'identified', message: 'The delay is caused by a backlog in the Fawry callback queue.', messageAr: 'يرجع التأخير إلى تراكم في طابور استدعاءات فوري.' },
        { id: 'u1', at: '2026-11-12 08:15', status: 'investigating', message: 'We are investigating delayed payment confirmations.', messageAr: 'نحقق في تأخر تأكيد المدفوعات.' },
      ],
    },
    {
      id: 'inc_2026_016', title: 'Storefront latency in Cairo region', titleAr: 'بطء المتاجر في منطقة القاهرة',
      severity: 'sev3', status: 'resolved', startedAt: '2026-11-08 19:20', durationMin: 38, published: true,
      postmortem: 'https://status.storeos.shop/postmortems/inc-2026-016',
      updates: [
        { id: 'u2', at: '2026-11-08 19:58', status: 'resolved', message: 'Latency is back to normal after a cache node was replaced.', messageAr: 'عاد زمن الاستجابة إلى طبيعته بعد استبدال عقدة التخزين المؤقت.' },
        { id: 'u1', at: '2026-11-08 19:20', status: 'investigating', message: 'Some storefronts load slowly. We are looking into it.', messageAr: 'تتحمل بعض المتاجر ببطء ونعمل على الأمر.' },
      ],
    },
    {
      id: 'inc_2026_015', title: 'Dashboard unavailable', titleAr: 'لوحة التحكم غير متاحة',
      severity: 'sev1', status: 'resolved', startedAt: '2026-10-27 03:10', durationMin: 74, published: true,
      postmortem: 'https://status.storeos.shop/postmortems/inc-2026-015',
      updates: [
        { id: 'u3', at: '2026-10-27 04:24', status: 'resolved', message: 'The database failover completed and the dashboard is available.', messageAr: 'اكتمل التبديل الاحتياطي لقاعدة البيانات ولوحة التحكم متاحة.' },
        { id: 'u2', at: '2026-10-27 03:40', status: 'identified', message: 'The primary database node failed. A failover is in progress.', messageAr: 'تعطلت عقدة قاعدة البيانات الرئيسية والتبديل جارٍ.' },
        { id: 'u1', at: '2026-10-27 03:10', status: 'investigating', message: 'The merchant dashboard is not loading.', messageAr: 'لوحة التاجر لا تعمل.' },
      ],
    },
    {
      id: 'inc_2026_014', title: 'WhatsApp notifications delayed', titleAr: 'تأخر إشعارات واتساب',
      severity: 'sev3', status: 'resolved', startedAt: '2026-10-19 12:00', durationMin: 95, published: false, postmortem: '',
      updates: [
        { id: 'u1', at: '2026-10-19 13:35', status: 'resolved', message: 'Provider rate limit lifted.', messageAr: 'تم رفع حد المعدل لدى المزود.' },
      ],
    },
  ])

  const create = (input: { title: string; titleAr: string; severity: IncidentSeverity; message: string; messageAr: string; published: boolean }) => {
    incidents.value.unshift({
      id: `inc_2026_${String(18 + incidents.value.length - 4).padStart(3, '0')}`,
      title: input.title, titleAr: input.titleAr || input.title,
      severity: input.severity, status: 'investigating', startedAt: NOW, durationMin: 0, published: input.published, postmortem: '',
      updates: [{ id: 'u1', at: NOW, status: 'investigating', message: input.message, messageAr: input.messageAr || input.message }],
    })
  }
  const addUpdate = (id: string, input: { status: IncidentStatus; message: string; messageAr: string; published: boolean }) => {
    const target = incidents.value.find((i) => i.id === id)
    if (!target) return
    target.status = input.status
    target.published = input.published
    target.updates.unshift({
      id: `u${target.updates.length + 1}`, at: NOW, status: input.status,
      message: input.message, messageAr: input.messageAr || input.message,
    })
  }

  return { sla, incidents, create, addUpdate }
})
