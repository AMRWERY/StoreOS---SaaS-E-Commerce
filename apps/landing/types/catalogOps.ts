export type SegmentField = 'total_spent' | 'orders_count' | 'city' | 'last_order_days' | 'accepts_marketing'
export type SegmentOperator = 'gt' | 'lt' | 'eq'

export interface SegmentRule {
  field: SegmentField
  operator: SegmentOperator
  value: string
}

export interface CustomerSegment {
  id: string
  name: string
  rules: SegmentRule[]
  customers: number
  status: 'active' | 'draft'
}

export type AutoDiscountType = 'percentage' | 'fixed' | 'free_shipping' | 'bxgy'
export type AutoDiscountEligibility = 'all' | 'segment' | 'min_subtotal'

export interface AutoDiscount {
  id: string
  name: string
  type: AutoDiscountType
  value: number
  eligibility: AutoDiscountEligibility
  combinable: boolean
  startsAt: string
  endsAt: string
  status: 'active' | 'scheduled' | 'expired' | 'draft'
}

export type ImportJobKind = 'import' | 'export'

export interface ImportExportJob {
  id: string
  kind: ImportJobKind
  file: string
  rows: number
  status: 'completed' | 'failed' | 'processing'
  createdAt: string
}

export interface ImportIssue {
  row: number
  field: string
  error: 'required' | 'invalid_price' | 'duplicate_sku' | 'invalid_stock'
}

export type PurchaseOrderStatus = 'draft' | 'ordered' | 'partial' | 'received'

export interface PurchaseOrder {
  id: string
  supplier: string
  expectedAt: string
  items: number
  total: number
  status: PurchaseOrderStatus
}

export interface Supplier {
  id: string
  name: string
  contact: string
  phone: string
  city: string
  leadDays: number
  status: 'active' | 'inactive'
}

export type TransferStatus = 'draft' | 'in_transit' | 'received'

export interface StockTransfer {
  id: string
  from: string
  to: string
  items: number
  status: TransferStatus
  createdAt: string
}
