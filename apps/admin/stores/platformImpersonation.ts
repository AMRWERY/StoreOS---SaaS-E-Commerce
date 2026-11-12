import type {
  ImpersonationAction,
  ImpersonationAuditEntry,
  ImpersonationRequest,
} from '@/types/platformOps'

const NOW = '2026-11-12 10:40'

export const usePlatformImpersonationStore = defineStore('platformImpersonation', () => {
  const requests = ref<ImpersonationRequest[]>([
    {
      id: 'imp_088', requester: 'Mona Fathy', store: 'Nile Threads', reason: 'Merchant cannot see imported products after CSV upload.',
      ticket: 'SUP-4412', minutes: 30, approver: '', status: 'pending', requestedAt: '2026-11-12 09:58',
    },
    {
      id: 'imp_087', requester: 'Youssef Hamdy', store: 'Giza Gadgets', reason: 'Debug failed Paymob webhook replay.',
      ticket: 'SUP-4398', minutes: 60, approver: '', status: 'pending', requestedAt: '2026-11-12 09:12',
    },
    {
      id: 'imp_086', requester: 'Salma Nabil', store: 'Cairo Pharma Deals', reason: 'Verify shipping rules after Bosta migration.',
      ticket: 'SUP-4380', minutes: 15, approver: 'Amr Mohamed', status: 'approved', requestedAt: '2026-11-11 16:30',
    },
    {
      id: 'imp_085', requester: 'Youssef Hamdy', store: 'Quick Kicks', reason: 'Reproduce checkout error reported by customer.',
      ticket: 'SUP-4361', minutes: 30, approver: 'Amr Mohamed', status: 'ended', requestedAt: '2026-11-10 13:05',
    },
    {
      id: 'imp_084', requester: 'Mona Fathy', store: 'Bank Misr Verify', reason: 'Curiosity about store content.',
      ticket: 'SUP-4350', minutes: 60, approver: 'Amr Mohamed', status: 'denied', requestedAt: '2026-11-09 11:47',
    },
  ])

  const audit = ref<ImpersonationAuditEntry[]>([
    { id: 'au_9', at: '2026-11-12 09:58', actor: 'Mona Fathy', action: 'requested', store: 'Nile Threads', ticket: 'SUP-4412' },
    { id: 'au_8', at: '2026-11-12 09:12', actor: 'Youssef Hamdy', action: 'requested', store: 'Giza Gadgets', ticket: 'SUP-4398' },
    { id: 'au_7', at: '2026-11-11 16:41', actor: 'Amr Mohamed', action: 'approved', store: 'Cairo Pharma Deals', ticket: 'SUP-4380' },
    { id: 'au_6', at: '2026-11-10 13:34', actor: 'Youssef Hamdy', action: 'ended', store: 'Quick Kicks', ticket: 'SUP-4361' },
    { id: 'au_5', at: '2026-11-10 13:20', actor: 'Youssef Hamdy', action: 'viewedOrders', store: 'Quick Kicks', ticket: 'SUP-4361' },
    { id: 'au_4', at: '2026-11-10 13:11', actor: 'Youssef Hamdy', action: 'started', store: 'Quick Kicks', ticket: 'SUP-4361' },
    { id: 'au_3', at: '2026-11-09 12:02', actor: 'Amr Mohamed', action: 'denied', store: 'Bank Misr Verify', ticket: 'SUP-4350' },
  ])

  const remainingSeconds = ref(0)
  const activeRequest = computed(() => requests.value.find((r) => r.status === 'active') ?? null)

  const log = (actor: string, action: ImpersonationAction, req: ImpersonationRequest) => {
    audit.value.unshift({ id: `au_${10 + audit.value.length}`, at: NOW, actor, action, store: req.store, ticket: req.ticket })
  }
  const find = (id: string) => requests.value.find((r) => r.id === id)

  const request = (input: Pick<ImpersonationRequest, 'requester' | 'store' | 'reason' | 'ticket' | 'minutes'>) => {
    const req: ImpersonationRequest = { ...input, id: `imp_${89 + requests.value.length - 5}`, approver: '', status: 'pending', requestedAt: NOW }
    requests.value.unshift(req)
    log(req.requester, 'requested', req)
  }
  const approve = (id: string, approver: string) => {
    const req = find(id)
    if (!req) return
    req.status = 'approved'
    req.approver = approver
    log(approver, 'approved', req)
  }
  const deny = (id: string, approver: string) => {
    const req = find(id)
    if (!req) return
    req.status = 'denied'
    req.approver = approver
    log(approver, 'denied', req)
  }
  const start = (id: string) => {
    const req = find(id)
    if (!req || activeRequest.value) return
    req.status = 'active'
    remainingSeconds.value = req.minutes * 60
    log(req.requester, 'started', req)
  }
  const end = () => {
    const req = activeRequest.value
    if (!req) return
    req.status = 'ended'
    remainingSeconds.value = 0
    log(req.requester, 'ended', req)
  }
  const tick = () => {
    if (!activeRequest.value) return
    remainingSeconds.value = Math.max(0, remainingSeconds.value - 1)
    if (remainingSeconds.value === 0) end()
  }

  return { requests, audit, remainingSeconds, activeRequest, request, approve, deny, start, end, tick }
})
