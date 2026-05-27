export type Plan = 'trial' | 'free' | 'starter' | 'growth' | 'enterprise'

export interface PlanConfig {
  label: string
  color: string
  maxOrders: number | null
  maxSkus: number | null
  maxMembers: number | null
  features: string[]
}