<template>
  <account-shell :title="t('shop.account.addresses')" :subtitle="t('shop.account.addressesSubtitle')">
    <div>
      <v-button icon="lucide:plus" icon-position="left" :label="t('shop.account.addAddress')" class="rounded-full px-6" @click="openForm()" />
    </div>

    <div v-if="account.addresses.length" class="grid sm:grid-cols-2 gap-4">
      <article v-for="a in account.addresses" :key="a.id" class="rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-tx-primary">{{ a.label }}</h2>
          <span v-if="a.isDefault" class="rounded-full bg-brand-dim text-brand text-[10px] font-semibold px-2.5 py-1">{{ t('shop.account.default') }}</span>
        </div>
        <div class="text-sm text-tx-secondary space-y-1">
          <p>{{ a.name }}</p>
          <p class="font-mono" dir="ltr">{{ a.phone }}</p>
          <p>{{ a.street }}</p>
          <p>{{ areaLabel(a) }}</p>
          <p v-if="a.landmark" class="text-xs text-tx-muted">{{ a.landmark }}</p>
        </div>
        <div class="flex gap-4 pt-2 text-xs">
          <button type="button" class="text-brand hover:text-brand-hover" @click="openForm(a)">{{ t('shop.common.edit') }}</button>
          <button type="button" class="text-tx-muted hover:text-danger" @click="account.removeAddress(a.id)">{{ t('shop.cart.remove') }}</button>
        </div>
      </article>
    </div>
    <shop-empty-state v-else icon="lucide:map-pin" :title="t('shop.account.noAddressesTitle')" :description="t('shop.account.noAddressesDesc')" />

    <v-dialog v-model="formOpen" :title="editingId ? t('shop.account.editAddress') : t('shop.account.addAddress')" max-width="lg">
      <form class="space-y-4 p-1" novalidate @submit.prevent="save">
        <shop-field v-model="form.label" :label="t('shop.account.addressLabel')" :error="errors.label" required />
        <shop-field v-model="form.name" :label="t('shop.checkout.fullName')" :error="errors.name" required />
        <shop-field v-model="form.phone" mono dir="ltr" type="tel" :label="t('shop.checkout.phone')" :error="errors.phone" required />
        <div class="grid sm:grid-cols-3 gap-3">
          <shop-select v-model="form.governorate" :options="governorateOptions" :label="t('shop.checkout.governorate')" :placeholder="t('shop.checkout.select')" :error="errors.governorate" required />
          <shop-select v-model="form.city" :options="cityOptions" :label="t('shop.checkout.city')" :placeholder="t('shop.checkout.select')" :disabled="!form.governorate" :error="errors.city" required />
          <shop-select v-model="form.area" :options="areaOptions" :label="t('shop.checkout.area')" :placeholder="t('shop.checkout.select')" :disabled="!form.city" :error="errors.area" required />
        </div>
        <shop-field v-model="form.street" :label="t('shop.checkout.street')" :error="errors.street" required />
        <shop-field v-model="form.landmark" :label="t('shop.checkout.landmark')" />
        <label class="flex items-center gap-3 text-sm text-tx-secondary cursor-pointer"><input v-model="form.isDefault" type="checkbox" class="w-4 h-4 accent-brand">{{ t('shop.account.makeDefault') }}</label>
        <div class="flex justify-end gap-3 pt-2">
          <v-button variant="secondary" :label="t('shop.common.cancel')" @click="formOpen = false" />
          <v-button type="submit" :label="t('shop.common.save')" />
        </div>
      </form>
    </v-dialog>
  </account-shell>
</template>

<script lang="ts" setup>
import { GOVERNORATES } from '@/data/shop-data'
import type { ShopAddress } from '@/types/shop'

const { t } = useI18n()
const { loc } = useLocalized()
const { normalizePhone } = useShopFormat()
const account = useShopAccountStore()

const blank = () => ({ label: '', name: account.user?.name ?? '', phone: account.user?.phone ?? '', governorate: '', city: '', area: '', street: '', landmark: '', isDefault: false })
const form = reactive(blank())
const errors = reactive<Record<string, string>>({})
const formOpen = ref(false)
const editingId = ref<string | null>(null)

const governorateOptions = computed(() => GOVERNORATES.map(g => ({ value: g.value, label: loc(g.label) })))
const gov = computed(() => GOVERNORATES.find(g => g.value === form.governorate))
const cityOptions = computed(() => (gov.value?.cities ?? []).map(c => ({ value: c.value, label: loc(c.label) })))
const city = computed(() => gov.value?.cities.find(c => c.value === form.city))
const areaOptions = computed(() => (city.value?.areas ?? []).map(a => ({ value: a.value, label: loc(a.label) })))
watch(() => form.governorate, (_n, old) => { if (old !== undefined) { form.city = ''; form.area = '' } })
watch(() => form.city, (_n, old) => { if (old !== undefined) form.area = '' })

function areaLabel(a: ShopAddress) {
  const g = GOVERNORATES.find(x => x.value === a.governorate)
  const c = g?.cities.find(x => x.value === a.city)
  const ar = c?.areas.find(x => x.value === a.area)
  return [loc(ar?.label), loc(c?.label), loc(g?.label)].filter(Boolean).join(', ')
}

function openForm(a?: ShopAddress) {
  for (const k of Object.keys(errors)) delete errors[k]
  editingId.value = a?.id ?? null
  Object.assign(form, a ? { label: a.label, name: a.name, phone: a.phone, governorate: a.governorate, city: a.city, area: a.area, street: a.street, landmark: a.landmark, isDefault: a.isDefault } : blank())
  nextTick(() => {
    // Restore dependent selects after the watchers reset them.
    if (a) Object.assign(form, { city: a.city, area: a.area })
  })
  formOpen.value = true
}

function save() {
  for (const k of Object.keys(errors)) delete errors[k]
  const req = t('shop.validation.required')
  for (const k of ['label', 'name', 'governorate', 'city', 'area', 'street'] as const) if (!String(form[k]).trim()) errors[k] = req
  if (!normalizePhone(form.phone)) errors.phone = t('shop.validation.phone')
  if (Object.keys(errors).length) return
  account.saveAddress({ ...form, id: editingId.value ?? undefined })
  formOpen.value = false
}

useSeoMeta({ title: () => t('shop.seo.addressesTitle'), description: () => t('shop.seo.accountDesc'), robots: 'noindex, nofollow' })
</script>
