interface StorefrontNotification {
    id: number
    category: string
    title: string
    message: string
    time: string
    icon: string
    iconColor: string
    bgColor: string
    read: boolean
    type: 'orders' | 'security' | 'all'
}