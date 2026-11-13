import type { OrderMessageKey, WaTemplate } from '@/types/platformTools'

export const useWhatsappBusinessStore = defineStore('whatsappBusiness', () => {
  const connected = ref(true)
  const phone = ref('+20 100 555 0142')
  const templates = ref<WaTemplate[]>([
    { id: 'tpl-1', name: 'order_confirmation', category: 'utility', language: 'en', status: 'approved', body: 'Hi {{1}}, your order {{2}} is confirmed. Total: {{3}} EGP.' },
    { id: 'tpl-2', name: 'order_confirmation_ar', category: 'utility', language: 'ar', status: 'approved', body: 'أهلاً {{1}}، تم تأكيد طلبك {{2}}. الإجمالي: {{3}} جنيه.' },
    { id: 'tpl-3', name: 'shipping_update', category: 'utility', language: 'en', status: 'pending', body: 'Your order {{1}} is on its way with {{2}}.' },
    { id: 'tpl-4', name: 'black_friday_offer', category: 'marketing', language: 'ar', status: 'rejected', body: 'خصم ٣٠٪ على كل المنتجات لمدة ٤٨ ساعة فقط!' },
  ])
  const orderMessages = ref<Record<OrderMessageKey, boolean>>({
    confirmed: true,
    shipped: true,
    outForDelivery: false,
    delivered: true,
  })
  const stats = { optedInRate: 78, messagesSent: 3420, conversationCost: 1865 }

  function addTemplate(tpl: Omit<WaTemplate, 'id' | 'status'>) {
    templates.value.unshift({ ...tpl, id: `tpl-${Date.now()}`, status: 'pending' })
  }

  return { connected, phone, templates, orderMessages, stats, addTemplate }
})
