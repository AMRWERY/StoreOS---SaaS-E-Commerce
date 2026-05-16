export interface Order {
    id: number
    customer: string
    phone: string
    initials: string
    avatarBg: string
    itemsCount: number
    total: string
    paymentStatus: string
    orderStatus: string
    time: string
    active: boolean
}