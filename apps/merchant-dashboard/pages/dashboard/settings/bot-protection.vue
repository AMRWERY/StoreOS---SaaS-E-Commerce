<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.botProtection.title')"
          :subtitle="t('dashboard.ops.botProtection.subtitle')"
        >
          <status-pill v-if="saved" tone="success">{{ t('dashboard.ops.botProtection.saved') }}</status-pill>
          <LazyVButton :label="t('dashboard.ops.common.save')" @click="save" />
        </ops-page-header>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-semibold">{{ t('dashboard.ops.botProtection.protectedAreas') }}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="k in toggleKeys"
              :key="k"
              class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-elevated px-3 py-2.5"
            >
              <span class="text-xs">{{ t(`dashboard.ops.botProtection.areas.${k}`) }}</span>
              <LazyVSwitchButton v-model="toggles[k]" />
            </div>
          </div>
        </section>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-semibold">{{ t('dashboard.ops.botProtection.providerSection') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyVSelectInput
              v-model="provider"
              :label="t('dashboard.ops.botProtection.provider')"
              :options="providerOptions"
            />
            <LazyVInput
              v-model="siteKey"
              :label="t('dashboard.ops.botProtection.siteKey')"
              inputClass="font-mono"
            />
          </div>
          <div class="space-y-1">
            <LazyVRangeInput
              :modelValue="sensitivity"
              :label="t('dashboard.ops.botProtection.sensitivity')"
              :min="0"
              :max="100"
              :step="5"
              unit="%"
              @update:modelValue="setSensitivity"
            />
            <p class="text-[11px] text-tx-muted">{{ t('dashboard.ops.botProtection.sensitivityHint') }}</p>
          </div>
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.botProtection.rateLimits') }}</h2>
          </div>
          <LazyVTable v-if="rules.length" :headers="ruleHeaders" :items="rules">
            <template #cell(route)="{ item }">
              <span class="font-mono text-xs">{{ item.route }}</span>
            </template>
            <template #cell(limit)="{ item }">
              <span class="font-mono text-xs">{{ item.limit }}</span>
            </template>
            <template #cell(windowSec)="{ item }">
              <span class="font-mono text-xs">{{ item.windowSec }}s</span>
            </template>
            <template #cell(action)="{ item }">
              <status-pill :tone="actionTones[item.action]">
                {{ t(`dashboard.ops.botProtection.actions.${item.action}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.botProtection.emptyRules')"
            :hint="t('dashboard.ops.botProtection.emptyRulesHint')"
            icon="ph:gauge-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle flex flex-wrap items-end gap-3">
            <div class="me-auto">
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.botProtection.blocklist') }}</h2>
              <p class="text-[11px] text-tx-muted mt-0.5">{{ t('dashboard.ops.botProtection.blocklistHint') }}</p>
            </div>
            <div class="w-36">
              <LazyVSelectInput v-model="newKind" :label="t('dashboard.ops.botProtection.kind')" :options="kindOptions" />
            </div>
            <div class="w-48">
              <LazyVInput
                v-model="newValue"
                :label="t('dashboard.ops.botProtection.value')"
                :placeholder="newKind === 'ip' ? '41.130.22.17' : 'RU'"
                inputClass="font-mono"
              />
            </div>
            <LazyVButton
              size="none"
              icon="ph:plus-bold"
              className="px-3 py-2 text-xs"
              :label="t('dashboard.ops.botProtection.add')"
              @click="addEntry"
            />
          </div>
          <LazyVTable v-if="blocklist.length" :headers="blockHeaders" :items="blocklist">
            <template #cell(kind)="{ item }">
              <status-pill :tone="item.kind === 'ip' ? 'info' : 'purple'">
                {{ t(`dashboard.ops.botProtection.kinds.${item.kind}`) }}
              </status-pill>
            </template>
            <template #cell(value)="{ item }">
              <span class="font-mono text-xs">{{ item.value }}</span>
            </template>
            <template #cell(addedAt)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.addedAt }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.common.delete')"
                  @click="removeBlocked(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.botProtection.emptyBlocklist')"
            :hint="t('dashboard.ops.botProtection.emptyBlocklistHint')"
            icon="ph:prohibit-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.botProtection.recentEvents') }}</h2>
          </div>
          <LazyVTable v-if="events.length" :headers="eventHeaders" :items="events">
            <template #cell(ip)="{ item }">
              <span class="font-mono text-xs">{{ item.ip }}</span>
            </template>
            <template #cell(route)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.route }}</span>
            </template>
            <template #cell(reason)="{ item }">
              <status-pill tone="danger">{{ t(`dashboard.ops.botProtection.reasons.${item.reason}`) }}</status-pill>
            </template>
            <template #cell(at)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.at }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.botProtection.emptyEvents')"
            :hint="t('dashboard.ops.botProtection.emptyEventsHint')"
            icon="ph:shield-check-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { BotProvider, BotToggles } from '@/types/trust'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.botProtection.title') })

const store = useTrustBotProtectionStore()
const { toggles, provider, siteKey, sensitivity, rules, blocklist, events } = storeToRefs(store)
const { addBlocked, removeBlocked } = store

const toggleKeys: (keyof BotToggles)[] = ['login', 'registration', 'checkout', 'forms']
const newKind = ref<'ip' | 'country'>('ip')
const newValue = ref('')

const actionTones: Record<string, Tone> = { block: 'danger', challenge: 'warning', throttle: 'info' }

const providerOptions = computed(() =>
  (['turnstile', 'hcaptcha', 'recaptcha'] as BotProvider[]).map((p) => ({
    value: p,
    label: t(`dashboard.ops.botProtection.providers.${p}`),
  })),
)
const kindOptions = computed(() =>
  (['ip', 'country'] as const).map((k) => ({ value: k, label: t(`dashboard.ops.botProtection.kinds.${k}`) })),
)

function setSensitivity(v: number | [number, number]) {
  sensitivity.value = Array.isArray(v) ? v[0] : v
}
function addEntry() {
  addBlocked(newKind.value, newValue.value)
  newValue.value = ''
}
const saved = ref(false)
function save() {
  // mock save: settings live in the store only
  saved.value = true
}

const ruleHeaders = computed(() => [
  { key: 'route', label: t('dashboard.ops.botProtection.route') },
  { key: 'limit', label: t('dashboard.ops.botProtection.limit') },
  { key: 'windowSec', label: t('dashboard.ops.botProtection.window') },
  { key: 'action', label: t('dashboard.ops.botProtection.action') },
])
const blockHeaders = computed(() => [
  { key: 'kind', label: t('dashboard.ops.botProtection.kind') },
  { key: 'value', label: t('dashboard.ops.botProtection.value') },
  { key: 'addedAt', label: t('dashboard.ops.common.date') },
  { key: 'actions', label: '', align: 'end' as const },
])
const eventHeaders = computed(() => [
  { key: 'ip', label: t('dashboard.ops.botProtection.ip') },
  { key: 'route', label: t('dashboard.ops.botProtection.route') },
  { key: 'reason', label: t('dashboard.ops.botProtection.reason') },
  { key: 'at', label: t('dashboard.ops.common.date') },
])
</script>
