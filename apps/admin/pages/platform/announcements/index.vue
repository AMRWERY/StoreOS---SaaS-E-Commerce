<template>
  <div>
    <platform-page-header :title="t('platform.announcements.title')" :subtitle="t('platform.announcements.subtitle')">
      <template #actions>
        <v-button icon="ph:plus" icon-position="left" :label="t('platform.announcements.create')" @click="openCreate" />
      </template>
    </platform-page-header>

    <section class="card overflow-hidden">
      <v-table v-if="store.items.length" :headers="headers" :items="store.items">
        <template #cell(title)="{ item }">
          <p class="text-xs font-semibold text-tx-primary">{{ locale === 'ar' ? item.titleAr : item.titleEn }}</p>
          <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
        </template>
        <template #cell(audience)="{ item }">
          <p class="text-xs text-tx-secondary">{{ t(`platform.announcements.audience.${item.audience}`) }}</p>
          <p v-if="item.audience !== 'all'" class="text-[10px] text-tx-muted">{{ audienceDetail(item) }}</p>
        </template>
        <template #cell(severity)="{ item }">
          <platform-status-pill :label="t(`platform.announcements.severity.${item.severity}`)" :tone="SEVERITY_TONE[item.severity] ?? 'neutral'" />
        </template>
        <template #cell(schedule)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.startAt }} - {{ item.endAt }}</span>
        </template>
        <template #cell(status)="{ item }">
          <platform-status-pill :label="t(`platform.announcements.status.${item.status}`)" :tone="STATUS_TONE[item.status] ?? 'neutral'" />
        </template>
        <template #cell(actions)="{ item }">
          <v-button
            v-if="item.status === 'live' || item.status === 'scheduled'"
            variant="secondary"
            size="none" class-name="px-2.5 py-1 text-xs"
            :label="t('platform.announcements.expire')"
            @click="store.expire(item.id)"
          />
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.announcements.empty')" :hint="t('platform.announcements.emptyHint')" icon="ph:megaphone" />
    </section>

    <v-side-panel v-model="panelOpen" :title="t('platform.announcements.createTitle')" :subtitle="t('platform.announcements.createSubtitle')" width="lg">
      <div class="space-y-4">
        <v-input v-model="draft.titleEn" :label="t('platform.announcements.titleEn')" />
        <v-input v-model="draft.titleAr" :label="t('platform.announcements.titleAr')" dir="rtl" />
        <v-textarea-input v-model="draft.bodyEn" :label="t('platform.announcements.bodyEn')" :rows="2" />
        <v-textarea-input v-model="draft.bodyAr" :label="t('platform.announcements.bodyAr')" :rows="2" dir="rtl" textarea-class="text-start" />

        <div class="grid grid-cols-2 gap-3">
          <v-select-input v-model="draft.audience" :label="t('platform.announcements.audienceLabel')" :options="audienceOptions" />
          <v-select-input v-model="draft.severity" :label="t('platform.announcements.severityLabel')" :options="severityOptions" />
        </div>
        <v-select-input
          v-if="draft.audience === 'plan'"
          v-model="draft.plan"
          :label="t('platform.announcements.planLabel')"
          :options="planOptions"
        />
        <v-select-input
          v-if="draft.audience === 'segment'"
          v-model="draft.segment"
          :label="t('platform.announcements.segmentLabel')"
          :options="segmentOptions"
        />
        <div class="grid grid-cols-2 gap-3">
          <v-input v-model="draft.startAt" type="date" :label="t('platform.announcements.startAt')" />
          <v-input v-model="draft.endAt" type="date" :label="t('platform.announcements.endAt')" />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between gap-2">
            <h4 class="text-eyebrow">{{ t('platform.announcements.preview') }}</h4>
            <div class="flex gap-1">
              <button
                v-for="code in (['en', 'ar'] as const)"
                :key="code"
                type="button"
                class="rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors"
                :class="previewLang === code ? 'bg-brand-dim text-brand' : 'bg-bg-elevated text-tx-secondary hover:text-tx-primary'"
                @click="previewLang = code"
              >
                {{ t(`platform.announcements.previewLang.${code}`) }}
              </button>
            </div>
          </div>
          <div
            class="flex items-start gap-2 rounded-md px-3 py-2.5"
            :class="BANNER_CLASS[draft.severity]"
            :dir="previewLang === 'ar' ? 'rtl' : 'ltr'"
          >
            <Icon :name="BANNER_ICON[draft.severity]" class="mt-0.5 shrink-0 text-base" />
            <div class="min-w-0 text-xs">
              <p class="font-semibold">{{ previewTitle || t('platform.announcements.previewPlaceholder') }}</p>
              <p v-if="previewBody" class="mt-0.5 opacity-90">{{ previewBody }}</p>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="grid grid-cols-2 gap-2">
          <v-button variant="secondary" :label="t('platform.announcements.saveDraft')" :disabled="!canSave" @click="save('draft')" />
          <v-button :label="t('platform.announcements.publish')" :disabled="!canSave" @click="save('scheduled')" />
        </div>
      </template>
    </v-side-panel>
  </div>
</template>

<script lang="ts" setup>
import type { PlatformTone } from '@/types/platform'
import type { AnnouncementStatus, PlatformAnnouncement } from '@/types/platformOps'

definePageMeta({ layout: 'platform' })

const { t, locale } = useI18n()

useSeoMeta({ title: t('platform.announcements.title'), robots: 'noindex, nofollow' })

const store = usePlatformAnnouncementsStore()

const SEVERITY_TONE: Record<string, PlatformTone> = { info: 'info', warning: 'warning', critical: 'danger' }
const STATUS_TONE: Record<string, PlatformTone> = { draft: 'neutral', scheduled: 'info', live: 'success', expired: 'yellow' }
const BANNER_CLASS: Record<string, string> = { info: 'bg-info-dim text-info', warning: 'bg-warning-dim text-warning', critical: 'bg-danger-dim text-danger' }
const BANNER_ICON: Record<string, string> = { info: 'ph:info', warning: 'ph:warning', critical: 'ph:warning-octagon' }

const headers = computed(() => [
  { label: t('platform.announcements.headers.title'), key: 'title' },
  { label: t('platform.announcements.headers.audience'), key: 'audience' },
  { label: t('platform.common.severity'), key: 'severity' },
  { label: t('platform.announcements.headers.schedule'), key: 'schedule' },
  { label: t('platform.common.status'), key: 'status' },
  { label: t('platform.common.actions'), key: 'actions', align: 'end' as const },
])

const audienceOptions = computed(() => (['all', 'plan', 'segment'] as const).map((v) => ({ value: v, label: t(`platform.announcements.audience.${v}`) })))
const severityOptions = computed(() => (['info', 'warning', 'critical'] as const).map((v) => ({ value: v, label: t(`platform.announcements.severity.${v}`) })))
const planOptions = computed(() => (['trial', 'free', 'starter', 'growth', 'enterprise'] as const).map((v) => ({ value: v, label: t(`platform.plan.${v}`) })))
const segmentOptions = computed(() => (['egyptMerchants', 'ksaMerchants', 'highGmv', 'atRisk'] as const).map((v) => ({ value: v, label: t(`platform.announcements.segments.${v}`) })))

const audienceDetail = (item: PlatformAnnouncement) =>
  item.audience === 'plan' ? t(`platform.plan.${item.plan}`) : t(`platform.announcements.segments.${item.segment}`)

const blank = (): Omit<PlatformAnnouncement, 'id' | 'status'> => ({
  titleEn: '', titleAr: '', bodyEn: '', bodyAr: '',
  audience: 'all', plan: 'trial', segment: 'egyptMerchants', severity: 'info',
  startAt: '2026-11-13', endAt: '2026-11-20',
})

const panelOpen = ref(false)
const draft = reactive(blank())
const previewLang = ref<'en' | 'ar'>('en')

const previewTitle = computed(() => (previewLang.value === 'ar' ? draft.titleAr : draft.titleEn))
const previewBody = computed(() => (previewLang.value === 'ar' ? draft.bodyAr : draft.bodyEn))
const canSave = computed(() => !!draft.titleEn.trim() && !!draft.titleAr.trim() && !!draft.startAt && !!draft.endAt)

const openCreate = () => {
  Object.assign(draft, blank())
  previewLang.value = locale.value === 'ar' ? 'ar' : 'en'
  panelOpen.value = true
}

const save = (status: AnnouncementStatus) => {
  if (!canSave.value) return
  store.add({ ...draft, status })
  panelOpen.value = false
}
</script>
