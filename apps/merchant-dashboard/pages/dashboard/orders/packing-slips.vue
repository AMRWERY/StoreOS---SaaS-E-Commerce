<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10 print:m-0 print:p-0">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5 print:p-0 print:overflow-visible">
      <div class="max-w-5xl mx-auto space-y-6">
        <div class="print:hidden space-y-6">
          <ops-page-header
            :title="t('dashboard.ops.packingSlips.title')"
            :subtitle="t('dashboard.ops.packingSlips.subtitle')"
            :count="sheets.length"
          >
            <LazyVButton
              icon="ph:printer-bold"
              iconPosition="left"
              :disabled="!sheets.length"
              :label="t('dashboard.ops.packingSlips.print')"
              @click="print"
            />
          </ops-page-header>

          <div class="card p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyVSelectInput
              v-model="format"
              :label="t('dashboard.ops.packingSlips.format')"
              :options="formatOptions"
            />
            <LazyVSwitchButton v-model="showArabic" :label="t('dashboard.ops.packingSlips.arabicBlock')" />
          </div>
        </div>

        <ops-empty-state
          v-if="!sheets.length"
          class="print:hidden"
          :title="t('dashboard.ops.packingSlips.empty')"
          :hint="t('dashboard.ops.packingSlips.emptyHint')"
          icon="ph:printer-bold"
        />

        <div v-else class="packing-print-area space-y-6 print:space-y-0">
          <article
            v-for="o in sheets"
            :key="o.id"
            class="packing-sheet bg-white text-black mx-auto rounded-md border border-border-default print:border-0 print:rounded-none"
            :class="format === 'label' ? 'max-w-[420px] p-5 text-[11px]' : 'max-w-[720px] p-8 text-xs'"
          >
            <header class="flex items-start justify-between gap-4 pb-3 border-b-2 border-black">
              <div>
                <p class="text-base font-bold">StoreOS</p>
                <p class="font-semibold">
                  {{ format === 'label' ? t('dashboard.ops.packingSlips.shippingLabel') : t('dashboard.ops.packingSlips.slip') }}
                </p>
              </div>
              <div class="text-end">
                <p class="font-mono font-bold text-sm">{{ o.orderId }}</p>
                <p class="font-mono">{{ o.createdAt }}</p>
              </div>
            </header>

            <section class="grid gap-4 py-3 border-b border-black" :class="format === 'label' ? 'grid-cols-1' : 'grid-cols-2'">
              <div>
                <p class="font-bold uppercase tracking-wider text-[10px]">{{ t('dashboard.ops.packingSlips.shipTo') }}</p>
                <p class="font-semibold text-sm">{{ o.customer }}</p>
                <p>{{ o.address }}</p>
                <p>{{ o.governorate }}, {{ t('dashboard.ops.packingSlips.egypt') }}</p>
                <p class="font-mono" dir="ltr">{{ o.phone }}</p>
              </div>
              <div v-if="showArabic" dir="rtl" lang="ar" class="text-start border-s-2 border-black ps-3">
                <p class="font-bold text-[11px]">{{ t('dashboard.ops.packingSlips.shipToAr') }}</p>
                <p class="font-semibold text-sm">{{ o.customer }}</p>
                <p>{{ o.addressAr }}</p>
                <p class="font-mono" dir="ltr">{{ o.phone }}</p>
              </div>
            </section>

            <section v-if="o.packages.length" class="py-3 border-b border-black">
              <p class="font-bold uppercase tracking-wider text-[10px]">{{ t('dashboard.ops.packingSlips.tracking') }}</p>
              <div class="flex gap-0.5 h-12 my-2" aria-hidden="true">
                <span
                  v-for="(w, i) in bars(o.packages[0]!.tracking)"
                  :key="i"
                  class="bg-black h-full"
                  :style="{ width: `${w}px`, marginInlineEnd: `${(i % 3) + 1}px` }"
                />
              </div>
              <p class="font-mono font-bold text-sm" dir="ltr">{{ o.packages[0]!.tracking }}</p>
            </section>

            <section v-if="format === 'slip'" class="py-3">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-black text-start">
                    <th class="py-1 text-start">{{ t('dashboard.ops.packingSlips.item') }}</th>
                    <th class="py-1 text-start">{{ t('dashboard.ops.packingSlips.sku') }}</th>
                    <th class="py-1 text-end">{{ t('dashboard.ops.packingSlips.qty') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="l in o.lines" :key="l.sku" class="border-b border-black/30">
                    <td class="py-1.5">{{ l.name }}</td>
                    <td class="py-1.5 font-mono">{{ l.sku }}</td>
                    <td class="py-1.5 font-mono text-end">{{ l.qty }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="mt-4 text-[10px]">{{ t('dashboard.ops.packingSlips.thanks') }}</p>
            </section>
            <p v-else class="pt-3 font-mono">
              {{ t('dashboard.ops.packingSlips.units') }}: {{ o.lines.reduce((s, l) => s + l.qty, 0) }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.packingSlips.title') })

const store = useFulfilBoardStore()
const { orders } = storeToRefs(store)

const format = ref('slip')
const showArabic = ref(true)

const formatOptions = computed(() => [
  { value: 'slip', label: t('dashboard.ops.packingSlips.formatSlip') },
  { value: 'label', label: t('dashboard.ops.packingSlips.formatLabel') },
])

// ?ids=FUL-1,FUL-2 from the fulfillment board; falls back to open orders.
const sheets = computed(() => {
  const raw = route.query.ids
  const ids = (Array.isArray(raw) ? raw[0] : raw)?.split(',').filter(Boolean) ?? []
  if (ids.length) return orders.value.filter((o) => ids.includes(o.id))
  return orders.value.filter((o) => o.status === 'toPack' || o.status === 'packed')
})

/** Decorative bar widths derived from the tracking number (mock barcode). */
function bars(code: string) {
  return Array.from(code.replace(/\D/g, '').padEnd(10, '7')).flatMap((d) => [(Number(d) % 3) + 1, (Number(d) % 2) + 1])
}

function print() {
  window.print()
}
</script>

<style>
@media print {
  body * {
    visibility: hidden;
  }
  .packing-print-area,
  .packing-print-area * {
    visibility: visible;
  }
  .packing-print-area {
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    width: 100%;
  }
  .packing-sheet {
    break-after: page;
    page-break-after: always;
  }
}
</style>
