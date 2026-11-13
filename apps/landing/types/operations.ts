export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

export interface Collection {
  id: string
  title: string
  type: 'manual' | 'automated'
  products: number
  rule?: string
  status: 'active' | 'draft'
  updatedAt: string
}

export interface VariantOption {
  name: string
  values: string[]
}

export interface ProductVariant {
  id: string
  title: string
  sku: string
  price: number
  compareAt: number | null
  stock: number
}

export type ReturnStatus = 'requested' | 'approved' | 'received' | 'refunded' | 'rejected'

export interface ReturnRequest {
  id: string
  orderId: string
  customer: string
  reason: 'damaged' | 'wrong_item' | 'not_as_described' | 'changed_mind'
  items: number
  amount: number
  status: ReturnStatus
  createdAt: string
}

export interface GiftCard {
  code: string
  recipient: string
  initial: number
  balance: number
  status: 'active' | 'redeemed' | 'expired' | 'disabled'
  expiresAt: string
}

export type CodConfirmationStatus = 'pending' | 'confirmed' | 'no_answer' | 'refused'

export interface CodConfirmation {
  orderId: string
  customer: string
  phone: string
  governorate: string
  amount: number
  attempts: number
  channel: 'call' | 'whatsapp' | 'sms'
  status: CodConfirmationStatus
  risk: 'low' | 'medium' | 'high'
}

export interface CodRemittance {
  id: string
  courier: string
  orders: number
  collected: number
  fees: number
  status: 'pending' | 'settled' | 'disputed'
  date: string
}

export interface BlockedContact {
  id: string
  phone: string
  reason: 'refused_parcels' | 'fake_orders' | 'merchant_blocked'
  refusals: number
  addedAt: string
}

export type DraftOrderStatus = 'open' | 'invoice_sent' | 'completed'

export interface DraftOrder {
  id: string
  customer: string
  items: number
  total: number
  status: DraftOrderStatus
  createdAt: string
}

export interface AbandonedCheckout {
  id: string
  customer: string
  contact: string
  items: number
  total: number
  stage: 'cart' | 'shipping' | 'payment'
  recovered: boolean
  abandonedAt: string
}

export interface ChecklistTask {
  id: string
  group: 'store' | 'payments' | 'shipping' | 'launch'
  done: boolean
  to: string
}
