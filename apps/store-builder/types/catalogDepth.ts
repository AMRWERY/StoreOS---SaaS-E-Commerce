export type MetafieldType = 'text' | 'number' | 'date' | 'boolean' | 'file' | 'list'
export type MetafieldOwner = 'products' | 'collections' | 'customers'

export interface CatxMetafield {
  id: string
  name: string
  namespace: string
  key: string
  type: MetafieldType
  owner: MetafieldOwner
  required: boolean
}

export interface CatxMetafieldValue {
  id: string
  product: string
  metafieldId: string
  value: string
}

export type CatxProductStatus = 'active' | 'draft' | 'archived'

export interface CatxBulkRow {
  id: string
  title: string
  sku: string
  price: number
  compareAt: number
  stock: number
  status: CatxProductStatus
  tags: string
}

export type CatxEditableField = 'title' | 'sku' | 'price' | 'compareAt' | 'stock' | 'status' | 'tags'

export type ScheduleAction = 'publish' | 'unpublish'
export type ScheduleStatus = 'pending' | 'done' | 'cancelled'
export type ScheduleChannel = 'online' | 'pos' | 'all'

export interface CatxScheduledChange {
  id: string
  product: string
  action: ScheduleAction
  at: string
  channel: ScheduleChannel
  status: ScheduleStatus
}

export interface CatxDigitalProduct {
  id: string
  product: string
  files: number
  downloadLimit: number
  expiryHours: number
  licenseKeys: boolean
}

export interface CatxDownload {
  id: string
  product: string
  customer: string
  at: string
  ip: string
}

export type PlanInterval = 'weekly' | 'monthly' | 'quarterly'
export type SubscriberStatus = 'active' | 'paused' | 'cancelled'

export interface CatxSellingPlan {
  id: string
  name: string
  interval: PlanInterval
  discount: number
  products: number
  subscribers: number
  price: number
}

export interface CatxSubscriber {
  id: string
  customer: string
  planId: string
  nextBilling: string
  status: SubscriberStatus
}

export type SeoField = 'title' | 'description' | 'handle' | 'image'

export interface CatxSeoAuditRow {
  id: string
  title: string
  score: number
  missing: SeoField[]
}

export type PreorderMode = 'preorder' | 'backorder'
export type PreorderStatus = 'active' | 'paused' | 'ended'

export interface CatxPreorderItem {
  id: string
  product: string
  mode: PreorderMode
  limit: number
  sold: number
  expectedDate: string
  status: PreorderStatus
}

export type WaitlistChannel = 'email' | 'whatsapp'

export interface CatxWaitlistEntry {
  id: string
  product: string
  variant: string
  lastRequest: string
  notified: boolean
}

export interface CatxWaitlistSubscriber {
  id: string
  entryId: string
  contact: string
  channel: WaitlistChannel
}

export interface CatxCreditBalance {
  id: string
  customer: string
  balance: number
  lastActivity: string
}

export interface CatxCreditLedgerRow {
  id: string
  date: string
  customer: string
  type: 'add' | 'deduct'
  amount: number
  balanceAfter: number
  actor: string
}

export type DuplicateReason = 'phone' | 'email' | 'name_address'
export type DuplicateStatus = 'open' | 'merged' | 'dismissed'
export type DuplicateField = 'name' | 'email' | 'phone' | 'address'

export interface CatxDupCustomer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  orders: number
  spent: number
}

export interface CatxDuplicateGroup {
  id: string
  reason: DuplicateReason
  confidence: number
  status: DuplicateStatus
  records: [CatxDupCustomer, CatxDupCustomer]
}

export type CatxTagColor = 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'purple'

export interface CatxCustomerTag {
  id: string
  name: string
  color: CatxTagColor
  customers: number
}

export interface CatxCustomerNote {
  id: string
  customer: string
  note: string
  author: string
  date: string
}

export type CatxJobKind = 'import' | 'export'
export type CatxJobStatus = 'done' | 'processing' | 'failed'

export interface CatxCustomerJob {
  id: string
  kind: CatxJobKind
  file: string
  rows: number
  date: string
  status: CatxJobStatus
}

export interface CatxImportError {
  id: string
  row: number
  field: string
  reason: 'invalid_email' | 'invalid_phone' | 'missing_name' | 'duplicate'
}
