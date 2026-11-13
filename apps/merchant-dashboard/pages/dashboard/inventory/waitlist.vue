<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.waitlist.title')"
          :subtitle="t('dashboard.ops.waitlist.subtitle')"
          :count="entries.length"
        >
          <LazyVButton
            icon="ph:bell-ringing-bold"
            iconPosition="left"
            :label="t('dashboard.ops.waitlist.notifyAll')"
            :disabled="!pendingCount"
            @click="confirmOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.waitlist.stats.subscribers')"
            :value="subscribers.length"
            iconName="ph:users-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.waitlist.stats.pending')"
            :value="pendingCount"
            iconName="ph:hourglass-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.waitlist.stats.notified')"
            :value="entries.length - pendingCount"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="entries.length" :headers="headers" :items="entries" @row-click="(row: any) => openDetail(row.id)">
            <template #cell(product)="{ item }">
              <span class="text-sm font-semibold">{{ item.product }}</span>
              <span class="text-xs text-tx-muted ms-2">{{ item.variant }}</span>
            </template>
            <template #cell(subscribers)="{ item }">
              <span class="font-mono text-sm">{{ store.countFor(item.id) }}</span>
            </template>
            <template #cell(lastRequest)="{ item }">
              <span class="font-mono text-xs">{{ item.lastRequest }}</span>
            </template>
            <template #cell(notified)="{ item }">
              <status-pill :tone="item.notified ? 'success' : 'warning'">
                {{ item.notified ? t('dashboard.ops.waitlist.notifiedYes') : t('dashboard.ops.waitlist.notifiedNo') }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <LazyVButton variant="ghost" :label="t('dashboard.ops.waitlist.view')" @click.stop="openDetail(item.id)" />
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.waitlist.empty')"
            :hint="t('dashboard.ops.waitlist.emptyHint')"
            icon="ph:bell-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="detailOpen"
      :title="t('dashboard.ops.waitlist.detailTitle')"
      :subtitle="activeEntry ? `${activeEntry.product} - ${activeEntry.variant}` : ''"
    >
      <ul v-if="activeSubscribers.length" class="divide-y divide-border-subtle p-1">
        <li v-for="s in activeSubscribers" :key="s.id" class="flex items-center justify-between py-3">
          <span class="font-mono text-xs">{{ s.contact }}</span>
          <status-pill :tone="s.channel === 'whatsapp' ? 'success' : 'info'">
            {{ t(`dashboard.ops.waitlist.channels.${s.channel}`) }}
          </status-pill>
        </li>
      </ul>
      <ops-empty-state v-else :title="t('dashboard.ops.waitlist.noSubscribers')" icon="ph:users-bold" />
    </LazyVSidePanel>

    <LazyVDialog v-model="confirmOpen" :title="t('dashboard.ops.waitlist.confirmTitle')" maxWidth="lg">
      <div class="space-y-4">
        <p class="text-sm text-tx-secondary">
          {{ t('dashboard.ops.waitlist.confirmBody', { n: subscribers.length }) }}
        </p>
        <LazyVTextareaInput v-model="template" :rows="5" :label="t('dashboard.ops.waitlist.template')" />
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <LazyVButton variant="secondary" :label="t('dashboard.ops.catxCommon.cancel')" @click="confirmOpen = false" />
          <LazyVButton :label="t('dashboard.ops.waitlist.send')" @click="send" />
        </div>
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.waitlist.title') })

const store = useCatxWaitlistStore()
const { entries, subscribers } = storeToRefs(store)

const detailOpen = ref(false)
const confirmOpen = ref(false)
const activeId = ref<string | null>(null)
const template = ref(t('dashboard.ops.waitlist.defaultTemplate'))

const pendingCount = computed(() => entries.value.filter((e) => !e.notified).length)
const activeEntry = computed(() => entries.value.find((e) => e.id === activeId.value))
const activeSubscribers = computed(() => subscribers.value.filter((s) => s.entryId === activeId.value))

function openDetail(id: string) {
  activeId.value = id
  detailOpen.value = true
}

function send() {
  store.notifyAll()
  confirmOpen.value = false
}

const headers = computed(() => [
  { key: 'product', label: t('dashboard.ops.waitlist.cols.product') },
  { key: 'subscribers', label: t('dashboard.ops.waitlist.cols.subscribers') },
  { key: 'lastRequest', label: t('dashboard.ops.waitlist.cols.lastRequest') },
  { key: 'notified', label: t('dashboard.ops.waitlist.cols.notified') },
  { key: 'actions', label: '' },
])
</script>
