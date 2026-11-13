<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.paymentLinks.title')"
          :subtitle="t('dashboard.ops.paymentLinks.subtitle')"
          :count="links.length"
        >
          <LazyVButton icon="ph:plus-bold" :label="t('dashboard.ops.paymentLinks.create')" @click="openPanel" />
        </ops-page-header>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <!-- Links -->
        <section v-if="tab === 'links'" class="card overflow-hidden">
          <LazyVTable v-if="links.length" :headers="headers" :items="links">
            <template #cell(name)="{ item }">
              <div>
                <p class="text-sm font-medium">{{ item.name }}</p>
                <p v-if="item.oneTime" class="text-[10px] text-tx-muted">{{ t('dashboard.ops.paymentLinks.oneTime') }}</p>
              </div>
            </template>
            <template #cell(amount)="{ item }">
              <span v-if="item.amountMode === 'fixed'" class="font-mono text-sm">{{ money(item.amount) }}</span>
              <status-pill v-else tone="neutral">{{ t('dashboard.ops.paymentLinks.modes.open') }}</status-pill>
            </template>
            <template #cell(product)="{ item }">
              <span class="text-xs text-tx-secondary">{{ item.product || '-' }}</span>
            </template>
            <template #cell(url)="{ item }">
              <div class="flex items-center gap-2">
                <span class="font-mono text-[11px] text-tx-secondary truncate max-w-[200px]" dir="ltr">{{ item.url }}</span>
                <button
                  class="text-tx-muted hover:text-brand transition-colors shrink-0"
                  :aria-label="t('common.copy')"
                  @click="copy(item.id, item.url)"
                >
                  <Icon :name="copiedId === item.id ? 'ph:check-bold' : 'ph:copy-bold'" />
                </button>
              </div>
            </template>
            <template #cell(uses)="{ item }">
              <span class="font-mono text-sm">{{ item.uses }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="statusTones[item.status]">
                {{ t(`dashboard.ops.paymentLinks.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  v-if="item.status !== 'expired'"
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="item.status === 'active' ? t('dashboard.ops.paymentLinks.disable') : t('dashboard.ops.paymentLinks.enable')"
                  @click="toggleStatus(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.paymentLinks.empty')"
            :hint="t('dashboard.ops.paymentLinks.emptyHint')"
            icon="ph:link-bold"
          />
        </section>

        <!-- Buy button -->
        <section v-else-if="tab === 'buy'" class="card p-4 space-y-4">
          <div>
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.paymentLinks.buy.title') }}</h2>
            <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.paymentLinks.buy.hint') }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyVSelectInput
              v-model="buyProduct"
              :label="t('dashboard.ops.paymentLinks.buy.product')"
              :options="productOptions"
            />
            <LazyVInput v-model="buyLabel" :label="t('dashboard.ops.paymentLinks.buy.buttonLabel')" />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
                {{ t('dashboard.ops.paymentLinks.snippet') }}
              </p>
              <LazyVButton
                size="none"
                variant="secondary"
                className="px-3 py-1 text-[11px]"
                :icon="copiedId === 'buy' ? 'ph:check-bold' : 'ph:copy-bold'"
                :label="copiedId === 'buy' ? t('dashboard.ops.paymentLinks.copied') : t('common.copy')"
                @click="copy('buy', buySnippet)"
              />
            </div>
            <pre
              class="bg-bg-elevated border border-border-subtle rounded-md p-3 font-mono text-[11px] text-tx-secondary overflow-x-auto whitespace-pre-wrap"
              dir="ltr"
            >{{ buySnippet }}</pre>
          </div>
          <div class="space-y-2">
            <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
              {{ t('dashboard.ops.paymentLinks.buy.preview') }}
            </p>
            <div class="bg-bg-elevated border border-border-subtle rounded-md p-6 flex justify-center">
              <span class="inline-flex items-center gap-2 bg-brand text-white text-xs font-semibold px-4 py-2 rounded-md">
                <Icon name="ph:shopping-bag-bold" />
                {{ buyLabel || t('dashboard.ops.paymentLinks.buy.defaultLabel') }}
              </span>
            </div>
          </div>
        </section>

        <!-- Embeddable cart -->
        <section v-else class="card p-4 space-y-4">
          <div>
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.paymentLinks.cart.title') }}</h2>
            <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.paymentLinks.cart.hint') }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LazyVSelectInput
              v-model="cartStyle"
              :label="t('dashboard.ops.paymentLinks.cart.style')"
              :options="cartStyleOptions"
            />
            <LazyVSwitchButton v-model="cartCount" :label="t('dashboard.ops.paymentLinks.cart.showCount')" class="self-end pb-2" />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
                {{ t('dashboard.ops.paymentLinks.snippet') }}
              </p>
              <LazyVButton
                size="none"
                variant="secondary"
                className="px-3 py-1 text-[11px]"
                :icon="copiedId === 'cart' ? 'ph:check-bold' : 'ph:copy-bold'"
                :label="copiedId === 'cart' ? t('dashboard.ops.paymentLinks.copied') : t('common.copy')"
                @click="copy('cart', cartSnippet)"
              />
            </div>
            <pre
              class="bg-bg-elevated border border-border-subtle rounded-md p-3 font-mono text-[11px] text-tx-secondary overflow-x-auto whitespace-pre-wrap"
              dir="ltr"
            >{{ cartSnippet }}</pre>
          </div>
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="created ? t('dashboard.ops.paymentLinks.panel.createdTitle') : t('dashboard.ops.paymentLinks.panel.title')"
      :subtitle="created ? undefined : t('dashboard.ops.paymentLinks.panel.subtitle')"
    >
      <!-- After creation -->
      <div v-if="created" class="space-y-5">
        <div class="flex justify-center">
          <chk-qr-placeholder :seed="created.url" />
        </div>
        <p class="text-[11px] text-tx-muted text-center">{{ t('dashboard.ops.paymentLinks.panel.qrNote') }}</p>
        <div class="flex items-center gap-2 bg-bg-elevated border border-border-subtle rounded-md px-3 py-2">
          <span class="font-mono text-[11px] flex-1 truncate" dir="ltr">{{ created.url }}</span>
          <button
            class="text-tx-muted hover:text-brand transition-colors shrink-0"
            :aria-label="t('common.copy')"
            @click="copy('created', created.url)"
          >
            <Icon :name="copiedId === 'created' ? 'ph:check-bold' : 'ph:copy-bold'" />
          </button>
        </div>
        <LazyVButton
          className="w-full"
          variant="secondary"
          icon="ph:download-simple-bold"
          :label="t('dashboard.ops.paymentLinks.panel.downloadQr')"
        />
      </div>

      <!-- Form -->
      <div v-else class="space-y-4">
        <LazyVInput v-model="draft.name" :label="t('dashboard.ops.paymentLinks.panel.name')" />
        <LazyVSelectInput
          v-model="draft.amountMode"
          :label="t('dashboard.ops.paymentLinks.panel.amountMode')"
          :options="modeOptions"
        />
        <LazyVInput
          v-if="draft.amountMode === 'fixed'"
          :modelValue="String(draft.amount)"
          type="number"
          inputClass="font-mono"
          :label="t('dashboard.ops.paymentLinks.panel.amount')"
          @update:modelValue="(v: string | number | boolean) => (draft.amount = Number(v))"
        />
        <LazyVSelectInput
          v-model="draft.product"
          :label="t('dashboard.ops.paymentLinks.panel.product')"
          :options="productOptionalOptions"
        />
        <LazyVDatePicker v-model="expiry" :label="t('dashboard.ops.paymentLinks.panel.expiry')" />
        <LazyVSwitchButton v-model="draft.oneTime" :label="t('dashboard.ops.paymentLinks.panel.oneTime')" />
        <LazyVTextareaInput v-model="draft.note" :rows="3" :label="t('dashboard.ops.paymentLinks.panel.note')" />
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <template v-if="created">
            <LazyVButton :label="t('dashboard.ops.paymentLinks.panel.done')" @click="panelOpen = false" />
          </template>
          <template v-else>
            <LazyVButton variant="secondary" :label="t('common.cancel')" @click="panelOpen = false" />
            <LazyVButton :label="t('common.create')" :disabled="!canSave" @click="submit" />
          </template>
        </div>
      </template>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { PaymentLink, PaymentLinkAmountMode } from '@/types/checkoutExtras'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.paymentLinks.title') })

const store = useChkLinksStore()
const { links } = storeToRefs(store)
const { toggleStatus, createLink, clearLast } = store
const { products } = storeToRefs(useChkOffersStore())

const tab = ref('links')
const tabs = computed(() => [
  { name: t('dashboard.ops.paymentLinks.tabs.links'), value: 'links', count: links.value.length },
  { name: t('dashboard.ops.paymentLinks.tabs.buy'), value: 'buy' },
  { name: t('dashboard.ops.paymentLinks.tabs.cart'), value: 'cart' },
])

const statusTones: Record<string, Tone> = { active: 'success', expired: 'neutral', disabled: 'warning' }

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.paymentLinks.cols.name') },
  { key: 'amount', label: t('dashboard.ops.paymentLinks.cols.amount') },
  { key: 'product', label: t('dashboard.ops.paymentLinks.cols.product') },
  { key: 'url', label: t('dashboard.ops.paymentLinks.cols.url') },
  { key: 'uses', label: t('dashboard.ops.paymentLinks.cols.uses'), align: 'center' as const },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

// Clipboard
const copiedId = ref('')
async function copy(id: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Clipboard may be unavailable; still show feedback in this mock UI.
  }
  copiedId.value = id
  setTimeout(() => {
    if (copiedId.value === id) copiedId.value = ''
  }, 1500)
}

// Create panel
const panelOpen = ref(false)
const created = ref<PaymentLink | null>(null)
const expiry = ref<Date | null>(null)
const draft = reactive<{
  name: string
  amountMode: PaymentLinkAmountMode
  amount: number
  product: string
  oneTime: boolean
  note: string
}>({ name: '', amountMode: 'fixed', amount: 0, product: '', oneTime: false, note: '' })

const modeOptions = computed(() =>
  (['fixed', 'open'] as const).map((m) => ({ value: m, label: t(`dashboard.ops.paymentLinks.modes.${m}`) })),
)
const productOptions = computed(() => products.value.map((p) => ({ value: p.value, label: p.label })))
const productOptionalOptions = computed(() => [
  { value: '', label: t('dashboard.ops.paymentLinks.panel.noProduct') },
  ...products.value.map((p) => ({ value: p.label, label: p.label })),
])

const canSave = computed(() => !!draft.name.trim() && (draft.amountMode === 'open' || draft.amount > 0))

function openPanel() {
  clearLast()
  created.value = null
  expiry.value = null
  Object.assign(draft, { name: '', amountMode: 'fixed', amount: 0, product: '', oneTime: false, note: '' })
  panelOpen.value = true
}
function submit() {
  if (!canSave.value) return
  created.value = createLink({
    ...draft,
    name: draft.name.trim(),
    amount: draft.amountMode === 'fixed' ? draft.amount : 0,
    expiresAt: expiry.value ? expiry.value.toISOString().slice(0, 10) : '',
  })
}

// Buy button + cart snippets
const buyProduct = ref(products.value[0]?.value ?? '')
const buyLabel = ref('')
const buySnippet = computed(
  () =>
    `<script src="https://cdn.storeos.app/buy-button.js" async><\/script>\n` +
    `<button data-storeos-buy="${buyProduct.value}">${buyLabel.value || t('dashboard.ops.paymentLinks.buy.defaultLabel')}</button>`,
)

const cartStyle = ref('floating')
const cartCount = ref(true)
const cartStyleOptions = computed(() =>
  (['floating', 'inline', 'drawer'] as const).map((s) => ({ value: s, label: t(`dashboard.ops.paymentLinks.cart.styles.${s}`) })),
)
const cartSnippet = computed(
  () =>
    `<script src="https://cdn.storeos.app/cart.js" async><\/script>\n` +
    `<div data-storeos-cart data-style="${cartStyle.value}" data-count="${cartCount.value}"></div>`,
)
</script>
