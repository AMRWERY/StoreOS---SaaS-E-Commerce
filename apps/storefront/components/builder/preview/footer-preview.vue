<template>
  <div
    class="group relative cursor-pointer"
    :class="selected
      ? 'ring-2 ring-inset ring-brand'
      : 'hover:ring-1 hover:ring-inset hover:ring-brand/40'"
    role="button"
    tabindex="0"
    @click="emit('select')"
    @keydown.enter.prevent="emit('select')"
  >
    <!-- Label badge -->
    <div
      class="pointer-events-none absolute start-0 top-0 z-20 rounded-br-md px-2 py-0.5 text-[9px] font-bold tracking-widest text-white transition-opacity"
      :class="selected
        ? 'bg-brand/90 opacity-100'
        : 'bg-brand/80 opacity-0 group-hover:opacity-100'"
    >
      Footer
    </div>

    <!-- ── Style: columns ─────────────────────────────────────────── -->
    <div v-if="store.footerStyle === 'columns'" class="bg-neutral-900 px-8 py-10">
      <div class="flex flex-col gap-8 md:flex-row md:justify-between">
        <div class="md:w-1/3">
          <p class="text-base font-bold text-white">{{ store.storeName }}</p>
          <p class="mt-2 text-sm leading-relaxed text-neutral-400">{{ store.footerTagline }}</p>
          <div v-if="store.footerShowSocial" class="mt-4 flex gap-3 text-neutral-400">
            <Icon name="ph:instagram-logo-bold" class="text-lg" />
            <Icon name="ph:twitter-logo-bold" class="text-lg" />
            <Icon name="ph:facebook-logo-bold" class="text-lg" />
          </div>
        </div>
        <div class="flex flex-wrap gap-10">
          <div v-for="col in store.footerColumns" :key="col.title">
            <p class="text-xs font-bold tracking-wider text-neutral-400">{{ col.title }}</p>
            <div class="mt-3 space-y-2">
              <p v-for="link in col.links" :key="link.label" class="text-sm text-neutral-500 hover:text-white">{{ link.label }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-neutral-800 pt-5 text-xs text-neutral-600">{{ store.footerCopyright }}</div>
    </div>

    <!-- ── Style: centered ────────────────────────────────────────── -->
    <div v-else-if="store.footerStyle === 'centered'" class="bg-neutral-50 px-8 py-12 text-center">
      <p class="text-xl font-black tracking-tight text-neutral-900">{{ store.storeName }}</p>
      <p class="mt-2 text-sm text-neutral-500">{{ store.footerTagline }}</p>
      <nav class="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-neutral-600">
        <template v-for="col in store.footerColumns" :key="col.title">
          <span
            v-for="link in col.links"
            :key="`${col.title}-${link.label}`"
            class="transition-colors hover:text-neutral-900"
          >{{ link.label }}</span>
        </template>
      </nav>
      <div v-if="store.footerShowSocial" class="mt-6 flex items-center justify-center gap-4 text-neutral-400">
        <Icon name="ph:instagram-logo-bold" class="text-xl" />
        <Icon name="ph:twitter-logo-bold" class="text-xl" />
        <Icon name="ph:facebook-logo-bold" class="text-xl" />
        <Icon name="ph:tiktok-logo-bold" class="text-xl" />
      </div>
      <div class="mt-8 border-t border-neutral-200 pt-5 text-xs text-neutral-400">{{ store.footerCopyright }}</div>
    </div>

    <!-- ── Style: newsletter ──────────────────────────────────────── -->
    <div v-else-if="store.footerStyle === 'newsletter'" class="bg-neutral-900 px-8 py-10">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <!-- Brand + links -->
        <div>
          <p class="text-base font-bold text-white">{{ store.storeName }}</p>
          <p class="mt-2 text-sm text-neutral-400">{{ store.footerTagline }}</p>
          <div class="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <template v-for="col in store.footerColumns" :key="col.title">
              <span v-for="link in col.links" :key="link.label" class="text-sm text-neutral-500 hover:text-white">
                {{ link.label }}
              </span>
            </template>
          </div>
        </div>
        <!-- Newsletter -->
        <div class="shrink-0 rounded-2xl border border-neutral-700/60 bg-neutral-800 p-6 md:w-80">
          <p class="text-sm font-bold text-white">Stay in the loop</p>
          <p class="mt-1 text-xs text-neutral-400">Get new arrivals and exclusive offers first.</p>
          <div class="mt-4 flex gap-2">
            <div class="flex-1 rounded-xl border border-neutral-600 bg-neutral-700/50 px-3 py-2.5 text-xs text-neutral-400">
              your@email.com
            </div>
            <button type="button" class="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white">
              Subscribe
            </button>
          </div>
          <div v-if="store.footerShowSocial" class="mt-4 flex gap-3 text-neutral-500">
            <Icon name="ph:instagram-logo-bold" />
            <Icon name="ph:twitter-logo-bold" />
            <Icon name="ph:facebook-logo-bold" />
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-neutral-800 pt-5 text-xs text-neutral-600">{{ store.footerCopyright }}</div>
    </div>

    <!-- ── Style: minimal ─────────────────────────────────────────── -->
    <div v-else-if="store.footerStyle === 'minimal'" class="border-t border-neutral-200 bg-white px-8 py-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <span class="text-sm font-bold text-neutral-900">{{ store.storeName }}</span>
        <nav class="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-neutral-500">
          <template v-for="col in store.footerColumns" :key="col.title">
            <span v-for="link in col.links" :key="link.label" class="transition-colors hover:text-neutral-900">
              {{ link.label }}
            </span>
          </template>
        </nav>
        <div class="flex items-center gap-4">
          <div v-if="store.footerShowSocial" class="flex gap-2.5 text-neutral-400">
            <Icon name="ph:instagram-logo-bold" />
            <Icon name="ph:twitter-logo-bold" />
          </div>
          <p class="text-xs text-neutral-400">{{ store.footerCopyright }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{ selected: boolean }>()
const emit = defineEmits<{ select: [] }>()
const store = useBuilderStore()
</script>
