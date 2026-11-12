<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-3xl mx-auto space-y-6">
        <ops-page-header
          :title="wf.name || t('dashboard.ops.automation.untitled')"
          :subtitle="t('dashboard.ops.automation.builder.subtitle')"
        >
          <LazyVButton
            size="none"
            variant="ghost"
            className="px-3 py-1.5 text-xs"
            :to="localePath('/dashboard/automation')"
            :label="t('dashboard.ops.automation.builder.back')"
          />
          <LazyVButton
            size="none"
            className="px-3 py-1.5 text-xs"
            :label="t('dashboard.ops.automation.builder.save')"
            @click="save"
          />
        </ops-page-header>

        <p v-if="saved" class="text-xs text-success">{{ t('dashboard.ops.automation.builder.saved') }}</p>

        <section class="card px-4 py-3.5">
          <LazyVInput v-model="wf.name" :label="t('dashboard.ops.automation.name')" />
        </section>

        <ol class="space-y-0">
          <!-- Trigger -->
          <li class="relative ps-10 pb-6">
            <span class="absolute start-3.5 top-8 bottom-0 w-px bg-border-default"></span>
            <span
              class="absolute start-0 top-1 size-7 rounded-full bg-brand-dim text-brand flex items-center justify-center"
            >
              <Icon name="ph:lightning-bold" />
            </span>
            <div class="card px-4 py-3.5 space-y-3">
              <h3 class="text-xs font-bold">{{ t('dashboard.ops.automation.builder.when') }}</h3>
              <LazyVSelectInput v-model="wf.trigger" :options="triggerOptions" />
            </div>
          </li>

          <!-- Conditions -->
          <li class="relative ps-10 pb-6">
            <span class="absolute start-3.5 top-8 bottom-0 w-px bg-border-default"></span>
            <span
              class="absolute start-0 top-1 size-7 rounded-full bg-warning-dim text-warning flex items-center justify-center"
            >
              <Icon name="ph:funnel-bold" />
            </span>
            <div class="card px-4 py-3.5 space-y-3">
              <h3 class="text-xs font-bold">{{ t('dashboard.ops.automation.builder.if') }}</h3>
              <p v-if="!wf.conditions.length" class="text-xs text-tx-muted">
                {{ t('dashboard.ops.automation.builder.noConditions') }}
              </p>
              <div
                v-for="c in wf.conditions"
                :key="c.id"
                class="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center"
              >
                <LazyVSelectInput v-model="c.field" :options="fieldOptions" />
                <LazyVSelectInput v-model="c.operator" :options="operatorOptions" />
                <LazyVInput v-model="c.value" />
                <LazyVButton
                  variant="none"
                  className="text-tx-muted hover:text-danger transition-colors"
                  :aria-label="t('dashboard.ops.common.delete')"
                  @click="removeCondition(c.id)"
                >
                  <Icon name="ph:trash-bold" />
                </LazyVButton>
              </div>
              <LazyVButton
                size="none"
                variant="secondary"
                className="px-3 py-1 text-[11px]"
                icon="ph:plus-bold"
                iconPosition="left"
                :label="t('dashboard.ops.automation.builder.addCondition')"
                @click="addCondition"
              />
            </div>
          </li>

          <!-- Actions -->
          <li class="relative ps-10">
            <span
              class="absolute start-0 top-1 size-7 rounded-full bg-success-dim text-success flex items-center justify-center"
            >
              <Icon name="ph:play-bold" />
            </span>
            <div class="card px-4 py-3.5 space-y-3">
              <h3 class="text-xs font-bold">{{ t('dashboard.ops.automation.builder.then') }}</h3>
              <p v-if="!wf.actions.length" class="text-xs text-tx-muted">
                {{ t('dashboard.ops.automation.builder.noActions') }}
              </p>
              <div v-for="a in wf.actions" :key="a.id" class="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                <LazyVSelectInput v-model="a.type" :options="actionOptions" />
                <LazyVInput v-model="a.param" :placeholder="t('dashboard.ops.automation.builder.param')" />
                <LazyVButton
                  variant="none"
                  className="text-tx-muted hover:text-danger transition-colors"
                  :aria-label="t('dashboard.ops.common.delete')"
                  @click="removeAction(a.id)"
                >
                  <Icon name="ph:trash-bold" />
                </LazyVButton>
              </div>
              <LazyVButton
                size="none"
                variant="secondary"
                className="px-3 py-1 text-[11px]"
                icon="ph:plus-bold"
                iconPosition="left"
                :label="t('dashboard.ops.automation.builder.addAction')"
                @click="addAction"
              />
            </div>
          </li>
        </ol>

        <section class="card overflow-hidden">
          <div class="px-4 py-3.5 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t('dashboard.ops.automation.history.title') }}</h2>
          </div>
          <LazyVTable v-if="history.length" :headers="historyHeaders" :items="history">
            <template #cell(at)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.at }}</span>
            </template>
            <template #cell(target)="{ item }">
              <span class="font-mono text-xs">{{ item.target }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="runTones[item.status]">
                {{ t(`dashboard.ops.automation.history.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(durationMs)="{ item }">
              <span class="font-mono text-xs">{{ item.durationMs }} ms</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.automation.history.empty')"
            icon="ph:clock-counter-clockwise-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type {
  Workflow,
  WorkflowActionKey,
  WorkflowField,
  WorkflowOperator,
  WorkflowTriggerKey,
} from '@/types/platformTools'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.automation.title') })

const store = useAutomationWorkflowsStore()
const { history } = storeToRefs(store)

// Mock-only id handling: unknown or "new" ids start from a blank workflow.
const id = String(route.params.id ?? 'new')
const existing = store.getById(id)
const wf = reactive<Workflow>(
  existing
    ? { ...existing, conditions: existing.conditions.map((c) => ({ ...c })), actions: existing.actions.map((a) => ({ ...a })) }
    : { id, name: '', trigger: 'order_created', conditions: [], actions: [], lastRun: '', runs: 0, enabled: false },
)

const saved = ref(false)
let seq = 0
const uid = () => `n${Date.now()}-${seq++}`

const addCondition = () =>
  wf.conditions.push({ id: uid(), field: 'order_total', operator: 'greater_than', value: '' })
const removeCondition = (cid: string) => {
  wf.conditions = wf.conditions.filter((c) => c.id !== cid)
}
const addAction = () => wf.actions.push({ id: uid(), type: 'tag_order', param: '' })
const removeAction = (aid: string) => {
  wf.actions = wf.actions.filter((a) => a.id !== aid)
}

function save() {
  // Mock save: persist into the in-memory store only.
  const target = store.getById(wf.id)
  const copy: Workflow = { ...wf, conditions: [...wf.conditions], actions: [...wf.actions] }
  if (target) Object.assign(target, copy)
  else store.workflows.unshift({ ...copy, id: uid() })
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}

const triggerKeys: WorkflowTriggerKey[] = ['order_created', 'low_stock', 'cod_unconfirmed', 'order_delivered', 'cart_abandoned']
const actionKeys: WorkflowActionKey[] = ['tag_order', 'send_whatsapp', 'hold_order', 'notify_staff']
const fieldKeys: WorkflowField[] = ['order_total', 'payment_method', 'city', 'stock_level', 'customer_tag']
const operatorKeys: WorkflowOperator[] = ['equals', 'greater_than', 'less_than', 'contains']

const triggerOptions = computed(() =>
  triggerKeys.map((k) => ({ value: k, label: t(`dashboard.ops.automation.triggers.${k}`) })),
)
const actionOptions = computed(() =>
  actionKeys.map((k) => ({ value: k, label: t(`dashboard.ops.automation.actions.${k}`) })),
)
const fieldOptions = computed(() =>
  fieldKeys.map((k) => ({ value: k, label: t(`dashboard.ops.automation.fields.${k}`) })),
)
const operatorOptions = computed(() =>
  operatorKeys.map((k) => ({ value: k, label: t(`dashboard.ops.automation.operators.${k}`) })),
)

const runTones: Record<string, Tone> = { success: 'success', failed: 'danger', skipped: 'neutral' }

const historyHeaders = computed(() => [
  { key: 'at', label: t('dashboard.ops.common.date') },
  { key: 'target', label: t('dashboard.ops.automation.history.target') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'durationMs', label: t('dashboard.ops.automation.history.duration') },
])
</script>
