export type PlatformPlan = 'trial' | 'free' | 'starter' | 'growth' | 'enterprise'
export type MerchantStatus = 'active' | 'trial' | 'suspended'
export type PlatformTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand' | 'purple' | 'yellow'

export interface PlatformMerchantUsage {
  orders: number
  skus: number
  staff: number
}

export interface PlatformMerchant {
  id: string
  store: string
  domain: string
  owner: string
  ownerEmail: string
  city: string
  plan: PlatformPlan
  status: MerchantStatus
  gmv: number
  signupDate: string
  lastActive: string
  usage: PlatformMerchantUsage
}

export type MerchantActivityType =
  | 'orderSpike'
  | 'planChange'
  | 'login'
  | 'productImport'
  | 'paymentFailed'
  | 'domainConnected'

export interface MerchantActivity {
  id: string
  type: MerchantActivityType
  date: string
}

export interface PlatformNote {
  id: string
  author: string
  body: string
  date: string
}

export interface PlanEntitlement {
  plan: PlatformPlan
  priceEgp: number
  maxOrders: number | null
  maxSkus: number | null
  maxStaff: number | null
  features: string[]
}

export type PlatformEnvironment = 'production' | 'staging'

export interface PlatformFlag {
  key: string
  enabled: boolean
  rollout: number
  targetPlan: PlatformPlan | 'all'
  environment: PlatformEnvironment
}

export type AbuseSignal = 'fakeStore' | 'phishing' | 'prohibited' | 'chargebacks' | 'spam'
export type AbuseSeverity = 'low' | 'medium' | 'high' | 'critical'
export type AbuseStatus = 'open' | 'investigating' | 'escalated' | 'suspended' | 'cleared'

export interface AbuseEvidence {
  kind: 'url' | 'reports' | 'chargebackRate' | 'ip' | 'screenshot'
  value: string
}

export interface AbuseCase {
  id: string
  store: string
  signal: AbuseSignal
  severity: AbuseSeverity
  status: AbuseStatus
  reportedAt: string
  evidence: AbuseEvidence[]
}

export type ProviderStatus = 'healthy' | 'degraded' | 'down'

export interface ProviderHealth {
  id: string
  name: string
  icon: string
  status: ProviderStatus
  latencyMs: number
  uptime: number
}

export interface FailedJob {
  id: string
  kind: 'webhook' | 'email' | 'sync'
  provider: string
  store: string
  error: string
  attempts: number
  failedAt: string
}

export interface QueueStat {
  name: string
  depth: number
  processing: number
  failed24h: number
  oldestSeconds: number
}

export type TicketStatus = 'open' | 'pending' | 'resolved'
export type TicketPriority = 'low' | 'normal' | 'high'

export interface SupportTicket {
  id: string
  store: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  assignee: string
  createdAt: string
  notes: PlatformNote[]
}

export type StaffRole = 'superAdmin' | 'support' | 'finance' | 'trustSafety'

export interface PlatformStaffMember {
  id: string
  name: string
  email: string
  role: StaffRole
  twoFactor: boolean
  lastActive: string
}

export type AuditAction =
  | 'suspendStore'
  | 'reactivateStore'
  | 'changePlan'
  | 'toggleFlag'
  | 'retryJob'
  | 'resolveCase'
  | 'addNote'

export interface AuditEntry {
  id: string
  actor: string
  action: AuditAction
  target: string
  date: string
  ip: string
}

export interface TrendPoint {
  label: string
  gmv: number
  mrr: number
}
