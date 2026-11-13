export type FulfilStatus = 'toPack' | 'packed' | 'shipped' | 'delivered' | 'exception'
export type FulfilCourier = 'bosta' | 'aramex' | 'jt' | 'manual'

export interface FulfilLine {
  sku: string
  name: string
  bin: string
  qty: number
  shippedQty: number
  picked: boolean
}

export interface FulfilPackage {
  id: string
  courier: FulfilCourier
  tracking: string
  weightKg: number
  lengthCm: number
  widthCm: number
  heightCm: number
  lines: { sku: string; qty: number }[]
}

export interface FulfilOrder {
  id: string
  orderId: string
  customer: string
  phone: string
  governorate: string
  address: string
  addressAr: string
  createdAt: string
  status: FulfilStatus
  lines: FulfilLine[]
  packages: FulfilPackage[]
}

export interface FulfilShipmentInput {
  courier: FulfilCourier
  weightKg: number
  lengthCm: number
  widthCm: number
  heightCm: number
  lines: { sku: string; qty: number }[]
}

export type OrderEventType =
  | 'created'
  | 'paid'
  | 'confirmed'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'refund'
  | 'note'

export interface OrderEvent {
  id: string
  type: OrderEventType
  /** Person name, or the literal 'system'. */
  actor: string
  at: string
  note?: string
}

export interface OrderNote {
  id: string
  text: string
  author: string
  at: string
}

export interface RefundLineInput {
  sku: string
  name: string
  qty: number
  unitPrice: number
}

export interface RefundPayload {
  lines: { sku: string; qty: number; amount: number }[]
  shipping: number
  reason: string
  restock: boolean
  total: number
}

export type ExchangeStatus = 'requested' | 'shipped' | 'completed'

export interface FulfilExchange {
  id: string
  orderId: string
  customer: string
  returnedItem: string
  replacementItem: string
  /** Positive = customer pays, negative = refund to customer. */
  priceDiff: number
  status: ExchangeStatus
  createdAt: string
}

export type TrackingState = 'inTransit' | 'outForDelivery' | 'delivered' | 'failedAttempt' | 'refused' | 'rto'

export interface TrackingEvent {
  at: string
  label: string
  location: string
}

export interface FulfilShipment {
  id: string
  orderId: string
  customer: string
  governorate: string
  courier: FulfilCourier
  tracking: string
  state: TrackingState
  attempts: number
  shippedAt: string
  deliveryDays: number | null
  events: TrackingEvent[]
}
