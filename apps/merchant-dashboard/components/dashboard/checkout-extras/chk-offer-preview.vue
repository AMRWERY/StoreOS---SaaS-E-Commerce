<template>
  <div class="bg-bg-elevated border border-border-default rounded-md p-3 flex items-start gap-3">
    <div
      class="w-14 h-14 rounded-md bg-bg-overlay border border-border-subtle flex items-center justify-center shrink-0"
    >
      <Icon name="ph:image-bold" class="text-xl text-tx-muted" />
    </div>
    <div class="min-w-0 flex-1 space-y-1">
      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="checked" type="checkbox" class="accent-brand" />
        <span class="text-xs font-semibold truncate">
          {{ t('dashboard.ops.checkoutOffers.preview.add') }}
        </span>
      </label>
      <p class="text-[12px] text-tx-primary truncate">{{ title || t('dashboard.ops.checkoutOffers.preview.placeholder') }}</p>
      <p class="flex items-center gap-2 font-mono text-xs">
        <span class="font-semibold text-brand">{{ money(discounted) }}</span>
        <span v-if="discounted < price" class="text-tx-muted line-through">{{ money(price) }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  price: number
  discounted: number
}>()

const { t } = useI18n()
const { money } = useOpsFormat()
const checked = ref(true)
</script>
