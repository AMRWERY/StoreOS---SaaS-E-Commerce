import type { LegalDocument, LegalHistoryEntry } from '@/types/trust'

export const useTrustLegalStore = defineStore('trustLegal', () => {
  const documents = ref<LegalDocument[]>([
    { key: 'tos', version: '2026-09', updatedAt: '2026-09-01', accepted: true, acceptedBy: 'Amr Mohamed', acceptedAt: '2026-09-03 11:20:45' },
    { key: 'aup', version: '2026-09', updatedAt: '2026-09-01', accepted: false, acceptedBy: '', acceptedAt: '' },
    { key: 'refund', version: '2026-06', updatedAt: '2026-06-15', accepted: false, acceptedBy: '', acceptedAt: '' },
  ])

  const history = ref<LegalHistoryEntry[]>([
    { id: 'h1', doc: 'tos', version: '2026-09', acceptedBy: 'Amr Mohamed', acceptedAt: '2026-09-03 11:20:45', ip: '41.33.120.8' },
    { id: 'h2', doc: 'tos', version: '2026-03', acceptedBy: 'Amr Mohamed', acceptedAt: '2026-03-12 09:02:11', ip: '41.33.120.8' },
  ])

  function accept(key: LegalDocument['key'], by: string) {
    const d = documents.value.find((x) => x.key === key)
    if (!d || d.accepted) return
    const at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    d.accepted = true
    d.acceptedBy = by
    d.acceptedAt = at
    history.value.unshift({ id: `h${Date.now()}`, doc: key, version: d.version, acceptedBy: by, acceptedAt: at, ip: '41.33.120.8' })
  }

  return { documents, history, accept }
})
