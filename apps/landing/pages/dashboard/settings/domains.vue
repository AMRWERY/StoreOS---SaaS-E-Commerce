<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.domains.title')"
          :subtitle="t('dashboard.ops.domains.subtitle')"
          :count="domains.length + 1"
        >
          <LazyVButton
            icon="ph:plus-bold"
            :label="t('dashboard.ops.domains.add')"
            @click="panelOpen = true"
          />
        </ops-page-header>

        <section class="card p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-[10px] font-bold text-tx-muted tracking-widest">{{ t('dashboard.ops.domains.subdomain') }}</p>
            <p class="font-mono text-sm mt-1">{{ subdomain }}</p>
          </div>
          <div class="flex items-center gap-2">
            <status-pill tone="success">{{ t('dashboard.ops.domains.ssl.active') }}</status-pill>
            <status-pill v-if="!hasPrimary" tone="info">{{ t('dashboard.ops.domains.primary') }}</status-pill>
          </div>
        </section>

        <section class="card overflow-hidden">
          <LazyVTable v-if="domains.length" :headers="headers" :items="domains">
            <template #cell(host)="{ item }">
              <button type="button" class="font-mono text-sm text-start hover:text-brand transition-colors" @click="selectedId = item.id">
                {{ item.host }}
              </button>
              <status-pill v-if="item.primary" tone="info" class="ms-2">{{ t('dashboard.ops.domains.primary') }}</status-pill>
            </template>
            <template #cell(verification)="{ item }">
              <status-pill :tone="verifyTones[item.verification]">
                {{ t(`dashboard.ops.domains.verification.${item.verification}`) }}
              </status-pill>
            </template>
            <template #cell(ssl)="{ item }">
              <status-pill :tone="sslTones[item.ssl]">
                {{ t(`dashboard.ops.domains.ssl.${item.ssl}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end gap-2">
                <LazyVButton
                  v-if="!item.primary && item.verification === 'verified'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.domains.setPrimary')"
                  @click="setPrimary(item.id)"
                />
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.common.delete')"
                  @click="remove(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.domains.empty')"
            :hint="t('dashboard.ops.domains.emptyHint')"
            icon="ph:globe-bold"
          />
        </section>

        <section v-if="selected" class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">
              {{ t('dashboard.ops.domains.dnsRecords') }}
              <span class="font-mono text-tx-muted text-xs ms-2">{{ selected.host }}</span>
            </h2>
          </div>
          <LazyVTable :headers="dnsHeaders" :items="selected.records">
            <template #cell(type)="{ item }">
              <span class="font-mono text-xs font-semibold text-brand">{{ item.type }}</span>
            </template>
            <template #cell(host)="{ item }">
              <span class="font-mono text-xs">{{ item.host }}</span>
            </template>
            <template #cell(value)="{ item }">
              <span class="font-mono text-xs text-tx-secondary break-all">{{ item.value }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-2 py-1 text-[11px]"
                  icon="ph:copy-bold"
                  :label="t('dashboard.ops.domains.copy')"
                  @click="copy(item.value)"
                />
              </div>
            </template>
          </LazyVTable>
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="t('dashboard.ops.domains.add')"
      :subtitle="t('dashboard.ops.domains.addHint')"
    >
      <div class="p-4 space-y-4">
        <LazyVInput
          v-model="newHost"
          :label="t('dashboard.ops.domains.hostLabel')"
          placeholder="shop.example.com"
          inputClass="font-mono"
        />
        <p class="text-[11px] text-tx-muted">{{ t('dashboard.ops.domains.dnsNote') }}</p>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <LazyVButton
            variant="ghost"
            size="none"
            className="px-4 py-2 text-xs"
            :label="t('dashboard.ops.domains.cancel')"
            @click="panelOpen = false"
          />
          <LazyVButton
            size="none"
            className="px-4 py-2 text-xs"
            :label="t('dashboard.ops.domains.add')"
            @click="submit"
          />
        </div>
      </template>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.domains.title') })

const store = useStoreDomainsStore()
const { subdomain, domains, selectedId, selected } = storeToRefs(store)
const { setPrimary, remove, add } = store

const panelOpen = ref(false)
const newHost = ref('')
const hasPrimary = computed(() => domains.value.some((d) => d.primary))

const verifyTones: Record<string, Tone> = { pending: 'warning', verified: 'success', failed: 'danger' }
const sslTones: Record<string, Tone> = { issuing: 'warning', active: 'success', expired: 'danger' }

function submit() {
  add(newHost.value)
  newHost.value = ''
  panelOpen.value = false
}
function copy(value: string) {
  if (import.meta.client) navigator.clipboard?.writeText(value).catch(() => {})
}

const headers = computed(() => [
  { key: 'host', label: t('dashboard.ops.domains.domain') },
  { key: 'verification', label: t('dashboard.ops.domains.verificationLabel') },
  { key: 'ssl', label: t('dashboard.ops.domains.sslLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
const dnsHeaders = computed(() => [
  { key: 'type', label: t('dashboard.ops.domains.dnsType') },
  { key: 'host', label: t('dashboard.ops.domains.dnsHost') },
  { key: 'value', label: t('dashboard.ops.domains.dnsValue') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
