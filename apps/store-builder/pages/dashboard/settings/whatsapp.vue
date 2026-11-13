<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.whatsapp.title')"
          :subtitle="t('dashboard.ops.whatsapp.subtitle')"
        >
          <LazyVButton
            size="none"
            className="px-3 py-1.5 text-xs"
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.whatsapp.templates.new')"
            @click="panelOpen = true"
          />
        </ops-page-header>

        <section class="card px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <Icon name="ph:whatsapp-logo-bold" class="text-3xl text-success" />
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-bold">{{ t('dashboard.ops.whatsapp.connection.title') }}</h2>
                <status-pill :tone="connected ? 'success' : 'danger'">
                  {{
                    connected
                      ? t('dashboard.ops.whatsapp.connection.connected')
                      : t('dashboard.ops.whatsapp.connection.disconnected')
                  }}
                </status-pill>
              </div>
              <p class="text-xs text-tx-muted mt-1">
                {{ t('dashboard.ops.whatsapp.connection.number') }}:
                <span class="font-mono text-tx-secondary" dir="ltr">{{ phone }}</span>
              </p>
            </div>
          </div>
          <LazyVButton
            size="none"
            :variant="connected ? 'secondary' : 'primary'"
            className="px-3 py-1.5 text-xs"
            :label="connected ? t('dashboard.ops.whatsapp.connection.disconnect') : t('dashboard.ops.whatsapp.connection.connect')"
            @click="connected = !connected"
          />
        </section>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.whatsapp.stats.optIn')"
            :value="`${stats.optedInRate}%`"
            iconName="ph:user-check-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.whatsapp.stats.sent')"
            :value="stats.messagesSent.toLocaleString('en-US')"
            iconName="ph:paper-plane-tilt-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.whatsapp.stats.cost')"
            :value="money(stats.conversationCost)"
            iconName="ph:coins-bold"
            iconColor="text-warning"
          />
        </div>

        <section class="card overflow-hidden">
          <div class="px-4 py-3.5 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.whatsapp.templates.title') }}</h2>
          </div>
          <LazyVTable v-if="templates.length" :headers="headers" :items="templates">
            <template #cell(name)="{ item }">
              <span class="font-mono text-xs font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(category)="{ item }">
              <status-pill :tone="item.category === 'utility' ? 'info' : 'purple'">
                {{ t(`dashboard.ops.whatsapp.categories.${item.category}`) }}
              </status-pill>
            </template>
            <template #cell(language)="{ item }">
              <span class="font-mono text-xs uppercase">{{ item.language }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="approvalTones[item.status]">
                {{ t(`dashboard.ops.whatsapp.approval.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(preview)="{ item }">
              <div
                class="max-w-xs rounded-lg bg-bg-elevated border border-border-subtle px-3 py-2 text-[11px] text-tx-secondary truncate"
                :dir="item.language === 'ar' ? 'rtl' : 'ltr'"
              >
                {{ fillSample(item.body) }}
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.whatsapp.templates.empty')"
            :hint="t('dashboard.ops.whatsapp.templates.emptyHint')"
            icon="ph:chat-circle-text-bold"
          />
        </section>

        <section class="card px-4 py-3.5 space-y-4">
          <div>
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.whatsapp.messages.title') }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t('dashboard.ops.whatsapp.messages.desc') }}</p>
          </div>
          <div
            v-for="key in messageKeys"
            :key="key"
            class="flex items-center justify-between gap-4 border-t border-border-subtle pt-4 first:border-t-0 first:pt-0"
          >
            <p class="text-xs font-bold">{{ t(`dashboard.ops.whatsapp.messages.${key}`) }}</p>
            <LazyVSwitchButton v-model="orderMessages[key]" />
          </div>
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="t('dashboard.ops.whatsapp.panel.title')"
      :subtitle="t('dashboard.ops.whatsapp.panel.subtitle')"
    >
      <div class="space-y-4">
        <LazyVInput v-model="draft.name" :label="t('dashboard.ops.whatsapp.panel.name')" placeholder="order_update" />
        <LazyVSelectInput
          v-model="draft.category"
          :label="t('dashboard.ops.whatsapp.templates.category')"
          :options="categoryOptions"
        />
        <LazyVSelectInput
          v-model="draft.language"
          :label="t('dashboard.ops.whatsapp.templates.language')"
          :options="languageOptions"
        />
        <LazyVTextareaInput
          v-model="draft.body"
          :label="t('dashboard.ops.whatsapp.panel.body')"
          :rows="5"
        />
        <p class="text-[10px] text-tx-muted">{{ t('dashboard.ops.whatsapp.panel.bodyHint') }}</p>

        <div class="space-y-2">
          <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
            {{ t('dashboard.ops.whatsapp.panel.preview') }}
          </p>
          <div class="rounded-lg bg-bg-base border border-border-subtle p-4">
            <div
              class="max-w-[85%] rounded-lg bg-success-dim border border-border-subtle px-3 py-2 text-xs text-tx-primary whitespace-pre-wrap"
              :dir="draft.language === 'ar' ? 'rtl' : 'ltr'"
            >
              {{ draft.body ? fillSample(draft.body) : t('dashboard.ops.whatsapp.panel.previewEmpty') }}
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <LazyVButton
          size="none"
          className="px-4 py-2 text-xs"
          :disabled="!draft.name.trim() || !draft.body.trim()"
          :label="t('dashboard.ops.whatsapp.panel.submit')"
          @click="submit"
        />
      </template>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { OrderMessageKey, WaCategory, WaLanguage } from '@/types/platformTools'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.whatsapp.title') })

const store = useWhatsappBusinessStore()
const { connected, phone, templates, orderMessages, stats } = storeToRefs(store)

const messageKeys: OrderMessageKey[] = ['confirmed', 'shipped', 'outForDelivery', 'delivered']

const approvalTones: Record<string, Tone> = {
  approved: 'success',
  pending: 'warning',
  rejected: 'danger',
}

const panelOpen = ref(false)
const draft = reactive<{ name: string; category: WaCategory; language: WaLanguage; body: string }>({
  name: '',
  category: 'utility',
  language: 'en',
  body: '',
})

const categoryOptions = computed(() => [
  { value: 'utility', label: t('dashboard.ops.whatsapp.categories.utility') },
  { value: 'marketing', label: t('dashboard.ops.whatsapp.categories.marketing') },
])
const languageOptions = computed(() => [
  { value: 'en', label: t('dashboard.ops.whatsapp.languages.en') },
  { value: 'ar', label: t('dashboard.ops.whatsapp.languages.ar') },
])

const samples = ['Sara', 'ORD-8841', '1,250']
const fillSample = (body: string) => body.replace(/\{\{(\d+)\}\}/g, (_, n: string) => samples[Number(n) - 1] ?? '')

function submit() {
  store.addTemplate({ name: draft.name.trim(), category: draft.category, language: draft.language, body: draft.body })
  draft.name = ''
  draft.body = ''
  panelOpen.value = false
}

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.whatsapp.templates.name') },
  { key: 'category', label: t('dashboard.ops.whatsapp.templates.category') },
  { key: 'language', label: t('dashboard.ops.whatsapp.templates.language') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'preview', label: t('dashboard.ops.whatsapp.templates.preview') },
])
</script>
