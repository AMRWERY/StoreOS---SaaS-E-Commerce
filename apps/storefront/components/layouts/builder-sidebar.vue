<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-40 lg:hidden"
      @click="$emit('close')"
    />
  </Transition>

  <aside
    class="fixed lg:sticky top-0 start-0 w-[220px] h-screen bg-bg-primary border-e border-border-subtle flex flex-col p-6 shrink-0 z-50 transition-all duration-300"
    :class="isOpen
      ? 'translate-x-0'
      : 'ltr:-translate-x-full rtl:translate-x-full ltr:lg:translate-x-0 rtl:lg:translate-x-0'"
  >
    <div class="flex items-center gap-2 mb-8">
      <div class="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white">
        <Icon name="ph:paint-brush-fill" class="text-xl" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-bold text-sm leading-none text-tx-primary text-start truncate">
          Store Builder
        </p>
        <p class="text-[9px] text-tx-muted tracking-[0.6px] font-semibold mt-1 text-start">
          Storefront
        </p>
      </div>
      <VButton
        variant="none"
        className="lg:hidden text-tx-secondary hover:text-tx-primary p-1 shrink-0"
        @click="$emit('close')"
      >
        <Icon name="ph:x-bold" class="text-xl" />
      </VButton>
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto hide-scrollbar">
      <nuxt-link-locale
        to="/"
        class="flex items-center gap-2 px-3 py-2 rounded-md text-[12px] font-medium text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-all"
        @click="$emit('close')"
      >
        <Icon name="ph:arrow-left-bold" class="text-lg shrink-0" />
        <span class="truncate">Back to storefront</span>
      </nuxt-link-locale>

      <p class="text-[10px] font-bold text-tx-muted tracking-widest uppercase px-3 pt-6 pb-2">
        Dashboard
      </p>
      <nuxt-link-locale
        to="/dashboard"
        class="block px-3 py-2 rounded-md text-[12px] font-medium transition-all"
        :class="isDashboardRoot
          ? 'bg-brand-dim text-brand'
          : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'"
        @click="$emit('close')"
      >
        Overview
      </nuxt-link-locale>

      <p class="text-[10px] font-bold text-tx-muted tracking-widest uppercase px-3 pt-4 pb-2">
        Pages
      </p>
      <nuxt-link-locale
        v-for="p in builderPages"
        :key="p.slug"
        :to="`/dashboard/builder/${p.slug}`"
        class="block px-3 py-2 rounded-md text-[12px] font-medium transition-all"
        :class="isActivePage(p.slug)
          ? 'bg-brand-dim text-brand'
          : 'text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated'"
        @click="$emit('close')"
      >
        {{ p.title }}
      </nuxt-link-locale>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{ isOpen: boolean }>()
defineEmits<{ close: [] }>()

const route = useRoute()
const localePath = useLocalePath()

/** Stub list — replace with `useStorePages` / API. */
const builderPages = [
  { slug: 'home', title: 'Home' },
]

function isActivePage(slug: string) {
  const current = String(route.params.slug ?? '')
  return current === slug
}

const isDashboardRoot = computed(() => {
  const path = route.path.replace(/\/$/, '')
  const target = localePath('/dashboard').replace(/\/$/, '')
  return path === target
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
