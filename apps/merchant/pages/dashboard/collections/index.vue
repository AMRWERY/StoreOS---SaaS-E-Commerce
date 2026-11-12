<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.collections.title')"
          :subtitle="t('dashboard.ops.collections.subtitle')"
          :count="collections.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.collections.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <section class="card overflow-hidden">
          <LazyVTable v-if="collections.length" :headers="headers" :items="collections">
            <template #cell(title)="{ item }">
              <span class="text-sm font-semibold">{{ item.title }}</span>
              <p v-if="item.rule" class="text-[11px] text-tx-muted font-mono mt-0.5">{{ item.rule }}</p>
            </template>
            <template #cell(type)="{ item }">
              <status-pill :tone="item.type === 'automated' ? 'info' : 'neutral'">
                {{ t(`dashboard.ops.collections.types.${item.type}`) }}
              </status-pill>
            </template>
            <template #cell(products)="{ item }">
              <span class="font-mono text-sm">{{ item.products }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="item.status === 'active' ? 'success' : 'warning'">
                {{ t(`dashboard.ops.common.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(updatedAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.updatedAt }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <button
                class="text-tx-muted hover:text-danger transition-colors"
                :aria-label="t('dashboard.ops.common.delete')"
                @click="removeCollection(item.id)"
              >
                <Icon name="ph:trash-bold" />
              </button>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.collections.empty')"
            :hint="t('dashboard.ops.collections.emptyHint')"
            icon="ph:squares-four-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.collections.create')"
      :subtitle="t('dashboard.ops.collections.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.title" :label="t('dashboard.ops.collections.name')" required />
        <LazyVSelectInput
          v-model="form.type"
          :label="t('dashboard.ops.collections.typeLabel')"
          :options="typeOptions"
        />
        <LazyVInput
          v-if="form.type === 'automated'"
          v-model="form.rule"
          :label="t('dashboard.ops.collections.rule')"
          :placeholder="t('dashboard.ops.collections.rulePlaceholder')"
        />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.common.save')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.collections.title') })

const store = useCollectionsStore()
const { collections } = storeToRefs(store)
const { removeCollection } = store

const isOpen = ref(false)
const form = reactive({ title: '', type: 'manual' as 'manual' | 'automated', rule: '' })

const typeOptions = computed(() => [
  { value: 'manual', label: t('dashboard.ops.collections.types.manual') },
  { value: 'automated', label: t('dashboard.ops.collections.types.automated') },
])

const headers = computed(() => [
  { key: 'title', label: t('dashboard.ops.collections.name') },
  { key: 'type', label: t('dashboard.ops.collections.typeLabel') },
  { key: 'products', label: t('dashboard.ops.collections.productsCount'), align: 'center' as const },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'updatedAt', label: t('dashboard.ops.common.updated') },
  { key: 'actions', label: '', align: 'end' as const },
])

function submit() {
  if (!form.title.trim()) return
  store.addCollection({
    title: form.title.trim(),
    type: form.type,
    rule: form.type === 'automated' ? form.rule : undefined,
  })
  Object.assign(form, { title: '', type: 'manual', rule: '' })
  isOpen.value = false
}
</script>
