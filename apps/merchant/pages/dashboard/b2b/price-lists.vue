<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.b2b.priceLists.title')"
          :subtitle="t('dashboard.ops.b2b.priceLists.subtitle')"
          :count="priceLists.length"
        />

        <eco-b2b-tabs />

        <div v-if="priceLists.length" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article v-for="list in priceLists" :key="list.id" class="card overflow-hidden">
            <header class="p-4 border-b border-border-subtle">
              <h3 class="text-sm font-bold">{{ list.name }}</h3>
              <p class="text-xs text-tx-muted">{{ t('dashboard.ops.b2b.priceLists.product') }}: {{ list.product }}</p>
            </header>

            <LazyVTable :headers="tierHeaders" :items="list.tiers">
              <template #cell(minQty)="{ item }">
                <span class="font-mono text-sm">{{ item.minQty }}+</span>
              </template>
              <template #cell(price)="{ item }">
                <span class="font-mono text-sm font-semibold">{{ money(item.price) }}</span>
              </template>
            </LazyVTable>

            <div class="p-4 space-y-3 border-t border-border-subtle">
              <div>
                <p class="text-[10px] font-bold tracking-widest text-tx-muted">{{ t('dashboard.ops.b2b.priceLists.orderRules') }}</p>
                <p class="text-xs text-tx-secondary">
                  {{ t('dashboard.ops.b2b.priceLists.minOrder') }}
                  <span class="font-mono font-semibold">{{ list.minOrder }}</span>
                  ·
                  {{ t('dashboard.ops.b2b.priceLists.maxOrder') }}
                  <span class="font-mono font-semibold">{{ list.maxOrder }}</span>
                </p>
              </div>

              <div class="space-y-2">
                <p class="text-[10px] font-bold tracking-widest text-tx-muted">{{ t('dashboard.ops.b2b.priceLists.assigned') }}</p>
                <div v-if="list.companies.length" class="flex flex-wrap gap-1.5">
                  <span v-for="c in list.companies" :key="c" class="px-2 py-0.5 rounded-full bg-bg-elevated text-[10px] font-semibold text-tx-secondary">
                    {{ c }}
                  </span>
                </div>
                <p v-else class="text-xs text-tx-muted">{{ t('dashboard.ops.b2b.priceLists.noCompanies') }}</p>
                <div class="flex gap-2 items-end">
                  <LazyVSelectInput
                    v-model="picks[list.id]"
                    class="flex-1"
                    :placeholder="t('dashboard.ops.b2b.priceLists.assignHint')"
                    :options="companyOptions"
                  />
                  <LazyVButton size="sm" variant="secondary" :label="t('dashboard.ops.b2b.priceLists.assign')" @click="assign(list.id)" />
                </div>
              </div>
            </div>
          </article>
        </div>
        <ops-empty-state
          v-else
          :title="t('dashboard.ops.b2b.priceLists.empty')"
          :hint="t('dashboard.ops.b2b.priceLists.emptyHint')"
          icon="ph:tag-bold"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.b2b.priceLists.title') })

const store = useEcoB2bStore()
const { priceLists, companies } = storeToRefs(store)

const picks = reactive<Record<string, string>>({})

const companyOptions = computed(() => companies.value.map((c) => ({ value: c.name, label: c.name })))

const tierHeaders = computed(() => [
  { key: 'minQty', label: t('dashboard.ops.b2b.priceLists.minQty') },
  { key: 'price', label: t('dashboard.ops.b2b.priceLists.price') },
])

function assign(listId: string) {
  const name = picks[listId]
  if (!name) return
  store.assignCompany(listId, name)
  picks[listId] = ''
}
</script>
