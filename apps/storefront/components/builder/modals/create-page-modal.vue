<template>
  <Teleport to="body">
    <div v-if="createPageOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog"
      aria-modal="true" aria-labelledby="create-page-title">
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" @click="close" />
      <div class="relative w-full max-w-md rounded-2xl border border-border-subtle bg-bg-primary p-6 shadow-2xl">
        <h2 id="create-page-title" class="text-lg font-bold tracking-wide text-tx-primary">
          New page
        </h2>
        <p class="mt-2 text-sm text-tx-secondary">
          Create a new storefront page. You can add sections and customize it right after.
        </p>

        <div class="mt-5 space-y-4">
          <setting-text v-model="title" label="Title" placeholder="About us" @update:model-value="onTitleInput" />

          <div>
            <setting-text v-model="slug" label="Slug" placeholder="about-us" />
            <p v-if="slugError" class="mt-1 text-[11px] text-red-400">{{ slugError }}</p>
            <p v-else class="mt-1 text-[11px] text-tx-muted">
              URL: /{{ slug || '…' }}
            </p>
          </div>

          <setting-select v-model="pageType" label="Page type" :options="typeOptions" />
        </div>

        <div class="mt-6 flex gap-3">
          <button type="button"
            class="rounded-lg bg-brand px-5 py-2.5 text-[11px] font-black tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            :disabled="!canCreate" @click="onCreate">
            Create page
          </button>
          <button type="button"
            class="rounded-lg border border-border-subtle px-5 py-2.5 text-[11px] font-bold text-tx-secondary hover:bg-bg-elevated"
            @click="close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const { t } = useI18n()
import type { StorePageType } from '@/types/sections'

const { createPageOpen } = useBuilderModals()
const store = useBuilderStore()
const localePath = useLocalePath()

const title = ref('Untitled page')
const slug = ref('untitled-page')
const pageType = ref<StorePageType>('page')

const typeOptions = [
  { value: 'page', label: 'Custom page' },
  { value: 'home', label: 'Home (duplicate)' },
  { value: 'product', label: 'Product template' },
  { value: 'category', label: 'Category template' },
  { value: 'search', label: 'Search' },
  { value: 'checkout', label: 'Checkout' },
  { value: 'order_confirmed', label: 'Order confirmation' },
]

const slugError = computed(() => {
  if (!slug.value) return 'Slug is required'
  if (!/^[a-z0-9-]+$/.test(slug.value)) return 'Only lowercase letters, numbers and hyphens allowed'
  if (store.pages.some(p => p.slug === slug.value)) return 'A page with this slug already exists'
  return ''
})

const canCreate = computed(() => !!title.value.trim() && !!slug.value && !slugError.value)

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    || 'page'
}

function onTitleInput(val: string) {
  slug.value = toSlug(val)
}

async function onCreate() {
  if (!canCreate.value) return
  const newPage = store.createPage({
    title: title.value.trim(),
    slug: slug.value,
    type: pageType.value,
  })
  createPageOpen.value = false
  resetForm()
  await navigateTo(localePath(`/dashboard/builder/${newPage.slug}`))
}

function close() {
  createPageOpen.value = false
  resetForm()
}

function resetForm() {
  title.value = 'Untitled page'
  slug.value = 'untitled-page'
  pageType.value = 'page'
}
</script>
