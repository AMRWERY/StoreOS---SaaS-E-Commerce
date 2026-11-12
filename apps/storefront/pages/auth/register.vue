<template>
  <div class="max-w-md mx-auto px-4 sm:px-6 py-16">
    <div class="text-center space-y-2 mb-8">
      <h1 class="text-3xl font-semibold tracking-tight text-tx-primary">{{ t('shop.auth.registerTitle') }}</h1>
      <p class="text-sm text-tx-secondary">{{ t('shop.auth.registerSubtitle') }}</p>
    </div>
    <form class="rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-5" novalidate @submit.prevent="submit">
      <shop-field v-model="name" autocomplete="name" :label="t('shop.checkout.fullName')" :error="errors.name" required />
      <shop-field v-model="email" type="email" inputmode="email" dir="ltr" autocomplete="email" :label="t('shop.checkout.email')" :error="errors.email" required />
      <shop-field v-model="phone" type="tel" inputmode="tel" mono dir="ltr" autocomplete="tel" :label="t('shop.checkout.phone')" :hint="t('shop.checkout.phoneHint')" :error="errors.phone" required />
      <shop-field v-model="password" type="password" autocomplete="new-password" :label="t('shop.auth.password')" :error="errors.password" required />
      <v-button type="submit" :label="t('shop.auth.register')" class="w-full rounded-full py-3" />
    </form>
    <p class="mt-6 text-center text-sm text-tx-secondary">
      {{ t('shop.auth.haveAccount') }}
      <nuxt-link-locale to="/auth/login" class="text-brand hover:text-brand-hover font-medium">{{ t('shop.auth.login') }}</nuxt-link-locale>
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const { normalizePhone } = useShopFormat()
const account = useShopAccountStore()

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const errors = reactive<Record<string, string>>({})

function submit() {
  errors.name = name.value.trim() ? '' : t('shop.validation.required')
  errors.email = /^\S+@\S+\.\S+$/.test(email.value) ? '' : t('shop.validation.email')
  errors.phone = normalizePhone(phone.value) ? '' : t('shop.validation.phone')
  errors.password = password.value.length >= 6 ? '' : t('shop.validation.password')
  if (errors.name || errors.email || errors.phone || errors.password) return
  account.register(name.value.trim(), email.value, phone.value)
  router.push(localePath('/account'))
}

useSeoMeta({ title: () => t('shop.seo.registerTitle'), description: () => t('shop.seo.registerDesc'), robots: 'noindex, nofollow' })
</script>
