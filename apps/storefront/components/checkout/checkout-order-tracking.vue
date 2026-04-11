<template>
  <div class="flex-1 min-w-0 space-y-10">
    <!-- Two-column layout: details + sidebar -->
    <div class="flex flex-col md:flex-row gap-6 items-start">
      <checkout-review-details class="flex-1 min-w-0" :order-id="orderId" :estimated-delivery="estimatedDelivery"
        :items="orderItems" :tracker-steps="trackerSteps" />
      <checkout-review-sidebar class="w-full md:w-80 shrink-0" :summary="summary" :address="shippingAddress"
        last-four="8219" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ReviewItem, TrackerStep } from './checkout-review-details.vue'
import type { OrderSummary, ShippingAddress } from './checkout-review-sidebar.vue'

const orderId = 'ORD-7721'
const estimatedDelivery = 'Oct 24 – Oct 26, 2024'

const orderItems: ReviewItem[] = [
  {
    id: 1,
    name: 'Aero-Step Pro V2',
    meta: 'Size: 10.5 | Midnight Crimson',
    qty: '01',
    price: '189.00',
    img: '/img/product-01.avif',
  },
  {
    id: 2,
    name: 'Titan Watch OS Edition',
    meta: '44mm | Titanium Silver',
    qty: '01',
    price: '499.00',
    img: '/img/product-02.avif',
  },
]

const trackerSteps: TrackerStep[] = [
  { label: 'Confirmed', status: 'completed' },
  { label: 'Processing', status: 'active' },
  { label: 'Shipped', status: 'pending' },
  { label: 'Delivered', status: 'pending' },
]

const summary: OrderSummary = {
  subtotal: '688.00',
  shipping: '15.00',
  tax: '55.04',
  total: '758.04',
}

const shippingAddress: ShippingAddress = {
  name: 'Marcus Aurelius',
  line1: '1288 Digital Plaza',
  line2: 'Terminal 8, Neo-Tokyo',
  postcode: 'NT 100-2938',
}
</script>