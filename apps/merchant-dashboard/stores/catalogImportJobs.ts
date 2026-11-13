import type { ImportExportJob, ImportIssue, ImportJobKind } from '@/types/catalogOps'

export const useCatalogImportJobsStore = defineStore('catalogImportJobs', () => {
  const jobs = ref<ImportExportJob[]>([
    { id: 'JOB-310', kind: 'import', file: 'winter-products.csv', rows: 240, status: 'completed', createdAt: '2026-11-10' },
    { id: 'JOB-309', kind: 'export', file: 'products-export.csv', rows: 1180, status: 'completed', createdAt: '2026-11-08' },
    { id: 'JOB-307', kind: 'import', file: 'prices-update.csv', rows: 96, status: 'failed', createdAt: '2026-11-04' },
  ])

  const issues = ref<ImportIssue[]>([])

  function mockParse(): number {
    issues.value = [
      { row: 4, field: 'price', error: 'invalid_price' },
      { row: 11, field: 'sku', error: 'duplicate_sku' },
      { row: 23, field: 'title', error: 'required' },
      { row: 37, field: 'stock', error: 'invalid_stock' },
    ]
    return 120
  }

  function clearIssues() {
    issues.value = []
  }

  function addJob(kind: ImportJobKind, file: string, rows: number) {
    jobs.value.unshift({
      id: `JOB-${311 + jobs.value.length - 3}`,
      kind,
      file,
      rows,
      status: 'completed',
      createdAt: '2026-11-12',
    })
  }

  return { jobs, issues, mockParse, clearIssues, addJob }
})
