import type { PolicyKey, StorePolicy } from '@/types/storeContent'

export const POLICY_TEMPLATES: Record<PolicyKey, string> = {
  privacy:
    'We collect your name, phone number (+20 format), delivery address and order history only to fulfil your orders and support you. We never sell your data. Payment card details are handled by our payment provider and are not stored on our servers. You may ask us to delete your data at any time by contacting us.',
  refund:
    'You can return most items within 14 days of delivery if they are unused and in original packaging. Refunds for prepaid orders go back to the original payment method within 7 business days. For Cash on Delivery (COD) orders, refunds are issued by bank transfer or mobile wallet after we receive the returned item.',
  shipping:
    'We deliver across all Egyptian governorates. Cairo and Giza usually take 1-2 business days, other governorates 3-5 business days. Cash on Delivery (COD) is available in selected areas; please keep the exact amount ready for the courier. Orders can be refused at the door if the courier is not allowed to open the package.',
  terms:
    'By placing an order you agree to provide accurate delivery details and a reachable phone number. Prices are in Egyptian pounds (EGP) and include 14% VAT where applicable. We may cancel orders that cannot be confirmed by phone, especially Cash on Delivery (COD) orders. These terms are governed by the laws of the Arab Republic of Egypt.',
}

export const useStorePoliciesStore = defineStore('storePolicies', () => {
  const policies = ref<StorePolicy[]>([
    { key: 'privacy', body: POLICY_TEMPLATES.privacy, published: true, updatedAt: '2026-10-20' },
    { key: 'refund', body: POLICY_TEMPLATES.refund, published: true, updatedAt: '2026-10-20' },
    { key: 'shipping', body: '', published: false, updatedAt: '-' },
    { key: 'terms', body: POLICY_TEMPLATES.terms, published: false, updatedAt: '2026-09-02' },
  ])

  function get(key: PolicyKey): StorePolicy {
    return policies.value.find((p) => p.key === key) ?? policies.value[0]!
  }
  function generate(key: PolicyKey) {
    const p = get(key)
    p.body = POLICY_TEMPLATES[key]
    p.updatedAt = new Date().toISOString().slice(0, 10)
  }
  function save(key: PolicyKey) {
    get(key).updatedAt = new Date().toISOString().slice(0, 10)
  }

  return { policies, get, generate, save }
})
