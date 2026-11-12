<template>
  <account-shell :title="t('shop.account.profile')" :subtitle="t('shop.account.profileSubtitle')">
    <form class="max-w-lg rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-5" novalidate @submit.prevent="save">
      <shop-field v-model="form.name" autocomplete="name" :label="t('shop.checkout.fullName')" :error="errors.name" required />
      <shop-field v-model="form.email" type="email" inputmode="email" dir="ltr" autocomplete="email" :label="t('shop.checkout.email')" :error="errors.email" required />
      <shop-field v-model="form.phone" type="tel" inputmode="tel" mono dir="ltr" autocomplete="tel" :label="t('shop.checkout.phone')" :error="errors.phone" required />
      <div class="flex items-center gap-4">
        <v-button type="submit" :label="t('shop.common.save')" class="rounded-full px-7" />
        <Transition name="fade"><span v-if="saved" class="text-sm text-success inline-flex items-center gap-1.5"><Icon name="lucide:check" class="w-4 h-4" />{{ t('shop.account.saved') }}</span></Transition>
      </div>
    </form>
  </account-shell>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { normalizePhone } = useShopFormat()
const account = useShopAccountStore()

const form = reactive({ name: account.user?.name ?? '', email: account.user?.email ?? '', phone: account.user?.phone ?? '' })
const errors = reactive<Record<string, string>>({})
const saved = ref(false)

function save() {
  errors.name = form.name.trim() ? '' : t('shop.validation.required')
  errors.email = /^\S+@\S+\.\S+$/.test(form.email) ? '' : t('shop.validation.email')
  errors.phone = normalizePhone(form.phone) ? '' : t('shop.validation.phone')
  if (errors.name || errors.email || errors.phone) return
  account.updateProfile({ ...form })
  saved.value = true
  setTimeout(() => { saved.value = false }, 2500)
}

useSeoMeta({ title: () => t('shop.seo.profileTitle'), description: () => t('shop.seo.accountDesc'), robots: 'noindex, nofollow' })
</script>
