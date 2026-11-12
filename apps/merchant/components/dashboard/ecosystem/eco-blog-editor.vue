<template>
  <LazyVSidePanel
    :model-value="modelValue"
    :title="article ? t('dashboard.ops.blog.editArticle') : t('dashboard.ops.blog.newArticle')"
    :subtitle="t('dashboard.ops.blog.editorSubtitle')"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <form class="space-y-5 p-1" @submit.prevent="submit">
      <div class="flex items-center justify-between">
        <LazyVSwitchButton v-model="form.rtl" :label="t('dashboard.ops.blog.rtl')" />
      </div>

      <LazyVInput v-model="form.title" :label="t('dashboard.ops.blog.articleTitle')" required />
      <LazyVInput v-model="form.slug" :label="t('dashboard.ops.blog.slug')" input-class="font-mono" />
      <LazyVTextareaInput v-model="form.excerpt" :label="t('dashboard.ops.blog.excerpt')" :rows="2" />

      <div class="space-y-2">
        <label class="text-[11px] font-bold text-tx-secondary tracking-wider">{{ t('dashboard.ops.blog.content') }}</label>
        <div class="flex flex-wrap gap-1 border border-border-subtle rounded-md bg-bg-base p-1">
          <button
            v-for="tool in tools"
            :key="tool.key"
            type="button"
            :title="t(`dashboard.ops.blog.toolbar.${tool.key}`)"
            :aria-label="t(`dashboard.ops.blog.toolbar.${tool.key}`)"
            class="w-8 h-8 flex items-center justify-center rounded text-tx-secondary hover:bg-bg-elevated hover:text-tx-primary transition-colors"
            @click="insert(tool.before, tool.after)"
          >
            <Icon :name="tool.icon" class="w-4 h-4" />
          </button>
        </div>
        <textarea
          :aria-label="t('dashboard.ops.blog.content')"
          ref="contentEl"
          v-model="form.content"
          rows="9"
          :dir="form.rtl ? 'rtl' : 'ltr'"
          class="w-full bg-bg-base border border-border-subtle rounded-md p-3 text-sm font-mono text-tx-primary outline-none focus:border-brand transition-colors"
        ></textarea>
      </div>

      <LazyVFileUpload
        :label="t('dashboard.ops.blog.cover')"
        :title="t('dashboard.ops.blog.coverTitle')"
        :subtitle="t('dashboard.ops.blog.coverHint')"
        accept="image/*"
      />

      <LazyVInput v-model="form.tags" :label="t('dashboard.ops.blog.tagsLabel')" :placeholder="t('dashboard.ops.blog.tagsHint')" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LazyVSelectInput v-model="form.status" :label="t('dashboard.ops.common.statusLabel')" :options="statusOptions" />
        <LazyVInput
          v-if="form.status === 'scheduled'"
          v-model="form.publishDate"
          type="date"
          :label="t('dashboard.ops.blog.schedule')"
        />
      </div>

      <section class="border border-border-subtle rounded-md p-3 space-y-3 bg-bg-base">
        <h4 class="text-xs font-bold tracking-wider text-tx-secondary">{{ t('dashboard.ops.blog.seo') }}</h4>
        <div class="space-y-1">
          <LazyVInput v-model="form.seoTitle" :label="t('dashboard.ops.blog.seoTitle')" />
          <p :class="['text-[10px] font-mono text-end', form.seoTitle.length > 60 ? 'text-danger' : 'text-tx-muted']">
            {{ form.seoTitle.length }}/60
          </p>
        </div>
        <div class="space-y-1">
          <LazyVTextareaInput v-model="form.seoDescription" :label="t('dashboard.ops.blog.seoDescription')" :rows="2" />
          <p :class="['text-[10px] font-mono text-end', form.seoDescription.length > 160 ? 'text-danger' : 'text-tx-muted']">
            {{ form.seoDescription.length }}/160
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-[10px] font-bold tracking-wider text-tx-muted">{{ t('dashboard.ops.blog.serp') }}</p>
          <div class="card p-3 space-y-0.5" :dir="form.rtl ? 'rtl' : 'ltr'">
            <p class="text-[11px] font-mono text-success truncate">https://store.example.eg/blog/{{ form.slug || '...' }}</p>
            <p class="text-sm font-semibold text-info truncate">{{ form.seoTitle || form.title || t('dashboard.ops.blog.serpPlaceholder') }}</p>
            <p class="text-xs text-tx-muted line-clamp-2">{{ form.seoDescription || form.excerpt }}</p>
          </div>
        </div>
      </section>

      <div class="flex gap-2">
        <LazyVButton type="submit" class="flex-1" :label="t('dashboard.ops.common.save')" />
        <LazyVButton
          v-if="article"
          type="button"
          variant="secondary"
          :label="t('dashboard.ops.common.delete')"
          @click="emit('remove', article.id)"
        />
      </div>
    </form>
  </LazyVSidePanel>
</template>

<script lang="ts" setup>
import type { EcoArticle, EcoArticleStatus } from '@/types/ecosystem'

const props = defineProps<{ modelValue: boolean; article: EcoArticle | null }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', value: EcoArticle): void
  (e: 'remove', id: string): void
}>()

const { t } = useI18n()

const contentEl = ref<HTMLTextAreaElement | null>(null)

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: '',
  status: 'draft' as EcoArticleStatus,
  publishDate: '',
  seoTitle: '',
  seoDescription: '',
  rtl: false,
})

watch(
  () => [props.modelValue, props.article] as const,
  ([open, a]) => {
    if (!open) return
    Object.assign(form, {
      title: a?.title ?? '',
      slug: a?.slug ?? '',
      excerpt: a?.excerpt ?? '',
      content: a?.content ?? '',
      tags: a?.tags.join(', ') ?? '',
      status: a?.status ?? 'draft',
      publishDate: a?.publishDate ?? '',
      seoTitle: a?.seoTitle ?? '',
      seoDescription: a?.seoDescription ?? '',
      rtl: a?.rtl ?? false,
    })
  },
  { immediate: true },
)

const tools = [
  { key: 'bold', icon: 'ph:text-b-bold', before: '**', after: '**' },
  { key: 'italic', icon: 'ph:text-italic-bold', before: '_', after: '_' },
  { key: 'heading', icon: 'ph:text-h-two-bold', before: '## ', after: '' },
  { key: 'link', icon: 'ph:link-bold', before: '[', after: '](https://)' },
  { key: 'list', icon: 'ph:list-bullets-bold', before: '- ', after: '' },
  { key: 'quote', icon: 'ph:quotes-bold', before: '> ', after: '' },
]

const statusOptions = computed(() =>
  (['draft', 'scheduled', 'published'] as const).map((s) => ({ value: s, label: t(`dashboard.ops.blog.status.${s}`) })),
)

/** Inserts markdown markers around the current selection (or at the caret). */
function insert(before: string, after: string) {
  const el = contentEl.value
  const start = el?.selectionStart ?? form.content.length
  const end = el?.selectionEnd ?? form.content.length
  const selected = form.content.slice(start, end)
  form.content = `${form.content.slice(0, start)}${before}${selected}${after}${form.content.slice(end)}`
  nextTick(() => {
    el?.focus()
    const pos = start + before.length + selected.length
    el?.setSelectionRange(pos, pos)
  })
}

function submit() {
  if (!form.title.trim()) return
  emit('save', {
    id: props.article?.id ?? `a${Date.now()}`,
    author: props.article?.author ?? 'Amr Wery',
    title: form.title.trim(),
    slug: form.slug.trim() || form.title.trim().toLowerCase().replace(/\s+/g, '-'),
    excerpt: form.excerpt,
    content: form.content,
    tags: form.tags.split(',').map((x) => x.trim()).filter(Boolean),
    status: form.status,
    publishDate: form.status === 'draft' ? '' : form.publishDate || '2026-11-12',
    seoTitle: form.seoTitle,
    seoDescription: form.seoDescription,
    rtl: form.rtl,
  })
  emit('update:modelValue', false)
}
</script>
