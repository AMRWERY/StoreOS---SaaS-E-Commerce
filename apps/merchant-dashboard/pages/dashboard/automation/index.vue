<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.automation.title')"
          :subtitle="t('dashboard.ops.automation.subtitle')"
          :count="workflows.length"
        >
          <LazyVButton
            size="none"
            className="px-3 py-1.5 text-xs"
            icon="ph:plus-bold"
            iconPosition="left"
            :to="localePath('/dashboard/automation/new')"
            :label="t('dashboard.ops.automation.new')"
          />
        </ops-page-header>

        <section class="space-y-3">
          <div>
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.automation.templates.title') }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t('dashboard.ops.automation.templates.desc') }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="tpl in templates" :key="tpl.id" class="card px-4 py-3.5 flex flex-col gap-3">
              <div class="flex items-center gap-2">
                <Icon name="ph:lightning-bold" class="text-brand" />
                <p class="text-sm font-bold">{{ t(`dashboard.ops.automation.templateNames.${tpl.nameKey}`) }}</p>
              </div>
              <p class="text-xs text-tx-muted flex-1">
                {{ t(`dashboard.ops.automation.triggers.${tpl.trigger}`) }}
              </p>
              <LazyVButton
                size="none"
                variant="secondary"
                className="px-3 py-1 text-[11px] self-start"
                :label="t('dashboard.ops.automation.templates.use')"
                @click="applyTemplate(tpl)"
              />
            </div>
          </div>
        </section>

        <section class="card overflow-hidden">
          <LazyVTable v-if="workflows.length" :headers="headers" :items="workflows">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(trigger)="{ item }">
              <status-pill tone="info">{{ t(`dashboard.ops.automation.triggers.${item.trigger}`) }}</status-pill>
            </template>
            <template #cell(lastRun)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.lastRun || '-' }}</span>
            </template>
            <template #cell(runs)="{ item }">
              <span class="font-mono text-sm">{{ item.runs }}</span>
            </template>
            <template #cell(enabled)="{ item }">
              <LazyVSwitchButton :model-value="item.enabled" @update:model-value="toggle(item.id)" />
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :to="localePath(`/dashboard/automation/${item.id}`)"
                  :label="t('dashboard.ops.automation.edit')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.automation.empty')"
            :hint="t('dashboard.ops.automation.emptyHint')"
            icon="ph:lightning-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Workflow } from '@/types/platformTools'

const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.automation.title') })

const store = useAutomationWorkflowsStore()
const { workflows, templates } = storeToRefs(store)
const { toggle } = store

async function applyTemplate(tpl: Workflow & { nameKey: string }) {
  const id = store.addFromTemplate(tpl, t(`dashboard.ops.automation.templateNames.${tpl.nameKey}`))
  await navigateTo(localePath(`/dashboard/automation/${id}`))
}

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.automation.name') },
  { key: 'trigger', label: t('dashboard.ops.automation.trigger') },
  { key: 'lastRun', label: t('dashboard.ops.automation.lastRun') },
  { key: 'runs', label: t('dashboard.ops.automation.runs') },
  { key: 'enabled', label: t('dashboard.ops.automation.enabled') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
