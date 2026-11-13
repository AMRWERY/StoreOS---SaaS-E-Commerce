<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.variants.title')"
          :subtitle="t('dashboard.ops.variants.subtitle')"
          :count="variants.length"
        />

        <product-variants-editor @update:variants="variants = $event" />

        <div class="flex justify-end">
          <LazyVButton :label="t('dashboard.ops.common.save')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductVariant } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.variants.title') })

const variants = ref<ProductVariant[]>([])
</script>
