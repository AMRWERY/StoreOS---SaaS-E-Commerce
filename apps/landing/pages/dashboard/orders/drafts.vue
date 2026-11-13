<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.drafts.title')"
          :subtitle="t('dashboard.ops.drafts.subtitle')"
          :count="drafts.length"
        >
          <LazyVButton
            to="/dashboard/orders/order-form"
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.drafts.create')"
          />
        </ops-page-header>

        <section class="card overflow-hidden">
          <LazyVTable v-if="drafts.length" :headers="headers" :items="drafts">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(items)="{ item }">
              <span class="font-mono text-sm">{{ item.items }}</span>
            </template>
            <template #cell(total)="{ item }">
              <span class="font-mono text-sm">{{ money(item.total) }}</span>
            </template>
            <template #cell(createdAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.createdAt }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.drafts.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <button
                v-if="item.status !== 'completed'"
                class="text-tx-muted hover:text-danger transition-colors"
                :aria-label="t('dashboard.ops.common.delete')"
                @click="removeDraft(item.id)"
              >
                <Icon name="ph:trash-bold" />
              </button>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.drafts.empty')"
            :hint="t('dashboard.ops.drafts.emptyHint')"
            icon="ph:file-text-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.drafts.title') })

const store = useDraftOrdersStore()
const { drafts } = storeToRefs(store)
const { removeDraft } = store

const tones: Record<string, Tone> = { open: 'warning', invoice_sent: 'info', completed: 'success' }

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.drafts.id') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'items', label: t('dashboard.ops.common.items'), align: 'center' as const },
  { key: 'total', label: t('dashboard.ops.common.amount') },
  { key: 'createdAt', label: t('dashboard.ops.common.date') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
