<template>
  <div>
    <platform-page-header :title="t('platform.kyc.title')" :subtitle="t('platform.kyc.subtitle')" />

    <section class="card overflow-hidden">
      <div class="border-b border-border-subtle px-4 pt-3.5">
        <v-tabs v-model="tab" :tabs="tabs" />
      </div>

      <v-table v-if="filtered.length" :headers="headers" :items="filtered" table-class="cursor-pointer" @row-click="select">
        <template #cell(store)="{ item }">
          <p class="text-xs font-semibold text-tx-primary">{{ item.store }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
        </template>
        <template #cell(owner)="{ item }">
          <span class="text-xs text-tx-secondary">{{ item.owner }}</span>
        </template>
        <template #cell(businessType)="{ item }">
          <span class="text-xs text-tx-secondary">{{ t(`platform.kyc.businessTypes.${item.businessType}`) }}</span>
        </template>
        <template #cell(submittedAt)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.submittedAt }}</span>
        </template>
        <template #cell(documents)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.documents.length }}</span>
        </template>
        <template #cell(risk)="{ item }">
          <span class="font-mono text-xs font-semibold" :class="riskClass(item.risk)">{{ item.risk }}</span>
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="statusLabel(item)" :tone="statusTone(item)" />
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.kyc.empty')" :hint="t('platform.kyc.emptyHint')" icon="ph:identification-card" />
    </section>

    <v-side-panel v-model="panelOpen" :title="active?.store ?? ''" :subtitle="active?.id ?? ''" width="lg">
      <template v-if="active">
        <div class="mb-4 flex flex-wrap items-center gap-2">
          <platform-status-pill :label="statusLabel(active)" :tone="statusTone(active)" />
          <span class="text-xs text-tx-secondary">{{ active.owner }}</span>
          <span class="text-[11px] text-tx-muted">{{ t(`platform.kyc.businessTypes.${active.businessType}`) }}</span>
          <span class="ms-auto text-[11px] text-tx-muted">
            {{ t('platform.kyc.riskScore') }}
            <span class="font-mono text-xs font-semibold" :class="riskClass(active.risk)">{{ active.risk }}</span>
          </span>
        </div>

        <h4 class="mb-2 text-eyebrow">{{ t('platform.kyc.documents') }}</h4>
        <div class="mb-5 grid grid-cols-2 gap-2">
          <div
            v-for="doc in active.documents"
            :key="doc.kind"
            class="flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border-default bg-bg-base px-3 py-5 text-center"
          >
            <Icon :name="doc.kind === 'selfie' ? 'ph:user-focus' : 'ph:file-text'" class="text-2xl text-tx-muted" />
            <p class="text-[11px] font-semibold text-tx-secondary">{{ t(`platform.kyc.docKinds.${doc.kind}`) }}</p>
            <p class="font-mono text-[10px] text-tx-muted">{{ doc.file }}</p>
          </div>
        </div>

        <h4 class="mb-2 text-eyebrow">{{ t('platform.kyc.checklist') }}</h4>
        <ul class="space-y-2">
          <li v-for="key in checkKeys" :key="key" class="rounded-md border border-border-subtle bg-bg-base px-3 py-2">
            <v-input
              type="checkbox"
              :model-value="active.checks[key]"
              :label="t(`platform.kyc.checks.${key}`)"
              :disabled="active.status !== 'pending'"
              @update:model-value="store.toggleCheck(active.id, key)"
            />
          </li>
        </ul>

        <p v-if="active.infoRequested" class="mt-4 rounded-md bg-info-dim px-3 py-2 text-[11px] text-info">
          {{ t('platform.kyc.infoRequestedNote') }}
        </p>
        <div v-if="active.status === 'rejected' && active.decisionReason" class="mt-4 rounded-md bg-danger-dim px-3 py-2 text-[11px] text-danger">
          <p class="font-semibold">{{ t('platform.kyc.rejectionReason') }}</p>
          <p class="mt-1">{{ active.decisionReason }}</p>
        </div>
      </template>

      <template v-if="active && active.status === 'pending'" #footer>
        <div class="grid grid-cols-3 gap-2">
          <v-button variant="secondary" icon="ph:chat-circle-text" icon-position="left" :label="t('platform.kyc.requestInfo')" :disabled="active.infoRequested" @click="store.requestInfo(active.id)" />
          <v-button variant="secondary" icon="ph:x" icon-position="left" :label="t('platform.kyc.reject')" @click="openReject" />
          <v-button icon="ph:check" icon-position="left" :label="t('platform.kyc.approve')" :disabled="!allChecked" @click="approve" />
        </div>
        <p v-if="!allChecked" class="mt-2 text-[10px] text-tx-muted">{{ t('platform.kyc.approveBlocked') }}</p>
      </template>
    </v-side-panel>

    <v-dialog v-model="rejectOpen" :title="t('platform.kyc.rejectTitle')">
      <p class="mb-4 text-xs text-tx-secondary">{{ t('platform.kyc.rejectBody', { store: active?.store ?? '' }) }}</p>
      <v-textarea-input
        v-model="reason"
        :label="t('platform.common.reason')"
        :placeholder="t('platform.common.reasonPlaceholder')"
        :error="reasonError"
        :rows="3"
      />
      <template #footer>
        <v-button variant="secondary" :label="t('platform.common.cancel')" @click="rejectOpen = false" />
        <v-button :label="t('platform.common.confirm')" :disabled="!reason.trim()" @click="confirmReject" />
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { PlatformTone } from '@/types/platform'
import type { KycCase, KycCheckKey } from '@/types/platformOps'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()

useSeoMeta({ title: t('platform.kyc.title'), robots: 'noindex, nofollow' })

const store = usePlatformKycStore()

const STATUS_TONE: Record<string, PlatformTone> = { pending: 'warning', approved: 'success', rejected: 'danger', infoRequested: 'info' }
const checkKeys: KycCheckKey[] = ['idMatch', 'selfie', 'commercialRegister', 'taxCard', 'bankAccount', 'addressProof']

const tab = ref('pending')
const countOf = (status: string) => store.cases.filter((c) => c.status === status).length

const tabs = computed(() => [
  { name: t('platform.kyc.tabs.pending'), value: 'pending', count: countOf('pending') },
  { name: t('platform.kyc.tabs.approved'), value: 'approved', count: countOf('approved') },
  { name: t('platform.kyc.tabs.rejected'), value: 'rejected', count: countOf('rejected') },
])

const headers = computed(() => [
  { label: t('platform.common.store'), key: 'store' },
  { label: t('platform.common.owner'), key: 'owner' },
  { label: t('platform.kyc.businessType'), key: 'businessType' },
  { label: t('platform.kyc.submittedAt'), key: 'submittedAt' },
  { label: t('platform.kyc.documentsCount'), key: 'documents', align: 'end' as const },
  { label: t('platform.kyc.risk'), key: 'risk', align: 'end' as const },
  { label: t('platform.common.status'), key: 'status' },
])

const filtered = computed(() => store.cases.filter((c) => c.status === tab.value))

const statusKey = (c: KycCase) => (c.status === 'pending' && c.infoRequested ? 'infoRequested' : c.status)
const statusLabel = (c: KycCase) => t(`platform.kyc.status.${statusKey(c)}`)
const statusTone = (c: KycCase): PlatformTone => STATUS_TONE[statusKey(c)] ?? 'neutral'
const riskClass = (risk: number) => (risk >= 60 ? 'text-danger' : risk >= 30 ? 'text-warning' : 'text-success')

const activeId = ref<string | null>(null)
const panelOpen = ref(false)
const active = computed(() => store.cases.find((c) => c.id === activeId.value) ?? null)
const allChecked = computed(() => (active.value ? checkKeys.every((k) => active.value!.checks[k]) : false))

const select = (item: { id: string }) => {
  activeId.value = item.id
  panelOpen.value = true
}

const approve = () => {
  if (!activeId.value || !allChecked.value) return
  store.approve(activeId.value)
  panelOpen.value = false
}

const rejectOpen = ref(false)
const reason = ref('')
const reasonError = computed(() => (rejectOpen.value && !reason.value.trim() ? t('platform.common.reasonRequired') : ''))

const openReject = () => {
  reason.value = ''
  rejectOpen.value = true
}

const confirmReject = () => {
  if (!activeId.value || !reason.value.trim()) return
  store.reject(activeId.value, reason.value.trim())
  rejectOpen.value = false
  panelOpen.value = false
}
</script>
