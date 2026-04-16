export interface ReviewItem {
    id: number
    name: string
    meta: string
    qty: string
    price: string
    img: string
}

export interface TrackerStep {
    label: string
    status: 'completed' | 'active' | 'pending'
}

export interface OrderSummary {
    subtotal: string
    shipping: string
    tax: string
    total: string
}

export interface ShippingAddress {
    name: string
    line1: string
    line2: string
    postcode: string
}

export interface ShippingSummaryItem {
    id: number
    name: string
    meta: string
    qty: string
    price: string
    img: string
}