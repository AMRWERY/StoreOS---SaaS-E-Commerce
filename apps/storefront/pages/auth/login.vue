<template>
  <div class="max-w-md mx-auto px-4 sm:px-6 py-16">
    <div class="text-center space-y-2 mb-8">
      <h1 class="text-3xl font-semibold tracking-tight text-tx-primary">{{ t('shop.auth.loginTitle') }}</h1>
      <p class="text-sm text-tx-secondary">{{ t('shop.auth.loginSubtitle') }}</p>
    </div>
    <form class="rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-5" novalidate @submit.prevent="submit">
      <shop-field v-model="email" type="email" inputmode="email" dir="ltr" autocomplete="email" :label="t('shop.checkout.email')" :error="errors.email" required />
      <shop-field v-model="password" type="password" autocomplete="current-password" :label="t('shop.auth.password')" :error="errors.password" required />
      <v-button type="submit" :label="t('shop.auth.login')" class="w-full rounded-full py-3" />
      <p class="text-xs text-tx-muted text-center">{{ t('shop.auth.demoNote') }}</p>
    </form>
    <p class="mt-6 text-center text-sm text-tx-secondary">
      {{ t('shop.auth.noAccount') }}
      <nuxt-link-locale to="/auth/register" class="text-brand hover:text-brand-hover font-medium">{{ t('shop.auth.register') }}</nuxt-link-locale>
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const account = useShopAccountStore()

const email = ref('')
const password = ref('')
const errors = reactive<Record<string, string>>({})

function submit() {
  errors.email = /^\S+@\S+\.\S+$/.test(email.value) ? '' : t('shop.validation.email')
  errors.password = password.value.length >= 6 ? '' : t('shop.validation.password')
  if (errors.email || errors.password) return
  account.login(email.value)
  router.push(localePath('/account'))
}

useSeoMeta({ title: () => t('shop.seo.loginTitle'), description: () => t('shop.seo.loginDesc'), robots: 'noindex, nofollow' })
</script>
