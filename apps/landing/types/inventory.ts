export interface StockItem {
    id: number
    name: string
    sku: string
    category: string
    current: number
    incoming: number
    threshold: number
    lastUpdated: string
    image: string
}

export interface HistoryLog {
    id: number
    date: string
    product: string
    type: string
    change: number
    newStock: number
    reason: string
    staff: string
}