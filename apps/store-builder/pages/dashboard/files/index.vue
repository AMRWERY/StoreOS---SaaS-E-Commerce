<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.files.title')"
          :subtitle="t('dashboard.ops.files.subtitle')"
          :count="files.length"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.files.stats.total')"
            :value="files.length"
            iconName="ph:files-bold"
          />
          <div class="card p-4 md:col-span-2 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-tx-secondary">{{ t('dashboard.ops.files.stats.storage') }}</span>
              <span class="font-mono text-tx-primary">{{ formatSize(usedKb) }} / {{ formatSize(quotaKb) }}</span>
            </div>
            <LazyVProgressBar
              :progress="(usedKb / quotaKb) * 100"
              color="indigo"
              :height="6"
              :shadow="false"
              :showProgressText="false"
            />
          </div>
        </div>

        <LazyVFileUpload
          :title="t('dashboard.ops.files.uploadTitle')"
          :subtitle="t('dashboard.ops.files.uploadHint')"
          accept="image/*,video/*,.pdf"
          @change="addFromUpload"
        />

        <div class="flex flex-wrap items-center gap-3">
          <div class="flex-1 min-w-[200px]">
            <LazyVInput v-model="search" :placeholder="t('dashboard.ops.files.search')" />
          </div>
          <div class="flex items-center gap-1 bg-bg-elevated border border-border-subtle rounded-md p-1">
            <button
              type="button"
              class="px-2 py-1 rounded transition-colors"
              :class="view === 'grid' ? 'bg-brand-dim text-brand' : 'text-tx-muted'"
              :aria-label="t('dashboard.ops.files.grid')"
              @click="view = 'grid'"
            >
              <Icon name="ph:squares-four-bold" />
            </button>
            <button
              type="button"
              class="px-2 py-1 rounded transition-colors"
              :class="view === 'list' ? 'bg-brand-dim text-brand' : 'text-tx-muted'"
              :aria-label="t('dashboard.ops.files.list')"
              @click="view = 'list'"
            >
              <Icon name="ph:list-bold" />
            </button>
          </div>
        </div>

        <section v-if="filtered.length && view === 'grid'" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <article v-for="f in filtered" :key="f.id" class="card overflow-hidden group">
            <div class="aspect-video bg-bg-elevated flex items-center justify-center">
              <Icon :name="icons[f.type]" class="text-3xl text-tx-muted" />
            </div>
            <div class="p-3 space-y-2">
              <p class="text-xs font-semibold truncate font-mono" :title="f.name">{{ f.name }}</p>
              <div class="flex items-center justify-between text-[11px] text-tx-muted">
                <span class="font-mono">{{ formatSize(f.sizeKb) }}</span>
                <status-pill :tone="tones[f.type]">{{ t(`dashboard.ops.files.types.${f.type}`) }}</status-pill>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-[11px] text-tx-secondary">
                  {{ t('dashboard.ops.files.usage') }}: <span class="font-mono">{{ f.usage }}</span>
                </span>
                <LazyVButton
                  variant="none"
                  className="p-1 text-tx-muted hover:text-danger transition-colors"
                  :aria-label="t('dashboard.ops.common.delete')"
                  @click="remove(f.id)"
                >
                  <Icon name="ph:trash-bold" />
                </LazyVButton>
              </div>
            </div>
          </article>
        </section>

        <section v-else-if="filtered.length" class="card overflow-hidden">
          <LazyVTable :headers="headers" :items="filtered">
            <template #cell(name)="{ item }">
              <span class="flex items-center gap-2 text-sm">
                <Icon :name="icons[item.type]" class="text-tx-muted" />
                <span class="font-mono text-xs">{{ item.name }}</span>
              </span>
            </template>
            <template #cell(type)="{ item }">
              <status-pill :tone="tones[item.type]">{{ t(`dashboard.ops.files.types.${item.type}`) }}</status-pill>
            </template>
            <template #cell(size)="{ item }">
              <span class="font-mono text-xs">{{ formatSize(item.sizeKb) }}</span>
            </template>
            <template #cell(usage)="{ item }">
              <span class="font-mono text-xs">{{ item.usage }}</span>
            </template>
            <template #cell(createdAt)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.createdAt }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.common.delete')"
                  @click="remove(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
        </section>

        <section v-else class="card overflow-hidden">
          <ops-empty-state
            :title="t('dashboard.ops.files.empty')"
            :hint="t('dashboard.ops.files.emptyHint')"
            icon="ph:image-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MediaFileType } from '@/types/storeContent'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.files.title') })

const store = useMediaFilesStore()
const { files, usedKb, quotaKb } = storeToRefs(store)
const { remove, addFromUpload } = store

const search = ref('')
const view = ref<'grid' | 'list'>('grid')

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? files.value.filter((f) => f.name.toLowerCase().includes(q)) : files.value
})

const icons: Record<string, string> = {
  image: 'ph:image-bold',
  video: 'ph:video-camera-bold',
  document: 'ph:file-pdf-bold',
}
const tones: Record<string, Tone> = { image: 'info', video: 'purple', document: 'neutral' }

function formatSize(kb: number) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.files.name') },
  { key: 'type', label: t('dashboard.ops.files.type') },
  { key: 'size', label: t('dashboard.ops.files.size') },
  { key: 'usage', label: t('dashboard.ops.files.usage') },
  { key: 'createdAt', label: t('dashboard.ops.common.date') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
