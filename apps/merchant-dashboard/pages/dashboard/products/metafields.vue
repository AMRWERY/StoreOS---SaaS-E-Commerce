<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.metafields.title')"
          :subtitle="t('dashboard.ops.metafields.subtitle')"
          :count="metafields.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.metafields.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <section class="card overflow-hidden">
          <LazyVTable v-if="metafields.length" :headers="headers" :items="metafields">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(key)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.namespace }}.{{ item.key }}</span>
            </template>
            <template #cell(type)="{ item }">
              <status-pill :tone="typeTones[item.type]">
                {{ t(`dashboard.ops.metafields.types.${item.type}`) }}
              </status-pill>
            </template>
            <template #cell(owner)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.metafields.owners.${item.owner}`) }}</span>
            </template>
            <template #cell(required)="{ item }">
              <status-pill :tone="item.required ? 'warning' : 'neutral'">
                {{ item.required ? t('dashboard.ops.catxCommon.yes') : t('dashboard.ops.catxCommon.no') }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.metafields.empty')"
            :hint="t('dashboard.ops.metafields.emptyHint')"
            icon="ph:brackets-curly-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.metafields.previewTitle') }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t('dashboard.ops.metafields.previewHint') }}</p>
          </div>
          <LazyVTable v-if="previewRows.length" :headers="previewHeaders" :items="previewRows">
            <template #cell(product)="{ item }">
              <span class="text-sm font-semibold">{{ item.product }}</span>
            </template>
            <template #cell(field)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.field }}</span>
            </template>
            <template #cell(value)="{ item }">
              <span class="font-mono text-xs">{{ item.value }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.metafields.previewEmpty')"
            icon="ph:list-dashes-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.metafields.create')"
      :subtitle="t('dashboard.ops.metafields.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.name" :label="t('dashboard.ops.metafields.name')" required />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <LazyVInput v-model="form.namespace" :label="t('dashboard.ops.metafields.namespace')" class="font-mono" required />
          <LazyVInput v-model="form.key" :label="t('dashboard.ops.metafields.key')" class="font-mono" required />
        </div>
        <LazyVSelectInput v-model="form.type" :label="t('dashboard.ops.metafields.type')" :options="typeOptions" />
        <LazyVSelectInput v-model="form.owner" :label="t('dashboard.ops.metafields.appliesTo')" :options="ownerOptions" />
        <LazyVSwitchButton v-model="form.required" :label="t('dashboard.ops.metafields.required')" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.metafields.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { MetafieldOwner, MetafieldType } from '@/types/catalogDepth'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.metafields.title') })

const store = useCatxMetafieldsStore()
const { metafields, values } = storeToRefs(store)

const isOpen = ref(false)
const form = reactive<{ name: string; namespace: string; key: string; type: MetafieldType; owner: MetafieldOwner; required: boolean }>({
  name: '',
  namespace: 'custom',
  key: '',
  type: 'text',
  owner: 'products',
  required: false,
})

const typeTones: Record<string, Tone> = {
  text: 'neutral',
  number: 'info',
  date: 'purple',
  boolean: 'success',
  file: 'warning',
  list: 'info',
}

const types: MetafieldType[] = ['text', 'number', 'date', 'boolean', 'file', 'list']
const owners: MetafieldOwner[] = ['products', 'collections', 'customers']
const typeOptions = computed(() => types.map((v) => ({ value: v, label: t(`dashboard.ops.metafields.types.${v}`) })))
const ownerOptions = computed(() => owners.map((v) => ({ value: v, label: t(`dashboard.ops.metafields.owners.${v}`) })))

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.metafields.name') },
  { key: 'key', label: t('dashboard.ops.metafields.namespaceKey') },
  { key: 'type', label: t('dashboard.ops.metafields.type') },
  { key: 'owner', label: t('dashboard.ops.metafields.appliesTo') },
  { key: 'required', label: t('dashboard.ops.metafields.required') },
])

const previewHeaders = computed(() => [
  { key: 'product', label: t('dashboard.ops.metafields.product') },
  { key: 'field', label: t('dashboard.ops.metafields.namespaceKey') },
  { key: 'value', label: t('dashboard.ops.metafields.value') },
])

const previewRows = computed(() =>
  values.value.flatMap((v) => {
    const mf = metafields.value.find((m) => m.id === v.metafieldId)
    return mf ? [{ id: v.id, product: v.product, field: `${mf.namespace}.${mf.key}`, value: v.value }] : []
  }),
)

function submit() {
  if (!form.name.trim() || !form.key.trim() || !form.namespace.trim()) return
  store.add({
    name: form.name.trim(),
    namespace: form.namespace.trim(),
    key: form.key.trim(),
    type: form.type,
    owner: form.owner,
    required: form.required,
  })
  form.name = ''
  form.key = ''
  form.required = false
  isOpen.value = false
}
</script>
