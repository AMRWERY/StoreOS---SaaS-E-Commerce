<template>
  <div
    class="group relative z-10 cursor-pointer"
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
      Navbar
    </div>

    <!-- ── Style: classic ─────────────────────────────────────────── -->
    <div v-if="store.navbarStyle === 'classic'" class="flex items-center justify-between border-b border-neutral-100 bg-white px-8 py-4">
      <span class="text-base font-bold tracking-[0.15em] text-neutral-900">
        {{ store.storeName }}
      </span>
      <nav class="hidden gap-8 text-sm text-neutral-600 md:flex">
        <span v-for="link in store.navLinks" :key="link.label" class="transition-colors hover:text-neutral-900">
          {{ link.label }}
        </span>
        <span v-if="!store.navLinks.length" class="italic text-neutral-300">No links</span>
      </nav>
      <div class="flex items-center gap-3 text-neutral-500">
        <Icon name="ph:magnifying-glass-bold" />
        <Icon name="ph:bag-bold" />
      </div>
    </div>

    <!-- ── Style: centered ────────────────────────────────────────── -->
    <div v-else-if="store.navbarStyle === 'centered'" class="border-b border-neutral-100 bg-white">
      <div class="flex items-center justify-between px-8 py-3">
        <div class="w-16 text-neutral-300">
          <Icon name="ph:magnifying-glass-bold" class="text-sm" />
        </div>
        <span class="text-lg font-black tracking-[0.2em] text-neutral-900">
          {{ store.storeName }}
        </span>
        <div class="flex w-16 justify-end gap-3 text-neutral-500">
          <Icon name="ph:bag-bold" />
        </div>
      </div>
      <nav class="flex items-center justify-center gap-8 border-t border-neutral-100 py-2.5 text-sm text-neutral-600">
        <span v-for="link in store.navLinks" :key="link.label" class="transition-colors hover:text-neutral-900">
          {{ link.label }}
        </span>
        <span v-if="!store.navLinks.length" class="italic text-neutral-300">No links</span>
      </nav>
    </div>

    <!-- ── Style: dark ────────────────────────────────────────────── -->
    <div v-else-if="store.navbarStyle === 'dark'" class="flex items-center justify-between bg-neutral-900 px-8 py-4">
      <span class="text-base font-bold tracking-[0.15em] text-white">
        {{ store.storeName }}
      </span>
      <nav class="hidden gap-8 text-sm text-neutral-300 md:flex">
        <span v-for="link in store.navLinks" :key="link.label" class="transition-colors hover:text-white">
          {{ link.label }}
        </span>
        <span v-if="!store.navLinks.length" class="italic text-neutral-600">No links</span>
      </nav>
      <div class="flex items-center gap-4">
        <div class="flex gap-3 text-neutral-400">
          <Icon name="ph:magnifying-glass-bold" />
          <Icon name="ph:bag-bold" />
        </div>
        <button type="button" class="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-neutral-900">
          Shop now
        </button>
      </div>
    </div>

    <!-- ── Style: minimal ─────────────────────────────────────────── -->
    <div v-else-if="store.navbarStyle === 'minimal'" class="border-b border-neutral-100 bg-white px-8 py-5">
      <div class="flex items-center justify-between">
        <span class="text-xl font-black tracking-tight text-neutral-900">
          {{ store.storeName }}
        </span>
        <div class="flex items-center gap-5">
          <nav class="hidden gap-7 text-sm font-medium text-neutral-500 md:flex">
            <span v-for="link in store.navLinks" :key="link.label" class="transition-colors hover:text-neutral-900">
              {{ link.label }}
            </span>
          </nav>
          <div class="flex items-center gap-2 text-neutral-400">
            <Icon name="ph:magnifying-glass-bold" />
            <span class="relative">
              <Icon name="ph:bag-bold" />
              <span class="absolute -end-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white">2</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ selected: boolean }>()
const emit = defineEmits<{ select: [] }>()
const store = useBuilderStore()
</script>
