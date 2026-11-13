<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.kyc.title')"
          :subtitle="t('dashboard.ops.kyc.subtitle')"
        />

        <section :class="['rounded-lg border p-4 flex flex-wrap items-start justify-between gap-3', banner.wrap]">
          <div class="flex items-start gap-3">
            <Icon :name="banner.icon" :class="['text-xl shrink-0 mt-0.5', banner.iconClass]" />
            <div class="space-y-1">
              <p class="text-sm font-semibold">{{ t(`dashboard.ops.kyc.banner.${status}.title`) }}</p>
              <p class="text-xs text-tx-secondary">{{ t(`dashboard.ops.kyc.banner.${status}.hint`) }}</p>
              <ul v-if="status === 'rejected'" class="text-xs text-danger space-y-0.5 pt-1">
                <li v-for="d in rejectedDocs" :key="d.key">
                  {{ t(`dashboard.ops.kyc.docs.${d.key}`) }}: {{ t(`dashboard.ops.kyc.docReasons.${d.reason}`) }}
                </li>
              </ul>
            </div>
          </div>
          <LazyVButton
            v-if="status === 'rejected'"
            icon="ph:arrow-counter-clockwise-bold"
            :label="t('dashboard.ops.kyc.resubmit')"
            @click="resubmit"
          />
        </section>

        <section class="card p-4">
          <ol class="flex flex-wrap gap-2">
            <li
              v-for="(s, i) in steps"
              :key="s"
              :class="[
                'flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs transition-colors',
                i === step && editing ? 'border-brand bg-brand-dim text-brand' : 'border-border-subtle text-tx-secondary',
              ]"
            >
              <span class="font-mono font-semibold">{{ i + 1 }}</span>
              <span>{{ t(`dashboard.ops.kyc.steps.${s}`) }}</span>
            </li>
          </ol>
        </section>

        <section v-if="editing" class="card p-4 space-y-4">
          <template v-if="step === 0">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.kyc.steps.type') }}</h2>
            <LazyVSelectInput
              v-model="form.businessType"
              :label="t('dashboard.ops.kyc.businessType')"
              :options="typeOptions"
            />
            <p class="text-[11px] text-tx-muted">{{ t('dashboard.ops.kyc.businessTypeHint') }}</p>
          </template>

          <template v-else-if="step === 1">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.kyc.steps.details') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LazyVInput v-model="form.legalName" :label="t('dashboard.ops.kyc.fields.legalName')" />
              <LazyVInput v-model="form.commercialRegisterNo" :label="t('dashboard.ops.kyc.fields.commercialRegisterNo')" inputClass="font-mono" />
              <LazyVInput v-model="form.taxCardNo" :label="t('dashboard.ops.kyc.fields.taxCardNo')" inputClass="font-mono" />
              <LazyVInput v-model="form.nationalId" :label="t('dashboard.ops.kyc.fields.nationalId')" inputClass="font-mono" />
            </div>
            <LazyVInput v-model="form.address" :label="t('dashboard.ops.kyc.fields.address')" />
            <p class="text-[11px] text-tx-muted">{{ t('dashboard.ops.kyc.fields.nationalIdHint') }}</p>
          </template>

          <template v-else-if="step === 2">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.kyc.steps.docs') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="d in documents" :key="d.key" class="space-y-2">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-semibold">{{ t(`dashboard.ops.kyc.docs.${d.key}`) }}</span>
                  <status-pill :tone="docTones[d.status]">{{ t(`dashboard.ops.kyc.docStatus.${d.status}`) }}</status-pill>
                </div>
                <LazyVFileUpload
                  accept="image/*,application/pdf"
                  :title="d.fileName || t('dashboard.ops.kyc.uploadTitle')"
                  :subtitle="t('dashboard.ops.kyc.uploadSubtitle')"
                  @change="(f: File | null) => setDoc(d.key, f ? f.name : null)"
                />
              </div>
            </div>
          </template>

          <template v-else-if="step === 3">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.kyc.steps.payout') }}</h2>
            <LazyVSelectInput
              v-model="payout.method"
              :label="t('dashboard.ops.kyc.payout.method')"
              :options="methodOptions"
            />
            <div v-if="payout.method === 'bank'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LazyVInput v-model="payout.bankName" :label="t('dashboard.ops.kyc.payout.bankName')" />
              <LazyVInput v-model="payout.accountName" :label="t('dashboard.ops.kyc.payout.accountName')" />
              <LazyVInput v-model="payout.iban" :label="t('dashboard.ops.kyc.payout.iban')" inputClass="font-mono" />
            </div>
            <LazyVInput
              v-else
              v-model="payout.walletNumber"
              :label="t('dashboard.ops.kyc.payout.walletNumber')"
              inputClass="font-mono"
            />
          </template>

          <template v-else>
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.kyc.steps.review') }}</h2>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <dt class="text-tx-muted">{{ t('dashboard.ops.kyc.businessType') }}</dt>
                <dd>{{ t(`dashboard.ops.kyc.businessTypes.${form.businessType}`) }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t('dashboard.ops.kyc.fields.legalName') }}</dt>
                <dd>{{ form.legalName }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t('dashboard.ops.kyc.fields.commercialRegisterNo') }}</dt>
                <dd class="font-mono">{{ form.commercialRegisterNo }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t('dashboard.ops.kyc.fields.taxCardNo') }}</dt>
                <dd class="font-mono">{{ form.taxCardNo }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t('dashboard.ops.kyc.payout.method') }}</dt>
                <dd>{{ t(`dashboard.ops.kyc.payout.methods.${payout.method}`) }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ payout.method === 'bank' ? t('dashboard.ops.kyc.payout.iban') : t('dashboard.ops.kyc.payout.walletNumber') }}</dt>
                <dd class="font-mono break-all">{{ payout.method === 'bank' ? payout.iban : payout.walletNumber }}</dd>
              </div>
            </dl>
            <div class="rounded-md border border-border-subtle bg-bg-elevated p-3 space-y-2">
              <p class="text-xs font-semibold">{{ t('dashboard.ops.kyc.policy.title') }}</p>
              <p class="text-[11px] text-tx-secondary">{{ t('dashboard.ops.kyc.policy.body') }}</p>
              <LazyVInput v-model="policyAck" type="checkbox" :label="t('dashboard.ops.kyc.policy.ack')" />
            </div>
          </template>

          <div class="flex justify-between gap-2 pt-2">
            <LazyVButton
              variant="ghost"
              size="none"
              className="px-4 py-2 text-xs"
              :disabled="step === 0"
              :label="t('dashboard.ops.kyc.back')"
              @click="step--"
            />
            <LazyVButton
              v-if="step < steps.length - 1"
              size="none"
              className="px-4 py-2 text-xs"
              :label="t('dashboard.ops.kyc.next')"
              @click="step++"
            />
            <LazyVButton
              v-else
              size="none"
              className="px-4 py-2 text-xs"
              :disabled="!canSubmit"
              :label="t('dashboard.ops.kyc.submit')"
              @click="submit"
            />
          </div>
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.kyc.documentsHeading') }}</h2>
          </div>
          <LazyVTable v-if="documents.length" :headers="headers" :items="documents">
            <template #cell(key)="{ item }">
              <span class="text-sm">{{ t(`dashboard.ops.kyc.docs.${item.key}`) }}</span>
            </template>
            <template #cell(fileName)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.fileName || '-' }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="docTones[item.status]">{{ t(`dashboard.ops.kyc.docStatus.${item.status}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.kyc.empty')"
            :hint="t('dashboard.ops.kyc.emptyHint')"
            icon="ph:identification-card-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { KycStatus } from '@/types/trust'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.kyc.title') })

const store = useTrustKycStore()
const { status, step, policyAck, form, payout, documents } = storeToRefs(store)
const { setDoc, resubmit, submit } = store

const steps = ['type', 'details', 'docs', 'payout', 'review'] as const
const editing = computed(() => status.value === 'not_started')
const rejectedDocs = computed(() => documents.value.filter((d) => d.status === 'rejected'))
const canSubmit = computed(
  () => policyAck.value && documents.value.every((d) => d.status !== 'missing'),
)

const banners: Record<KycStatus, { wrap: string; icon: string; iconClass: string }> = {
  not_started: { wrap: 'border-border-subtle bg-bg-elevated', icon: 'ph:shield-bold', iconClass: 'text-tx-muted' },
  in_review: { wrap: 'border-warning/30 bg-warning-dim', icon: 'ph:hourglass-medium-bold', iconClass: 'text-warning' },
  verified: { wrap: 'border-success/30 bg-success-dim', icon: 'ph:seal-check-bold', iconClass: 'text-success' },
  rejected: { wrap: 'border-danger/30 bg-danger-dim', icon: 'ph:x-circle-bold', iconClass: 'text-danger' },
}
const banner = computed(() => banners[status.value])

const docTones: Record<string, Tone> = {
  missing: 'neutral',
  uploaded: 'info',
  in_review: 'warning',
  approved: 'success',
  rejected: 'danger',
}

const typeOptions = computed(() =>
  (['individual', 'sole', 'company'] as const).map((v) => ({
    value: v,
    label: t(`dashboard.ops.kyc.businessTypes.${v}`),
  })),
)
const methodOptions = computed(() =>
  (['bank', 'wallet'] as const).map((v) => ({
    value: v,
    label: t(`dashboard.ops.kyc.payout.methods.${v}`),
  })),
)

const headers = computed(() => [
  { key: 'key', label: t('dashboard.ops.kyc.document') },
  { key: 'fileName', label: t('dashboard.ops.kyc.file') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])
</script>
