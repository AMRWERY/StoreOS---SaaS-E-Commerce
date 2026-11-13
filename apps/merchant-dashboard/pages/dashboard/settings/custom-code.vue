<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.customCode.title')"
          :subtitle="t('dashboard.ops.customCode.subtitle')"
        >
          <status-pill v-if="saved" tone="success">{{ t('dashboard.ops.customCode.saved') }}</status-pill>
          <LazyVButton :label="t('dashboard.ops.common.save')" @click="saved = true" />
        </ops-page-header>

        <LazyVAlertBanner variant="warning" :dismissible="false">
          <p class="font-semibold">{{ t('dashboard.ops.customCode.warning.title') }}</p>
          <p class="text-xs text-tx-secondary font-normal mt-1">{{ t('dashboard.ops.customCode.warning.body') }}</p>
        </LazyVAlertBanner>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-semibold">{{ t('dashboard.ops.customCode.settings') }}</h2>
          <div class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-elevated px-3 py-2.5">
            <div>
              <p class="text-xs font-semibold">{{ t('dashboard.ops.customCode.allowHtml') }}</p>
              <p class="text-[11px] text-tx-muted">{{ t('dashboard.ops.customCode.allowHtmlHint') }}</p>
            </div>
            <LazyVSwitchButton v-model="allowCustomHtml" />
          </div>
          <LazyVSelectInput
            v-model="mode"
            :label="t('dashboard.ops.customCode.mode')"
            :options="modeOptions"
            :disabled="!allowCustomHtml"
          />
          <p class="text-[11px] text-tx-muted">{{ t(`dashboard.ops.customCode.modeHints.${mode}`) }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-elevated px-3 py-2.5">
              <span class="text-xs">{{ t('dashboard.ops.customCode.allowInlineStyles') }}</span>
              <LazyVSwitchButton v-model="allowInlineStyles" />
            </div>
            <div class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-elevated px-3 py-2.5">
              <span class="text-xs">{{ t('dashboard.ops.customCode.allowFrames') }}</span>
              <LazyVSwitchButton v-model="allowFrames" />
            </div>
          </div>
        </section>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-semibold">{{ t('dashboard.ops.customCode.allowedDomains') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <trust-domain-list
              v-for="kind in domainKinds"
              :key="kind"
              :title="t(`dashboard.ops.customCode.domainKinds.${kind}`)"
              :list="domains[kind]"
              :empty-text="t('dashboard.ops.customCode.noDomains')"
              :add-label="t('dashboard.ops.customCode.add')"
              @add="addDomain(kind, $event)"
              @remove="removeDomain(kind, $event)"
            />
          </div>
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.customCode.cspPreview') }}</h2>
            <p class="text-[11px] text-tx-muted mt-0.5">{{ t('dashboard.ops.customCode.cspHint') }}</p>
          </div>
          <pre
            dir="ltr"
            class="p-4 text-[11px] leading-relaxed font-mono text-tx-secondary bg-bg-base overflow-x-auto whitespace-pre-wrap break-all"
          >{{ csp }}</pre>
        </section>

        <section class="card p-4 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.customCode.origin.title') }}</h2>
            <status-pill :tone="separateOrigin ? 'success' : 'danger'">
              {{ separateOrigin ? t('dashboard.ops.customCode.origin.isolated') : t('dashboard.ops.customCode.origin.shared') }}
            </status-pill>
          </div>
          <p class="text-xs text-tx-secondary">{{ t('dashboard.ops.customCode.origin.hint') }}</p>
          <ul class="space-y-2">
            <li v-for="o in origins" :key="o.label" class="flex items-center gap-2 text-xs">
              <Icon :name="o.ok ? 'ph:check-circle-bold' : 'ph:x-circle-bold'" :class="o.ok ? 'text-success' : 'text-danger'" />
              <span class="text-tx-secondary">{{ o.label }}</span>
              <span class="font-mono text-tx-primary" dir="ltr">{{ o.value }}</span>
            </li>
          </ul>
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.customCode.scan.title') }}</h2>
          </div>
          <LazyVTable v-if="findings.length" :headers="scanHeaders" :items="findings">
            <template #cell(page)="{ item }">
              <span class="font-mono text-xs">{{ item.page }}</span>
            </template>
            <template #cell(section)="{ item }">
              <span class="text-xs text-tx-secondary">{{ item.section }}</span>
            </template>
            <template #cell(finding)="{ item }">
              <span class="text-xs">{{ t(`dashboard.ops.customCode.scan.findings.${item.finding}`) }}</span>
            </template>
            <template #cell(severity)="{ item }">
              <status-pill :tone="severityTone(item.severity)">
                {{ t(`dashboard.ops.customCode.scan.severity.${item.severity}`) }}
              </status-pill>
            </template>
            <template #cell(action)="{ item }">
              <status-pill :tone="actionTone(item.action)">
                {{ t(`dashboard.ops.customCode.scan.actions.${item.action}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.customCode.scan.empty')"
            :hint="t('dashboard.ops.customCode.scan.emptyHint')"
            icon="ph:shield-check-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { CspDomains, CustomCodeMode } from '@/types/trust'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.customCode.title') })

const store = useTrustCustomCodeStore()
const {
  allowCustomHtml, mode, allowInlineStyles, allowFrames, domains,
  storefrontOrigin, dashboardOrigin, findings, csp,
} = storeToRefs(store)
const { addDomain, removeDomain } = store

const saved = ref(false)
const domainKinds: (keyof CspDomains)[] = ['script', 'style', 'frame']

const modeOptions = computed(() =>
  (['sanitized', 'sandboxed', 'disabled'] as CustomCodeMode[]).map((m) => ({
    value: m,
    label: t(`dashboard.ops.customCode.modes.${m}`),
  })),
)

const separateOrigin = computed(() => storefrontOrigin.value !== dashboardOrigin.value)
const origins = computed(() => [
  { label: t('dashboard.ops.customCode.origin.storefront'), value: storefrontOrigin.value, ok: true },
  { label: t('dashboard.ops.customCode.origin.dashboard'), value: dashboardOrigin.value, ok: true },
  { label: t('dashboard.ops.customCode.origin.differ'), value: separateOrigin.value ? 'OK' : 'FAIL', ok: separateOrigin.value },
])

const severityTones: Record<string, Tone> = { high: 'danger', medium: 'warning', low: 'info' }
const actionTones: Record<string, Tone> = { stripped: 'success', sandboxed: 'info', review: 'warning', allowed: 'neutral' }
const severityTone = (s: string): Tone => severityTones[s] ?? 'neutral'
const actionTone = (a: string): Tone => actionTones[a] ?? 'neutral'

const scanHeaders = computed(() => [
  { key: 'page', label: t('dashboard.ops.customCode.scan.page') },
  { key: 'section', label: t('dashboard.ops.customCode.scan.section') },
  { key: 'finding', label: t('dashboard.ops.customCode.scan.finding') },
  { key: 'severity', label: t('dashboard.ops.customCode.scan.severityLabel') },
  { key: 'action', label: t('dashboard.ops.customCode.scan.action') },
])
</script>
