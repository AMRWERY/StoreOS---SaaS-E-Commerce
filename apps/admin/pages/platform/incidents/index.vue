<template>
  <div>
    <platform-page-header :title="t('platform.incidents.title')" :subtitle="t('platform.incidents.subtitle')">
      <template #actions>
        <v-button icon="ph:plus" icon-position="left" :label="t('platform.incidents.report')" @click="openCreate" />
      </template>
    </platform-page-header>

    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <platform-kpi-card
        :label="t('platform.incidents.sla.uptime')"
        :value="`${store.sla.uptimeActual}%`"
        icon="ph:chart-line-up"
        :icon-color="store.sla.uptimeActual >= store.sla.uptimeTarget ? 'text-success' : 'text-danger'"
        :sub="t('platform.incidents.sla.target', { value: `${store.sla.uptimeTarget}%` })"
      />
      <platform-kpi-card
        :label="t('platform.incidents.sla.rpo')"
        :value="t('platform.incidents.minutes', { n: store.sla.rpoActualMin })"
        icon="ph:database"
        :icon-color="store.sla.rpoActualMin <= store.sla.rpoTargetMin ? 'text-success' : 'text-danger'"
        :sub="t('platform.incidents.sla.target', { value: t('platform.incidents.minutes', { n: store.sla.rpoTargetMin }) })"
      />
      <platform-kpi-card
        :label="t('platform.incidents.sla.rto')"
        :value="t('platform.incidents.minutes', { n: store.sla.rtoActualMin })"
        icon="ph:timer"
        :icon-color="store.sla.rtoActualMin <= store.sla.rtoTargetMin ? 'text-success' : 'text-danger'"
        :sub="t('platform.incidents.sla.target', { value: t('platform.incidents.minutes', { n: store.sla.rtoTargetMin }) })"
      />
    </div>

    <section class="card overflow-hidden">
      <v-table v-if="store.incidents.length" :headers="headers" :items="store.incidents" table-class="cursor-pointer" @row-click="select">
        <template #cell(title)="{ item }">
          <p class="text-xs font-semibold text-tx-primary">{{ locale === 'ar' ? item.titleAr : item.title }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
        </template>
        <template #cell(severity)="{ item }">
          <platform-status-pill :label="t(`platform.incidents.sev.${item.severity}`)" :tone="SEV_TONE[item.severity] ?? 'neutral'" />
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="t(`platform.incidents.status.${item.status}`)" :tone="STATUS_TONE[item.status] ?? 'neutral'" />
        </template>
        <template #cell(startedAt)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.startedAt }}</span>
        </template>
        <template #cell(duration)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ duration(item.durationMin) }}</span>
        </template>
        <template #cell(postmortem)="{ item }">
          <a
            v-if="item.postmortem"
            :href="item.postmortem"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-xs text-brand hover:underline"
            @click.stop
          >
            {{ t('platform.incidents.postmortemLink') }}
            <Icon name="ph:arrow-square-out" class="text-sm" />
          </a>
          <span v-else class="text-xs text-tx-muted">{{ item.status === 'resolved' ? t('platform.incidents.postmortemPending') : '-' }}</span>
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.incidents.empty')" :hint="t('platform.incidents.emptyHint')" icon="ph:shield-check" />
    </section>

    <v-side-panel
      v-model="panelOpen"
      :title="active ? t('platform.incidents.updateTitle') : t('platform.incidents.createTitle')"
      :subtitle="active?.id ?? ''"
      width="lg"
    >
      <div class="space-y-4">
        <template v-if="!active">
          <v-input v-model="form.title" :label="t('platform.incidents.titleEn')" />
          <v-input v-model="form.titleAr" :label="t('platform.incidents.titleAr')" dir="rtl" />
          <v-select-input v-model="form.severity" :label="t('platform.common.severity')" :options="severityOptions" />
        </template>
        <v-select-input v-else v-model="form.status" :label="t('platform.common.status')" :options="statusOptions" />

        <v-textarea-input v-model="form.message" :label="t('platform.incidents.message')" :rows="2" />
        <v-textarea-input v-model="form.messageAr" :label="t('platform.incidents.messageAr')" :rows="2" dir="rtl" textarea-class="text-start" />

        <div class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-base px-3 py-2.5">
          <div class="min-w-0">
            <p class="text-xs font-semibold text-tx-primary">{{ t('platform.incidents.publish') }}</p>
            <p class="text-[10px] text-tx-muted">{{ t('platform.incidents.publishHint') }}</p>
          </div>
          <v-switch-button :model-value="form.published" @update:model-value="(v: boolean) => (form.published = v)" />
        </div>

        <div v-if="active">
          <h4 class="mb-2 text-eyebrow">{{ t('platform.incidents.timeline') }}</h4>
          <ol v-if="active.updates.length" class="space-y-3 border-s border-border-subtle ps-4">
            <li v-for="u in active.updates" :key="u.id" class="relative">
              <span class="absolute -start-[21px] top-1.5 h-2 w-2 rounded-full bg-brand"></span>
              <div class="flex flex-wrap items-center gap-2">
                <platform-status-pill :label="t(`platform.incidents.status.${u.status}`)" :tone="STATUS_TONE[u.status] ?? 'neutral'" />
                <span class="font-mono text-[10px] text-tx-muted">{{ u.at }}</span>
              </div>
              <p class="mt-1 text-xs text-tx-secondary">{{ locale === 'ar' ? u.messageAr : u.message }}</p>
            </li>
          </ol>
          <platform-empty-state v-else :title="t('platform.incidents.timelineEmpty')" icon="ph:clock-countdown" />
        </div>
      </div>

      <template #footer>
        <v-button
          class-name="w-full"
          :label="active ? t('platform.incidents.postUpdate') : t('platform.incidents.create')"
          :disabled="!canSubmit"
          @click="submit"
        />
      </template>
    </v-side-panel>
  </div>
</template>

<script lang="ts" setup>
import type { PlatformTone } from '@/types/platform'
import type { IncidentSeverity, IncidentStatus } from '@/types/platformOps'

definePageMeta({ layout: 'platform' })

const { t, locale } = useI18n()

useSeoMeta({ title: t('platform.incidents.title'), robots: 'noindex, nofollow' })

const store = usePlatformIncidentsStore()

const SEV_TONE: Record<string, PlatformTone> = { sev1: 'danger', sev2: 'warning', sev3: 'yellow' }
const STATUS_TONE: Record<string, PlatformTone> = { investigating: 'danger', identified: 'warning', monitoring: 'info', resolved: 'success' }

const headers = computed(() => [
  { label: t('platform.incidents.headers.title'), key: 'title' },
  { label: t('platform.common.severity'), key: 'severity' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.incidents.headers.started'), key: 'startedAt' },
  { label: t('platform.incidents.headers.duration'), key: 'duration', align: 'end' as const },
  { label: t('platform.incidents.headers.postmortem'), key: 'postmortem' },
])

const duration = (min: number) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  return h ? t('platform.incidents.hm', { h, m }) : t('platform.incidents.m', { m })
}

const severityOptions = computed(() => (['sev1', 'sev2', 'sev3'] as const).map((v) => ({ value: v, label: t(`platform.incidents.sev.${v}`) })))
const statusOptions = computed(() => (['investigating', 'identified', 'monitoring', 'resolved'] as const).map((v) => ({ value: v, label: t(`platform.incidents.status.${v}`) })))

const activeId = ref<string | null>(null)
const panelOpen = ref(false)
const active = computed(() => store.incidents.find((i) => i.id === activeId.value) ?? null)

const form = reactive({
  title: '', titleAr: '', severity: 'sev2' as IncidentSeverity,
  status: 'investigating' as IncidentStatus, message: '', messageAr: '', published: true,
})

const canSubmit = computed(() => !!form.message.trim() && (active.value ? true : !!form.title.trim()))

const reset = () => {
  Object.assign(form, { title: '', titleAr: '', severity: 'sev2', status: 'investigating', message: '', messageAr: '', published: true })
}

const openCreate = () => {
  activeId.value = null
  reset()
  panelOpen.value = true
}

const select = (item: { id: string }) => {
  const target = store.incidents.find((i) => i.id === item.id)
  if (!target) return
  activeId.value = item.id
  reset()
  form.status = target.status
  form.published = target.published
  panelOpen.value = true
}

const submit = () => {
  if (!canSubmit.value) return
  if (active.value) {
    store.addUpdate(active.value.id, { status: form.status, message: form.message.trim(), messageAr: form.messageAr.trim(), published: form.published })
    form.message = ''
    form.messageAr = ''
  } else {
    store.create({ title: form.title.trim(), titleAr: form.titleAr.trim(), severity: form.severity, message: form.message.trim(), messageAr: form.messageAr.trim(), published: form.published })
    panelOpen.value = false
  }
}
</script>
