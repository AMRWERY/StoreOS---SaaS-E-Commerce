import type { EcoAppItem } from '@/types/ecosystem'

export const useEcoAppsStore = defineStore('ecoApps', () => {
  const categories = ['marketing', 'shipping', 'payments', 'analytics', 'support']
  const apps = ref<EcoAppItem[]>([
    { id: 'mailpilot', name: 'MailPilot', developer: 'Nile Labs', rating: 4.7, price: 0, category: 'marketing', icon: 'ph:envelope-simple-bold', installed: true, scopes: ['readCustomers', 'writeCustomers'] },
    { id: 'bosta', name: 'Bosta Connect', developer: 'Bosta', rating: 4.5, price: 199, category: 'shipping', icon: 'ph:truck-bold', installed: false, scopes: ['readOrders', 'writeOrders'] },
    { id: 'paymob', name: 'Paymob Gateway', developer: 'Paymob', rating: 4.8, price: 0, category: 'payments', icon: 'ph:credit-card-bold', installed: true, scopes: ['readOrders', 'writePayments'] },
    { id: 'insightly', name: 'Insightly', developer: 'Cairo Data Co.', rating: 4.2, price: 349, category: 'analytics', icon: 'ph:chart-line-up-bold', installed: false, scopes: ['readOrders', 'readProducts', 'readCustomers'] },
    { id: 'helpdesk', name: 'HelpDesk Chat', developer: 'Zahra Apps', rating: 4.4, price: 120, category: 'support', icon: 'ph:chats-circle-bold', installed: false, scopes: ['readCustomers', 'readOrders'] },
    { id: 'smsegypt', name: 'SMS Egypt', developer: 'Vodacom Tech', rating: 4.0, price: 0, category: 'marketing', icon: 'ph:chat-text-bold', installed: false, scopes: ['readCustomers'] },
  ])

  function install(id: string) {
    const a = apps.value.find((x) => x.id === id)
    if (a) a.installed = true
  }
  function uninstall(id: string) {
    const a = apps.value.find((x) => x.id === id)
    if (a) a.installed = false
  }

  return { categories, apps, install, uninstall }
})
