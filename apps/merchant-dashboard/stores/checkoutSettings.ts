export const EG_GOVERNORATES = [
  'cairo', 'giza', 'alexandria', 'qalyubia', 'sharqia', 'dakahlia', 'gharbia', 'monufia',
  'beheira', 'portSaid', 'suez', 'ismailia', 'faiyum', 'minya', 'assiut', 'sohag',
  'qena', 'luxor', 'aswan',
]

export const useCheckoutSettingsStore = defineStore('checkoutSettings', () => {
  const requireGovernorate = ref(true)
  const requireCity = ref(true)
  const requireArea = ref(true)
  const landmarkField = ref(true)
  const mapPin = ref(false)
  const normalizePhone = ref(true)
  const guestCheckout = ref(true)
  const codConfirmation = ref(true)
  const maxCod = ref('5000')
  const depositHighRisk = ref(true)
  const depositPercent = ref('20')
  const allowedGovernorates = ref<string[]>(EG_GOVERNORATES.slice(0, 12))

  function toggleGovernorate(g: string) {
    allowedGovernorates.value = allowedGovernorates.value.includes(g)
      ? allowedGovernorates.value.filter((x) => x !== g)
      : [...allowedGovernorates.value, g]
  }
  function normalize(raw: string) {
    const d = raw.replace(/\D/g, '')
    if (!d) return ''
    if (d.startsWith('0020')) return '+20' + d.slice(4)
    if (d.startsWith('20') && d.length >= 12) return '+' + d
    if (d.startsWith('0')) return '+20' + d.slice(1)
    return '+20' + d
  }

  return {
    requireGovernorate, requireCity, requireArea, landmarkField, mapPin, normalizePhone, guestCheckout,
    codConfirmation, maxCod, depositHighRisk, depositPercent, allowedGovernorates,
    toggleGovernorate, normalize,
  }
})
