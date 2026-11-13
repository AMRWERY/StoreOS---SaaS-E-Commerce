import type { Plan } from '@/types/auth'

export type SecurityDeviceKind = 'desktop' | 'mobile'

export interface TrustedDevice {
  id: string
  name: string
  location: string
  ip: string
  lastActive: string
  current: boolean
  kind: SecurityDeviceKind
}

export type AuditCategory = 'orders' | 'products' | 'payments' | 'staff' | 'settings'

export interface AuditEntry {
  id: string
  actor: string
  /** Key under dashboard.ops.activity.actions */
  action: string
  category: AuditCategory
  resource: string
  ip: string
  at: string
  before: Record<string, string> | null
  after: Record<string, string> | null
}

export type WaCategory = 'utility' | 'marketing'
export type WaLanguage = 'en' | 'ar'
export type WaApproval = 'approved' | 'pending' | 'rejected'

export interface WaTemplate {
  id: string
  name: string
  category: WaCategory
  language: WaLanguage
  status: WaApproval
  body: string
}

export type OrderMessageKey = 'confirmed' | 'shipped' | 'outForDelivery' | 'delivered'

export type WorkflowTriggerKey = 'order_created' | 'low_stock' | 'cod_unconfirmed' | 'order_delivered' | 'cart_abandoned'
export type WorkflowActionKey = 'tag_order' | 'send_whatsapp' | 'hold_order' | 'notify_staff'
export type WorkflowOperator = 'equals' | 'greater_than' | 'less_than' | 'contains'
export type WorkflowField = 'order_total' | 'payment_method' | 'city' | 'stock_level' | 'customer_tag'

export interface WorkflowCondition {
  id: string
  field: WorkflowField
  operator: WorkflowOperator
  value: string
}

export interface WorkflowAction {
  id: string
  type: WorkflowActionKey
  param: string
}

export interface Workflow {
  id: string
  name: string
  trigger: WorkflowTriggerKey
  conditions: WorkflowCondition[]
  actions: WorkflowAction[]
  lastRun: string
  runs: number
  enabled: boolean
}

export interface WorkflowRun {
  id: string
  at: string
  target: string
  status: 'success' | 'failed' | 'skipped'
  durationMs: number
}

export type OrgRole = 'owner' | 'admin' | 'staff'

export interface OrgStore {
  id: string
  name: string
  domain: string
  plan: Plan
  role: OrgRole
}

export interface HelpArticle {
  id: string
  title: string
  topic: string
  minutes: number
}

export type TicketStatus = 'open' | 'pending' | 'resolved'

export interface SupportTicket {
  id: string
  subject: string
  priority: 'low' | 'normal' | 'high'
  status: TicketStatus
  updatedAt: string
}

export interface OpsSavedView {
  id: string
  name: string
  filters: Record<string, string>
}
