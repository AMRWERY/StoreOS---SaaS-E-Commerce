import type { AuditEntry } from '@/types/platformTools'

export const useActivityLogStore = defineStore('activityLog', () => {
  const entries = ref<AuditEntry[]>([
    { id: 'EVT-5012', actor: 'Amr Mohamed', action: 'order_status', category: 'orders', resource: 'ORD-8841', ip: '41.33.120.18', at: '2026-11-12 09:41', before: { status: 'pending' }, after: { status: 'confirmed' } },
    { id: 'EVT-5011', actor: 'Salma Ibrahim', action: 'product_price', category: 'products', resource: 'Linen Shirt', ip: '156.197.44.9', at: '2026-11-12 09:12', before: { price: '650', compareAt: '-' }, after: { price: '590', compareAt: '650' } },
    { id: 'EVT-5010', actor: 'Amr Mohamed', action: 'refund_issued', category: 'payments', resource: 'ORD-8790', ip: '41.33.120.18', at: '2026-11-11 18:30', before: { refunded: '0' }, after: { refunded: '890' } },
    { id: 'EVT-5009', actor: 'Amr Mohamed', action: 'staff_role', category: 'staff', resource: 'Youssef Nabil', ip: '41.33.120.18', at: '2026-11-11 16:05', before: { role: 'viewer' }, after: { role: 'support' } },
    { id: 'EVT-5008', actor: 'Youssef Nabil', action: 'product_created', category: 'products', resource: 'Leather Wallet', ip: '197.55.210.76', at: '2026-11-10 13:48', before: null, after: { title: 'Leather Wallet', price: '420', status: 'draft' } },
    { id: 'EVT-5007', actor: 'Amr Mohamed', action: 'store_settings', category: 'settings', resource: 'Store info', ip: '41.33.120.18', at: '2026-11-09 11:20', before: { currency: 'USD' }, after: { currency: 'EGP' } },
    { id: 'EVT-5006', actor: 'Salma Ibrahim', action: 'order_cancelled', category: 'orders', resource: 'ORD-8702', ip: '156.197.44.9', at: '2026-11-08 20:14', before: { status: 'confirmed' }, after: { status: 'cancelled' } },
    { id: 'EVT-5005', actor: 'Amr Mohamed', action: 'gateway_connected', category: 'payments', resource: 'Paymob', ip: '41.33.120.18', at: '2026-11-07 10:02', before: { gateway: 'off' }, after: { gateway: 'on' } },
  ])
  return { entries }
})
