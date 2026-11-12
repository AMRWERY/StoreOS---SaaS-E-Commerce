import type { PlatformPlan } from '@/types/platform'

/* ---------- KYC / KYB ---------- */
export type KycStatus = 'pending' | 'approved' | 'rejected'
export type KycBusinessType = 'individual' | 'company' | 'llc'
export type KycDocumentKind = 'nationalId' | 'commercialRegister' | 'taxCard' | 'bankLetter' | 'selfie' | 'addressProof'
export type KycCheckKey = 'idMatch' | 'selfie' | 'commercialRegister' | 'taxCard' | 'bankAccount' | 'addressProof'

export interface KycDocument {
  kind: KycDocumentKind
  file: string
}

export interface KycCase {
  id: string
  store: string
  owner: string
  businessType: KycBusinessType
  submittedAt: string
  documents: KycDocument[]
  risk: number
  status: KycStatus
  infoRequested: boolean
  checks: Record<KycCheckKey, boolean>
  decisionReason: string
}

/* ---------- Announcements ---------- */
export type AnnouncementAudience = 'all' | 'plan' | 'segment'
export type AnnouncementSeverity = 'info' | 'warning' | 'critical'
export type AnnouncementStatus = 'draft' | 'scheduled' | 'live' | 'expired'
export type AnnouncementSegment = 'egyptMerchants' | 'ksaMerchants' | 'highGmv' | 'atRisk'

export interface PlatformAnnouncement {
  id: string
  titleEn: string
  titleAr: string
  bodyEn: string
  bodyAr: string
  audience: AnnouncementAudience
  plan: PlatformPlan
  segment: AnnouncementSegment
  severity: AnnouncementSeverity
  startAt: string
  endAt: string
  status: AnnouncementStatus
}

/* ---------- Config ---------- */
export type ConfigPlan = 'free' | 'starter' | 'growth' | 'enterprise'
export type ProviderKind = 'payment' | 'shipping'

export interface PlatformGeneralConfig {
  name: string
  supportEmail: string
  locale: 'en' | 'ar'
  currency: 'EGP' | 'SAR' | 'AED' | 'USD'
  trialDays: number
}

export interface PlatformRateLimit {
  key: 'storefrontApi' | 'adminApi' | 'webhooks' | 'checkout' | 'login'
  perMinute: number
}

export interface PlatformProviderConfig {
  id: string
  name: string
  kind: ProviderKind
  enabled: boolean
}

export interface PlatformMaintenance {
  enabled: boolean
  messageEn: string
  messageAr: string
}

/* ---------- Impersonation ---------- */
export type ImpersonationStatus = 'pending' | 'approved' | 'denied' | 'active' | 'ended'
export type ImpersonationAction = 'requested' | 'approved' | 'denied' | 'started' | 'ended' | 'viewedOrders' | 'viewedSettings'

export interface ImpersonationRequest {
  id: string
  requester: string
  store: string
  reason: string
  ticket: string
  minutes: 15 | 30 | 60
  approver: string
  status: ImpersonationStatus
  requestedAt: string
}

export interface ImpersonationAuditEntry {
  id: string
  at: string
  actor: string
  action: ImpersonationAction
  store: string
  ticket: string
}

/* ---------- Incidents & SLA ---------- */
export type IncidentSeverity = 'sev1' | 'sev2' | 'sev3'
export type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved'

export interface IncidentUpdate {
  id: string
  at: string
  status: IncidentStatus
  message: string
  messageAr: string
}

export interface PlatformIncident {
  id: string
  title: string
  titleAr: string
  severity: IncidentSeverity
  status: IncidentStatus
  startedAt: string
  durationMin: number
  published: boolean
  postmortem: string
  updates: IncidentUpdate[]
}

export interface PlatformSla {
  uptimeTarget: number
  uptimeActual: number
  rpoTargetMin: number
  rpoActualMin: number
  rtoTargetMin: number
  rtoActualMin: number
}

/* ---------- Public status page ---------- */
export type StatusComponentKey = 'dashboard' | 'storefront' | 'checkout' | 'payments' | 'webhooks' | 'messaging'
export type StatusLevel = 'operational' | 'degraded' | 'outage'
export type StatusDay = 'up' | 'degraded' | 'down'

export interface StatusComponent {
  key: StatusComponentKey
  status: StatusLevel
  uptime: number
  days: StatusDay[]
}

/* ---------- Developer sandbox ---------- */
export type SandboxTheme = 'dawn' | 'noor' | 'cairo' | 'souq'
export type SandboxStoreStatus = 'active' | 'archived'
export type SandboxScope = 'themes:read' | 'themes:write' | 'stores:read' | 'webhooks:write'

export interface SandboxStore {
  id: string
  name: string
  createdAt: string
  resetAt: string
  theme: SandboxTheme
  status: SandboxStoreStatus
}

export interface SandboxToken {
  id: string
  name: string
  prefix: string
  scopes: SandboxScope[]
  createdAt: string
  revoked: boolean
}

export interface SandboxWebhook {
  id: string
  url: string
  event: string
  enabled: boolean
}

export interface SandboxDelivery {
  id: string
  at: string
  event: string
  code: number
}
