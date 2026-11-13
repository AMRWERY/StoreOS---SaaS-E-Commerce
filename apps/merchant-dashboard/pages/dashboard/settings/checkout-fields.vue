<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.checkoutFields.title')"
          :subtitle="t('dashboard.ops.checkoutFields.subtitle')"
          :count="fields.length"
        >
          <LazyVButton icon="ph:plus-bold" :label="t('dashboard.ops.checkoutFields.add')" @click="openNew" />
        </ops-page-header>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          <section class="card overflow-hidden lg:col-span-3">
            <ul v-if="fields.length" class="divide-y divide-border-subtle">
              <li v-for="(f, i) in fields" :key="f.id" class="flex items-center gap-3 px-4 py-3">
                <div class="flex flex-col shrink-0">
                  <button
                    class="text-tx-muted hover:text-tx-primary disabled:opacity-30 transition-colors"
                    :disabled="i === 0"
                    :aria-label="t('dashboard.ops.checkoutFields.moveUp')"
                    @click="move(f.id, -1)"
                  >
                    <Icon name="ph:caret-up-bold" />
                  </button>
                  <button
                    class="text-tx-muted hover:text-tx-primary disabled:opacity-30 transition-colors"
                    :disabled="i === fields.length - 1"
                    :aria-label="t('dashboard.ops.checkoutFields.moveDown')"
                    @click="move(f.id, 1)"
                  >
                    <Icon name="ph:caret-down-bold" />
                  </button>
                </div>
                <div class="min-w-0 flex-1 space-y-1">
                  <p class="text-sm font-medium truncate">{{ f.labelEn }}</p>
                  <p class="text-[11px] text-tx-muted truncate" dir="rtl">{{ f.labelAr }}</p>
                  <div class="flex flex-wrap gap-1.5 pt-1">
                    <status-pill tone="info">{{ t(`dashboard.ops.checkoutFields.types.${f.type}`) }}</status-pill>
                    <status-pill tone="purple">{{ t(`dashboard.ops.checkoutFields.placements.${f.placement}`) }}</status-pill>
                    <status-pill v-if="f.required" tone="danger">{{ t('dashboard.ops.checkoutFields.required') }}</status-pill>
                    <status-pill v-if="f.codOnly" tone="warning">{{ t('dashboard.ops.checkoutFields.codBadge') }}</status-pill>
                  </div>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                  <LazyVButton
                    size="none"
                    variant="ghost"
                    className="px-2 py-1 text-[11px]"
                    :label="t('common.edit')"
                    @click="openEdit(f)"
                  />
                  <LazyVButton
                    size="none"
                    variant="ghost"
                    className="px-2 py-1 text-[11px]"
                    :label="t('common.delete')"
                    @click="remove(f.id)"
                  />
                  <LazyVSwitchButton :modelValue="f.enabled" @update:modelValue="toggle(f.id)" />
                </div>
              </li>
            </ul>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.checkoutFields.empty')"
              :hint="t('dashboard.ops.checkoutFields.emptyHint')"
              icon="ph:list-checks-bold"
            />
          </section>

          <section class="card p-4 space-y-3 lg:col-span-2">
            <div class="flex items-center justify-between gap-3">
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.checkoutFields.preview') }}</h2>
              <LazyVSwitchButton v-model="rtl" :label="t('dashboard.ops.checkoutFields.rtl')" />
            </div>
            <chk-fields-preview :fields="fields" :rtl="rtl" />
          </section>
        </div>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="editingId ? t('dashboard.ops.checkoutFields.panel.editTitle') : t('dashboard.ops.checkoutFields.panel.addTitle')"
    >
      <div class="space-y-4">
        <LazyVInput v-model="draft.labelEn" :label="t('dashboard.ops.checkoutFields.panel.labelEn')" />
        <LazyVInput v-model="draft.labelAr" inputClass="text-end" dir="rtl" :label="t('dashboard.ops.checkoutFields.panel.labelAr')" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <LazyVSelectInput v-model="draft.type" :label="t('dashboard.ops.checkoutFields.panel.type')" :options="typeOptions" />
          <LazyVSelectInput
            v-model="draft.placement"
            :label="t('dashboard.ops.checkoutFields.panel.placement')"
            :options="placementOptions"
          />
        </div>
        <LazyVTextareaInput
          v-if="draft.type === 'select'"
          v-model="optionsText"
          :rows="4"
          :label="t('dashboard.ops.checkoutFields.panel.options')"
          :placeholder="t('dashboard.ops.checkoutFields.panel.optionsHint')"
        />
        <LazyVSwitchButton v-model="draft.required" :label="t('dashboard.ops.checkoutFields.panel.required')" />
        <LazyVSwitchButton v-model="draft.codOnly" :label="t('dashboard.ops.checkoutFields.panel.codOnly')" />
        <LazyVSwitchButton v-model="draft.enabled" :label="t('common.enabled')" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <LazyVButton variant="secondary" :label="t('common.cancel')" @click="panelOpen = false" />
          <LazyVButton :label="t('common.save')" :disabled="!canSave" @click="submit" />
        </div>
      </template>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { CheckoutField, CheckoutFieldPlacement, CheckoutFieldType } from '@/types/checkoutExtras'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.checkoutFields.title') })

const store = useChkFieldsStore()
const { fields } = storeToRefs(store)
const { move, remove, toggle, save } = store

const rtl = ref(false)

const typeOptions = computed(() =>
  (['text', 'textarea', 'select', 'checkbox'] as const).map((v) => ({
    value: v,
    label: t(`dashboard.ops.checkoutFields.types.${v}`),
  })),
)
const placementOptions = computed(() =>
  (['contact', 'shipping', 'payment', 'notes'] as const).map((v) => ({
    value: v,
    label: t(`dashboard.ops.checkoutFields.placements.${v}`),
  })),
)

const panelOpen = ref(false)
const editingId = ref('')
const optionsText = ref('')
const draft = reactive<{
  labelEn: string
  labelAr: string
  type: CheckoutFieldType
  placement: CheckoutFieldPlacement
  required: boolean
  codOnly: boolean
  enabled: boolean
}>({ labelEn: '', labelAr: '', type: 'text', placement: 'contact', required: false, codOnly: false, enabled: true })

function openNew() {
  editingId.value = ''
  optionsText.value = ''
  Object.assign(draft, { labelEn: '', labelAr: '', type: 'text', placement: 'contact', required: false, codOnly: false, enabled: true })
  panelOpen.value = true
}
function openEdit(f: CheckoutField) {
  editingId.value = f.id
  optionsText.value = f.options.join('\n')
  Object.assign(draft, {
    labelEn: f.labelEn,
    labelAr: f.labelAr,
    type: f.type,
    placement: f.placement,
    required: f.required,
    codOnly: f.codOnly,
    enabled: f.enabled,
  })
  panelOpen.value = true
}

const canSave = computed(() => !!draft.labelEn.trim() || !!draft.labelAr.trim())

function submit() {
  if (!canSave.value) return
  const options =
    draft.type === 'select'
      ? optionsText.value.split('\n').map((o) => o.trim()).filter(Boolean)
      : []
  save({ ...draft, id: editingId.value, options })
  panelOpen.value = false
}
</script>
