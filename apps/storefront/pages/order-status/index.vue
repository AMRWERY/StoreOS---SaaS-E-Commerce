<template>
  <div class="max-w-lg mx-auto px-4 sm:px-6 py-16">
    <div class="text-center space-y-3 mb-10">
      <div class="w-16 h-16 mx-auto rounded-full bg-bg-elevated flex items-center justify-center"><Icon name="lucide:package-search" class="w-7 h-7 text-brand" /></div>
      <h1 class="text-3xl font-semibold tracking-tight text-tx-primary">{{ t('shop.orderLookup.title') }}</h1>
      <p class="text-sm text-tx-secondary">{{ t('shop.orderLookup.subtitle') }}</p>
    </div>
    <form class="rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-5" novalidate @submit.prevent="submit">
      <shop-field v-model="orderNumber" mono dir="ltr" placeholder="SO-10482" :label="t('shop.orderLookup.orderNumber')" :error="errors.order" required />
      <shop-field v-model="phone" type="tel" inputmode="tel" mono dir="ltr" placeholder="01X XXXX XXXX" :label="t('shop.checkout.phone')" :error="errors.phone" required />
      <p v-if="notFound" class="text-sm text-danger">{{ t('shop.orderLookup.notFound') }}</p>
      <v-button type="submit" :label="t('shop.orderLookup.track')" class="w-full rounded-full py-3" />
      <p class="text-xs text-tx-muted text-center">{{ t('shop.orderLookup.demoHint') }}</p>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const { normalizePhone } = useShopFormat()
const orders = useShopOrdersStore()

const orderNumber = ref('')
const phone = ref('')
const errors = reactive<Record<string, string>>({})
const notFound = ref(false)

function submit() {
  errors.order = orderNumber.value.trim() ? '' : t('shop.validation.required')
  errors.phone = normalizePhone(phone.value) ? '' : t('shop.validation.phone')
  notFound.value = false
  if (errors.order || errors.phone) return
  const order = orders.find(orderNumber.value)
  // Mock: the phone must match the order's phone once normalised.
  if (!order || normalizePhone(order.phone) !== normalizePhone(phone.value)) {
    notFound.value = true
    return
  }
  router.push(localePath(`/order-status/${order.id}`))
}

useSeoMeta({
  title: () => t('shop.seo.orderLookupTitle'),
  description: () => t('shop.seo.orderLookupDesc'),
  robots: 'noindex, nofollow',
})
</script>
