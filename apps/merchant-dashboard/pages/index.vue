<template>
  <div />
</template>

<script lang="ts" setup>
// The merchant dashboard has no marketing home: `/` goes to the dashboard
// (auth.global bounces signed-out visitors to the sign-in page).
const localePath = useLocalePath()
await navigateTo(localePath('/dashboard'), { replace: true })
useSeoMeta({ title: 'StoreOS Merchant Dashboard', robots: 'noindex, nofollow' })
</script>
