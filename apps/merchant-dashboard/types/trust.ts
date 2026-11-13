export type KycStatus = 'not_started' | 'in_review' | 'verified' | 'rejected'
export type KycBusinessType = 'individual' | 'sole' | 'company'
export type KycDocKey = 'idFront' | 'idBack' | 'commercialRegister' | 'taxCard'
export type KycDocStatus = 'missing' | 'uploaded' | 'in_review' | 'approved' | 'rejected'
export type KycPayoutMethod = 'bank' | 'wallet'

export interface KycDocument {
  key: KycDocKey
  status: KycDocStatus
  fileName: string
  reason: string
}

export interface KycForm {
  businessType: KycBusinessType
  legalName: string
  commercialRegisterNo: string
  taxCardNo: string
  nationalId: string
  address: string
}

export interface KycPayout {
  method: KycPayoutMethod
  bankName: string
  accountName: string
  iban: string
  walletNumber: string
}

export type DnsRecordStatus = 'verified' | 'pending' | 'failed'

export interface EmailDnsRecord {
  id: string
  purpose: 'spf' | 'dkim1' | 'dkim2' | 'dmarc'
  type: 'TXT' | 'CNAME'
  host: string
  value: string
  status: DnsRecordStatus
}

export type SuppressionReason = 'bounced' | 'complained' | 'unsubscribed'

export interface SuppressionEntry {
  id: string
  address: string
  reason: SuppressionReason
  date: string
}

export type BotProvider = 'turnstile' | 'hcaptcha' | 'recaptcha'
export type RateLimitAction = 'block' | 'challenge' | 'throttle'

export interface BotToggles {
  login: boolean
  registration: boolean
  checkout: boolean
  forms: boolean
}

export interface RateLimitRule {
  id: string
  route: string
  limit: number
  windowSec: number
  action: RateLimitAction
}

export interface BlockedEntry {
  id: string
  kind: 'ip' | 'country'
  value: string
  addedAt: string
}

export interface BlockedEvent {
  id: string
  ip: string
  route: string
  reason: 'rate_limit' | 'captcha_failed' | 'blocklist' | 'bot_signature'
  at: string
}

export type DataRequestType = 'export' | 'delete' | 'correct'
export type DataRequestStatus = 'open' | 'processing' | 'completed'

export interface DataRequest {
  id: string
  customer: string
  email: string
  type: DataRequestType
  requestedAt: string
  dueAt: string
  daysLeft: number
  status: DataRequestStatus
}

export interface ConsentEntry {
  id: string
  contact: string
  channel: 'email' | 'sms' | 'whatsapp'
  given: boolean
  source: 'checkout' | 'signup' | 'popup' | 'import'
  at: string
}

export interface Subprocessor {
  id: string
  name: string
  purpose: string
  region: string
}

export interface RetentionSettings {
  orders: string
  customers: string
  logs: string
  abandoned: string
}

export interface LegalDocument {
  key: 'tos' | 'aup' | 'refund'
  version: string
  updatedAt: string
  accepted: boolean
  acceptedBy: string
  acceptedAt: string
}

export interface LegalHistoryEntry {
  id: string
  doc: LegalDocument['key']
  version: string
  acceptedBy: string
  acceptedAt: string
  ip: string
}

export type CustomCodeMode = 'sanitized' | 'sandboxed' | 'disabled'
export type FindingSeverity = 'high' | 'medium' | 'low'
export type FindingAction = 'stripped' | 'sandboxed' | 'review' | 'allowed'

export interface CustomCodeFinding {
  id: string
  page: string
  section: string
  finding: 'inline_script' | 'external_script' | 'iframe' | 'inline_handler' | 'style_only'
  severity: FindingSeverity
  action: FindingAction
}

export interface CspDomains {
  script: string[]
  style: string[]
  frame: string[]
}
