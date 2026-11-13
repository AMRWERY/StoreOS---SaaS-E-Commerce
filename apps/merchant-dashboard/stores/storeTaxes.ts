import type { TaxRegionOverride } from '@/types/storeContent'

export const useStoreTaxesStore = defineStore('storeTaxes', () => {
  const vatEnabled = ref(true)
  const defaultRate = ref(14)
  const pricesIncludeTax = ref(true)
  const overrides = ref<TaxRegionOverride[]>([
    { id: 'r1', region: 'Greater Cairo', governorates: 'Cairo, Giza, Qalyubia', rate: 14 },
    { id: 'r2', region: 'Free zones', governorates: 'Port Said, Suez', rate: 0 },
    { id: 'r3', region: 'Upper Egypt', governorates: 'Aswan, Luxor, Qena', rate: 14 },
  ])
  const exemptCategories = ref<{ id: string; exempt: boolean }[]>([
    { id: 'books', exempt: true },
    { id: 'basicFood', exempt: true },
    { id: 'medicine', exempt: false },
    { id: 'apparel', exempt: false },
  ])

  function removeOverride(id: string) {
    overrides.value = overrides.value.filter((o) => o.id !== id)
  }
  function addOverride() {
    overrides.value.push({ id: `r${Date.now()}`, region: 'New region', governorates: 'Alexandria', rate: 14 })
  }

  return { vatEnabled, defaultRate, pricesIncludeTax, overrides, exemptCategories, removeOverride, addOverride }
})
