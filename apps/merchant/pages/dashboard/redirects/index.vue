<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.redirects.title')"
          :subtitle="t('dashboard.ops.redirects.subtitle')"
          :count="redirects.length"
        >
          <LazyVButton
            variant="secondary"
            icon="ph:upload-simple-bold"
            iconPosition="left"
            :label="t('dashboard.ops.redirects.importCsv')"
            @click="importOpen = true"
          />
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.redirects.add')"
            @click="openCreate()"
          />
        </ops-page-header>

        <p v-if="importedMsg" class="text-xs text-success">{{ importedMsg }}</p>

        <section class="card overflow-hidden">
          <LazyVTable v-if="redirects.length" :headers="headers" :items="redirects">
            <template #cell(from)="{ item }">
              <span class="font-mono text-xs">{{ item.from }}</span>
            </template>
            <template #cell(to)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.to }}</span>
            </template>
            <template #cell(type)="{ item }">
              <status-pill :tone="item.type === 301 ? 'info' : 'warning'">
                <span class="font-mono">{{ item.type }}</span>
              </status-pill>
            </template>
            <template #cell(hits)="{ item }">
              <span class="font-mono text-sm">{{ item.hits.toLocaleString('en-US') }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <button
                class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors"
                @click="store.remove(item.id)"
              >
                {{ t('dashboard.ops.common.delete') }}
              </button>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.redirects.empty')"
            :hint="t('dashboard.ops.redirects.emptyHint')"
            icon="ph:arrows-left-right-bold"
          />
        </section>

        <section class="space-y-3">
          <div>
            <h3 class="text-sm font-bold">{{ t('dashboard.ops.redirects.top404') }}</h3>
            <p class="text-xs text-tx-muted">{{ t('dashboard.ops.redirects.top404Hint') }}</p>
          </div>
          <div class="card overflow-hidden">
            <LazyVTable v-if="notFounds.length" :headers="notFoundHeaders" :items="notFounds">
              <template #cell(path)="{ item }">
                <span class="font-mono text-xs">{{ item.path }}</span>
              </template>
              <template #cell(hits)="{ item }">
                <span class="font-mono text-sm">{{ item.hits.toLocaleString('en-US') }}</span>
              </template>
              <template #cell(lastSeen)="{ item }">
                <span class="font-mono text-xs text-tx-muted">{{ item.lastSeen }}</span>
              </template>
              <template #cell(actions)="{ item }">
                <button
                  class="text-[11px] font-semibold text-brand hover:text-brand-hover transition-colors"
                  @click="openCreate(item.path)"
                >
                  {{ t('dashboard.ops.redirects.createRedirect') }}
                </button>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.redirects.noneTop')"
              :hint="t('dashboard.ops.redirects.noneTopHint')"
              icon="ph:check-circle-bold"
            />
          </div>
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.redirects.add')"
      :subtitle="t('dashboard.ops.redirects.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.from" :label="t('dashboard.ops.redirects.from')" placeholder="/old-path" input-class="font-mono" required />
        <LazyVInput v-model="form.to" :label="t('dashboard.ops.redirects.to')" placeholder="/new-path" input-class="font-mono" required />
        <LazyVSelectInput v-model="form.type" :label="t('dashboard.ops.redirects.type')" :options="typeOptions" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.redirects.add')" />
      </form>
    </LazyVSidePanel>

    <LazyVSidePanel
      v-model="importOpen"
      :title="t('dashboard.ops.redirects.importCsv')"
      :subtitle="t('dashboard.ops.redirects.importHint')"
    >
      <div class="space-y-5 p-1">
        <LazyVFileUpload
          :title="t('dashboard.ops.redirects.importDrop')"
          :subtitle="t('dashboard.ops.redirects.importFormat')"
          accept=".csv"
        />
        <LazyVButton class="w-full" :label="t('dashboard.ops.redirects.importDo')" @click="runImport" />
      </div>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.redirects.title') })

const store = useEcoRedirectsStore()
const { redirects, notFounds } = storeToRefs(store)

const isOpen = ref(false)
const importOpen = ref(false)
const importedMsg = ref('')
const form = reactive({ from: '', to: '', type: '301' })

const typeOptions = computed(() => [
  { value: '301', label: t('dashboard.ops.redirects.permanent') },
  { value: '302', label: t('dashboard.ops.redirects.temporary') },
])

const headers = computed(() => [
  { key: 'from', label: t('dashboard.ops.redirects.from') },
  { key: 'to', label: t('dashboard.ops.redirects.to') },
  { key: 'type', label: t('dashboard.ops.redirects.type') },
  { key: 'hits', label: t('dashboard.ops.redirects.hits') },
  { key: 'actions', label: '', align: 'end' as const },
])
const notFoundHeaders = computed(() => [
  { key: 'path', label: t('dashboard.ops.redirects.path') },
  { key: 'hits', label: t('dashboard.ops.redirects.hits') },
  { key: 'lastSeen', label: t('dashboard.ops.redirects.lastSeen') },
  { key: 'actions', label: '', align: 'end' as const },
])

function openCreate(from = '') {
  Object.assign(form, { from, to: '', type: '301' })
  isOpen.value = true
}

function submit() {
  const from = form.from.trim()
  const to = form.to.trim()
  if (!from || !to) return
  const wasNotFound = notFounds.value.some((n) => n.path === from)
  if (wasNotFound) store.fixNotFound(from, to)
  else store.add(from, to, form.type === '302' ? 302 : 301)
  isOpen.value = false
}

function runImport() {
  store.importCsv(5)
  importedMsg.value = t('dashboard.ops.redirects.imported', { n: 5 })
  importOpen.value = false
}
</script>
