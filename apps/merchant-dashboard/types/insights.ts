export type FunnelStepKey = 'sessions' | 'productViews' | 'addToCart' | 'checkout' | 'purchase'
export interface FunnelStep {
  key: FunnelStepKey
  count: number
}
export type AbandonStageKey = 'contact' | 'shipping' | 'payment' | 'review'
export interface AbandonStage {
  key: AbandonStageKey
  count: number
}

export interface CohortRow {
  cohort: string
  size: number
  /** Retention % by months since first order (M0 = 100). Shorter arrays = cohort too recent. */
  retention: number[]
  ltv: number
}

export interface AttributionRow {
  source: string
  medium: string
  sessions: number
  orders: number
  revenue: number
  spend: number
}
export type CampaignStatus = 'active' | 'paused' | 'ended'
export interface CampaignRow {
  id: string
  name: string
  channel: string
  spend: number
  revenue: number
  orders: number
  status: CampaignStatus
}

export type ReportMetric = 'revenue' | 'orders' | 'aov' | 'sessions' | 'conversion'
export type ReportDimension = 'channel' | 'city' | 'payment'
export type ReportRange = '7d' | '30d' | '90d'
export type ReportView = 'chart' | 'table'
export type ReportFormat = 'csv' | 'pdf'
export type ReportFrequency = 'daily' | 'weekly' | 'monthly'

export interface SavedReport {
  id: string
  name: string
  metrics: ReportMetric[]
  dimension: ReportDimension
  range: ReportRange
  view: ReportView
  updatedAt: string
}
export interface ScheduledReport {
  id: string
  name: string
  frequency: ReportFrequency
  recipients: string[]
  format: ReportFormat
  status: 'active' | 'paused'
  nextRun: string
}

export type ChannelKey = 'google' | 'meta' | 'tiktok' | 'whatsapp' | 'noon' | 'jumia'
export type ChannelStatus = 'connected' | 'disconnected' | 'error'
export interface SalesChannel {
  key: ChannelKey
  name: string
  icon: string
  status: ChannelStatus
  products: number
  lastSync: string | null
  errors: number
  publish: { products: boolean; inventory: boolean; prices: boolean }
}
export type FeedIssueKey =
  | 'missingGtin'
  | 'imageSmall'
  | 'priceMismatch'
  | 'missingCategory'
  | 'noStock'
  | 'shortTitle'
export type Severity = 'error' | 'warning' | 'info'
export interface FeedIssue {
  id: string
  product: string
  channel: ChannelKey
  issue: FeedIssueKey
  severity: Severity
}

export type InboxChannel = 'whatsapp' | 'messenger' | 'instagram'
export interface InboxMessage {
  id: string
  kind: 'customer' | 'agent' | 'draft'
  text: string
  time: string
  draftId?: string
}
export interface InboxOrder {
  id: string
  total: number
  status: 'delivered' | 'shipped' | 'processing'
}
export interface InboxConversation {
  id: string
  customer: string
  channel: InboxChannel
  phone: string
  unread: boolean
  time: string
  orders: InboxOrder[]
  messages: InboxMessage[]
}
export interface InboxProduct {
  id: string
  name: string
  price: number
}

export type PayoutStatus = 'paid' | 'inTransit' | 'failed'
export interface Payout {
  id: string
  date: string
  amount: number
  orders: number
  fees: number
  status: PayoutStatus
}
export interface FeeStatement {
  id: string
  period: string
  gmv: number
  fee: number
  issuedAt: string
}

export type InvoiceStatus = 'paid' | 'failed' | 'due'
export interface SubscriptionInvoice {
  id: string
  period: string
  /** Net amount before VAT (EGP). */
  net: number
  status: InvoiceStatus
  issuedAt: string
}

/** All 22 Arab League markets — mirrors ARAB_MARKETS in layers/core/utils/currencies.ts. */
export type MarketCode =
  | 'EG' | 'SA' | 'AE' | 'KW' | 'QA' | 'BH' | 'OM' | 'JO' | 'LB' | 'SY' | 'IQ'
  | 'YE' | 'PS' | 'LY' | 'TN' | 'DZ' | 'MA' | 'MR' | 'SD' | 'SO' | 'DJ' | 'KM'
export type RatePolicy = 'auto' | 'manual'
export type RoundingRule = 'none' | 'whole' | 'five' | 'ninetyNine'
export type DomainStrategy = 'domain' | 'subfolder' | 'subdomain'
export type MarketShipping = 'bosta' | 'aramex' | 'dhl' | 'pickup'
export type MarketPayment = 'cod' | 'card' | 'fawry' | 'wallet' | 'mada' | 'applePay'
export interface Market {
  code: MarketCode
  primary: boolean
  currency: string
  language: 'ar' | 'en'
  ratePolicy: RatePolicy
  /** 1 EGP = rate x currency. */
  rate: number
  rounding: RoundingRule
  domainStrategy: DomainStrategy
  domain: string
  shipping: MarketShipping[]
  payment: MarketPayment[]
}
export interface PriceListProduct {
  id: string
  name: string
  base: number
}
