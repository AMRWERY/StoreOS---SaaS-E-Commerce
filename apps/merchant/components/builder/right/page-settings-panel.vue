<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Page settings"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4">
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-bold tracking-wide text-tx-primary">Page settings</h2>
        <p class="mt-1.5 text-[10px] font-bold tracking-[0.2em] text-tx-muted">SEO &amp; navigation</p>
      </div>

      <component
        :is="UiButton"
        variant="none"
        type="button"
        class-name="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary xl:inline-flex"
        title="Collapse panel"
        @click="$emit('collapse')"
      >
        <Icon name="ph:caret-double-right-bold" class="text-lg rtl:rotate-180" />
      </component>
    </div>

    <!-- Settings body -->
    <div class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]">
      <template v-if="page">
        <lazy-setting-text v-model="title" label="Page title" />
        <lazy-setting-text v-model="slug" label="URL slug" />
        <lazy-setting-toggle
          v-model="showNav"
          label="Show in navigation"
          hint="Display link in admin menu"
        />
        <lazy-setting-group title="SEO" default-open>
          <lazy-setting-text v-model="seoTitle" label="Meta title" />
          <div class="mt-4">
            <lazy-setting-textarea
              v-model="seoDesc"
              label="Meta description"
              :rows="3"
            />
          </div>
        </lazy-setting-group>
      </template>
      <p v-else class="text-sm text-tx-secondary">No page loaded.</p>
    </div>

    <!-- Footer actions -->
    <div class="border-t border-border-subtle p-4 space-y-2">
      <!-- Save -->
      <component
        :is="UiButton"
        variant="none"
        type="button"
        :disabled="store.isSaving"
        class-name="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-[10px] font-black tracking-[0.2em] text-white shadow-[0_0_14px_rgba(99,102,241,0.3)] transition-all hover:bg-brand/90 disabled:opacity-60"
        @click="handleSave"
      >
        <Icon v-if="store.isSaving" name="ph:spinner-gap-bold" class="animate-spin text-base" />
        <Icon v-else-if="saveSuccess" name="ph:check-bold" class="text-base" />
        <Icon v-else name="ph:floppy-disk-bold" class="text-base" />
        {{ store.isSaving ? 'Saving…' : saveSuccess ? 'Saved!' : 'Save changes' }}
      </component>

      <!-- Advanced settings -->
      <component
        :is="UiButton"
        variant="none"
        type="button"
        class-name="flex w-full items-center justify-center gap-2 rounded-lg bg-bg-elevated py-2.5 text-[10px] font-black tracking-[0.2em] text-tx-primary ring-1 ring-border-subtle transition-colors hover:bg-bg-overlay hover:ring-border-default"
        @click="advancedOpen = true"
      >
        <Icon name="ph:gear-six-bold" class="text-base text-tx-secondary" />
        Advanced settings
      </component>
    </div>
  </aside>

  <!-- ── Advanced settings drawer (portal to body) ───────────────── -->
  <ClientOnly>
    <Teleport to="body">
      <!-- Drawer panel -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-200 ease-in"
        enter-from-class="translate-x-full"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="advancedOpen && page"
          class="fixed inset-y-0 end-0 z-[9999] flex w-full max-w-[320px] flex-col border-s border-border-subtle bg-bg-primary shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Advanced page settings"
        >
          <!-- Drawer header -->
          <div class="flex shrink-0 items-center justify-between gap-3 border-b border-border-subtle px-5 py-4">
            <div>
              <h2 class="text-sm font-bold tracking-wide text-tx-primary">Advanced settings</h2>
              <p class="mt-1 text-[10px] font-bold tracking-[0.2em] text-tx-muted capitalize">{{ page.type }}</p>
            </div>
            <component
              :is="UiButton"
              variant="none"
              type="button"
              class-name="size-9 flex items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary"
              @click="advancedOpen = false"
            >
              <Icon name="ph:x-bold" class="text-base" />
            </component>
          </div>

          <!-- Drawer body -->
          <div class="flex-1 space-y-6 overflow-y-auto px-5 py-5">
            <!-- Publishing -->
            <lazy-setting-group title="Publishing" default-open>
              <lazy-setting-toggle
                v-model="isPublished"
                label="Published"
                hint="Page visible on live store"
              />
            </lazy-setting-group>

            <!-- Navigation -->
            <lazy-setting-group title="Navigation" default-open>
              <lazy-setting-text
                v-model="navLabel"
                label="Nav label"
                placeholder="Same as page title"
                hint="Label shown in navigation menus"
              />
            </lazy-setting-group>

            <!-- Open Graph -->
            <lazy-setting-group title="Open Graph">
              <lazy-setting-text
                v-model="ogTitle"
                label="OG title"
                placeholder="Same as meta title"
              />
              <div class="mt-4">
                <lazy-setting-textarea
                  v-model="ogDesc"
                  label="OG description"
                  :rows="2"
                  placeholder="Same as meta description"
                />
              </div>
            </lazy-setting-group>

            <!-- Page info -->
            <lazy-setting-group title="Page info">
              <div class="rounded-lg border border-border-subtle bg-bg-elevated/40 px-4 py-3 text-[11px] space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-tx-muted font-semibold">Type</span>
                  <span class="font-bold text-tx-primary capitalize">{{ page.type }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-tx-muted font-semibold">ID</span>
                  <code class="text-[10px] text-tx-secondary bg-bg-elevated px-1.5 py-0.5 rounded">{{ page.id }}</code>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-tx-muted font-semibold">System page</span>
                  <span class="font-bold" :class="page.is_system ? 'text-amber-400' : 'text-emerald-400'">
                    {{ page.is_system ? 'Yes' : 'No' }}
                  </span>
                </div>
              </div>
            </lazy-setting-group>
          </div>

          <!-- Drawer footer -->
          <div class="shrink-0 border-t border-border-subtle p-4 space-y-2">
            <component
              :is="UiButton"
              variant="none"
              type="button"
              :disabled="store.isSaving"
              class-name="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2.5 text-[10px] font-black tracking-[0.2em] text-white shadow-[0_0_14px_rgba(99,102,241,0.3)] transition-all hover:bg-brand/90 disabled:opacity-60"
              @click="handleSaveAndClose"
            >
              <Icon v-if="store.isSaving" name="ph:spinner-gap-bold" class="animate-spin text-base" />
              <Icon v-else name="ph:floppy-disk-bold" class="text-base" />
              {{ store.isSaving ? 'Saving…' : 'Save & close' }}
            </component>
            <component
              :is="UiButton"
              variant="none"
              type="button"
              class-name="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[10px] font-semibold text-tx-muted transition-colors hover:text-tx-primary"
              @click="advancedOpen = false"
            >
              Cancel
            </component>
          </div>
        </div>
      </Transition>

      <!-- Backdrop -->
      <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="advancedOpen && page"
          class="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
          @click="advancedOpen = false"
        />
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { t } = useI18n()

defineEmits<{ collapse: [] }>()

const UiButton = resolveComponent('VButton')
const store = useBuilderStore()

const page = computed(() => store.currentPage)

// ── Main panel fields ───────────────────────────────────────────────
const title = computed({
  get: () => page.value?.title ?? '',
  set: (v: string) => { if (page.value) page.value.title = v },
})
const slug = computed({
  get: () => page.value?.slug ?? '',
  set: (v: string) => { if (page.value) page.value.slug = v },
})
const showNav = computed({
  get: () => page.value?.show_in_nav ?? false,
  set: (v: boolean) => { if (page.value) page.value.show_in_nav = v },
})
const seoTitle = computed({
  get: () => page.value?.seo_title ?? '',
  set: (v: string) => { if (page.value) page.value.seo_title = v || null },
})
const seoDesc = computed({
  get: () => page.value?.seo_desc ?? '',
  set: (v: string) => { if (page.value) page.value.seo_desc = v || null },
})

// ── Save logic ──────────────────────────────────────────────────────
const saveSuccess = ref(false)
let saveTimer: ReturnType<typeof setTimeout> | null = null

async function handleSave() {
  await store.saveSettings()
  saveSuccess.value = true
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => { saveSuccess.value = false }, 2000)
}

// ── Advanced settings drawer ────────────────────────────────────────
const advancedOpen = ref(false)

const isPublished = computed({
  get: () => page.value?.is_published ?? false,
  set: (v: boolean) => { if (page.value) page.value.is_published = v },
})
const navLabel = computed({
  get: () => page.value?.nav_label ?? '',
  set: (v: string) => { if (page.value) page.value.nav_label = v || null },
})
// OG fields stored in seo_title/seo_desc as fallback (extend as needed)
const ogTitle = computed({
  get: () => (page.value as any)?.og_title ?? '',
  set: (v: string) => { if (page.value) (page.value as any).og_title = v || null },
})
const ogDesc = computed({
  get: () => (page.value as any)?.og_desc ?? '',
  set: (v: string) => { if (page.value) (page.value as any).og_desc = v || null },
})

async function handleSaveAndClose() {
  await store.saveSettings()
  advancedOpen.value = false
}

onUnmounted(() => { advancedOpen.value = false })
</script>