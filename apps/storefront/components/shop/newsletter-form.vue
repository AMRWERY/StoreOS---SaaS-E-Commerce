<template>
  <section class="rounded-3xl bg-bg-primary border border-border-subtle px-6 py-12 sm:px-12 sm:py-16 text-center">
    <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-tx-primary">{{ t('shop.newsletter.title') }}</h2>
    <p class="mt-3 text-sm text-tx-secondary max-w-md mx-auto">{{ t('shop.newsletter.subtitle') }}</p>
    <form v-if="!done" class="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" @submit.prevent="submit">
      <input v-model="email" type="email" required autocomplete="email" :placeholder="t('shop.newsletter.placeholder')" :aria-label="t('shop.newsletter.placeholder')"
        class="flex-1 bg-bg-base border border-border-default focus:border-brand rounded-full px-5 py-3 text-sm text-tx-primary placeholder:text-tx-muted outline-none transition-colors duration-200">
      <v-button type="submit" :label="t('shop.newsletter.subscribe')" class="rounded-full px-6 py-3" />
    </form>
    <p v-else class="mt-8 inline-flex items-center gap-2 text-sm text-success"><Icon name="lucide:circle-check" class="w-4 h-4" />{{ t('shop.newsletter.thanks') }}</p>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const email = ref('')
const done = ref(false)
const submit = () => { done.value = true }
</script>
