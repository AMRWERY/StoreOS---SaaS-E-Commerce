<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Section settings"
  >
    <!-- Header -->
    <div class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4">
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-bold tracking-wide text-tx-primary">Section settings</h2>
        <p class="mt-1.5 text-[10px] font-bold tracking-[0.2em] text-tx-muted">
          {{ subtitle }}
        </p>
      </div>

      <component
        :is="UiButton"
        variant="none"
        type="button"
        class-name="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary xl:inline-flex"
        title="Collapse panel"
        aria-expanded="true"
        @click="$emit('collapse')"
      >
        <Icon name="ph:caret-double-right-bold" class="text-lg rtl:rotate-180" />
      </component>
    </div>

    <!-- Settings body -->
    <div class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]">
      <div v-if="!selected" class="space-y-3">
        <p class="text-[13px] leading-relaxed text-tx-secondary">
          Select a section to edit its content, design and advanced settings.
        </p>
        <ul v-if="store.sections.length" class="space-y-1">
          <li v-for="s in store.sections" :key="s.id">
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated/40 px-3 py-2 text-start text-[12px] font-medium text-tx-primary transition-colors hover:border-brand/40 hover:bg-bg-elevated"
              @click="store.selectSection(s.id)"
            >
              <Icon name="ph:cursor-click-bold" class="shrink-0 text-tx-muted" />
              <span class="min-w-0 flex-1 truncate">{{ SECTION_TYPE_LABELS[s.type] }}</span>
              <Icon name="ph:caret-right-bold" class="shrink-0 text-xs text-tx-muted rtl:rotate-180" />
            </button>
          </li>
        </ul>
        <p v-else class="rounded-lg border border-dashed border-border-subtle p-3 text-[12px] text-tx-muted">
          This page has no sections yet. Open the <strong class="text-tx-secondary">Blocks</strong>
          tab and drag one into the preview.
        </p>
      </div>
      <component :is="activeForm" v-else />
    </div>

    <!-- Footer actions (only when a section is selected) -->
    <div v-if="selected" class="border-t border-border-subtle p-4 space-y-2">
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
          v-if="advancedOpen && selected"
          class="fixed inset-y-0 end-0 z-[9999] flex w-full max-w-[320px] flex-col border-s border-border-subtle bg-bg-primary shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Advanced section settings"
        >
          <!-- Drawer header -->
          <div class="flex shrink-0 items-center justify-between gap-3 border-b border-border-subtle px-5 py-4">
            <div>
              <h2 class="text-sm font-bold tracking-wide text-tx-primary">Advanced settings</h2>
              <p class="mt-1 text-[10px] font-bold tracking-[0.2em] text-tx-muted">{{ subtitle }}</p>
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
            <!-- Visibility -->
            <lazy-setting-group title="Visibility" default-open>
              <lazy-setting-toggle
                v-model="adv_hidden"
                label="Hide section"
                hint="Hidden in preview and on live store"
              />
            </lazy-setting-group>

            <!-- Spacing -->
            <lazy-setting-group title="Spacing & layout" default-open>
              <lazy-setting-range
                v-model="adv_paddingTop"
                label="Padding top"
                :min="0"
                :max="120"
                :step="4"
                unit="px"
              />
              <div class="mt-4">
                <lazy-setting-range
                  v-model="adv_paddingBottom"
                  label="Padding bottom"
                  :min="0"
                  :max="120"
                  :step="4"
                  unit="px"
                />
              </div>
            </lazy-setting-group>

            <!-- Appearance -->
            <lazy-setting-group title="Appearance" default-open>
              <lazy-setting-color
                v-model="adv_bgColor"
                label="Background color"
              />
              <div class="mt-4">
                <lazy-setting-toggle
                  v-model="adv_bgEnabled"
                  label="Use background color"
                  hint="Off keeps the block's own background"
                />
              </div>
              <div class="mt-4">
                <lazy-setting-select
                  v-model="adv_maxWidth"
                  label="Content width"
                  :options="[
                    { value: 'full', label: 'Full width' },
                    { value: 'wide', label: 'Wide (1280px)' },
                    { value: 'boxed', label: 'Boxed (1024px)' },
                    { value: 'narrow', label: 'Narrow (768px)' },
                  ]"
                />
              </div>
            </lazy-setting-group>

            <!-- Shape (applies to every block) -->
            <lazy-setting-group title="Shape" default-open>
              <div class="space-y-4">
                <lazy-setting-radio-cards
                  v-for="g in SHAPE_GROUPS"
                  :key="g.key"
                  :model-value="shapeValue(g.key)"
                  :label="g.label"
                  :options="g.options"
                  @update:model-value="(v: string) => setShape(g.key, v)"
                />
              </div>
            </lazy-setting-group>

            <!-- Responsive visibility -->
            <lazy-setting-group title="Responsive visibility">
              <lazy-setting-toggle
                v-model="adv_hideMobile"
                label="Hide on mobile"
                hint="Screens narrower than 768px"
              />
              <div class="mt-4">
                <lazy-setting-toggle
                  v-model="adv_hideDesktop"
                  label="Hide on desktop"
                  hint="Screens 768px and wider"
                />
              </div>
            </lazy-setting-group>

            <!-- Identity -->
            <lazy-setting-group title="Identity">
              <lazy-setting-text
                v-model="adv_anchorId"
                label="Anchor ID"
                placeholder="e.g. featured-products"
                hint="Used in URLs as #anchor-id"
              />
              <div class="mt-4">
                <lazy-setting-text
                  v-model="adv_cssClass"
                  label="CSS class"
                  placeholder="e.g. my-custom-class"
                  hint="Added to the section wrapper"
                />
              </div>
              <div class="mt-4">
                <lazy-setting-text
                  v-model="adv_label"
                  label="Internal label"
                  placeholder="Visible only in builder"
                  hint="Helps you identify sections in the list"
                />
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
          v-if="advancedOpen && selected"
          class="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
          @click="advancedOpen = false"
        />
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type { Component } from 'vue'
import type { SectionType } from '@/types/sections'
import { SECTION_TYPE_LABELS } from '@/types/sections'
import { SHAPE_GROUPS } from '@/data/shapes'
import HeroBannerSettings from '@/components/builder/section-settings/hero-banner-settings.vue'
import HeroSlideshowSettings from '@/components/builder/section-settings/hero-slideshow-settings.vue'
import HeroSplitSettings from '@/components/builder/section-settings/hero-split-settings.vue'
import HeroVideoSettings from '@/components/builder/section-settings/hero-video-settings.vue'
import ProductsGridSettings from '@/components/builder/section-settings/products-grid-settings.vue'
import ProductsCarouselSettings from '@/components/builder/section-settings/products-carousel-settings.vue'
import ProductFeaturedSettings from '@/components/builder/section-settings/product-featured-settings.vue'
import CategoriesGridSettings from '@/components/builder/section-settings/categories-grid-settings.vue'
import RichTextSettings from '@/components/builder/section-settings/rich-text-settings.vue'
import ImageTextSettings from '@/components/builder/section-settings/image-text-settings.vue'
import ImageGallerySettings from '@/components/builder/section-settings/image-gallery-settings.vue'
import BannerFullSettings from '@/components/builder/section-settings/banner-full-settings.vue'
import BannerSplitSettings from '@/components/builder/section-settings/banner-split-settings.vue'
import CountdownTimerSettings from '@/components/builder/section-settings/countdown-timer-settings.vue'
import TestimonialsSettings from '@/components/builder/section-settings/testimonials-settings.vue'
import TrustBadgesSettings from '@/components/builder/section-settings/trust-badges-settings.vue'
import LogoBarSettings from '@/components/builder/section-settings/logo-bar-settings.vue'
import FAQSettings from '@/components/builder/section-settings/faq-settings.vue'
import NewsletterFormSettings from '@/components/builder/section-settings/newsletter-form-settings.vue'
import ContactFormSettings from '@/components/builder/section-settings/contact-form-settings.vue'
import VideoEmbedSettings from '@/components/builder/section-settings/video-embed-settings.vue'
import SpacerSettings from '@/components/builder/section-settings/spacer-settings.vue'
import DividerSettings from '@/components/builder/section-settings/divider-settings.vue'
import CustomHTMLSettings from '@/components/builder/section-settings/custom-html-settings.vue'
import SchemaSectionSettings from '@/components/builder/section-settings/schema-section-settings.vue'

const { t } = useI18n()

defineEmits<{ collapse: [] }>()

const UiButton = resolveComponent('VButton')
const store = useBuilderStore()

// ── Section form map ────────────────────────────────────────────────
const formByType: Partial<Record<SectionType, Component>> = {
  hero_banner:       HeroBannerSettings,
  hero_slideshow:    HeroSlideshowSettings,
  hero_split:        HeroSplitSettings,
  hero_video:        HeroVideoSettings,
  products_grid:     ProductsGridSettings,
  products_carousel: ProductsCarouselSettings,
  product_featured:  ProductFeaturedSettings,
  categories_grid:   CategoriesGridSettings,
  rich_text:         RichTextSettings,
  image_text:        ImageTextSettings,
  image_gallery:     ImageGallerySettings,
  banner_full:       BannerFullSettings,
  banner_split:      BannerSplitSettings,
  countdown_timer:   CountdownTimerSettings,
  testimonials:      TestimonialsSettings,
  trust_badges:      TrustBadgesSettings,
  logo_bar:          LogoBarSettings,
  faq_accordion:     FAQSettings,
  newsletter_form:   NewsletterFormSettings,
  contact_form:      ContactFormSettings,
  video_embed:       VideoEmbedSettings,
  spacer:            SpacerSettings,
  divider:           DividerSettings,
  custom_html:       CustomHTMLSettings,
}

const selected = computed(() => store.selectedSection)
const activeForm = computed(() => {
  const s = selected.value
  if (!s) return null
  return formByType[s.type] ?? SchemaSectionSettings
})
const subtitle = computed(() => {
  const s = selected.value
  if (!s) return 'No section selected'
  return `Editing: ${SECTION_TYPE_LABELS[s.type]}`
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

/** Bind section settings fields two-way through updateSectionSettings */
function sectionSetting<T>(key: string, fallback: T) {
  return computed<T>({
    get: () => (selected.value?.settings?.[key] as T) ?? fallback,
    set: (v: T) => {
      if (!selected.value) return
      store.updateSectionSettings(selected.value.id, { [key]: v })
    },
  })
}

const adv_hidden = computed<boolean>({
  get: () => selected.value?.is_hidden ?? false,
  set: () => { if (selected.value) store.toggleSectionHidden(selected.value.id) },
})
const adv_paddingTop    = sectionSetting<number>('padding_top', 0)
const adv_paddingBottom = sectionSetting<number>('padding_bottom', 0)
const shapeValue = (key: string) =>
  String(selected.value?.settings?.[key] ?? 'default')
const setShape = (key: string, v: string) => {
  if (selected.value) store.updateSectionSettings(selected.value.id, { [key]: v })
}
const adv_bgColor       = sectionSetting<string>('bg_color', '#ffffff')
const adv_bgEnabled     = sectionSetting<boolean>('bg_enabled', false)
const adv_maxWidth      = sectionSetting<string>('max_width', 'full')
const adv_hideMobile    = sectionSetting<boolean>('hide_mobile', false)
const adv_hideDesktop   = sectionSetting<boolean>('hide_desktop', false)
const adv_anchorId      = sectionSetting<string>('anchor_id', '')
const adv_cssClass      = sectionSetting<string>('css_class', '')
const adv_label         = sectionSetting<string>('builder_label', '')

async function handleSaveAndClose() {
  await store.saveSettings()
  advancedOpen.value = false
}

// Close drawer on unmount
onUnmounted(() => { advancedOpen.value = false })
</script>