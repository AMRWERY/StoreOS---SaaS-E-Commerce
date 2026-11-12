<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.variants.title')"
          :subtitle="t('dashboard.ops.variants.subtitle')"
          :count="variants.length"
        />

        <!-- Options -->
        <section class="card p-5 space-y-4">
          <h2 class="text-eyebrow">{{ t('dashboard.ops.variants.options') }}</h2>

          <div v-for="(opt, i) in options" :key="i" class="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-3 items-end">
            <LazyVInput v-model="opt.name" :label="t('dashboard.ops.variants.optionName')" />
            <div>
              <p class="text-eyebrow mb-1.5">{{ t('dashboard.ops.variants.optionValues') }}</p>
              <div class="flex flex-wrap items-center gap-2 bg-bg-base border border-border-subtle rounded-md px-2 py-1.5 min-h-[40px]">
                <span
                  v-for="(v, vi) in opt.values"
                  :key="v"
                  class="inline-flex items-center gap-1 rounded-full bg-brand-dim text-brand px-2 py-0.5 text-[11px] font-semibold"
                >
                  {{ v }}
                  <button :aria-label="t('dashboard.ops.common.delete')" @click="opt.values.splice(vi, 1)">
                    <Icon name="ph:x-bold" class="text-[9px]" />
                  </button>
                </span>
                <input
                  v-model="drafts[i]"
                  class="flex-1 min-w-[80px] bg-transparent outline-none text-sm"
                  :placeholder="t('dashboard.ops.variants.addValue')"
                  @keydown.enter.prevent="addValue(i)"
                />
              </div>
            </div>
            <button
              class="pb-2 text-tx-muted hover:text-danger transition-colors"
              :aria-label="t('dashboard.ops.common.delete')"
              @click="removeOption(i)"
            >
              <Icon name="ph:trash-bold" />
            </button>
          </div>

          <LazyVButton
            v-if="options.length < 3"
            variant="secondary"
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.variants.addOption')"
            @click="addOption"
          />
        </section>

        <!-- Variant matrix -->
        <section class="card overflow-hidden">
          <LazyVTable v-if="variants.length" :headers="headers" :items="variants">
            <template #cell(title)="{ item }">
              <span class="text-sm font-semibold">{{ item.title }}</span>
            </template>
            <template #cell(sku)="{ item }">
              <input v-model="item.sku" class="w-36 bg-bg-base border border-border-subtle rounded px-2 py-1 font-mono text-xs" />
            </template>
            <template #cell(price)="{ item }">
              <input v-model.number="item.price" type="number" min="0" class="w-24 bg-bg-base border border-border-subtle rounded px-2 py-1 font-mono text-xs" />
            </template>
            <template #cell(compareAt)="{ item }">
              <input v-model.number="item.compareAt" type="number" min="0" class="w-24 bg-bg-base border border-border-subtle rounded px-2 py-1 font-mono text-xs" />
            </template>
            <template #cell(stock)="{ item }">
              <input v-model.number="item.stock" type="number" min="0" class="w-20 bg-bg-base border border-border-subtle rounded px-2 py-1 font-mono text-xs" />
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.variants.empty')"
            :hint="t('dashboard.ops.variants.emptyHint')"
            icon="ph:stack-bold"
          />
        </section>

        <div class="flex justify-end">
          <LazyVButton :label="t('dashboard.ops.common.save')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductVariant, VariantOption } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.variants.title') })

const options = ref<VariantOption[]>([
  { name: 'Size', values: ['S', 'M', 'L'] },
  { name: 'Color', values: ['Black', 'Sand'] },
])
const drafts = ref<string[]>(['', ''])
const variants = ref<ProductVariant[]>([])

function cartesian(lists: string[][]): string[][] {
  return lists.reduce<string[][]>((acc, list) => acc.flatMap((a) => list.map((v) => [...a, v])), [[]])
}

// Regenerate the matrix when options change, keeping edits for combinations that still exist.
watch(
  options,
  (opts) => {
    const active = opts.filter((o) => o.name.trim() && o.values.length)
    if (!active.length) {
      variants.value = []
      return
    }
    const prev = new Map(variants.value.map((v) => [v.title, v]))
    variants.value = cartesian(active.map((o) => o.values)).map((combo, i) => {
      const title = combo.join(' / ')
      return (
        prev.get(title) ?? {
          id: `V-${i}-${title}`,
          title,
          sku: `SKU-${combo.map((c) => c.slice(0, 3).toUpperCase()).join('-')}`,
          price: 500,
          compareAt: null,
          stock: 0,
        }
      )
    })
  },
  { deep: true, immediate: true },
)

function addValue(i: number) {
  const v = (drafts.value[i] ?? '').trim()
  if (v && !options.value[i].values.includes(v)) options.value[i].values.push(v)
  drafts.value[i] = ''
}
function addOption() {
  options.value.push({ name: '', values: [] })
  drafts.value.push('')
}
function removeOption(i: number) {
  options.value.splice(i, 1)
  drafts.value.splice(i, 1)
}

const headers = computed(() => [
  { key: 'title', label: t('dashboard.ops.variants.variant') },
  { key: 'sku', label: 'SKU' },
  { key: 'price', label: t('dashboard.ops.variants.price') },
  { key: 'compareAt', label: t('dashboard.ops.variants.compareAt') },
  { key: 'stock', label: t('dashboard.ops.variants.stock') },
])
</script>
