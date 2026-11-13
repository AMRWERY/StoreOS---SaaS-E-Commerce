<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.blog.title')"
          :subtitle="t('dashboard.ops.blog.subtitle')"
          :count="articles.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.blog.new')"
            @click="openNew"
          />
        </ops-page-header>

        <section class="card overflow-hidden">
          <LazyVTable v-if="articles.length" :headers="headers" :items="articles">
            <template #cell(title)="{ item }">
              <button class="text-sm font-semibold text-start hover:text-brand transition-colors" @click="openEdit(item)">
                {{ item.title }}
              </button>
            </template>
            <template #cell(tags)="{ item }">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="px-1.5 py-0.5 rounded bg-bg-elevated text-[10px] text-tx-secondary"
                >
                  {{ tag }}
                </span>
              </div>
            </template>
            <template #cell(publishDate)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.publishDate || '-' }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.blog.status.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.blog.empty')"
            :hint="t('dashboard.ops.blog.emptyHint')"
            icon="ph:article-bold"
          />
        </section>
      </div>
    </div>

    <eco-blog-editor v-model="isOpen" :article="editing" @save="store.save" @remove="onRemove" />
  </div>
</template>

<script lang="ts" setup>
import type { EcoArticle } from '@/types/ecosystem'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.blog.title') })

const store = useEcoBlogStore()
const { articles } = storeToRefs(store)

const isOpen = ref(false)
const editing = ref<EcoArticle | null>(null)

const tones: Record<string, Tone> = { draft: 'neutral', scheduled: 'info', published: 'success' }

const headers = computed(() => [
  { key: 'title', label: t('dashboard.ops.blog.articleTitle') },
  { key: 'author', label: t('dashboard.ops.blog.author') },
  { key: 'tags', label: t('dashboard.ops.blog.tagsLabel') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'publishDate', label: t('dashboard.ops.blog.publishDate') },
])

function openNew() {
  editing.value = null
  isOpen.value = true
}
function openEdit(a: EcoArticle) {
  editing.value = a
  isOpen.value = true
}
function onRemove(id: string) {
  store.remove(id)
  isOpen.value = false
}
</script>
