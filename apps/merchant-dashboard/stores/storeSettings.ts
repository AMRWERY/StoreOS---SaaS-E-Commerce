import type { StoreData } from '@/types/store-settings'

export const useStoreSettingsStore = defineStore('storeSettings', () => {
  const storeData = ref<StoreData>({
    name: 'Hyperlink Aesthetics',
    legalName: '',
    description: 'Premium curation of archival techwear and kinetic accessories. Shipping worldwide from Tokyo.',
    systemUrl: 'storeos.app/hyperlink-aesthetics',
    customDomain: '',
    supportEmail: 'ops@hyperlink.com',
    phone: '+81 03-1234-5678',
    address: 'Shibuya Scramble Square, 1-24-12 Shibuya',
    city: 'Tokyo',
    state: 'Shibuya-ku',
    zip: '150-0002',
    country: 'Japan',
    currency: 'JPY (¥) - Japanese Yen',
    timezone: '(GMT+09:00) Tokyo',
    unitSystem: 'Metric',
    language: 'English (International)'
  })

  function saveSettings() {
    console.log('Saving settings...', storeData.value)
  }

  return { storeData, saveSettings }
})
