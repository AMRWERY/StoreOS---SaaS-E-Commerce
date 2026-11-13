import type { SavedReport, ScheduledReport } from '@/types/insights'

export const useRepReportsStore = defineStore('repReports', () => {
  const saved = ref<SavedReport[]>([
    { id: 'RPT-1', name: 'Revenue by channel', metrics: ['revenue', 'orders'], dimension: 'channel', range: '30d', view: 'chart', updatedAt: '2026-11-08' },
    { id: 'RPT-2', name: 'Cairo vs Giza AOV', metrics: ['aov', 'conversion'], dimension: 'city', range: '90d', view: 'table', updatedAt: '2026-11-02' },
  ])
  const scheduled = ref<ScheduledReport[]>([
    { id: 'SCH-1', name: 'Revenue by channel', frequency: 'weekly', recipients: ['owner@store.eg', 'finance@store.eg'], format: 'pdf', status: 'active', nextRun: '2026-11-15' },
    { id: 'SCH-2', name: 'Cairo vs Giza AOV', frequency: 'monthly', recipients: ['ops@store.eg'], format: 'csv', status: 'paused', nextRun: '2026-12-01' },
  ])
  let seq = 10

  function saveReport(r: Omit<SavedReport, 'id' | 'updatedAt'>) {
    seq += 1
    saved.value.unshift({ ...r, id: `RPT-${seq}`, updatedAt: '2026-11-12' })
  }
  function removeReport(id: string) {
    saved.value = saved.value.filter((r) => r.id !== id)
  }
  function addSchedule(s: Omit<ScheduledReport, 'id' | 'status' | 'nextRun'>) {
    seq += 1
    scheduled.value.unshift({ ...s, id: `SCH-${seq}`, status: 'active', nextRun: '2026-11-13' })
  }
  function toggleSchedule(id: string) {
    const s = scheduled.value.find((x) => x.id === id)
    if (s) s.status = s.status === 'active' ? 'paused' : 'active'
  }

  return { saved, scheduled, saveReport, removeReport, addSchedule, toggleSchedule }
})
