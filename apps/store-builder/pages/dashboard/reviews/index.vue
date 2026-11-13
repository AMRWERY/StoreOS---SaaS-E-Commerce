<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.reviews.title')"
          :subtitle="t('dashboard.ops.reviews.subtitle')"
          :count="reviews.length"
        />

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.reviews.stats.total')"
            :value="reviews.length"
            iconName="ph:chat-centered-text-bold"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.reviews.stats.average')"
            :value="average"
            iconName="ph:star-fill"
            iconColor="text-warning"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.reviews.stats.pending')"
            :value="countBy('pending')"
            iconName="ph:hourglass-bold"
            iconColor="text-accent"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.reviews.stats.withPhoto')"
            :value="reviews.filter((r) => r.hasPhoto).length"
            iconName="ph:camera-bold"
            iconColor="text-info"
            valueColor="font-mono"
          />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="space-y-4 lg:col-span-2">
            <LazyVTabs v-model="tab" :tabs="tabs" />

            <ul v-if="filtered.length" class="space-y-3">
              <li v-for="r in filtered" :key="r.id" class="card space-y-3 p-4">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="flex items-center gap-3">
                    <mkt-star-rating :rating="r.rating" />
                    <span class="font-mono text-xs font-semibold">{{ r.rating }}.0</span>
                    <status-pill v-if="r.hasPhoto" tone="info">
                      <Icon name="ph:camera-bold" class="me-1" />
                      {{ t('dashboard.ops.reviews.photo') }}
                    </status-pill>
                  </div>
                  <span class="font-mono text-[11px] text-tx-muted">{{ r.date }}</span>
                </div>
                <p class="text-sm leading-relaxed">{{ r.text }}</p>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-tx-muted">
                  <span>{{ t('dashboard.ops.reviews.product') }}: <span class="text-tx-secondary">{{ r.product }}</span></span>
                  <span>{{ t('dashboard.ops.common.customer') }}: <span class="text-tx-secondary">{{ r.customer }}</span></span>
                  <span class="font-mono">{{ r.id }}</span>
                </div>
                <div v-if="r.reply" class="rounded-md border border-border-subtle bg-bg-elevated px-3 py-2">
                  <p class="text-eyebrow mb-1">{{ t('dashboard.ops.reviews.yourReply') }}</p>
                  <p class="text-xs text-tx-secondary">{{ r.reply }}</p>
                </div>
                <div class="flex items-center gap-4 border-t border-border-subtle pt-3">
                  <button
                    v-if="r.status !== 'published'"
                    class="text-[11px] font-semibold text-tx-muted hover:text-success transition-colors"
                    @click="setStatus(r.id, 'published')"
                  >
                    {{ t('dashboard.ops.reviews.approve') }}
                  </button>
                  <button
                    v-if="r.status !== 'rejected'"
                    class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors"
                    @click="setStatus(r.id, 'rejected')"
                  >
                    {{ t('dashboard.ops.reviews.reject') }}
                  </button>
                  <button
                    class="text-[11px] font-semibold text-tx-muted hover:text-brand transition-colors"
                    @click="openReply(r.id)"
                  >
                    {{ r.reply ? t('dashboard.ops.reviews.editReply') : t('dashboard.ops.reviews.reply') }}
                  </button>
                </div>
              </li>
            </ul>
            <div v-else class="card">
              <ops-empty-state
                :title="t('dashboard.ops.reviews.empty')"
                :hint="t('dashboard.ops.reviews.emptyHint')"
                icon="ph:chat-centered-text-bold"
              />
            </div>
          </div>

          <section class="card h-fit space-y-4 p-5">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.reviews.distribution') }}</h2>
            <ul class="space-y-2.5">
              <li v-for="row in distribution" :key="row.star" class="flex items-center gap-3">
                <span class="flex w-8 items-center gap-1 font-mono text-xs text-tx-secondary">
                  {{ row.star }}<Icon name="ph:star-fill" class="text-warning" />
                </span>
                <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-elevated">
                  <div class="h-full rounded-full bg-warning transition-all duration-300" :style="{ width: `${row.pct}%` }" />
                </div>
                <span class="w-8 text-end font-mono text-xs text-tx-muted">{{ row.count }}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>

    <LazyVSidePanel
      v-model="replyOpen"
      :title="t('dashboard.ops.reviews.reply')"
      :subtitle="activeReview ? `${activeReview.customer} · ${activeReview.product}` : ''"
    >
      <form v-if="activeReview" class="space-y-5 p-1" @submit.prevent="sendReply">
        <div class="rounded-md border border-border-subtle bg-bg-elevated p-3">
          <mkt-star-rating :rating="activeReview.rating" />
          <p class="mt-2 text-xs leading-relaxed text-tx-secondary">{{ activeReview.text }}</p>
        </div>
        <LazyVTextareaInput
          v-model="replyText"
          :label="t('dashboard.ops.reviews.yourReply')"
          :placeholder="t('dashboard.ops.reviews.replyPlaceholder')"
          :rows="5"
        />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.reviews.sendReply')" :disabled="!replyText.trim()" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { ReviewStatus } from '@/types/marketing'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.reviews.title') })

const store = useMktReviewsStore()
const { reviews } = storeToRefs(store)
const { setStatus } = store

const countBy = (s: ReviewStatus) => reviews.value.filter((r) => r.status === s).length

const tab = ref<string>('pending')
const tabs = computed(() =>
  (['pending', 'published', 'rejected'] as ReviewStatus[]).map((s) => ({
    name: t(`dashboard.ops.reviews.status.${s}`),
    value: s,
    count: countBy(s),
  })),
)
const filtered = computed(() => reviews.value.filter((r) => r.status === tab.value))

const average = computed(() =>
  reviews.value.length
    ? (reviews.value.reduce((s, r) => s + r.rating, 0) / reviews.value.length).toFixed(1)
    : '0.0',
)
const distribution = computed(() =>
  [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.value.filter((r) => r.rating === star).length
    return { star, count, pct: reviews.value.length ? Math.round((count / reviews.value.length) * 100) : 0 }
  }),
)

const replyOpen = ref(false)
const activeId = ref('')
const replyText = ref('')
const activeReview = computed(() => reviews.value.find((r) => r.id === activeId.value))

function openReply(id: string) {
  activeId.value = id
  replyText.value = reviews.value.find((r) => r.id === id)?.reply ?? ''
  replyOpen.value = true
}
function sendReply() {
  if (!replyText.value.trim()) return
  store.reply(activeId.value, replyText.value.trim())
  replyOpen.value = false
}
</script>
