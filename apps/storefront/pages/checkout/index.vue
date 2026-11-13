<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
    <shop-empty-state v-if="!cart.items.length" icon="lucide:shopping-bag" :title="t('shop.cart.emptyTitle')" :description="t('shop.checkout.emptyDesc')">
      <v-button to="/collections/all" :label="t('shop.cart.continue')" />
    </shop-empty-state>

    <form v-else class="grid lg:grid-cols-[1fr_400px] gap-10" novalidate @submit.prevent="placeOrder">
      <div class="space-y-10">
        <h1 class="text-3xl font-semibold tracking-tight text-tx-primary">{{ t('shop.checkout.title') }}</h1>

        <!-- Contact -->
        <section class="space-y-4">
          <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.checkout.contact') }}</h2>
          <shop-field v-model="form.email" type="email" inputmode="email" autocomplete="email" :label="t('shop.checkout.email')" :error="errors.email" required dir="ltr" />
          <p v-if="!account.isAuthenticated" class="text-xs text-tx-muted">
            {{ t('shop.checkout.haveAccount') }}
            <nuxt-link-locale to="/auth/login" class="text-brand hover:text-brand-hover">{{ t('shop.auth.login') }}</nuxt-link-locale>
          </p>
        </section>

        <!-- Address -->
        <section class="space-y-4">
          <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.checkout.address') }}</h2>
          <shop-field v-model="form.name" autocomplete="name" :label="t('shop.checkout.fullName')" :error="errors.name" required />
          <div>
            <shop-field v-model="form.phone" type="tel" inputmode="tel" autocomplete="tel" mono dir="ltr" :label="t('shop.checkout.phone')" placeholder="01X XXXX XXXX" :error="errors.phone" required />
            <p class="mt-1.5 text-xs text-tx-muted">
              {{ t('shop.checkout.phoneHint') }}
              <span v-if="normalizedPhone" class="font-mono text-success ms-1" dir="ltr">{{ normalizedPhone }}</span>
            </p>
          </div>
          <div class="grid sm:grid-cols-3 gap-4">
            <shop-select v-model="form.governorate" :options="governorateOptions" :label="t('shop.checkout.governorate')" :placeholder="t('shop.checkout.select')" :error="errors.governorate" required />
            <shop-select v-model="form.city" :options="cityOptions" :label="t('shop.checkout.city')" :placeholder="t('shop.checkout.select')" :disabled="!form.governorate" :error="errors.city" required />
            <shop-select v-model="form.area" :options="areaOptions" :label="t('shop.checkout.area')" :placeholder="t('shop.checkout.select')" :disabled="!form.city" :error="errors.area" required />
          </div>
          <shop-field v-model="form.street" autocomplete="street-address" :label="t('shop.checkout.street')" :error="errors.street" required />
          <shop-field v-model="form.landmark" :label="t('shop.checkout.landmark')" :hint="t('shop.checkout.landmarkHint')" />
        </section>

        <!-- Delivery -->
        <section class="space-y-4">
          <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.checkout.delivery') }}</h2>
          <div class="space-y-3" role="radiogroup" :aria-label="t('shop.checkout.delivery')">
            <label v-for="m in deliveryMethods" :key="m.key" :class="['flex items-center gap-4 rounded-2xl border p-4 cursor-pointer transition-colors duration-200', form.delivery === m.key ? 'border-brand bg-brand-dim' : 'border-border-default hover:border-tx-muted']">
              <input v-model="form.delivery" type="radio" name="delivery" :value="m.key" class="accent-brand w-4 h-4">
              <div class="flex-1">
                <p class="text-sm font-medium text-tx-primary">{{ t(`shop.checkout.delivery_${m.key}`) }}</p>
                <p class="text-xs text-tx-muted mt-0.5">{{ t(`shop.checkout.delivery_${m.key}Desc`) }}</p>
              </div>
              <span class="font-mono text-sm text-tx-primary">{{ shippingFor(m.key) === 0 ? t('shop.totals.free') : formatMoney(shippingFor(m.key)) }}</span>
            </label>
          </div>
        </section>

        <!-- Payment -->
        <section class="space-y-4">
          <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.checkout.payment') }}</h2>
          <div class="space-y-3" role="radiogroup" :aria-label="t('shop.checkout.payment')">
            <label v-for="p in paymentMethods" :key="p.key" :class="['block rounded-2xl border p-4 cursor-pointer transition-colors duration-200', form.payment === p.key ? 'border-brand bg-brand-dim' : 'border-border-default hover:border-tx-muted']">
              <span class="flex items-center gap-4">
                <input v-model="form.payment" type="radio" name="payment" :value="p.key" class="accent-brand w-4 h-4">
                <Icon :name="p.icon" class="w-5 h-5 text-tx-secondary" />
                <span class="flex-1">
                  <span class="block text-sm font-medium text-tx-primary">{{ t(`shop.checkout.pay_${p.key}`) }}</span>
                  <span class="block text-xs text-tx-muted mt-0.5">{{ t(`shop.checkout.pay_${p.key}Desc`) }}</span>
                </span>
              </span>
              <span v-if="form.payment === p.key && p.key === 'card'" class="mt-4 block rounded-xl border border-dashed border-border-default bg-bg-primary p-4 text-xs text-tx-secondary">
                <span class="flex items-center gap-2 font-medium text-tx-primary mb-1"><Icon name="lucide:shield-check" class="w-4 h-4 text-success" />{{ t('shop.checkout.cardPlaceholderTitle') }}</span>
                {{ t('shop.checkout.cardPlaceholderDesc') }}
              </span>
              <span v-if="form.payment === p.key && p.key === 'wallet'" class="mt-4 block rounded-xl border border-dashed border-border-default bg-bg-primary p-4 text-xs text-tx-secondary">
                {{ t('shop.checkout.walletNote') }}
              </span>
            </label>
          </div>
        </section>
      </div>

      <!-- Summary -->
      <aside class="h-fit rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-6 lg:sticky lg:top-8">
        <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.checkout.summary') }}</h2>
        <ul class="space-y-4">
          <li v-for="item in cart.items" :key="item.variantId" class="flex items-center gap-3">
            <div class="relative shrink-0">
              <product-visual :tone="item.product.tone" :icon="item.product.icon" :image="item.product.image" ratio="aspect-square" icon-size="w-5 h-5" class="w-14 rounded-xl border border-border-subtle" />
              <span class="absolute -top-2 -end-2 min-w-[20px] h-5 px-1 rounded-full bg-tx-secondary text-bg-base text-[10px] font-mono font-semibold flex items-center justify-center">{{ item.qty }}</span>
            </div>
            <p class="flex-1 min-w-0 text-sm text-tx-primary truncate">{{ loc(item.product.title) }}</p>
            <span class="font-mono text-sm text-tx-primary">{{ formatMoney(item.lineTotal) }}</span>
          </li>
        </ul>
        <coupon-form />
        <order-totals :subtotal="cart.subtotal" :shipping="shipping" :discount="cart.discount" :total="total" :code="cart.coupon?.code" />
        <v-button type="submit" :label="submitting ? t('shop.checkout.placing') : t('shop.checkout.placeOrder')" :disabled="submitting" icon="lucide:lock" icon-position="left" class="w-full rounded-full py-3.5" />
        <p class="text-xs text-tx-muted text-center">{{ t('shop.checkout.terms') }}</p>
      </aside>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { EXPRESS_SHIPPING, FREE_SHIPPING_THRESHOLD, GOVERNORATES, STANDARD_SHIPPING } from '@/data/shop-data'
import type { ShopOrder } from '@/types/shop'

definePageMeta({ layout: 'checkout' })

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const { loc } = useLocalized()
const { formatMoney, normalizePhone } = useShopFormat()
const cart = useCartStore()
const account = useShopAccountStore()
const orders = useShopOrdersStore()

const form = reactive({
  email: account.user?.email ?? '',
  name: account.user?.name ?? '',
  phone: account.user?.phone ?? '',
  governorate: '', city: '', area: '', street: '', landmark: '',
  delivery: 'standard' as 'standard' | 'express' | 'pickup',
  payment: 'cod' as 'cod' | 'card' | 'wallet',
})
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)

const deliveryMethods = [{ key: 'standard' }, { key: 'express' }, { key: 'pickup' }] as const
const paymentMethods = [
  { key: 'cod', icon: 'lucide:banknote' },
  { key: 'card', icon: 'lucide:credit-card' },
  { key: 'wallet', icon: 'lucide:smartphone' },
] as const

const governorateOptions = computed(() => GOVERNORATES.map(g => ({ value: g.value, label: loc(g.label) })))
const selectedGov = computed(() => GOVERNORATES.find(g => g.value === form.governorate))
const cityOptions = computed(() => (selectedGov.value?.cities ?? []).map(c => ({ value: c.value, label: loc(c.label) })))
const selectedCity = computed(() => selectedGov.value?.cities.find(c => c.value === form.city))
const areaOptions = computed(() => (selectedCity.value?.areas ?? []).map(a => ({ value: a.value, label: loc(a.label) })))
watch(() => form.governorate, () => { form.city = ''; form.area = '' })
watch(() => form.city, () => { form.area = '' })

const normalizedPhone = computed(() => normalizePhone(form.phone))

function shippingFor(method: string) {
  if (cart.coupon?.type === 'shipping' && method !== 'pickup') return method === 'express' ? Math.max(0, EXPRESS_SHIPPING - STANDARD_SHIPPING) : 0
  if (method === 'pickup') return 0
  if (method === 'express') return EXPRESS_SHIPPING
  return cart.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
}
const shipping = computed(() => shippingFor(form.delivery))
const total = computed(() => Math.max(0, cart.subtotal - cart.discount + shipping.value))

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  const req = t('shop.validation.required')
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = t('shop.validation.email')
  if (!form.name.trim()) errors.name = req
  if (!normalizedPhone.value) errors.phone = t('shop.validation.phone')
  if (!form.governorate) errors.governorate = req
  if (!form.city) errors.city = req
  if (!form.area) errors.area = req
  if (!form.street.trim()) errors.street = req
  return Object.keys(errors).length === 0
}

async function placeOrder() {
  if (!validate()) return
  submitting.value = true
  const id = orders.nextOrderId()
  const order: ShopOrder = {
    id,
    placedAt: new Date().toISOString().slice(0, 10),
    status: 'placed',
    paymentMethod: form.payment,
    items: cart.items.map(i => ({ title: i.product.title, variantLabel: Object.values(i.variant.options).join(' / '), qty: i.qty, unitPrice: i.unitPrice, tone: i.product.tone, icon: i.product.icon, image: i.product.image })),
    subtotal: cart.subtotal,
    shipping: shipping.value,
    discount: cart.discount,
    total: total.value,
    address: `${loc(selectedCity.value?.label)}, ${loc(selectedGov.value?.label)}`,
    phone: normalizedPhone.value ?? form.phone,
  }
  orders.place(order)
  if (account.isAuthenticated) account.addOrder(order)
  await router.push(localePath({ path: '/checkout/success', query: { order: id } }))
  cart.clear()
  submitting.value = false
}

useSeoMeta({
  title: () => t('shop.seo.checkoutTitle'),
  description: () => t('shop.seo.checkoutDesc'),
  robots: 'noindex, nofollow',
})
</script>
