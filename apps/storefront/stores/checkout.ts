import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('storefront-checkout', () => {
  const steps = ref([
    { id: 'cart', name: 'Cart', icon: 'ph:shopping-bag-fill', active: true },
    { id: 'shipping', name: 'Shipping & Payment', icon: 'ph:truck', active: false },
    { id: 'order-tracking', name: 'Order Tracking', icon: 'ph:map-pin-line', active: false },
  ])

  const showConfirmation = ref(false)

  const activeStep = computed(() => steps.value.find(s => s.active)?.id ?? 'cart')

  function setActiveStep(id: string) {
    steps.value = steps.value.map(s => ({ ...s, active: s.id === id }))
  }

  function onProceed() {
    setActiveStep('shipping')
  }

  function onSubmitOrder() {
    showConfirmation.value = true
    setTimeout(() => {
      showConfirmation.value = false
      setActiveStep('order-tracking')
    }, 3000)
  }

  function resetCheckout() {
    setActiveStep('cart')
    showConfirmation.value = false
  }

  return { steps, showConfirmation, activeStep, setActiveStep, onProceed, onSubmitOrder, resetCheckout }
})
