<template>
  <div class="grid grid-cols-1 md:grid-cols-9 gap-10 items-start">
    <!-- Left: Form (6/9 cols) -->
    <checkout-shipping-form v-model="shippingForm" class="md:col-span-6" @continue="$emit('proceed')" />

    <checkout-shipping-summary :items="orderItems" :subtotal="subtotal" :shipping="shippingCost" :vat="vat"
      :total="total" class="md:col-span-3" />
  </div>
</template>

<script lang="ts" setup>
import type { ShippingSummaryItem } from './checkout-shipping-summary.vue'

defineEmits<{ proceed: [] }>()

const shippingForm = ref({
  emailOrPhone: 'terminal@storeos.dev',
  firstName: '',
  lastName: '',
  address: '128 Kinetic Sector',
  city: '',
  governorate: 'Cairo',
  selectedMethod: 'standard',
})

const orderItems: ShippingSummaryItem[] = [
  {
    id: 1,
    name: 'Volt Runner 800',
    meta: 'Size: 42 | Black/Red',
    qty: '01',
    price: '2,400',
    img: '/img/product-03.avif',
  },
  {
    id: 2,
    name: 'Sonic-Pro Wireless',
    meta: 'Carbon Matte',
    qty: '01',
    price: '1,850',
    img: '/img/product-04.avif',
  },
]

const subtotal = '4,250.00'
const shippingCost = computed(() =>
  shippingForm.value.selectedMethod === 'express' ? '60.00' : '30.00'
)
const vatRate = 0.14
const vat = computed(() => {
  const sub = parseFloat(subtotal.replace(',', ''))
  const ship = parseFloat(shippingCost.value)
  return ((sub + ship) * vatRate).toFixed(2)
})
const total = computed(() => {
  const sub = parseFloat(subtotal.replace(',', ''))
  const ship = parseFloat(shippingCost.value)
  const v = parseFloat(vat.value)
  return (sub + ship + v).toLocaleString('en-US', { minimumFractionDigits: 2 })
})
</script>