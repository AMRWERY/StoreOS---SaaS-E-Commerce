<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.campaignBuilder.title')"
          :subtitle="t('dashboard.ops.campaignBuilder.subtitle')"
        >
          <LazyVButton
            variant="secondary"
            icon="ph:floppy-disk-bold"
            iconPosition="left"
            :label="t('dashboard.ops.campaignBuilder.saveDraft')"
            @click="finish('draft')"
          />
        </ops-page-header>

        <ol class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <li
            v-for="(s, i) in stepKeys"
            :key="s"
            :class="[
              'card flex items-center gap-3 px-3 py-2.5 transition-colors',
              i === step ? 'border-brand' : '',
            ]"
          >
            <span
              :class="[
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold',
                i < step ? 'bg-success-dim text-success' : i === step ? 'bg-brand-dim text-brand' : 'bg-bg-elevated text-tx-muted',
              ]"
            >
              <Icon v-if="i < step" name="ph:check-bold" />
              <template v-else>{{ i + 1 }}</template>
            </span>
            <span class="text-xs font-semibold" :class="i === step ? 'text-tx-primary' : 'text-tx-secondary'">
              {{ t(`dashboard.ops.campaignBuilder.steps.${s}`) }}
            </span>
          </li>
        </ol>

        <!-- Step 1: audience -->
        <section v-if="step === 0" class="card max-w-2xl space-y-5 p-5">
          <LazyVSelectInput
            v-model="form.segment"
            :label="t('dashboard.ops.campaignBuilder.segment')"
            :options="segmentOptions"
          />
          <LazyVInput
            v-model="form.subject"
            :label="t('dashboard.ops.campaignBuilder.subject')"
            :placeholder="t('dashboard.ops.campaignBuilder.subjectPlaceholder')"
          />
          <div class="flex items-center justify-between rounded-md border border-border-subtle bg-bg-elevated px-3 py-2.5">
            <span class="text-xs text-tx-secondary">{{ t('dashboard.ops.campaignBuilder.recipients') }}</span>
            <span class="font-mono text-sm font-semibold text-brand">{{ recipients.toLocaleString('en-US') }}</span>
          </div>
          <div class="flex items-start gap-3 rounded-md border border-info/30 bg-info-dim px-3 py-3">
            <Icon name="ph:shield-check-bold" class="mt-0.5 shrink-0 text-info" />
            <div>
              <p class="text-xs font-semibold text-info">{{ t('dashboard.ops.campaignBuilder.consentTitle') }}</p>
              <p class="mt-1 text-[11px] leading-relaxed text-tx-secondary">
                {{ t('dashboard.ops.campaignBuilder.consentBody') }}
              </p>
            </div>
          </div>
        </section>

        <!-- Step 2: content -->
        <div v-else-if="step === 1" class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section class="card space-y-4 p-5">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="type in blockTypes"
                :key="type"
                type="button"
                class="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-bg-elevated px-2.5 py-1.5 text-[11px] font-semibold text-tx-secondary transition-colors hover:border-brand hover:text-brand"
                @click="addBlock(type)"
              >
                <Icon name="ph:plus-bold" />
                {{ t(`dashboard.ops.campaignBuilder.blocks.${type}`) }}
              </button>
            </div>

            <ul v-if="blocks.length" class="space-y-2">
              <li
                v-for="(b, i) in blocks"
                :key="b.id"
                class="rounded-md border border-border-subtle bg-bg-elevated p-3"
              >
                <div class="mb-2 flex items-center justify-between gap-2">
                  <span class="text-eyebrow">{{ t(`dashboard.ops.campaignBuilder.blocks.${b.type}`) }}</span>
                  <div class="flex items-center gap-1">
                    <button
                      type="button"
                      class="p-1 text-tx-muted transition-colors hover:text-tx-primary disabled:opacity-30"
                      :disabled="i === 0"
                      :aria-label="t('dashboard.ops.campaignBuilder.moveUp')"
                      @click="move(i, -1)"
                    >
                      <Icon name="ph:arrow-up-bold" />
                    </button>
                    <button
                      type="button"
                      class="p-1 text-tx-muted transition-colors hover:text-tx-primary disabled:opacity-30"
                      :disabled="i === blocks.length - 1"
                      :aria-label="t('dashboard.ops.campaignBuilder.moveDown')"
                      @click="move(i, 1)"
                    >
                      <Icon name="ph:arrow-down-bold" />
                    </button>
                    <button
                      type="button"
                      class="p-1 text-tx-muted transition-colors hover:text-danger"
                      :aria-label="t('dashboard.ops.common.delete')"
                      @click="removeBlock(b.id)"
                    >
                      <Icon name="ph:trash-bold" />
                    </button>
                  </div>
                </div>
                <LazyVTextareaInput
                  v-if="b.type === 'text' || b.type === 'footer'"
                  v-model="b.text"
                  :rows="2"
                />
                <LazyVInput v-else-if="b.type !== 'image'" v-model="b.text" />
                <p v-else class="text-[11px] text-tx-muted">{{ t('dashboard.ops.campaignBuilder.imageHint') }}</p>
              </li>
            </ul>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.campaignBuilder.noBlocks')"
              :hint="t('dashboard.ops.campaignBuilder.noBlocksHint')"
              icon="ph:stack-bold"
            />
          </section>

          <section class="card space-y-3 p-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 class="text-eyebrow">{{ t('dashboard.ops.campaignBuilder.previewTitle') }}</h2>
              <div class="flex items-center gap-3">
                <div class="flex overflow-hidden rounded-md border border-border-subtle">
                  <button
                    v-for="d in devices"
                    :key="d"
                    type="button"
                    :class="[
                      'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold transition-colors',
                      device === d ? 'bg-brand-dim text-brand' : 'text-tx-secondary hover:text-tx-primary',
                    ]"
                    @click="device = d"
                  >
                    <Icon :name="d === 'desktop' ? 'ph:desktop-bold' : 'ph:device-mobile-bold'" />
                    {{ t(`dashboard.ops.campaignBuilder.device.${d}`) }}
                  </button>
                </div>
                <LazyVSwitchButton v-model="rtl" :label="t('dashboard.ops.campaignBuilder.rtlPreview')" />
              </div>
            </div>
            <mkt-email-preview :blocks="blocks" :device="device" :rtl="rtl" />
          </section>
        </div>

        <!-- Step 3: schedule -->
        <section v-else-if="step === 2" class="card max-w-2xl space-y-5 p-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              v-for="m in modes"
              :key="m"
              type="button"
              :class="[
                'rounded-md border p-4 text-start transition-colors',
                form.mode === m ? 'border-brand bg-brand-dim' : 'border-border-subtle bg-bg-elevated hover:border-border-default',
              ]"
              @click="form.mode = m"
            >
              <p class="text-sm font-semibold">{{ t(`dashboard.ops.campaignBuilder.mode.${m}`) }}</p>
              <p class="mt-1 text-[11px] text-tx-muted">{{ t(`dashboard.ops.campaignBuilder.mode.${m}Hint`) }}</p>
            </button>
          </div>
          <LazyVInput
            v-if="form.mode === 'later'"
            v-model="form.sendAt"
            type="date"
            :label="t('dashboard.ops.campaignBuilder.sendAt')"
          />
        </section>

        <!-- Step 4: review -->
        <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section class="card space-y-3 p-5">
            <dl class="space-y-3 text-sm">
              <div v-for="row in reviewRows" :key="row.label" class="flex items-center justify-between gap-4">
                <dt class="text-xs text-tx-muted">{{ row.label }}</dt>
                <dd :class="['text-end', row.mono ? 'font-mono' : '']">{{ row.value }}</dd>
              </div>
            </dl>
            <div class="flex items-start gap-3 rounded-md border border-info/30 bg-info-dim px-3 py-3">
              <Icon name="ph:shield-check-bold" class="mt-0.5 shrink-0 text-info" />
              <p class="text-[11px] leading-relaxed text-tx-secondary">
                {{ t('dashboard.ops.campaignBuilder.consentBody') }}
              </p>
            </div>
          </section>
          <section class="card p-5">
            <mkt-email-preview :blocks="blocks" :device="device" :rtl="rtl" />
          </section>
        </div>

        <div class="flex items-center justify-between gap-3">
          <LazyVButton
            v-if="step > 0"
            variant="secondary"
            icon="ph:arrow-left-bold"
            iconPosition="left"
            :label="t('dashboard.ops.campaignBuilder.back')"
            @click="step--"
          />
          <span v-else />
          <LazyVButton
            v-if="step < stepKeys.length - 1"
            :label="t('dashboard.ops.campaignBuilder.next')"
            :disabled="step === 0 && !form.subject.trim()"
            @click="step++"
          />
          <LazyVButton
            v-else
            icon="ph:paper-plane-tilt-bold"
            iconPosition="left"
            :label="form.mode === 'now' ? t('dashboard.ops.campaignBuilder.sendNow') : t('dashboard.ops.campaignBuilder.schedule')"
            :disabled="!blocks.length || (form.mode === 'later' && !form.sendAt)"
            @click="finish(form.mode === 'now' ? 'sent' : 'scheduled')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CampaignStatus, EmailBlock, EmailBlockType } from '@/types/marketing'

const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.campaignBuilder.title') })

const store = useMktCampaignsStore()

const stepKeys = ['audience', 'content', 'schedule', 'review'] as const
const step = ref(0)

const blockTypes: EmailBlockType[] = ['header', 'text', 'image', 'products', 'button', 'footer']
const modes = ['now', 'later'] as const
const devices = ['desktop', 'mobile'] as const
const device = ref<'desktop' | 'mobile'>('desktop')
const rtl = ref(false)

const form = reactive({ segment: 'all', subject: '', mode: 'now' as 'now' | 'later', sendAt: '' })

const segmentCounts: Record<string, number> = { all: 5200, vip: 640, active: 2150, inactive: 980, cairo: 1720 }
const segmentOptions = computed(() =>
  Object.keys(segmentCounts).map((k) => ({ value: k, label: t(`dashboard.ops.campaignBuilder.segments.${k}`) })),
)
const recipients = computed(() => segmentCounts[form.segment] ?? 0)

let seq = 0
const newBlock = (type: EmailBlockType): EmailBlock => ({
  id: `blk-${++seq}`,
  type,
  text: type === 'image' ? '' : t(`dashboard.ops.campaignBuilder.defaults.${type}`),
})
const blocks = ref<EmailBlock[]>((['header', 'text', 'products', 'button', 'footer'] as EmailBlockType[]).map(newBlock))

function addBlock(type: EmailBlockType) {
  blocks.value.push(newBlock(type))
}
function removeBlock(id: string) {
  blocks.value = blocks.value.filter((b) => b.id !== id)
}
function move(i: number, dir: -1 | 1) {
  const j = i + dir
  const list = blocks.value
  const a = list[i]
  const b = list[j]
  if (!a || !b) return
  list[i] = b
  list[j] = a
}

const reviewRows = computed(() => [
  { label: t('dashboard.ops.campaignBuilder.subject'), value: form.subject || '—', mono: false },
  { label: t('dashboard.ops.campaignBuilder.segment'), value: t(`dashboard.ops.campaignBuilder.segments.${form.segment}`), mono: false },
  { label: t('dashboard.ops.campaignBuilder.recipients'), value: recipients.value.toLocaleString('en-US'), mono: true },
  { label: t('dashboard.ops.campaignBuilder.blocksCount'), value: String(blocks.value.length), mono: true },
  {
    label: t('dashboard.ops.campaignBuilder.steps.schedule'),
    value: form.mode === 'now' ? t('dashboard.ops.campaignBuilder.mode.now') : form.sendAt,
    mono: form.mode === 'later',
  },
])

function finish(status: CampaignStatus) {
  const today = new Date().toISOString().slice(0, 10)
  store.add({
    name: form.subject.trim() || t('dashboard.ops.campaignBuilder.untitled'),
    channel: 'email',
    audience: t(`dashboard.ops.campaignBuilder.segments.${form.segment}`),
    date: status === 'scheduled' ? form.sendAt : status === 'sent' ? today : '',
    sent: status === 'sent' ? recipients.value : 0,
    openRate: 0,
    clickRate: 0,
    revenue: 0,
    status,
  })
  navigateTo(localePath('/dashboard/campaigns'))
}
</script>
