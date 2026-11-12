<template>
  <div>
    <nuxt-link-locale
      to="/platform/merchants"
      class="mb-4 inline-flex items-center gap-1 text-[11px] font-semibold text-tx-secondary hover:text-tx-primary"
    >
      <Icon name="ph:arrow-left-bold" class="rtl:rotate-180" />
      {{ t('platform.merchants.back') }}
    </nuxt-link-locale>

    <platform-empty-state
      v-if="!merchant"
      :title="t('platform.merchants.notFound')"
      icon="ph:storefront"
    />

    <template v-else>
      <platform-page-header :title="merchant.store" :subtitle="merchant.domain">
        <template #actions>
          <platform-status-pill :label="t(`platform.status.${merchant.status}`)" :tone="tones.merchantStatus(merchant.status)" />
          <span
            class="inline-flex"
            :title="t('platform.merchants.impersonateTooltip')"
          >
            <button
              type="button"
              disabled
              class="flex cursor-not-allowed items-center gap-2 rounded-md border border-border-default bg-bg-elevated px-3 py-2 text-[12px] font-bold text-tx-muted opacity-60"
              :aria-label="t('platform.merchants.impersonateTooltip')"
            >
              <Icon name="ph:user-switch" class="text-base" />
              {{ t('platform.merchants.impersonate') }}
            </button>
          </span>
          <v-button
            v-if="merchant.status !== 'suspended'"
            variant="secondary"
            icon="ph:prohibit"
            icon-position="left"
            :label="t('platform.merchants.suspend')"
            @click="openDialog"
          />
          <v-button
            v-else
            icon="ph:arrow-counter-clockwise"
            icon-position="left"
            :label="t('platform.merchants.reactivate')"
            @click="openDialog"
          />
        </template>
      </platform-page-header>
      <p class="-mt-3 mb-4 text-end text-[10px] text-tx-muted">{{ t('platform.merchants.impersonateTooltip') }}</p>

      <div class="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <!-- Profile -->
        <section class="card px-4 py-3.5 lg:col-span-4">
          <h3 class="mb-3 text-sm font-bold">{{ t('platform.merchants.profile') }}</h3>
          <dl class="space-y-2.5 text-xs">
            <div v-for="row in profileRows" :key="row.label" class="flex justify-between gap-3">
              <dt class="text-tx-muted">{{ row.label }}</dt>
              <dd class="text-end text-tx-primary" :class="row.mono ? 'font-mono' : ''">{{ row.value }}</dd>
            </div>
            <div class="flex items-center justify-between gap-3">
              <dt class="text-tx-muted">{{ t('platform.common.plan') }}</dt>
              <dd><platform-status-pill :label="t(`platform.plan.${merchant.plan}`)" :tone="tones.plan(merchant.plan)" /></dd>
            </div>
          </dl>
        </section>

        <!-- Usage -->
        <section class="card px-4 py-3.5 lg:col-span-8">
          <h3 class="mb-1 text-sm font-bold">{{ t('platform.merchants.usage') }}</h3>
          <p class="mb-4 text-[11px] text-tx-muted">{{ t('platform.merchants.usageHint', { plan: t(`platform.plan.${merchant.plan}`) }) }}</p>
          <div class="space-y-4">
            <div v-for="m in meters" :key="m.key">
              <div class="mb-1.5 flex items-center justify-between text-[11px]">
                <span class="text-tx-secondary">{{ m.label }}</span>
                <span class="font-mono text-tx-muted">
                  {{ num(m.used) }} / {{ m.limit === null ? t('platform.common.unlimited') : num(m.limit) }}
                </span>
              </div>
              <div class="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                <div class="h-full rounded-full transition-all duration-300" :class="m.barClass" :style="{ width: `${m.pct}%` }"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Activity -->
        <section class="card px-4 py-3.5 lg:col-span-6">
          <h3 class="mb-3 text-sm font-bold">{{ t('platform.merchants.activity') }}</h3>
          <ul class="space-y-3">
            <li v-for="a in activity" :key="a.id" class="flex items-start gap-3 text-xs">
              <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
              <span class="flex-1 text-tx-secondary">{{ t(`platform.activity.${a.type}`) }}</span>
              <span class="font-mono text-[10px] text-tx-muted">{{ a.date }}</span>
            </li>
          </ul>
        </section>

        <!-- Notes -->
        <section class="card px-4 py-3.5 lg:col-span-6">
          <h3 class="mb-3 text-sm font-bold">{{ t('platform.merchants.notes') }}</h3>
          <div class="mb-3 flex gap-2">
            <v-input
              v-model="noteDraft"
              class="flex-1"
              :placeholder="t('platform.merchants.notePlaceholder')"
              @keyup.enter="submitNote"
            />
            <v-button
              :label="t('platform.merchants.addNote')"
              :disabled="!noteDraft.trim()"
              @click="submitNote"
            />
          </div>
          <ul v-if="notes.length" class="space-y-2">
            <li v-for="n in notes" :key="n.id" class="rounded-md border border-border-subtle bg-bg-base px-3 py-2">
              <p class="text-xs text-tx-primary">{{ n.body }}</p>
              <p class="mt-1 text-[10px] text-tx-muted">{{ n.author }} · <span class="font-mono">{{ n.date }}</span></p>
            </li>
          </ul>
          <platform-empty-state v-else :title="t('platform.merchants.notesEmpty')" icon="ph:note" />
        </section>
      </div>

      <!-- Suspend / reactivate -->
      <v-dialog
        v-model="dialogOpen"
        :title="merchant.status === 'suspended' ? t('platform.merchants.reactivateTitle') : t('platform.merchants.suspendTitle')"
      >
        <p class="mb-4 text-xs text-tx-secondary">
          {{ merchant.status === 'suspended' ? t('platform.merchants.reactivateBody', { store: merchant.store }) : t('platform.merchants.suspendBody', { store: merchant.store }) }}
        </p>
        <v-textarea-input
          v-model="reason"
          :label="t('platform.common.reason')"
          :placeholder="t('platform.common.reasonPlaceholder')"
          :error="reasonError"
          :rows="3"
        />
        <template #footer>
          <v-button variant="secondary" :label="t('platform.common.cancel')" @click="dialogOpen = false" />
          <v-button
            :label="t('platform.common.confirm')"
            :disabled="!reason.trim()"
            @click="confirmStatusChange"
          />
        </template>
      </v-dialog>
    </template>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'platform' })

const { t } = useI18n()
const route = useRoute()
const { num, percent } = usePlatformFormat()
const tones = usePlatformTones()

const store = usePlatformMerchantsStore()
const plans = usePlatformPlansStore()

const id = computed(() => String(route.params.id))
const merchant = computed(() => store.byId(id.value))

useSeoMeta({
  title: computed(() => merchant.value?.store ?? t('platform.merchants.title')),
  robots: 'noindex, nofollow',
})

const notes = computed(() => store.notesFor(id.value))
const activity = computed(() => store.activityFor(id.value))

const profileRows = computed(() => {
  const m = merchant.value
  if (!m) return []
  return [
    { label: t('platform.common.owner'), value: m.owner },
    { label: t('platform.common.email'), value: m.ownerEmail, mono: true },
    { label: t('platform.common.city'), value: m.city },
    { label: t('platform.common.gmv'), value: `${t('platform.common.egp')} ${num(m.gmv)}`, mono: true },
    { label: t('platform.common.signupDate'), value: m.signupDate, mono: true },
    { label: t('platform.common.lastActive'), value: m.lastActive, mono: true },
  ]
})

const meters = computed(() => {
  const m = merchant.value
  const limits = m ? plans.limitFor(m.plan) : undefined
  if (!m || !limits) return []
  const build = (key: string, label: string, used: number, limit: number | null) => {
    const pct = percent(used, limit)
    return {
      key,
      label,
      used,
      limit,
      pct,
      barClass: pct >= 90 ? 'bg-danger' : pct >= 70 ? 'bg-warning' : 'bg-brand',
    }
  }
  return [
    build('orders', t('platform.merchants.meter.orders'), m.usage.orders, limits.maxOrders),
    build('skus', t('platform.merchants.meter.skus'), m.usage.skus, limits.maxSkus),
    build('staff', t('platform.merchants.meter.staff'), m.usage.staff, limits.maxStaff),
  ]
})

const noteDraft = ref('')
const submitNote = () => {
  const body = noteDraft.value.trim()
  if (!body) return
  store.addNote(id.value, body)
  noteDraft.value = ''
}

const dialogOpen = ref(false)
const reason = ref('')
const reasonError = computed(() => (dialogOpen.value && reason.value.length > 0 && !reason.value.trim() ? t('platform.common.reasonRequired') : ''))

const openDialog = () => {
  reason.value = ''
  dialogOpen.value = true
}

const confirmStatusChange = () => {
  if (!merchant.value || !reason.value.trim()) return
  store.setStatus(id.value, merchant.value.status === 'suspended' ? 'active' : 'suspended')
  store.addNote(id.value, reason.value.trim())
  dialogOpen.value = false
}
</script>
