<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.flashSale.title')"
          :subtitle="t('dashboard.ops.flashSale.subtitle')"
        >
          <LazyVButton :label="t('common.save')" />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.flashSale.stats.queue')"
            :value="queueSize.toLocaleString('en-US')"
            iconName="ph:users-three-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.flashSale.stats.avgWait')"
            :value="`${avgWaitSeconds}s`"
            iconName="ph:hourglass-medium-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.flashSale.stats.capacity')"
            :value="capacity"
            iconName="ph:gauge-bold"
            iconColor="text-success"
          />
        </div>

        <section class="card p-4 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.flashSale.waitingRoom') }}</h2>
              <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.flashSale.waitingRoomHint') }}</p>
            </div>
            <LazyVSwitchButton v-model="waitingRoom" :label="t('common.enabled')" />
          </div>
          <LazyVInput
            v-model="capacity"
            type="number"
            inputClass="font-mono"
            :disabled="!waitingRoom"
            :label="t('dashboard.ops.flashSale.capacity')"
          />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyVTextareaInput
              v-model="messageEn"
              :rows="3"
              :readonly="!waitingRoom"
              :label="t('dashboard.ops.flashSale.messageEn')"
            />
            <LazyVTextareaInput
              v-model="messageAr"
              :rows="3"
              dir="rtl"
              :readonly="!waitingRoom"
              :label="t('dashboard.ops.flashSale.messageAr')"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyVDatePicker v-model="countdownStart" enableTimePicker :label="t('dashboard.ops.flashSale.countdownStart')" />
            <LazyVDatePicker v-model="countdownEnd" enableTimePicker :label="t('dashboard.ops.flashSale.countdownEnd')" />
          </div>
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.flashSale.schedule') }}</h2>
          </div>
          <LazyVTable v-if="sales.length" :headers="headers" :items="sales">
            <template #cell(name)="{ item }">
              <span class="text-sm font-medium">{{ item.name }}</span>
            </template>
            <template #cell(start)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.start }}</span>
            </template>
            <template #cell(end)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.end }}</span>
            </template>
            <template #cell(discount)="{ item }">
              <span class="font-mono text-sm">{{ item.discountPercent }}%</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="saleTones[item.status]">
                {{ t(`dashboard.ops.flashSale.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('common.delete')"
                  @click="removeSale(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.flashSale.emptySales')"
            :hint="t('dashboard.ops.flashSale.emptySalesHint')"
            icon="ph:lightning-bold"
          />
        </section>

        <section class="card p-4 space-y-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.flashSale.readiness.title') }}</h2>
              <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.flashSale.readiness.hint') }}</p>
            </div>
            <span class="font-mono text-sm font-semibold">{{ readyCount }}/{{ readiness.length }}</span>
          </div>
          <div class="h-1.5 rounded-full bg-bg-elevated overflow-hidden">
            <div
              class="h-full bg-brand transition-all duration-300"
              :style="{ width: `${(readyCount / Math.max(readiness.length, 1)) * 100}%` }"
            ></div>
          </div>
          <ul v-if="readiness.length" class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li
              v-for="r in readiness"
              :key="r.id"
              class="flex items-center justify-between gap-3 bg-bg-elevated border border-border-subtle rounded-md px-3 py-2"
            >
              <span class="flex items-center gap-2 text-xs">
                <Icon
                  :name="r.done ? 'ph:check-circle-bold' : 'ph:circle-bold'"
                  :class="r.done ? 'text-success' : 'text-tx-muted'"
                />
                {{ t(`dashboard.ops.flashSale.readiness.items.${r.id}`) }}
              </span>
              <LazyVSwitchButton :modelValue="r.done" @update:modelValue="toggleReadiness(r.id)" />
            </li>
          </ul>
          <ops-empty-state v-else :title="t('dashboard.ops.flashSale.readiness.empty')" icon="ph:list-checks-bold" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.flashSale.title') })

const store = useChkFlashSaleStore()
const {
  waitingRoom, capacity, messageEn, messageAr, countdownStart, countdownEnd,
  queueSize, avgWaitSeconds, sales, readiness, readyCount,
} = storeToRefs(store)
const { removeSale, toggleReadiness } = store

const saleTones: Record<string, Tone> = { scheduled: 'info', live: 'success', ended: 'neutral' }

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.flashSale.cols.name') },
  { key: 'start', label: t('dashboard.ops.flashSale.cols.start') },
  { key: 'end', label: t('dashboard.ops.flashSale.cols.end') },
  { key: 'discount', label: t('dashboard.ops.flashSale.cols.discount') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
