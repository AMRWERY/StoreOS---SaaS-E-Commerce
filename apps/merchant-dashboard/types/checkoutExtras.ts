export type OfferKind = 'bump' | 'post_purchase'
export type OfferTriggerType = 'product' | 'collection' | 'cart_value'
export type OfferDiscountType = 'percent' | 'fixed'
export type OfferPlacement = 'in_checkout' | 'thank_you'

export interface ChkCatalogItem {
  value: string
  label: string
  price: number
}

export interface CheckoutOffer {
  id: string
  name: string
  kind: OfferKind
  triggerType: OfferTriggerType
  /** Product/collection label, or the minimum cart value as a string. */
  trigger: string
  offeredProductId: string
  discountType: OfferDiscountType
  discountValue: number
  placement: OfferPlacement
  views: number
  conversions: number
  revenue: number
  enabled: boolean
}

export type PaymentLinkStatus = 'active' | 'expired' | 'disabled'
export type PaymentLinkAmountMode = 'fixed' | 'open'

export interface PaymentLink {
  id: string
  name: string
  amountMode: PaymentLinkAmountMode
  amount: number
  product: string
  url: string
  uses: number
  oneTime: boolean
  expiresAt: string
  note: string
  status: PaymentLinkStatus
}

export type WalletProviderKind = 'express' | 'wallet' | 'bnpl'
export type WalletConnection = 'connected' | 'not_connected' | 'pending'

export interface WalletProvider {
  id: string
  kind: WalletProviderKind
  icon: string
  connection: WalletConnection
  enabled: boolean
  minAmount: number
  maxAmount: number
  /** Fee percentage charged per transaction. */
  feePercent: number
  /** Available installment plans (months); BNPL only. */
  plans: number[]
  enabledPlans: number[]
}

export type CheckoutFieldType = 'text' | 'textarea' | 'select' | 'checkbox'
export type CheckoutFieldPlacement = 'contact' | 'shipping' | 'payment' | 'notes'

export interface CheckoutField {
  id: string
  labelEn: string
  labelAr: string
  type: CheckoutFieldType
  required: boolean
  placement: CheckoutFieldPlacement
  codOnly: boolean
  enabled: boolean
  options: string[]
}

export type SaleStatus = 'scheduled' | 'live' | 'ended'

export interface FlashSale {
  id: string
  name: string
  start: string
  end: string
  discountPercent: number
  status: SaleStatus
}

export interface ReadinessItem {
  id: string
  done: boolean
}
