<template>
  <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <li v-for="b in badges" :key="b.key" class="flex items-start gap-4">
      <span class="w-11 h-11 rounded-2xl bg-bg-elevated flex items-center justify-center shrink-0"><Icon :name="b.icon" class="w-5 h-5 text-brand" /></span>
      <div>
        <p class="text-sm font-semibold text-tx-primary">{{ t(`shop.trust.${b.key}Title`) }}</p>
        <p class="text-xs text-tx-secondary mt-1">{{ t(`shop.trust.${b.key}Desc`) }}</p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const badges = [
  { key: 'cod', icon: 'lucide:banknote' },
  { key: 'shipping', icon: 'lucide:truck' },
  { key: 'returns', icon: 'lucide:rotate-ccw' },
  { key: 'secure', icon: 'lucide:shield-check' },
]
</script>
