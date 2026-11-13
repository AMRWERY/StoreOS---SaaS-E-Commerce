import type { CatxCustomerJob, CatxImportError } from '@/types/catalogDepth'

export const useCatxCustomerIoStore = defineStore('catxCustomerIo', () => {
  const jobs = ref<CatxCustomerJob[]>([
    { id: 'JOB-01', kind: 'export', file: 'customers-2026-11-01.csv', rows: 2140, date: '2026-11-01', status: 'done' },
    { id: 'JOB-02', kind: 'import', file: 'cairo-leads.csv', rows: 318, date: '2026-10-22', status: 'done' },
    { id: 'JOB-03', kind: 'import', file: 'alex-wholesale.csv', rows: 74, date: '2026-10-10', status: 'failed' },
  ])

  const columns = ['full_name', 'email_address', 'mobile', 'city']
  const previewRows = [
    ['منى عبد الله', 'mona@example.com', '01005551234', 'الجيزة'],
    ['كريم السيد', 'karim@example.com', '01112223344', 'القاهرة'],
    ['هالة إبراهيم', 'hala-at-example', '0109888', 'الإسكندرية'],
  ]

  const errors: CatxImportError[] = [
    { id: 'E1', row: 3, field: 'email', reason: 'invalid_email' },
    { id: 'E2', row: 3, field: 'phone', reason: 'invalid_phone' },
    { id: 'E3', row: 17, field: 'name', reason: 'missing_name' },
    { id: 'E4', row: 24, field: 'email', reason: 'duplicate' },
  ]

  function addJob(kind: 'import' | 'export', file: string, rows: number) {
    jobs.value.unshift({ id: `JOB-${String(jobs.value.length + 1).padStart(2, '0')}`, kind, file, rows, date: '2026-11-12', status: 'processing' })
  }

  return { jobs, columns, previewRows, errors, addJob }
})
