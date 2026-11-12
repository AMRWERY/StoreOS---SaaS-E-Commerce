<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.legal.title')"
          :subtitle="t('dashboard.ops.legal.subtitle')"
          :count="documents.length"
        />

        <section v-if="documents.length" class="space-y-3">
          <div v-for="d in documents" :key="d.key" class="card p-4 space-y-3">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="space-y-1">
                <h2 class="text-sm font-semibold">{{ t(`dashboard.ops.legal.docs.${d.key}.title`) }}</h2>
                <p class="text-xs text-tx-secondary">{{ t(`dashboard.ops.legal.docs.${d.key}.hint`) }}</p>
                <p class="text-[11px] text-tx-muted">
                  {{ t('dashboard.ops.legal.version') }}
                  <span class="font-mono">{{ d.version }}</span>
                  <span class="mx-1">/</span>
                  {{ t('dashboard.ops.legal.updated') }}
                  <span class="font-mono">{{ d.updatedAt }}</span>
                </p>
              </div>
              <status-pill :tone="d.accepted ? 'success' : 'warning'">
                {{ d.accepted ? t('dashboard.ops.legal.accepted') : t('dashboard.ops.legal.pending') }}
              </status-pill>
            </div>

            <p v-if="d.accepted" class="text-[11px] text-tx-muted">
              {{ t('dashboard.ops.legal.acceptedBy') }}
              <span class="text-tx-secondary">{{ d.acceptedBy }}</span>
              <span class="mx-1">/</span>
              <span class="font-mono">{{ d.acceptedAt }}</span>
            </p>

            <div class="flex flex-wrap items-center justify-between gap-3">
              <LazyVInput
                v-if="!d.accepted"
                v-model="ack[d.key]"
                type="checkbox"
                :label="t(`dashboard.ops.legal.docs.${d.key}.ack`)"
              />
              <span v-else />
              <div class="flex gap-2">
                <LazyVButton
                  size="none"
                  variant="secondary"
                  className="px-3 py-1.5 text-xs"
                  :label="t('dashboard.ops.legal.read')"
                  @click="reading = d.key"
                />
                <LazyVButton
                  v-if="!d.accepted"
                  size="none"
                  className="px-3 py-1.5 text-xs"
                  :disabled="!ack[d.key]"
                  :label="t('dashboard.ops.legal.accept')"
                  @click="accept(d.key, signer)"
                />
              </div>
            </div>
          </div>
        </section>
        <ops-empty-state
          v-else
          :title="t('dashboard.ops.legal.empty')"
          :hint="t('dashboard.ops.legal.emptyHint')"
          icon="ph:scroll-bold"
        />

        <section class="card p-4 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <Icon name="ph:file-pdf-bold" class="text-xl text-brand shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-semibold">{{ t('dashboard.ops.legal.dpa.title') }}</p>
              <p class="text-xs text-tx-secondary">{{ t('dashboard.ops.legal.dpa.hint') }}</p>
              <p class="text-[11px] font-mono text-tx-muted mt-1">storeos-dpa-2026-09.pdf</p>
            </div>
          </div>
          <LazyVButton
            size="none"
            variant="secondary"
            icon="ph:download-simple-bold"
            className="px-3 py-1.5 text-xs"
            :label="t('dashboard.ops.legal.dpa.download')"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.legal.history') }}</h2>
          </div>
          <LazyVTable v-if="history.length" :headers="historyHeaders" :items="history">
            <template #cell(doc)="{ item }">
              <span class="text-sm">{{ t(`dashboard.ops.legal.docs.${item.doc}.title`) }}</span>
            </template>
            <template #cell(version)="{ item }">
              <span class="font-mono text-xs">{{ item.version }}</span>
            </template>
            <template #cell(acceptedAt)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.acceptedAt }}</span>
            </template>
            <template #cell(ip)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.ip }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.legal.emptyHistory')"
            :hint="t('dashboard.ops.legal.emptyHistoryHint')"
            icon="ph:clock-counter-clockwise-bold"
          />
        </section>
      </div>
    </div>

    <LazyVDialog
      v-model="readOpen"
      maxWidth="2xl"
      :title="reading ? t(`dashboard.ops.legal.docs.${reading}.title`) : ''"
    >
      <div class="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
        <p v-for="n in 3" :key="n" class="text-xs text-tx-secondary leading-relaxed">
          {{ reading ? t(`dashboard.ops.legal.docs.${reading}.body${n}`) : '' }}
        </p>
      </div>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { LegalDocument } from '@/types/trust'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.legal.title') })

const store = useTrustLegalStore()
const { documents, history } = storeToRefs(store)
const { accept } = store

const signer = 'Amr Mohamed'
const ack = ref<Record<string, boolean>>({ tos: false, aup: false, refund: false })

const reading = ref<LegalDocument['key'] | null>(null)
const readOpen = computed({
  get: () => reading.value !== null,
  set: (v: boolean) => {
    if (!v) reading.value = null
  },
})

const historyHeaders = computed(() => [
  { key: 'doc', label: t('dashboard.ops.legal.document') },
  { key: 'version', label: t('dashboard.ops.legal.version') },
  { key: 'acceptedBy', label: t('dashboard.ops.legal.acceptedBy') },
  { key: 'acceptedAt', label: t('dashboard.ops.legal.acceptedAt') },
  { key: 'ip', label: t('dashboard.ops.legal.ip') },
])
</script>
