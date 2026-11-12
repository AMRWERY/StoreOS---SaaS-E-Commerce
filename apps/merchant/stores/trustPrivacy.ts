import type { ConsentEntry, DataRequest, DataRequestStatus, RetentionSettings, Subprocessor } from '@/types/trust'

export const useTrustPrivacyStore = defineStore('trustPrivacy', () => {
  const requests = ref<DataRequest[]>([
    { id: 'DSR-1042', customer: 'Mona Fathy', email: 'mona.fathy@gmail.com', type: 'export', requestedAt: '2026-11-04', dueAt: '2026-12-04', daysLeft: 22, status: 'open' },
    { id: 'DSR-1041', customer: 'Hossam Ali', email: 'hossam_ali@hotmail.com', type: 'delete', requestedAt: '2026-10-20', dueAt: '2026-11-19', daysLeft: 7, status: 'processing' },
    { id: 'DSR-1038', customer: 'Dina Samir', email: 'dina.samir@yahoo.com', type: 'correct', requestedAt: '2026-10-11', dueAt: '2026-11-10', daysLeft: -2, status: 'open' },
    { id: 'DSR-1030', customer: 'Karim Adel', email: 'karim.adel@outlook.com', type: 'export', requestedAt: '2026-09-28', dueAt: '2026-10-28', daysLeft: 0, status: 'completed' },
  ])

  const consents = ref<ConsentEntry[]>([
    { id: 'c1', contact: 'mona.fathy@gmail.com', channel: 'email', given: true, source: 'checkout', at: '2026-11-04 14:22:08' },
    { id: 'c2', contact: '+201012345678', channel: 'whatsapp', given: true, source: 'popup', at: '2026-11-03 19:05:41' },
    { id: 'c3', contact: '+201112223344', channel: 'sms', given: false, source: 'signup', at: '2026-11-01 10:11:30' },
    { id: 'c4', contact: 'dina.samir@yahoo.com', channel: 'email', given: false, source: 'import', at: '2026-10-29 08:00:00' },
  ])

  const retention = ref<RetentionSettings>({ orders: '10y', customers: '5y', logs: '1y', abandoned: '90d' })

  const subprocessors = ref<Subprocessor[]>([
    { id: 'p1', name: 'Amazon Web Services', purpose: 'hosting', region: 'EU (Frankfurt)' },
    { id: 'p2', name: 'Paymob', purpose: 'payments', region: 'Egypt' },
    { id: 'p3', name: 'Cloudflare', purpose: 'cdn', region: 'Global' },
    { id: 'p4', name: 'Twilio', purpose: 'messaging', region: 'US' },
  ])

  function setStatus(id: string, status: DataRequestStatus) {
    const r = requests.value.find((x) => x.id === id)
    if (r) r.status = status
  }

  return { requests, consents, retention, subprocessors, setStatus }
})
