import type { KycCase, KycCheckKey } from '@/types/platformOps'

const checks = (done: KycCheckKey[]): KycCase['checks'] => ({
  idMatch: done.includes('idMatch'),
  selfie: done.includes('selfie'),
  commercialRegister: done.includes('commercialRegister'),
  taxCard: done.includes('taxCard'),
  bankAccount: done.includes('bankAccount'),
  addressProof: done.includes('addressProof'),
})

export const usePlatformKycStore = defineStore('platformKyc', () => {
  const cases = ref<KycCase[]>([
    {
      id: 'kyc_3012', store: 'Nile Threads', owner: 'Mona Fathy', businessType: 'llc', submittedAt: '2026-11-11 14:20',
      documents: [
        { kind: 'nationalId', file: 'national-id-front.jpg' },
        { kind: 'commercialRegister', file: 'cr-4471-cairo.pdf' },
        { kind: 'taxCard', file: 'tax-card.pdf' },
        { kind: 'bankLetter', file: 'cib-letter.pdf' },
      ],
      risk: 18, status: 'pending', infoRequested: false, checks: checks(['idMatch']), decisionReason: '',
    },
    {
      id: 'kyc_3011', store: 'Alex Coffee Roasters', owner: 'Karim Soliman', businessType: 'company', submittedAt: '2026-11-11 09:05',
      documents: [
        { kind: 'nationalId', file: 'national-id.jpg' },
        { kind: 'selfie', file: 'selfie.jpg' },
        { kind: 'commercialRegister', file: 'cr-alex.pdf' },
      ],
      risk: 42, status: 'pending', infoRequested: true, checks: checks(['idMatch', 'selfie']), decisionReason: '',
    },
    {
      id: 'kyc_3009', store: 'Riyadh Oud House', owner: 'Faisal Al-Harbi', businessType: 'company', submittedAt: '2026-11-10 17:44',
      documents: [
        { kind: 'nationalId', file: 'iqama.jpg' },
        { kind: 'commercialRegister', file: 'cr-riyadh.pdf' },
        { kind: 'addressProof', file: 'utility-bill.pdf' },
      ],
      risk: 71, status: 'pending', infoRequested: false, checks: checks([]), decisionReason: '',
    },
    {
      id: 'kyc_3004', store: 'Tanta Home Goods', owner: 'Hend Mostafa', businessType: 'individual', submittedAt: '2026-11-08 12:31',
      documents: [
        { kind: 'nationalId', file: 'national-id.jpg' },
        { kind: 'selfie', file: 'selfie.jpg' },
        { kind: 'bankLetter', file: 'banque-misr.pdf' },
      ],
      risk: 9, status: 'approved', infoRequested: false,
      checks: checks(['idMatch', 'selfie', 'commercialRegister', 'taxCard', 'bankAccount', 'addressProof']), decisionReason: '',
    },
    {
      id: 'kyc_3001', store: 'Giza Gadgets', owner: 'Tamer Aboelnaga', businessType: 'llc', submittedAt: '2026-11-06 10:12',
      documents: [
        { kind: 'nationalId', file: 'id-blurry.jpg' },
        { kind: 'taxCard', file: 'tax-expired.pdf' },
      ],
      risk: 83, status: 'rejected', infoRequested: false, checks: checks(['selfie']),
      decisionReason: 'Tax card is expired and the national ID photo is unreadable.',
    },
  ])

  const toggleCheck = (id: string, key: KycCheckKey) => {
    const target = cases.value.find((c) => c.id === id)
    if (target) target.checks[key] = !target.checks[key]
  }
  const approve = (id: string) => {
    const target = cases.value.find((c) => c.id === id)
    if (target) {
      target.status = 'approved'
      target.infoRequested = false
    }
  }
  const reject = (id: string, reason: string) => {
    const target = cases.value.find((c) => c.id === id)
    if (target) {
      target.status = 'rejected'
      target.decisionReason = reason
      target.infoRequested = false
    }
  }
  const requestInfo = (id: string) => {
    const target = cases.value.find((c) => c.id === id)
    if (target) target.infoRequested = true
  }

  return { cases, toggleCheck, approve, reject, requestInfo }
})
