<template>
  <div class="min-h-screen bg-white font-sans antialiased">

    <!-- Preview bar -->
    <div class="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6 py-2.5 shadow-sm print:hidden">
      <div class="flex items-center gap-3">
        <div class="flex size-6 items-center justify-center rounded bg-indigo-600 text-white">
          <Icon name="ph:storefront-bold" class="text-xs" />
        </div>
        <span class="text-sm font-bold text-neutral-900">{{ store.storeName }}</span>
        <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black tracking-widest text-emerald-700">
          LIVE PREVIEW
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs text-neutral-400">
          {{ visibleSections.length }} section{{ visibleSections.length !== 1 ? 's' : '' }}
        </span>
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
          @click="goBackToBuilder"
        >
          <Icon name="ph:pencil-simple-bold" class="text-sm" />
          Edit in Builder
        </button>
      </div>
    </div>

    <!-- No state fallback -->
    <div v-if="!hasState" class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center p-8">
      <div class="flex size-20 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
        <Icon name="ph:paint-brush-bold" class="text-3xl text-neutral-300" />
      </div>
      <h2 class="text-xl font-bold text-neutral-800">Nothing published yet</h2>
      <p class="max-w-sm text-sm text-neutral-500">
        Go back to the builder, make some edits and click "Publish now" to see your store here.
      </p>
      <button
        type="button"
        class="mt-2 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
        @click="goBackToBuilder"
      >
        <Icon name="ph:arrow-left-bold" />
        Back to Builder
      </button>
    </div>

    <!-- Rendered store -->
    <template v-else>

      <!-- Navbar -->
      <div v-if="store.navbarStyle === 'classic'" class="flex items-center justify-between border-b border-neutral-100 bg-white px-8 py-4">
        <span class="text-base font-bold tracking-[0.15em] text-neutral-900">{{ store.storeName }}</span>
        <nav class="hidden gap-8 text-sm text-neutral-600 md:flex">
          <span v-for="link in store.navLinks" :key="link.label" class="cursor-pointer transition-colors hover:text-neutral-900">{{ link.label }}</span>
        </nav>
        <div class="flex items-center gap-3 text-neutral-500">
          <Icon name="ph:magnifying-glass-bold" />
          <Icon name="ph:bag-bold" />
        </div>
      </div>

      <div v-else-if="store.navbarStyle === 'centered'" class="border-b border-neutral-100 bg-white">
        <div class="flex items-center justify-between px-8 py-3">
          <div class="w-16 text-neutral-300"><Icon name="ph:magnifying-glass-bold" class="text-sm" /></div>
          <span class="text-lg font-black tracking-[0.2em] text-neutral-900">{{ store.storeName }}</span>
          <div class="flex w-16 justify-end gap-3 text-neutral-500"><Icon name="ph:bag-bold" /></div>
        </div>
        <nav class="flex items-center justify-center gap-8 border-t border-neutral-100 py-2.5 text-sm text-neutral-600">
          <span v-for="link in store.navLinks" :key="link.label" class="cursor-pointer transition-colors hover:text-neutral-900">{{ link.label }}</span>
        </nav>
      </div>

      <div v-else-if="store.navbarStyle === 'dark'" class="flex items-center justify-between bg-neutral-900 px-8 py-4">
        <span class="text-base font-bold tracking-[0.15em] text-white">{{ store.storeName }}</span>
        <nav class="hidden gap-8 text-sm text-neutral-300 md:flex">
          <span v-for="link in store.navLinks" :key="link.label" class="cursor-pointer transition-colors hover:text-white">{{ link.label }}</span>
        </nav>
        <div class="flex items-center gap-4">
          <div class="flex gap-3 text-neutral-400"><Icon name="ph:magnifying-glass-bold" /><Icon name="ph:bag-bold" /></div>
          <button type="button" class="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-neutral-900">Shop now</button>
        </div>
      </div>

      <div v-else class="border-b border-neutral-100 bg-white px-8 py-5">
        <div class="flex items-center justify-between">
          <span class="text-xl font-black tracking-tight text-neutral-900">{{ store.storeName }}</span>
          <div class="flex items-center gap-5">
            <nav class="hidden gap-7 text-sm font-medium text-neutral-500 md:flex">
              <span v-for="link in store.navLinks" :key="link.label" class="cursor-pointer transition-colors hover:text-neutral-900">{{ link.label }}</span>
            </nav>
            <div class="flex items-center gap-2 text-neutral-400">
              <Icon name="ph:magnifying-glass-bold" /><Icon name="ph:bag-bold" />
            </div>
          </div>
        </div>
      </div>

      <!-- Sections -->
      <main>
        <section-render
          v-for="section in visibleSections"
          :key="section.id"
          :section="section"
        />
      </main>

      <!-- Footer -->
      <div v-if="store.footerStyle === 'columns'" class="bg-neutral-900 px-8 py-10">
        <div class="flex flex-col gap-8 md:flex-row md:justify-between">
          <div class="md:w-1/3">
            <p class="text-base font-bold text-white">{{ store.storeName }}</p>
            <p class="mt-2 text-sm leading-relaxed text-neutral-400">{{ store.footerTagline }}</p>
            <div v-if="store.footerShowSocial" class="mt-4 flex gap-3 text-neutral-400">
              <Icon name="ph:instagram-logo-bold" class="text-lg" /><Icon name="ph:twitter-logo-bold" class="text-lg" /><Icon name="ph:facebook-logo-bold" class="text-lg" />
            </div>
          </div>
          <div class="flex flex-wrap gap-10">
            <div v-for="col in store.footerColumns" :key="col.title">
              <p class="text-xs font-bold tracking-wider text-neutral-400">{{ col.title }}</p>
              <div class="mt-3 space-y-2">
                <p v-for="link in col.links" :key="link.label" class="cursor-pointer text-sm text-neutral-500 hover:text-white">{{ link.label }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-neutral-800 pt-5 text-xs text-neutral-600">{{ store.footerCopyright }}</div>
      </div>

      <div v-else-if="store.footerStyle === 'centered'" class="bg-neutral-50 px-8 py-12 text-center">
        <p class="text-xl font-black tracking-tight text-neutral-900">{{ store.storeName }}</p>
        <p class="mt-2 text-sm text-neutral-500">{{ store.footerTagline }}</p>
        <nav class="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-neutral-600">
          <template v-for="col in store.footerColumns" :key="col.title">
            <span v-for="link in col.links" :key="`${col.title}-${link.label}`" class="cursor-pointer transition-colors hover:text-neutral-900">{{ link.label }}</span>
          </template>
        </nav>
        <div v-if="store.footerShowSocial" class="mt-6 flex items-center justify-center gap-4 text-neutral-400">
          <Icon name="ph:instagram-logo-bold" class="text-xl" /><Icon name="ph:twitter-logo-bold" class="text-xl" /><Icon name="ph:facebook-logo-bold" class="text-xl" />
        </div>
        <div class="mt-8 border-t border-neutral-200 pt-5 text-xs text-neutral-400">{{ store.footerCopyright }}</div>
      </div>

      <div v-else-if="store.footerStyle === 'newsletter'" class="bg-neutral-900 px-8 py-10">
        <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-base font-bold text-white">{{ store.storeName }}</p>
            <p class="mt-2 text-sm text-neutral-400">{{ store.footerTagline }}</p>
            <div class="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <template v-for="col in store.footerColumns" :key="col.title">
                <span v-for="link in col.links" :key="link.label" class="cursor-pointer text-sm text-neutral-500 hover:text-white">{{ link.label }}</span>
              </template>
            </div>
          </div>
          <div class="shrink-0 rounded-2xl border border-neutral-700/60 bg-neutral-800 p-6 md:w-80">
            <p class="text-sm font-bold text-white">Stay in the loop</p>
            <p class="mt-1 text-xs text-neutral-400">Get new arrivals and exclusive offers first.</p>
            <div class="mt-4 flex gap-2">
              <input type="email" placeholder="your@email.com" class="flex-1 rounded-xl border border-neutral-600 bg-neutral-700/50 px-3 py-2.5 text-xs text-neutral-400 outline-none" />
              <button type="button" class="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white">Subscribe</button>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-neutral-800 pt-5 text-xs text-neutral-600">{{ store.footerCopyright }}</div>
      </div>

      <div v-else class="border-t border-neutral-200 bg-white px-8 py-5">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <span class="text-sm font-bold text-neutral-900">{{ store.storeName }}</span>
          <nav class="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-neutral-500">
            <template v-for="col in store.footerColumns" :key="col.title">
              <span v-for="link in col.links" :key="link.label" class="cursor-pointer transition-colors hover:text-neutral-900">{{ link.label }}</span>
            </template>
          </nav>
          <p class="text-xs text-neutral-400">{{ store.footerCopyright }}</p>
        </div>
      </div>

    </template>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: false })

const store = useBuilderStore()
const localePath = useLocalePath()

const hasState = ref(false)

onMounted(() => {
  if (store.pages.length > 0 && store.sections.length > 0) {
    // Store already has data (same-tab navigation)
    hasState.value = true
  } else {
    // New tab — hydrate from localStorage
    hasState.value = store.hydrateFromStorage()
  }
})

const visibleSections = computed(() =>
  store.sections.filter(s => !s.is_hidden)
)

function goBackToBuilder() {
  const slug = store.currentPage?.slug ?? 'home'
  window.location.href = localePath(`/dashboard/builder/${slug}`)
}
</script>
