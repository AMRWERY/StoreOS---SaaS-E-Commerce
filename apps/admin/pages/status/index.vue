<template>
  <div class="space-y-6">
    <!-- Overall banner -->
    <section class="flex items-center gap-3 rounded-md px-4 py-4" :class="BANNER[status.overall]" role="status">
      <Icon :name="BANNER_ICON[status.overall] ?? 'ph:info'" class="shrink-0 text-2xl" />
      <div class="min-w-0">
        <h1 class="text-base font-bold tracking-tight">{{ t(`platform.statusPage.overall.${status.overall}`) }}</h1>
        <p class="text-[11px] opacity-90">{{ t('platform.statusPage.updatedAt') }} <span class="font-mono">2026-11-12 10:40</span></p>
      </div>
    </section>

    <!-- Components -->
    <section class="card divide-y divide-border-subtle">
      <h2 class="px-4 py-3 text-eyebrow">{{ t('platform.statusPage.componentsTitle') }}</h2>
      <article v-for="c in status.components" :key="c.key" class="px-4 py-3.5">
        <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h3 class="text-xs font-semibold text-tx-primary">{{ t(`platform.statusPage.components.${c.key}`) }}</h3>
          <platform-status-pill :label="t(`platform.statusPage.levels.${c.status}`)" :tone="LEVEL_TONE[c.status] ?? 'neutral'" />
        </div>
        <div class="flex h-8 gap-[2px]" role="img" :aria-label="t('platform.statusPage.uptimeAria', { name: t(`platform.statusPage.components.${c.key}`), value: c.uptime })">
          <span
            v-for="(day, i) in c.days"
            :key="i"
            class="h-full flex-1 rounded-[1px]"
            :class="DAY_CLASS[day]"
            :title="t('platform.statusPage.daysAgo', { n: 89 - i })"
          ></span>
        </div>
        <div class="mt-1.5 flex items-center justify-between text-[10px] text-tx-muted">
          <span class="font-mono">{{ t('platform.statusPage.daysAgo', { n: 90 }) }}</span>
          <span class="font-mono text-tx-secondary">{{ t('platform.statusPage.uptimeValue', { value: c.uptime }) }}</span>
          <span>{{ t('platform.statusPage.today') }}</span>
        </div>
      </article>
      <div class="flex flex-wrap items-center gap-4 px-4 py-2.5 text-[10px] text-tx-muted">
        <span v-for="key in (['up', 'degraded', 'down'] as const)" :key="key" class="inline-flex items-center gap-1.5">
          <span class="h-2 w-2 rounded-[1px]" :class="DAY_CLASS[key]"></span>{{ t(`platform.statusPage.legend.${key}`) }}
        </span>
      </div>
    </section>

    <!-- Incidents -->
    <section>
      <h2 class="mb-3 text-sm font-bold">{{ t('platform.statusPage.incidentsTitle') }}</h2>
      <div v-if="recent.length" class="space-y-3">
        <article v-for="inc in recent" :key="inc.id" class="card px-4 py-3.5">
          <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 class="text-xs font-semibold text-tx-primary">{{ locale === 'ar' ? inc.titleAr : inc.title }}</h3>
            <platform-status-pill :label="t(`platform.incidents.status.${inc.status}`)" :tone="INCIDENT_TONE[inc.status] ?? 'neutral'" />
          </div>
          <ol class="space-y-3 border-s border-border-subtle ps-4">
            <li v-for="u in inc.updates" :key="u.id" class="relative">
              <span class="absolute -start-[21px] top-1.5 h-2 w-2 rounded-full bg-border-default"></span>
              <p class="text-xs text-tx-secondary">
                <span class="font-semibold text-tx-primary">{{ t(`platform.incidents.status.${u.status}`) }}</span>
                - {{ locale === 'ar' ? u.messageAr : u.message }}
              </p>
              <p class="mt-0.5 font-mono text-[10px] text-tx-muted">{{ u.at }}</p>
            </li>
          </ol>
        </article>
      </div>
      <div v-else class="card">
        <platform-empty-state :title="t('platform.statusPage.incidentsEmpty')" icon="ph:shield-check" />
      </div>
    </section>

    <!-- Subscribe -->
    <section class="card px-4 py-4">
      <h2 class="text-sm font-bold">{{ t('platform.statusPage.subscribe.title') }}</h2>
      <p class="mb-3 mt-1 text-[11px] text-tx-muted">{{ t('platform.statusPage.subscribe.hint') }}</p>
      <form class="flex flex-col gap-2 sm:flex-row sm:items-start" novalidate @submit.prevent="subscribe">
        <v-input
          v-model="email"
          type="email"
          class="flex-1"
          :placeholder="t('platform.statusPage.subscribe.placeholder')"
          :error="emailError"
        />
        <v-button type="submit" :label="t('platform.statusPage.subscribe.button')" />
      </form>
      <p v-if="subscribed" class="mt-2 text-[11px] text-success">{{ t('platform.statusPage.subscribe.success') }}</p>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { PlatformTone } from '@/types/platform'

definePageMeta({ layout: 'status' })

const { t, locale } = useI18n()
const route = useRoute()
const requestUrl = useRequestURL()

const canonical = computed(() => `${requestUrl.origin}${route.path}`)

// This page is public and indexable (see rules/seo.md).
useSeoMeta({
  title: () => t('platform.statusPage.metaTitle'),
  description: () => t('platform.statusPage.metaDescription'),
  robots: 'index, follow',
  ogTitle: () => t('platform.statusPage.metaTitle'),
  ogDescription: () => t('platform.statusPage.metaDescription'),
  ogType: 'website',
  ogUrl: () => canonical.value,
  twitterCard: 'summary',
})
useHead({ link: [{ rel: 'canonical', href: () => canonical.value }] })

const status = usePlatformStatusPageStore()
const incidents = usePlatformIncidentsStore()

const BANNER: Record<string, string> = {
  operational: 'bg-success-dim text-success',
  degraded: 'bg-warning-dim text-warning',
  outage: 'bg-danger-dim text-danger',
}
const BANNER_ICON: Record<string, string> = {
  operational: 'ph:check-circle',
  degraded: 'ph:warning',
  outage: 'ph:warning-octagon',
}
const LEVEL_TONE: Record<string, PlatformTone> = { operational: 'success', degraded: 'warning', outage: 'danger' }
const DAY_CLASS: Record<string, string> = { up: 'bg-success', degraded: 'bg-warning', down: 'bg-danger' }
const INCIDENT_TONE: Record<string, PlatformTone> = { investigating: 'danger', identified: 'warning', monitoring: 'info', resolved: 'success' }

const recent = computed(() => incidents.incidents.filter((i) => i.published).slice(0, 4))

const email = ref('')
const subscribed = ref(false)
const attempted = ref(false)
const EMAIL_RE = /^[^\s]+@[^\s]+\.[^\s]+$/
const emailError = computed(() => (attempted.value && !EMAIL_RE.test(email.value.trim()) ? t('platform.statusPage.subscribe.invalid') : ''))

const subscribe = () => {
  attempted.value = true
  if (!EMAIL_RE.test(email.value.trim())) return
  subscribed.value = true
  email.value = ''
  attempted.value = false
}
</script>
