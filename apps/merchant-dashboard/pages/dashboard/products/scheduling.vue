<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.scheduling.title')"
          :subtitle="t('dashboard.ops.scheduling.subtitle')"
          :count="changes.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.scheduling.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <section class="card px-4 py-3.5">
          <h2 class="text-eyebrow mb-4">{{ t('dashboard.ops.scheduling.upcoming') }}</h2>
          <div v-if="upcoming.length" class="flex gap-4 overflow-x-auto pb-2">
            <div v-for="c in upcoming" :key="c.id" class="min-w-[170px] shrink-0 relative ps-4 border-s-2" :class="c.action === 'publish' ? 'border-success' : 'border-danger'">
              <p class="font-mono text-[11px] text-tx-secondary">{{ c.at }}</p>
              <p class="text-sm font-semibold mt-1 truncate">{{ c.product }}</p>
              <status-pill class="mt-2" :tone="actionTones[c.action]">
                {{ t(`dashboard.ops.scheduling.actions.${c.action}`) }}
              </status-pill>
            </div>
          </div>
          <p v-else class="text-xs text-tx-muted">{{ t('dashboard.ops.scheduling.noUpcoming') }}</p>
        </section>

        <section class="card overflow-hidden">
          <LazyVTable v-if="changes.length" :headers="headers" :items="changes">
            <template #cell(product)="{ item }">
              <span class="text-sm font-semibold">{{ item.product }}</span>
            </template>
            <template #cell(action)="{ item }">
              <status-pill :tone="actionTones[item.action]">
                {{ t(`dashboard.ops.scheduling.actions.${item.action}`) }}
              </status-pill>
            </template>
            <template #cell(at)="{ item }">
              <span class="font-mono text-xs">{{ item.at }}</span>
            </template>
            <template #cell(channel)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.scheduling.channels.${item.channel}`) }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="statusTones[item.status]">
                {{ t(`dashboard.ops.scheduling.statuses.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <LazyVButton
                v-if="item.status === 'pending'"
                variant="ghost"
                :label="t('dashboard.ops.catxCommon.cancel')"
                @click="store.cancel(item.id)"
              />
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.scheduling.empty')"
            :hint="t('dashboard.ops.scheduling.emptyHint')"
            icon="ph:calendar-dots-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.scheduling.create')"
      :subtitle="t('dashboard.ops.scheduling.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.product" :label="t('dashboard.ops.scheduling.product')" required />
        <LazyVSelectInput v-model="form.action" :label="t('dashboard.ops.scheduling.action')" :options="actionOptions" />
        <LazyVSelectInput v-model="form.channel" :label="t('dashboard.ops.scheduling.channel')" :options="channelOptions" />
        <div class="space-y-2">
          <p class="text-eyebrow">{{ t('dashboard.ops.scheduling.dateTime') }}</p>
          <LazyVDatePicker v-model="when" enableTimePicker />
        </div>
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.scheduling.create')" :disabled="!when" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { ScheduleAction, ScheduleChannel } from '@/types/catalogDepth'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.scheduling.title') })

const store = useCatxSchedulingStore()
const { changes, upcoming } = storeToRefs(store)

const isOpen = ref(false)
const when = ref<Date | null>(null)
const form = reactive<{ product: string; action: ScheduleAction; channel: ScheduleChannel }>({
  product: '',
  action: 'publish',
  channel: 'online',
})

const actionTones: Record<string, Tone> = { publish: 'success', unpublish: 'danger' }
const statusTones: Record<string, Tone> = { pending: 'warning', done: 'success', cancelled: 'neutral' }

const actions: ScheduleAction[] = ['publish', 'unpublish']
const channels: ScheduleChannel[] = ['online', 'pos', 'all']
const actionOptions = computed(() => actions.map((v) => ({ value: v, label: t(`dashboard.ops.scheduling.actions.${v}`) })))
const channelOptions = computed(() => channels.map((v) => ({ value: v, label: t(`dashboard.ops.scheduling.channels.${v}`) })))

const headers = computed(() => [
  { key: 'product', label: t('dashboard.ops.scheduling.product') },
  { key: 'action', label: t('dashboard.ops.scheduling.action') },
  { key: 'at', label: t('dashboard.ops.scheduling.dateTime') },
  { key: 'channel', label: t('dashboard.ops.scheduling.channel') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '' },
])

const pad = (n: number) => String(n).padStart(2, '0')

function submit() {
  if (!form.product.trim() || !when.value) return
  const d = when.value
  store.add({
    product: form.product.trim(),
    action: form.action,
    channel: form.channel,
    at: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`,
  })
  form.product = ''
  when.value = null
  isOpen.value = false
}
</script>
