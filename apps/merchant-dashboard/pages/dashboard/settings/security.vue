<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.security.title')"
          :subtitle="t('dashboard.ops.security.subtitle')"
        />

        <section class="card px-4 py-3.5 space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-sm font-bold">{{ t('dashboard.ops.security.twoFa.title') }}</h2>
              <p class="text-xs text-tx-muted mt-1">{{ t('dashboard.ops.security.twoFa.desc') }}</p>
            </div>
            <status-pill :tone="verified ? 'success' : 'warning'">
              {{ verified ? t('dashboard.ops.security.twoFa.enabled') : t('dashboard.ops.security.twoFa.notEnabled') }}
            </status-pill>
          </div>

          <LazyVTabs v-model="method" :tabs="methodTabs" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-if="method === 'app'" class="flex items-center gap-4">
              <div
                class="size-32 shrink-0 rounded-md border border-dashed border-border-default bg-bg-elevated flex items-center justify-center"
              >
                <Icon name="ph:qr-code-bold" class="text-5xl text-tx-muted" />
              </div>
              <div class="space-y-1">
                <p class="text-xs text-tx-secondary">{{ t('dashboard.ops.security.twoFa.scanQr') }}</p>
                <p class="text-[10px] text-tx-muted">{{ t('dashboard.ops.security.twoFa.manualKey') }}</p>
                <p class="font-mono text-xs text-brand">JBSW Y3DP EHPK 3PXP</p>
              </div>
            </div>
            <div v-else class="space-y-2">
              <LazyVInput
                v-model="phone"
                :label="t('dashboard.ops.security.twoFa.phone')"
                type="tel"
                placeholder="+20 100 000 0000"
              />
              <p class="text-[10px] text-tx-muted">{{ t('dashboard.ops.security.twoFa.smsHint') }}</p>
            </div>

            <div class="space-y-3">
              <LazyVOtp v-model="code" :label="t('dashboard.ops.security.twoFa.enterCode')" />
              <LazyVButton
                size="none"
                className="px-4 py-2 text-xs"
                :disabled="code.length < 6"
                :label="t('dashboard.ops.security.twoFa.verify')"
                @click="verified = true"
              />
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section class="card px-4 py-3.5 space-y-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-sm font-bold">{{ t('dashboard.ops.security.backup.title') }}</h2>
                <p class="text-xs text-tx-muted mt-1">{{ t('dashboard.ops.security.backup.desc') }}</p>
              </div>
              <LazyVButton
                size="none"
                variant="secondary"
                className="px-3 py-1 text-[11px] shrink-0"
                icon="ph:arrows-clockwise-bold"
                iconPosition="left"
                :label="t('dashboard.ops.security.backup.regenerate')"
                @click="generateCodes"
              />
            </div>
            <ul v-if="backupCodes.length" class="grid grid-cols-2 gap-2">
              <li
                v-for="c in backupCodes"
                :key="c"
                class="font-mono text-xs bg-bg-elevated border border-border-subtle rounded-md px-3 py-2 text-center"
              >
                {{ c }}
              </li>
            </ul>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.security.backup.empty')"
              icon="ph:key-bold"
            />
          </section>

          <section class="card px-4 py-3.5 space-y-4">
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.security.alerts.title') }}</h2>
            <div v-for="row in alertRows" :key="row.key" class="flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-bold">{{ t(`dashboard.ops.security.alerts.${row.key}`) }}</p>
                <p class="text-[10px] text-tx-muted mt-0.5">{{ t(`dashboard.ops.security.alerts.${row.key}Desc`) }}</p>
              </div>
              <LazyVSwitchButton v-model="alerts[row.key]" />
            </div>
            <div class="border-t border-border-subtle pt-4 flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-bold">{{ t('dashboard.ops.security.reauth.title') }}</p>
                <p class="text-[10px] text-tx-muted mt-0.5">{{ t('dashboard.ops.security.reauth.desc') }}</p>
              </div>
              <LazyVSwitchButton v-model="reauth" />
            </div>
          </section>
        </div>

        <section class="card overflow-hidden">
          <div class="px-4 py-3.5 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.security.devices.title') }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t('dashboard.ops.security.devices.desc') }}</p>
          </div>
          <LazyVTable v-if="devices.length" :headers="headers" :items="devices">
            <template #cell(name)="{ item }">
              <div class="flex items-center gap-2">
                <Icon
                  :name="item.kind === 'mobile' ? 'ph:device-mobile-bold' : 'ph:desktop-bold'"
                  class="text-tx-muted"
                />
                <span class="text-sm font-semibold">{{ item.name }}</span>
                <status-pill v-if="item.current" tone="success">
                  {{ t('dashboard.ops.security.devices.current') }}
                </status-pill>
              </div>
            </template>
            <template #cell(location)="{ item }">
              <span class="text-xs text-tx-secondary">{{ item.location }}</span>
            </template>
            <template #cell(ip)="{ item }">
              <span class="font-mono text-xs">{{ item.ip }}</span>
            </template>
            <template #cell(lastActive)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.lastActive }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  v-if="!item.current"
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px] text-danger"
                  :label="t('dashboard.ops.security.devices.revoke')"
                  @click="revoke(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.security.devices.empty')"
            icon="ph:devices-bold"
          />
        </section>

        <section class="card px-4 py-3.5 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <Icon name="ph:fingerprint-bold" class="text-2xl text-brand" />
            <div>
              <h2 class="text-sm font-bold">{{ t('dashboard.ops.security.passkeys.title') }}</h2>
              <p class="text-xs text-tx-muted mt-0.5">{{ t('dashboard.ops.security.passkeys.desc') }}</p>
            </div>
          </div>
          <LazyVButton
            size="none"
            variant="secondary"
            className="px-3 py-1 text-[11px]"
            disabled
            :label="t('dashboard.ops.security.passkeys.soon')"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.security.title') })

const store = useSecurityCenterStore()
const { devices, backupCodes } = storeToRefs(store)
const { generateCodes, revoke } = store

const method = ref('app')
const methodTabs = computed(() => [
  { name: t('dashboard.ops.security.twoFa.methodApp'), value: 'app' },
  { name: t('dashboard.ops.security.twoFa.methodSms'), value: 'sms' },
])
const phone = ref('')
const code = ref('')
const verified = ref(false)

const alertRows = [{ key: 'newDevice' as const }, { key: 'failedLogin' as const }, { key: 'emailAlerts' as const }]
const alerts = reactive<Record<'newDevice' | 'failedLogin' | 'emailAlerts', boolean>>({
  newDevice: true,
  failedLogin: true,
  emailAlerts: false,
})
const reauth = ref(true)

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.security.devices.name') },
  { key: 'location', label: t('dashboard.ops.security.devices.location') },
  { key: 'ip', label: t('dashboard.ops.security.devices.ip') },
  { key: 'lastActive', label: t('dashboard.ops.security.devices.lastActive') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
