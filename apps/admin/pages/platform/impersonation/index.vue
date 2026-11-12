<template>
  <div>
    <platform-page-header :title="t('platform.impersonation.title')" :subtitle="t('platform.impersonation.subtitle')">
      <template #actions>
        <v-button icon="ph:key" icon-position="left" :label="t('platform.impersonation.requestAccess')" @click="openRequest" />
      </template>
    </platform-page-header>

    <!-- Active session banner -->
    <div
      v-if="store.activeRequest"
      class="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-danger bg-danger-dim px-4 py-3 text-danger"
    >
      <div class="flex min-w-0 items-center gap-3">
        <Icon name="ph:eye" class="shrink-0 text-xl" />
        <div class="min-w-0">
          <p class="text-xs font-semibold">{{ t('platform.impersonation.activeBanner', { store: store.activeRequest.store }) }}</p>
          <p class="text-[11px] opacity-90">
            {{ t('platform.impersonation.timeLeft') }}
            <span class="font-mono font-semibold">{{ countdown }}</span>
            <span class="font-mono"> - {{ store.activeRequest.ticket }}</span>
          </p>
        </div>
      </div>
      <v-button variant="secondary" icon="ph:sign-out" icon-position="left" :label="t('platform.impersonation.endSession')" @click="store.end()" />
    </div>

    <section class="card mb-6 overflow-hidden">
      <v-table v-if="store.requests.length" :headers="headers" :items="store.requests">
        <template #cell(requester)="{ item }">
          <p class="text-xs font-semibold text-tx-primary">{{ item.requester }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.id }} - {{ item.requestedAt }}</p>
        </template>
        <template #cell(store)="{ item }">
          <span class="text-xs text-tx-secondary">{{ item.store }}</span>
        </template>
        <template #cell(reason)="{ item }">
          <p class="max-w-[260px] truncate text-xs text-tx-secondary" :title="item.reason">{{ item.reason }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.ticket }}</p>
        </template>
        <template #cell(minutes)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ t('platform.impersonation.minutes', { n: item.minutes }) }}</span>
        </template>
        <template #cell(approver)="{ item }">
          <span class="text-xs text-tx-secondary">{{ item.approver || '-' }}</span>
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="t(`platform.impersonation.status.${item.status}`)" :tone="STATUS_TONE[item.status] ?? 'neutral'" />
        </template>
        <template #cell(actions)="{ item }">
          <div class="flex justify-end gap-2">
            <template v-if="item.status === 'pending'">
              <v-button variant="secondary" size="none" class-name="px-2.5 py-1 text-xs" :label="t('platform.impersonation.deny')" :disabled="item.requester === operator" @click="store.deny(item.id, operator)" />
              <v-button size="none" class-name="px-2.5 py-1 text-xs" :label="t('platform.impersonation.approve')" :disabled="item.requester === operator" @click="store.approve(item.id, operator)" />
            </template>
            <v-button
              v-else-if="item.status === 'approved'"
              size="none" class-name="px-2.5 py-1 text-xs"
              :label="t('platform.impersonation.start')"
              :disabled="!!store.activeRequest"
              @click="store.start(item.id)"
            />
          </div>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.impersonation.empty')" :hint="t('platform.impersonation.emptyHint')" icon="ph:key" />
    </section>

    <h2 class="mb-3 text-sm font-bold">{{ t('platform.impersonation.auditTitle') }}</h2>
    <section class="card overflow-hidden">
      <v-table v-if="store.audit.length" :headers="auditHeaders" :items="store.audit">
        <template #cell(at)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.at }}</span>
        </template>
        <template #cell(actor)="{ item }">
          <span class="text-xs text-tx-primary">{{ item.actor }}</span>
        </template>
        <template #cell(action)="{ item }">
          <span class="text-xs text-tx-secondary">{{ t(`platform.impersonation.actions.${item.action}`) }}</span>
        </template>
        <template #cell(store)="{ item }">
          <span class="text-xs text-tx-secondary">{{ item.store }}</span>
        </template>
        <template #cell(ticket)="{ item }">
          <span class="font-mono text-xs text-tx-muted">{{ item.ticket }}</span>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.impersonation.auditEmpty')" icon="ph:list-checks" />
    </section>

    <v-side-panel v-model="panelOpen" :title="t('platform.impersonation.panelTitle')" :subtitle="t('platform.impersonation.panelSubtitle')">
      <div class="space-y-4">
        <v-select-input v-model="form.store" :label="t('platform.impersonation.targetStore')" :options="storeOptions" />
        <v-textarea-input
          v-model="form.reason"
          :label="t('platform.common.reason')"
          :placeholder="t('platform.common.reasonPlaceholder')"
          :error="touched && !form.reason.trim() ? t('platform.common.reasonRequired') : ''"
          :rows="3"
        />
        <v-input
          v-model="form.ticket"
          :label="t('platform.impersonation.ticket')"
          placeholder="SUP-0000"
          input-class="font-mono"
          :error="touched && !form.ticket.trim() ? t('platform.impersonation.ticketRequired') : ''"
        />
        <v-select-input v-model="form.minutes" :label="t('platform.impersonation.duration')" :options="durationOptions" />
        <p class="rounded-md bg-info-dim px-3 py-2 text-[11px] text-info">{{ t('platform.impersonation.policyNote') }}</p>
      </div>
      <template #footer>
        <v-button class-name="w-full" icon="ph:paper-plane-tilt" icon-position="left" :label="t('platform.impersonation.submit')" @click="submit" />
      </template>
    </v-side-panel>
  </div>
</template>

<script lang="ts" setup>
import type { PlatformTone } from '@/types/platform'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()

useSeoMeta({ title: t('platform.impersonation.title'), robots: 'noindex, nofollow' })

const store = usePlatformImpersonationStore()
const merchants = usePlatformMerchantsStore()

const STATUS_TONE: Record<string, PlatformTone> = { pending: 'warning', approved: 'info', denied: 'danger', active: 'success', ended: 'neutral' }

const operator = computed(() => t('platform.topbar.operatorName'))

const headers = computed(() => [
  { label: t('platform.impersonation.requester'), key: 'requester' },
  { label: t('platform.impersonation.targetStore'), key: 'store' },
  { label: t('platform.common.reason'), key: 'reason' },
  { label: t('platform.impersonation.duration'), key: 'minutes' },
  { label: t('platform.impersonation.approver'), key: 'approver' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.common.actions'), key: 'actions', align: 'end' as const },
])
const auditHeaders = computed(() => [
  { label: t('platform.common.date'), key: 'at' },
  { label: t('platform.impersonation.actor'), key: 'actor' },
  { label: t('platform.impersonation.action'), key: 'action' },
  { label: t('platform.common.store'), key: 'store' },
  { label: t('platform.impersonation.ticket'), key: 'ticket' },
])

const countdown = computed(() => {
  const s = store.remainingSeconds
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
})

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => store.tick(), 1000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const storeOptions = computed(() => merchants.merchants.map((m) => ({ value: m.store, label: m.store })))
const durationOptions = computed(() => [15, 30, 60].map((n) => ({ value: n, label: t('platform.impersonation.minutes', { n }) })))

const panelOpen = ref(false)
const touched = ref(false)
const form = reactive({ store: '', reason: '', ticket: '', minutes: 30 })

const openRequest = () => {
  form.store = merchants.merchants[0]?.store ?? ''
  form.reason = ''
  form.ticket = ''
  form.minutes = 30
  touched.value = false
  panelOpen.value = true
}

const submit = () => {
  touched.value = true
  if (!form.store || !form.reason.trim() || !form.ticket.trim()) return
  const minutes = Number(form.minutes)
  store.request({
    requester: operator.value,
    store: form.store,
    reason: form.reason.trim(),
    ticket: form.ticket.trim(),
    minutes: minutes === 15 || minutes === 60 ? minutes : 30,
  })
  panelOpen.value = false
}
</script>
