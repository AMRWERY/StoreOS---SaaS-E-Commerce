<template>
  <div class="z-40 flex h-[52px] w-full shrink-0 items-center border-b border-border-subtle bg-bg-base px-4">
    <header class="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-4">
      <!-- Left -->
      <div class="flex min-w-0 items-center gap-2 md:gap-4">
        <component :is="UiButton" variant="none" type="button"
          class-name="shrink-0 p-2 bg-bg-primary border border-border-subtle rounded-md text-tx-secondary hover:text-tx-primary lg:hidden"
          title="Open menu" @click="$emit('toggle-sidebar')">
          <Icon name="ph:list-bold" class="text-xl" />
        </component>
        <NuxtLinkLocale to="/" class="flex min-w-0 shrink-0 items-center gap-2.5 md:gap-3">
          <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
            <Icon name="ph:storefront-bold" class="text-xl" />
          </div>
          <div class="min-w-0">
            <h1 class="text-lg font-bold leading-none text-tx-primary">
              Store<span class="text-brand">OS</span>
            </h1>
            <p class="mt-1 text-[9px] font-semibold tracking-[0.2em] text-tx-secondary">
              Global Merchant
            </p>
          </div>
        </NuxtLinkLocale>
      </div>

      <!-- Center: unsaved -->
      <div class="flex items-center justify-center gap-2 px-2">
        <span class="size-1.5 shrink-0 animate-pulse rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.55)]"
          aria-hidden="true" />
        <span class="text-[9px] font-black uppercase tracking-[0.35em] text-[#f97316]">
          Unsaved Changes
        </span>
      </div>

      <!-- Right -->
      <div class="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
        <div class="flex items-center rounded-lg border border-border-subtle bg-bg-elevated p-0.5" role="group"
          aria-label="Preview device">
          <component :is="UiButton" v-for="v in viewports" :key="v.id" variant="none" type="button" :title="v.title"
            :class-name="viewportButtonClass(v.id)" @click="currentViewport = v.id">
            <Icon :name="v.icon" class="text-base" />
          </component>
        </div>

        <component :is="UiButton" variant="none" type="button"
          class-name="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary sm:px-3"
          @click="switchLocale">
          <Icon name="ph:globe-bold" class="size-4 shrink-0" />
          <span>{{ localeLabel }}</span>
        </component>

        <component :is="UiButton" variant="primary" type="button"
          class-name="shrink-0 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] shadow-[0_0_14px_rgba(99,102,241,0.35)] sm:px-5 sm:text-[11px] sm:tracking-[0.1em]">
          Publish
        </component>
      </div>
    </header>

    <component :is="UiOverlay" :show="showLocaleOverlay" />
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  'toggle-sidebar': []
}>()

const UiButton = resolveComponent('VButton')
const UiOverlay = resolveComponent('VOverlay')

const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const viewports = [
  { id: 'desktop', title: 'Desktop', icon: 'ph:desktop-bold' },
  { id: 'tablet', title: 'Tablet', icon: 'ph:device-tablet-bold' },
  { id: 'mobile', title: 'Mobile', icon: 'ph:device-mobile-bold' },
] as const

const historyToolbarActions = [
  { id: 'undo', title: 'Undo', icon: 'ph:arrow-u-up-left-bold' },
  { id: 'redo', title: 'Redo', icon: 'ph:arrow-u-up-right-bold' },
] as const

const currentViewport = ref<(typeof viewports)[number]['id']>('desktop')

function viewportButtonClass(id: string) {
  const base = 'rounded-md p-1.5 transition-all '
  return (
    base
    + (currentViewport.value === id
      ? 'bg-bg-overlay text-brand shadow-sm'
      : 'text-tx-muted hover:text-tx-secondary')
  )
}

const isEnglish = computed(() => locale.value === 'en')
const localeLabel = computed(() => (isEnglish.value ? 'ع' : 'EN'))

const showLocaleOverlay = ref(false)

async function switchLocale() {
  const target = isEnglish.value ? 'ar' : 'en'
  showLocaleOverlay.value = true
  await new Promise(resolve => setTimeout(resolve, 2500))
  await navigateTo(switchLocalePath(target))
  setTimeout(() => {
    showLocaleOverlay.value = false
  }, 200)
}
</script>