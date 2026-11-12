import type { AbuseCase, AbuseStatus } from '@/types/platform'

export const usePlatformAbuseStore = defineStore('platformAbuse', () => {
  const cases = ref<AbuseCase[]>([
    {
      id: 'ab_2041', store: 'Quick Kicks', signal: 'fakeStore', severity: 'high', status: 'open', reportedAt: '2026-11-11',
      evidence: [
        { kind: 'url', value: 'quick-kicks.storeos.shop' },
        { kind: 'reports', value: '14' },
        { kind: 'ip', value: '41.68.12.201' },
      ],
    },
    {
      id: 'ab_2040', store: 'Giza Gadgets', signal: 'chargebacks', severity: 'critical', status: 'suspended', reportedAt: '2026-11-08',
      evidence: [
        { kind: 'chargebackRate', value: '6.4' },
        { kind: 'reports', value: '3' },
      ],
    },
    {
      id: 'ab_2038', store: 'Cairo Pharma Deals', signal: 'prohibited', severity: 'high', status: 'investigating', reportedAt: '2026-11-07',
      evidence: [
        { kind: 'url', value: 'cairo-pharma-deals.storeos.shop/products/12' },
        { kind: 'screenshot', value: 'evidence-2038.png' },
      ],
    },
    {
      id: 'ab_2035', store: 'Bank Misr Verify', signal: 'phishing', severity: 'critical', status: 'escalated', reportedAt: '2026-11-06',
      evidence: [
        { kind: 'url', value: 'bank-misr-verify.storeos.shop/login' },
        { kind: 'reports', value: '31' },
        { kind: 'ip', value: '102.40.9.77' },
      ],
    },
    {
      id: 'ab_2031', store: 'Mega Followers EG', signal: 'spam', severity: 'low', status: 'cleared', reportedAt: '2026-11-02',
      evidence: [{ kind: 'reports', value: '2' }],
    },
  ])

  const setStatus = (id: string, status: AbuseStatus) => {
    const target = cases.value.find((c) => c.id === id)
    if (target) target.status = status
  }

  return { cases, setStatus }
})
