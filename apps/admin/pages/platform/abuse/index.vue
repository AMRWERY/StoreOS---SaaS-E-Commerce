<template>
  <div>
    <platform-page-header :title="t('platform.abuse.title')" :subtitle="t('platform.abuse.subtitle')" />

    <section class="card overflow-hidden">
      <v-table v-if="store.cases.length" :headers="headers" :items="store.cases" table-class="cursor-pointer" @row-click="select">
        <template #cell(id)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.id }}</span>
        </template>
        <template #cell(store)="{ item }">
          <span class="text-xs font-semibold text-tx-primary">{{ item.store }}</span>
        </template>
        <template #cell(signal)="{ item }">
          <span class="text-xs text-tx-secondary">{{ t(`platform.abuse.signal.${item.signal}`) }}</span>
        </template>
        <template #cell(severity)="{ item }">
          <platform-status-pill :label="t(`platform.severity.${item.severity}`)" :tone="tones.severity(item.severity)" />
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="t(`platform.status.${item.status}`)" :tone="tones.abuseStatus(item.status)" />
        </template>
        <template #cell(reportedAt)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.reportedAt }}</span>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.abuse.empty')" :hint="t('platform.abuse.emptyHint')" icon="ph:shield-check" />
    </section>

    <v-side-panel v-model="panelOpen" :title="active?.store ?? ''" :subtitle="active?.id ?? ''" width="lg">
      <template v-if="active">
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <platform-status-pill :label="t(`platform.severity.${active.severity}`)" :tone="tones.severity(active.severity)" />
          <platform-status-pill :label="t(`platform.status.${active.status}`)" :tone="tones.abuseStatus(active.status)" />
          <span class="text-xs text-tx-secondary">{{ t(`platform.abuse.signal.${active.signal}`) }}</span>
        </div>

        <h4 class="mb-2 text-eyebrow">{{ t('platform.abuse.evidence.title') }}</h4>
        <ul class="space-y-2">
          <li
            v-for="(ev, i) in active.evidence"
            :key="i"
            class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-base px-3 py-2 text-xs"
          >
            <span class="text-tx-muted">{{ t(`platform.abuse.evidence.${ev.kind}`) }}</span>
            <span class="font-mono text-tx-primary">{{ ev.kind === 'chargebackRate' ? `${ev.value}%` : ev.value }}</span>
          </li>
        </ul>
        <p class="mt-4 text-[11px] text-tx-muted">
          {{ t('platform.abuse.reportedOn') }} <span class="font-mono">{{ active.reportedAt }}</span>
        </p>
      </template>

      <template #footer>
        <div class="grid grid-cols-3 gap-2">
          <v-button variant="secondary" icon="ph:check" icon-position="left" :label="t('platform.abuse.approve')" @click="act('cleared')" />
          <v-button variant="secondary" icon="ph:prohibit" icon-position="left" :label="t('platform.abuse.suspend')" @click="act('suspended')" />
          <v-button icon="ph:arrow-up-right" icon-position="left" :label="t('platform.abuse.escalate')" @click="act('escalated')" />
        </div>
      </template>
    </v-side-panel>
  </div>
</template>

<script lang="ts" setup>
import type { AbuseStatus } from '@/types/platform'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()
const tones = usePlatformTones()

useSeoMeta({ title: t('platform.abuse.title'), robots: 'noindex, nofollow' })

const store = usePlatformAbuseStore()

const headers = computed(() => [
  { label: t('platform.common.id'), key: 'id' },
  { label: t('platform.common.store'), key: 'store' },
  { label: t('platform.abuse.signalLabel'), key: 'signal' },
  { label: t('platform.common.severity'), key: 'severity' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.abuse.reportedOn'), key: 'reportedAt', align: 'end' as const },
])

const activeId = ref<string | null>(null)
const panelOpen = ref(false)
const active = computed(() => store.cases.find((c) => c.id === activeId.value) ?? null)

const select = (item: { id: string }) => {
  activeId.value = item.id
  panelOpen.value = true
}

const act = (status: AbuseStatus) => {
  if (activeId.value) store.setStatus(activeId.value, status)
}
</script>
