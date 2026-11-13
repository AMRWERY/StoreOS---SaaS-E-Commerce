<template>
  <div class="flex justify-center rounded-lg border border-border-subtle bg-bg-base p-4">
    <div
      :dir="rtl ? 'rtl' : 'ltr'"
      :class="[
        'w-full overflow-hidden rounded-md border border-border-default bg-bg-primary transition-all duration-300',
        device === 'mobile' ? 'max-w-[320px]' : 'max-w-[560px]',
      ]"
    >
      <div v-if="!blocks.length" class="px-6 py-10 text-center text-xs text-tx-muted">
        {{ t('dashboard.ops.campaignBuilder.previewEmpty') }}
      </div>
      <template v-for="b in blocks" :key="b.id">
        <div v-if="b.type === 'header'" class="border-b border-border-subtle bg-brand-dim px-5 py-4 text-center">
          <p class="text-base font-bold tracking-tight text-brand">{{ b.text }}</p>
        </div>
        <p v-else-if="b.type === 'text'" class="px-5 py-3 text-[13px] leading-relaxed text-tx-secondary">{{ b.text }}</p>
        <div v-else-if="b.type === 'image'" class="px-5 py-3">
          <div class="flex h-28 items-center justify-center rounded-md border border-dashed border-border-default bg-bg-elevated">
            <Icon name="ph:image-bold" class="text-2xl text-tx-muted" />
          </div>
        </div>
        <div v-else-if="b.type === 'products'" class="px-5 py-3">
          <p v-if="b.text" class="mb-2 text-xs font-semibold text-tx-primary">{{ b.text }}</p>
          <div :class="['grid gap-2', device === 'mobile' ? 'grid-cols-2' : 'grid-cols-3']">
            <div
              v-for="p in sampleProducts.slice(0, device === 'mobile' ? 2 : 3)"
              :key="p.name"
              class="rounded-md border border-border-subtle bg-bg-elevated p-2"
            >
              <div class="mb-2 flex h-14 items-center justify-center rounded bg-bg-primary">
                <Icon name="ph:package-bold" class="text-lg text-tx-muted" />
              </div>
              <p class="truncate text-[11px] font-medium text-tx-primary">{{ p.name }}</p>
              <p class="font-mono text-[11px] text-brand">{{ p.price.toLocaleString('en-US') }} EGP</p>
            </div>
          </div>
        </div>
        <div v-else-if="b.type === 'button'" class="px-5 py-3 text-center">
          <span class="inline-block rounded-md bg-brand px-5 py-2 text-xs font-semibold text-white">{{ b.text }}</span>
        </div>
        <p
          v-else-if="b.type === 'footer'"
          class="border-t border-border-subtle px-5 py-3 text-center text-[10px] leading-relaxed text-tx-muted"
        >
          {{ b.text }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EmailBlock } from '@/types/marketing'

defineProps<{
  blocks: EmailBlock[]
  device: 'desktop' | 'mobile'
  rtl: boolean
}>()

const { t } = useI18n()

const sampleProducts = [
  { name: 'Cotton Abaya', price: 1450 },
  { name: 'Silk Hijab', price: 380 },
  { name: 'Oud Perfume', price: 1100 },
]
</script>
