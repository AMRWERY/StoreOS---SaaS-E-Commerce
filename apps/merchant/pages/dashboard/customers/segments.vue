<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.segments.title')"
          :subtitle="t('dashboard.ops.segments.subtitle')"
          :count="segments.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.segments.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.segments.stats.total')"
            :value="segments.length"
            iconName="ph:users-three-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.segments.stats.active')"
            :value="segments.filter((s) => s.status === 'active').length"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.segments.stats.covered')"
            :value="coveredCustomers"
            iconName="ph:user-focus-bold"
            iconColor="text-info"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="segments.length" :headers="headers" :items="segments">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(rules)="{ item }">
              <span class="text-xs text-tx-secondary">{{ summary(item.rules) }}</span>
            </template>
            <template #cell(customers)="{ item }">
              <span class="font-mono text-sm">{{ item.customers }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.common.status.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.segments.empty')"
            :hint="t('dashboard.ops.segments.emptyHint')"
            icon="ph:users-three-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.segments.create')"
      :subtitle="t('dashboard.ops.segments.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.name" :label="t('dashboard.ops.segments.name')" required />

        <div class="space-y-3">
          <p class="text-eyebrow">{{ t('dashboard.ops.segments.rules') }}</p>
          <div
            v-for="(rule, i) in form.rules"
            :key="i"
            class="grid grid-cols-[1fr_90px_1fr_auto] gap-2 items-center"
          >
            <LazyVSelectInput v-model="rule.field" :options="fieldOptions" />
            <LazyVSelectInput v-model="rule.operator" :options="operatorOptions" />
            <LazyVInput v-model="rule.value" class="font-mono" />
            <button
              type="button"
              class="text-tx-muted hover:text-danger transition-colors"
              :aria-label="t('dashboard.ops.common.delete')"
              :disabled="form.rules.length === 1"
              @click="form.rules.splice(i, 1)"
            >
              <Icon name="ph:trash-bold" />
            </button>
          </div>
          <LazyVButton
            type="button"
            variant="secondary"
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.segments.addRule')"
            @click="addRule"
          />
        </div>

        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.segments.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { SegmentRule, SegmentField, SegmentOperator } from '@/types/catalogOps'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.segments.title') })

const store = useCatalogSegmentsStore()
const { segments } = storeToRefs(store)

const isOpen = ref(false)
const blankRule = (): SegmentRule => ({ field: 'total_spent', operator: 'gt', value: '' })
const form = reactive<{ name: string; rules: SegmentRule[] }>({ name: '', rules: [blankRule()] })

const coveredCustomers = computed(() =>
  segments.value.filter((s) => s.status === 'active').reduce((sum, s) => sum + s.customers, 0),
)

const tones: Record<string, Tone> = { active: 'success', draft: 'neutral' }

const fields: SegmentField[] = ['total_spent', 'orders_count', 'city', 'last_order_days', 'accepts_marketing']
const operators: SegmentOperator[] = ['gt', 'lt', 'eq']
const fieldOptions = computed(() =>
  fields.map((f) => ({ value: f, label: t(`dashboard.ops.segments.fields.${f}`) })),
)
const operatorOptions = computed(() =>
  operators.map((o) => ({ value: o, label: t(`dashboard.ops.segments.operators.${o}`) })),
)

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.segments.name') },
  { key: 'rules', label: t('dashboard.ops.segments.rules') },
  { key: 'customers', label: t('dashboard.ops.segments.customers') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

function summary(rules: SegmentRule[]) {
  return rules
    .map(
      (r) =>
        `${t(`dashboard.ops.segments.fields.${r.field}`)} ${t(`dashboard.ops.segments.operators.${r.operator}`)} ${r.value}`,
    )
    .join(` ${t('dashboard.ops.segments.and')} `)
}

function addRule() {
  form.rules.push(blankRule())
}

function submit() {
  if (!form.name.trim()) return
  const rules = form.rules.filter((r) => r.value.trim())
  if (!rules.length) return
  store.add(form.name.trim(), rules)
  form.name = ''
  form.rules = [blankRule()]
  isOpen.value = false
}
</script>
