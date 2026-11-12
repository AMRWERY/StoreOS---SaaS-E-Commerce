import type { Workflow, WorkflowRun } from '@/types/platformTools'

export const useAutomationWorkflowsStore = defineStore('automationWorkflows', () => {
  const workflows = ref<Workflow[]>([
    {
      id: 'wf-1', name: 'Confirm COD orders by WhatsApp', trigger: 'cod_unconfirmed', enabled: true, lastRun: '2026-11-12 09:30', runs: 412,
      conditions: [{ id: 'c1', field: 'payment_method', operator: 'equals', value: 'COD' }],
      actions: [{ id: 'a1', type: 'send_whatsapp', param: 'order_confirmation' }, { id: 'a2', type: 'tag_order', param: 'awaiting-confirmation' }],
    },
    {
      id: 'wf-2', name: 'Alert staff on low stock', trigger: 'low_stock', enabled: true, lastRun: '2026-11-11 17:05', runs: 58,
      conditions: [{ id: 'c1', field: 'stock_level', operator: 'less_than', value: '5' }],
      actions: [{ id: 'a1', type: 'notify_staff', param: 'inventory' }],
    },
    {
      id: 'wf-3', name: 'Hold high-value new orders', trigger: 'order_created', enabled: false, lastRun: '2026-11-02 12:44', runs: 17,
      conditions: [{ id: 'c1', field: 'order_total', operator: 'greater_than', value: '10000' }],
      actions: [{ id: 'a1', type: 'hold_order', param: 'manual-review' }],
    },
  ])

  /** Starter workflows; `nameKey` is resolved by the page via i18n. */
  const templates: (Workflow & { nameKey: string })[] = [
    {
      id: 'tpl-cod', nameKey: 'codConfirm', name: 'COD confirmation', trigger: 'cod_unconfirmed', enabled: false, lastRun: '', runs: 0,
      conditions: [{ id: 'c1', field: 'payment_method', operator: 'equals', value: 'COD' }],
      actions: [{ id: 'a1', type: 'send_whatsapp', param: 'order_confirmation' }],
    },
    {
      id: 'tpl-stock', nameKey: 'lowStock', name: 'Low stock alert', trigger: 'low_stock', enabled: false, lastRun: '', runs: 0,
      conditions: [{ id: 'c1', field: 'stock_level', operator: 'less_than', value: '5' }],
      actions: [{ id: 'a1', type: 'notify_staff', param: 'inventory' }],
    },
    {
      id: 'tpl-vip', nameKey: 'vipTag', name: 'Tag VIP orders', trigger: 'order_created', enabled: false, lastRun: '', runs: 0,
      conditions: [{ id: 'c1', field: 'order_total', operator: 'greater_than', value: '5000' }],
      actions: [{ id: 'a1', type: 'tag_order', param: 'vip' }],
    },
  ]

  const history = ref<WorkflowRun[]>([
    { id: 'run-9001', at: '2026-11-12 09:30', target: 'ORD-8841', status: 'success', durationMs: 420 },
    { id: 'run-9000', at: '2026-11-12 08:55', target: 'ORD-8838', status: 'success', durationMs: 388 },
    { id: 'run-8999', at: '2026-11-11 21:12', target: 'ORD-8830', status: 'failed', durationMs: 1210 },
    { id: 'run-8998', at: '2026-11-11 17:05', target: 'ORD-8821', status: 'skipped', durationMs: 12 },
  ])

  function getById(id: string) {
    return workflows.value.find((w) => w.id === id)
  }
  function toggle(id: string) {
    const w = getById(id)
    if (w) w.enabled = !w.enabled
  }
  function addFromTemplate(tpl: Workflow, name: string): string {
    const id = `wf-${Date.now()}`
    workflows.value.unshift({
      ...tpl,
      name,
      conditions: tpl.conditions.map((c) => ({ ...c })),
      actions: tpl.actions.map((a) => ({ ...a })),
      id,
      lastRun: '',
      runs: 0,
      enabled: false,
    })
    return id
  }

  return { workflows, templates, history, getById, toggle, addFromTemplate }
})
