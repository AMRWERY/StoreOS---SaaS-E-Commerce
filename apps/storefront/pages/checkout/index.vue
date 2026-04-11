<template>
  <div class="min-h-screen bg-[#08080E] text-[#F0F0FF] selection:bg-[#6366F1]/30">
    <div class="max-w-[1400px] mx-auto px-4 md:px-10 py-8">

      <div class="flex gap-6 items-start">

        <!-- Sidebar Nav -->
        <checkout-nav :steps="steps" @step-click="setActiveStep" />

        <!-- Step Content -->
        <div class="flex-1 min-w-0">

          <!-- Cart -->
          <template v-if="activeStep === 'cart'">
            <div class="flex flex-col md:flex-row gap-6 items-start">
              <checkout-cart-items class="flex-1 min-w-0" :items="cartItems" @update-qty="updateQty"
                @remove-item="removeItem" />
              <checkout-order-summary class="w-full md:w-80 shrink-0" :subtotal="subtotal" :total="total"
                @proceed="onProceed" />
            </div>
          </template>

          <!-- Shipping & Payment -->
          <template v-else-if="activeStep === 'shipping'">
            <checkout-shipping @proceed="onSubmitOrder" />
          </template>

          <!-- Order Tracking -->
          <template v-else-if="activeStep === 'order-tracking'">
            <checkout-order-tracking />
          </template>

        </div>
      </div>

      <!-- Footer -->
      <footer
        class="mt-16 pt-8 border-t border-[#1C1C30] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black tracking-[0.3em] text-[#262640]">
        <p>Node: Operational.</p>
        <div class="flex gap-8">
          <nuxt-link-locale to="/privacy" class="hover:text-[#6366F1] transition-colors">Privacy</nuxt-link-locale>
          <nuxt-link-locale to="/terms" class="hover:text-[#6366F1] transition-colors">Terms</nuxt-link-locale>
          <a href="#" class="hover:text-[#6366F1] transition-colors">Security</a>
        </div>
      </footer>
    </div>

    <!-- Order Confirmation overlay (3s) -->
    <order-confirmation v-if="showConfirmation" />
  </div>
</template>

<script lang="ts" setup>
const steps = ref([
  { id: 'cart', name: 'Cart', icon: 'ph:shopping-bag-fill', active: true },
  { id: 'shipping', name: 'Shipping & Payment', icon: 'ph:truck', active: false },
  { id: 'order-tracking', name: 'Order Tracking', icon: 'ph:map-pin-line', active: false },
])

const activeStep = computed(() => steps.value.find(s => s.active)?.id ?? 'cart')
const showConfirmation = ref(false)

const cartItems = ref([
  { id: 1, name: 'Vector Runner Pro', meta: 'Color: Carbon Red / Size: 42', price: 189.00, quantity: 1, image: '/img/product-05.avif' },
  { id: 2, name: 'Chrono Series X', meta: 'Variant: Midnight Steel', price: 299.00, quantity: 2, image: '/img/product-06.avif' },
  { id: 3, name: 'Sonic Bloom Headset', meta: 'Color: Obsidian Black', price: 299.00, quantity: 1, image: '/img/product-07.avif' },
])

const subtotal = computed(() => cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0))
const total = computed(() => subtotal.value)

const setActiveStep = (id: string) => {
  steps.value = steps.value.map(s => ({ ...s, active: s.id === id }))
}

const onSubmitOrder = () => {
  showConfirmation.value = true
  setTimeout(() => {
    showConfirmation.value = false
    setActiveStep('order-tracking')
  }, 3000)
}

const updateQty = (id: number, delta: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) item.quantity = Math.max(1, item.quantity + delta)
}
const removeItem = (id: number) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}
const onProceed = () => setActiveStep('shipping')

useSeoMeta({
  title: 'Checkout',
  robots: 'noindex, nofollow',
  description: 'Checkout page'
})
</script>