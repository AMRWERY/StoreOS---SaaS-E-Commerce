<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t('dashboard.ops.appsMarket.title')" :subtitle="t('dashboard.ops.appsMarket.subtitle')" :count="apps.length" />

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <div v-if="tab === 'browse'" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside class="card p-2 md:self-start">
            <p class="px-2 py-1.5 text-[10px] font-bold tracking-widest text-tx-muted">
              {{ t('dashboard.ops.appsMarket.categoryTitle') }}
            </p>
            <button
              v-for="c in categoryKeys"
              :key="c"
              type="button"
              :class="[
                'w-full text-start px-2 py-2 rounded text-xs font-semibold transition-colors',
                category === c ? 'bg-brand-dim text-brand' : 'text-tx-secondary hover:bg-bg-elevated',
              ]"
              @click="category = c"
            >
              {{ t(`dashboard.ops.appsMarket.categories.${c}`) }}
            </button>
          </aside>

          <div class="md:col-span-3">
            <div v-if="filtered.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article v-for="app in filtered" :key="app.id" class="card p-4 space-y-3">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-md bg-bg-elevated flex items-center justify-center shrink-0">
                    <Icon :name="app.icon" class="w-5 h-5 text-brand" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <h4 class="text-sm font-bold truncate">{{ app.name }}</h4>
                    <p class="text-[11px] text-tx-muted truncate">{{ app.developer }}</p>
                  </div>
                  <status-pill v-if="app.installed" tone="success">{{ t('dashboard.ops.appsMarket.installedBadge') }}</status-pill>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center gap-1 text-warning">
                    <Icon name="ph:star-fill" class="w-3.5 h-3.5" />
                    <span class="font-mono font-semibold">{{ app.rating.toFixed(1) }}</span>
                  </span>
                  <span class="font-mono text-tx-secondary">{{ priceLabel(app.price) }}</span>
                </div>
                <LazyVButton
                  v-if="!app.installed"
                  size="sm"
                  class="w-full"
                  :label="t('dashboard.ops.appsMarket.install')"
                  @click="startInstall(app)"
                />
              </article>
            </div>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.appsMarket.empty')"
              :hint="t('dashboard.ops.appsMarket.emptyHint')"
              icon="ph:squares-four-bold"
            />
          </div>
        </div>

        <section v-else class="card overflow-hidden">
          <LazyVTable v-if="installedApps.length" :headers="headers" :items="installedApps">
            <template #cell(name)="{ item }">
              <div class="flex items-center gap-2">
                <Icon :name="item.icon" class="w-4 h-4 text-brand" />
                <span class="text-sm font-semibold">{{ item.name }}</span>
              </div>
            </template>
            <template #cell(scopes)="{ item }">
              <span class="font-mono text-xs">{{ item.scopes.length }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex items-center justify-end gap-3">
                <button class="text-[11px] font-semibold text-tx-muted hover:text-brand transition-colors" @click="reviewing = item">
                  {{ t('dashboard.ops.appsMarket.review') }}
                </button>
                <button class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors" @click="removing = item">
                  {{ t('dashboard.ops.appsMarket.uninstall') }}
                </button>
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.appsMarket.noInstalled')"
            :hint="t('dashboard.ops.appsMarket.noInstalledHint')"
            icon="ph:plugs-connected-bold"
          />
        </section>

        <section class="card p-5 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-start gap-3 min-w-0">
            <Icon name="ph:code-bold" class="w-6 h-6 text-brand shrink-0" />
            <div>
              <h3 class="text-sm font-bold">{{ t('dashboard.ops.appsMarket.devTitle') }}</h3>
              <p class="text-xs text-tx-muted">{{ t('dashboard.ops.appsMarket.devBody') }}</p>
              <p class="text-[11px] text-tx-muted mt-1">{{ t('dashboard.ops.appsMarket.devSandbox') }}</p>
            </div>
          </div>
          <LazyVButton variant="secondary" icon="ph:book-open-bold" iconPosition="left" :label="t('dashboard.ops.appsMarket.devDocs')" />
        </section>
      </div>
    </div>

    <LazyVDialog v-model="installOpen" :title="t('dashboard.ops.appsMarket.installTitle', { name: installing?.name ?? '' })" maxWidth="md">
      <div v-if="installing" class="space-y-4">
        <p class="text-sm text-tx-secondary">{{ t('dashboard.ops.appsMarket.requests') }}</p>
        <ul class="space-y-2">
          <li v-for="s in installing.scopes" :key="s" class="flex items-center gap-2 text-xs">
            <Icon :name="s.startsWith('write') ? 'ph:pencil-simple-bold' : 'ph:eye-bold'" :class="['w-4 h-4', s.startsWith('write') ? 'text-warning' : 'text-info']" />
            {{ t(`dashboard.ops.appsMarket.scopes.${s}`) }}
          </li>
        </ul>
        <LazyVInput v-model="consent" type="checkbox" :label="t('dashboard.ops.appsMarket.consent')" />
      </div>
      <template #footer>
        <LazyVButton variant="ghost" :label="t('dashboard.ops.appsMarket.cancel')" @click="installOpen = false" />
        <LazyVButton :disabled="!consent" :label="t('dashboard.ops.appsMarket.confirmInstall')" @click="confirmInstall" />
      </template>
    </LazyVDialog>

    <LazyVDialog v-model="reviewOpen" :title="t('dashboard.ops.appsMarket.permissionsTitle', { name: reviewing?.name ?? '' })" maxWidth="md">
      <ul v-if="reviewing" class="space-y-2">
        <li v-for="s in reviewing.scopes" :key="s" class="flex items-center gap-2 text-xs">
          <Icon :name="s.startsWith('write') ? 'ph:pencil-simple-bold' : 'ph:eye-bold'" :class="['w-4 h-4', s.startsWith('write') ? 'text-warning' : 'text-info']" />
          {{ t(`dashboard.ops.appsMarket.scopes.${s}`) }}
        </li>
      </ul>
      <template #footer>
        <LazyVButton variant="secondary" :label="t('dashboard.ops.appsMarket.close')" @click="reviewing = null" />
      </template>
    </LazyVDialog>

    <LazyVDialog v-model="removeOpen" :title="t('dashboard.ops.appsMarket.uninstallTitle', { name: removing?.name ?? '' })" maxWidth="md">
      <p class="text-sm text-tx-secondary">{{ t('dashboard.ops.appsMarket.uninstallBody') }}</p>
      <template #footer>
        <LazyVButton variant="ghost" :label="t('dashboard.ops.appsMarket.cancel')" @click="removing = null" />
        <LazyVButton :label="t('dashboard.ops.appsMarket.uninstall')" @click="confirmRemove" />
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { EcoAppItem } from '@/types/ecosystem'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.appsMarket.title') })

const store = useEcoAppsStore()
const { apps, categories } = storeToRefs(store)

const tab = ref('browse')
const category = ref('all')
const installing = ref<EcoAppItem | null>(null)
const reviewing = ref<EcoAppItem | null>(null)
const removing = ref<EcoAppItem | null>(null)
const consent = ref(false)

const categoryKeys = computed(() => ['all', ...categories.value])
const installedApps = computed(() => apps.value.filter((a) => a.installed))
const filtered = computed(() => apps.value.filter((a) => category.value === 'all' || a.category === category.value))

const tabs = computed(() => [
  { name: t('dashboard.ops.appsMarket.tabs.browse'), value: 'browse', count: apps.value.length },
  { name: t('dashboard.ops.appsMarket.tabs.installed'), value: 'installed', count: installedApps.value.length },
])

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.appsMarket.app') },
  { key: 'developer', label: t('dashboard.ops.appsMarket.developer') },
  { key: 'scopes', label: t('dashboard.ops.appsMarket.permissions') },
  { key: 'actions', label: '', align: 'end' as const },
])

const installOpen = computed({
  get: () => installing.value !== null,
  set: (v: boolean) => {
    if (!v) installing.value = null
  },
})
const reviewOpen = computed({
  get: () => reviewing.value !== null,
  set: (v: boolean) => {
    if (!v) reviewing.value = null
  },
})
const removeOpen = computed({
  get: () => removing.value !== null,
  set: (v: boolean) => {
    if (!v) removing.value = null
  },
})

const priceLabel = (price: number) =>
  price === 0 ? t('dashboard.ops.appsMarket.free') : `${money(price)} ${t('dashboard.ops.appsMarket.perMonth')}`

function startInstall(app: EcoAppItem) {
  consent.value = false
  installing.value = app
}
function confirmInstall() {
  if (installing.value && consent.value) store.install(installing.value.id)
  installing.value = null
}
function confirmRemove() {
  if (removing.value) store.uninstall(removing.value.id)
  removing.value = null
}
</script>
