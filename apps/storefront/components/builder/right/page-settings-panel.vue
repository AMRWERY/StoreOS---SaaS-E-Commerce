<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Page settings">
    <div class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4">
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-bold tracking-wide text-tx-primary">
          Page settings
        </h2>
        <p class="mt-1.5 text-[10px] font-bold tracking-[0.2em] text-tx-muted">
          SEO & navigation
        </p>
      </div>
      <component :is="UiButton" variant="none" type="button"
        class-name="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary xl:inline-flex"
        title="Collapse panel" @click="$emit('collapse')">
        <Icon name="ph:caret-double-right-bold" class="text-lg rtl:rotate-180" />
      </component>
    </div>

    <div class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]">
      <template v-if="page">
        <setting-text v-model="title" label="Page title" />

        <setting-text v-model="slug" label="URL slug" />

        <setting-toggle v-model="showNav" label="Show in navigation" hint="Display link in storefront menu" />

        <setting-group title="SEO" default-open>

          <setting-text v-model="seoTitle" label="Meta title" />

          <div class="mt-4">
            <setting-textarea v-model="seoDesc" label="Meta description" :rows="3" />
          </div>

        </setting-group>
      </template>
      <p v-else class="text-sm text-tx-secondary">
        No page loaded.
      </p>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineEmits<{
  collapse: []
}>()

const UiButton = resolveComponent('VButton')
const store = useBuilderStore()

const page = computed(() => store.currentPage)

const title = computed({
  get: () => page.value?.title ?? '',
  set: (v: string) => {
    if (page.value)
      page.value.title = v
  },
})

const slug = computed({
  get: () => page.value?.slug ?? '',
  set: (v: string) => {
    if (page.value)
      page.value.slug = v
  },
})

const showNav = computed({
  get: () => page.value?.show_in_nav ?? false,
  set: (v: boolean) => {
    if (page.value)
      page.value.show_in_nav = v
  },
})

const seoTitle = computed({
  get: () => page.value?.seo_title ?? '',
  set: (v: string) => {
    if (page.value)
      page.value.seo_title = v || null
  },
})

const seoDesc = computed({
  get: () => page.value?.seo_desc ?? '',
  set: (v: string) => {
    if (page.value)
      page.value.seo_desc = v || null
  },
})
</script>