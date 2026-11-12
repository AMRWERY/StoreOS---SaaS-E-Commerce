import type { EmailDnsRecord, SuppressionEntry, SuppressionReason } from '@/types/trust'

export const useTrustEmailDomainStore = defineStore('trustEmailDomain', () => {
  const domain = ref('mail.mystore.com.eg')
  const senderName = ref('My Store Egypt')
  const fromAddress = ref('orders')

  const records = ref<EmailDnsRecord[]>([
    { id: 'r1', purpose: 'spf', type: 'TXT', host: 'mail.mystore.com.eg', value: 'v=spf1 include:_spf.storeos.app ~all', status: 'verified' },
    { id: 'r2', purpose: 'dkim1', type: 'CNAME', host: 's1._domainkey.mail.mystore.com.eg', value: 's1.domainkey.storeos.app', status: 'verified' },
    { id: 'r3', purpose: 'dkim2', type: 'CNAME', host: 's2._domainkey.mail.mystore.com.eg', value: 's2.domainkey.storeos.app', status: 'pending' },
    { id: 'r4', purpose: 'dmarc', type: 'TXT', host: '_dmarc.mail.mystore.com.eg', value: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@mystore.com.eg', status: 'failed' },
  ])

  const suppression = ref<SuppressionEntry[]>([
    { id: 's1', address: 'mona.fathy@gmail.com', reason: 'bounced', date: '2026-11-08' },
    { id: 's2', address: 'hossam_ali@hotmail.com', reason: 'complained', date: '2026-11-05' },
    { id: 's3', address: 'dina.samir@yahoo.com', reason: 'unsubscribed', date: '2026-10-29' },
  ])

  const stats = ref({ sent: 12480, bounceRate: 1.2, complaintRate: 0.04 })

  function verify() {
    records.value.forEach((r) => {
      if (r.status === 'pending') r.status = 'verified'
      else if (r.status === 'failed') r.status = 'pending'
    })
  }
  function removeSuppressed(id: string) {
    suppression.value = suppression.value.filter((s) => s.id !== id)
  }
  function addSuppressed(address: string, reason: SuppressionReason) {
    const a = address.trim()
    if (!a) return
    suppression.value.unshift({ id: `s${Date.now()}`, address: a, reason, date: new Date().toISOString().slice(0, 10) })
  }

  return { domain, senderName, fromAddress, records, suppression, stats, verify, removeSuppressed, addSuppressed }
})
