import type { KycDocKey, KycDocument, KycForm, KycPayout, KycStatus } from '@/types/trust'

export const useTrustKycStore = defineStore('trustKyc', () => {
  const status = ref<KycStatus>('rejected')
  const step = ref(0)
  const policyAck = ref(false)

  const form = ref<KycForm>({
    businessType: 'company',
    legalName: 'Nile E-Commerce LLC',
    commercialRegisterNo: '104582',
    taxCardNo: '412-883-209',
    nationalId: '29105121402345',
    address: '12 Tahrir St, Dokki, Giza',
  })

  const payout = ref<KycPayout>({
    method: 'bank',
    bankName: 'Banque Misr',
    accountName: 'Nile E-Commerce LLC',
    iban: 'EG380002000156789012345180002',
    walletNumber: '01012345678',
  })

  const documents = ref<KycDocument[]>([
    { key: 'idFront', status: 'approved', fileName: 'id-front.jpg', reason: '' },
    { key: 'idBack', status: 'approved', fileName: 'id-back.jpg', reason: '' },
    { key: 'commercialRegister', status: 'rejected', fileName: 'cr-scan.pdf', reason: 'blurry' },
    { key: 'taxCard', status: 'approved', fileName: 'tax-card.pdf', reason: '' },
  ])

  function setDoc(key: KycDocKey, fileName: string | null) {
    const doc = documents.value.find((d) => d.key === key)
    if (!doc) return
    doc.fileName = fileName ?? ''
    doc.status = fileName ? 'uploaded' : 'missing'
    doc.reason = ''
  }

  function resubmit() {
    documents.value.forEach((d) => {
      if (d.status === 'rejected') {
        d.status = 'missing'
        d.fileName = ''
        d.reason = ''
      }
    })
    status.value = 'not_started'
    step.value = 2
  }

  function submit() {
    documents.value.forEach((d) => {
      if (d.status === 'uploaded') d.status = 'in_review'
    })
    status.value = 'in_review'
  }

  return { status, step, policyAck, form, payout, documents, setDoc, resubmit, submit }
})
