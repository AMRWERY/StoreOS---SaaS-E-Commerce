import { MOCK_ORDERS } from '@/data/shop-data'
import type { ShopAddress, ShopOrder } from '@/types/shop'

export interface ShopUser {
  name: string
  email: string
  phone: string
}

const DEMO_ADDRESSES: ShopAddress[] = [
  { id: 'a1', label: 'Home', name: 'Sara Ahmed', phone: '01012345678', governorate: 'cairo', city: 'nasr-city', area: 'hay-sabaa', street: '12 Makram Ebeid St, Apt 5', landmark: 'Next to City Stars mall', isDefault: true },
  { id: 'a2', label: 'Work', name: 'Sara Ahmed', phone: '01012345678', governorate: 'giza', city: 'sheikh-zayed', area: 'beverly-hills', street: 'Building 7, Office 301', landmark: 'Opposite the Arkan plaza', isDefault: false },
]

// In-memory only: there is no backend yet, so login just flips a flag.
export const useShopAccountStore = defineStore('shop-account', () => {
  const isAuthenticated = ref(false)
  const user = ref<ShopUser | null>(null)
  const orders = ref<ShopOrder[]>([])
  const addresses = ref<ShopAddress[]>([])

  function login(email: string) {
    isAuthenticated.value = true
    user.value = { name: 'Sara Ahmed', email, phone: '01012345678' }
    orders.value = MOCK_ORDERS.map(o => ({ ...o }))
    addresses.value = DEMO_ADDRESSES.map(a => ({ ...a }))
  }

  function register(name: string, email: string, phone: string) {
    isAuthenticated.value = true
    user.value = { name, email, phone }
    orders.value = []
    addresses.value = []
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    orders.value = []
    addresses.value = []
  }

  function updateProfile(patch: Partial<ShopUser>) {
    if (user.value) user.value = { ...user.value, ...patch }
  }

  function saveAddress(address: Omit<ShopAddress, 'id'> & { id?: string }) {
    const id = address.id ?? `a${Date.now()}`
    const entry = { ...address, id } as ShopAddress
    if (entry.isDefault || !addresses.value.length) {
      entry.isDefault = true
      addresses.value = addresses.value.map(a => ({ ...a, isDefault: false }))
    }
    const idx = addresses.value.findIndex(a => a.id === id)
    if (idx >= 0) addresses.value.splice(idx, 1, entry)
    else addresses.value.push(entry)
  }

  function removeAddress(id: string) {
    addresses.value = addresses.value.filter(a => a.id !== id)
  }

  function addOrder(order: ShopOrder) {
    orders.value = [order, ...orders.value]
  }

  return { isAuthenticated, user, orders, addresses, login, register, logout, updateProfile, saveAddress, removeAddress, addOrder }
})
