<template>
  <div
    class="group relative z-10"
    :class="
      readonly
        ? ''
        : [
            'cursor-pointer',
            selected
              ? 'ring-2 ring-inset ring-brand'
              : 'hover:ring-1 hover:ring-inset hover:ring-brand/40',
          ]
    "
    :role="readonly ? undefined : 'button'"
    :tabindex="readonly ? undefined : 0"
    @click="!readonly && emit('select')"
    @keydown.enter.prevent="!readonly && emit('select')"
  >
    <!-- Label badge (editor only) -->
    <div
      v-if="!readonly"
      class="pointer-events-none absolute start-0 top-0 z-20 rounded-br-md px-2 py-0.5 text-[9px] font-bold tracking-widest text-white transition-opacity"
      :class="
        selected
          ? 'bg-brand/90 opacity-100'
          : 'bg-brand/80 opacity-0 group-hover:opacity-100'
      "
    >
      Navbar
    </div>

    <!-- ── classic ───────────────────────────────────────────────── -->
    <div
      v-if="style === 'classic'"
      class="flex items-center justify-between border-b border-neutral-100 bg-white px-8 py-4"
    >
      <span class="text-base font-bold tracking-[0.15em] text-neutral-900">{{
        store.displayName
      }}</span>
      <nav class="hidden gap-8 text-sm text-neutral-600 md:flex">
        <span v-for="link in links" :key="link.label">{{ link.label }}</span>
        <span v-if="!links.length" class="italic text-neutral-300">No links</span>
      </nav>
      <div class="flex items-center gap-3 text-neutral-500">
        <Icon name="ph:magnifying-glass-bold" />
        <Icon name="ph:bag-bold" />
      </div>
    </div>

    <!-- ── centered ──────────────────────────────────────────────── -->
    <div v-else-if="style === 'centered'" class="border-b border-neutral-100 bg-white">
      <div class="flex items-center justify-between px-8 py-3">
        <div class="w-16 text-neutral-300">
          <Icon name="ph:magnifying-glass-bold" class="text-sm" />
        </div>
        <span class="text-lg font-black tracking-[0.2em] text-neutral-900">{{
          store.displayName
        }}</span>
        <div class="flex w-16 justify-end gap-3 text-neutral-500">
          <Icon name="ph:bag-bold" />
        </div>
      </div>
      <nav
        class="flex items-center justify-center gap-8 border-t border-neutral-100 py-2.5 text-sm text-neutral-600"
      >
        <span v-for="link in links" :key="link.label">{{ link.label }}</span>
        <span v-if="!links.length" class="italic text-neutral-300">No links</span>
      </nav>
    </div>

    <!-- ── dark ──────────────────────────────────────────────────── -->
    <div
      v-else-if="style === 'dark'"
      class="flex items-center justify-between bg-neutral-900 px-8 py-4"
    >
      <span class="text-base font-bold tracking-[0.15em] text-white">{{
        store.displayName
      }}</span>
      <nav class="hidden gap-8 text-sm text-neutral-300 md:flex">
        <span v-for="link in links" :key="link.label">{{ link.label }}</span>
        <span v-if="!links.length" class="italic text-neutral-600">No links</span>
      </nav>
      <div class="flex items-center gap-4">
        <div class="flex gap-3 text-neutral-400">
          <Icon name="ph:magnifying-glass-bold" />
          <Icon name="ph:bag-bold" />
        </div>
        <span class="rounded-lg bg-white px-4 py-1.5 text-xs font-bold text-neutral-900">
          Shop now
        </span>
      </div>
    </div>

    <!-- ── minimal ───────────────────────────────────────────────── -->
    <div
      v-else-if="style === 'minimal'"
      class="border-b border-neutral-100 bg-white px-8 py-5"
    >
      <div class="flex items-center justify-between">
        <span class="text-xl font-black tracking-tight text-neutral-900">{{
          store.displayName
        }}</span>
        <div class="flex items-center gap-5">
          <nav class="hidden gap-7 text-sm font-medium text-neutral-500 md:flex">
            <span v-for="link in links" :key="link.label">{{ link.label }}</span>
          </nav>
          <div class="flex items-center gap-2 text-neutral-400">
            <Icon name="ph:magnifying-glass-bold" />
            <span class="relative">
              <Icon name="ph:bag-bold" />
              <span
                class="absolute -end-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white"
                >2</span
              >
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── split + CTA ───────────────────────────────────────────── -->
    <div
      v-else-if="style === 'split'"
      class="flex items-center gap-6 border-b border-neutral-100 bg-white px-8 py-4"
    >
      <span class="text-base font-black tracking-[0.12em] text-neutral-900">{{
        store.displayName
      }}</span>
      <nav class="hidden flex-1 items-center justify-center gap-8 text-sm text-neutral-600 md:flex">
        <span v-for="link in links" :key="link.label">{{ link.label }}</span>
      </nav>
      <div class="ms-auto flex items-center gap-4 text-neutral-500">
        <Icon name="ph:magnifying-glass-bold" />
        <Icon name="ph:user-bold" />
        <span class="relative">
          <Icon name="ph:bag-bold" />
          <span
            class="absolute -end-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white"
            >2</span
          >
        </span>
        <span class="hidden rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white sm:inline">
          Shop now
        </span>
      </div>
    </div>

    <!-- ── floating pill ─────────────────────────────────────────── -->
    <div v-else-if="style === 'floating'" class="bg-neutral-100 px-6 py-4">
      <div
        class="flex items-center justify-between gap-4 rounded-full bg-white px-6 py-3 shadow-lg ring-1 ring-black/5"
      >
        <span class="text-sm font-black tracking-[0.15em] text-neutral-900">{{
          store.displayName
        }}</span>
        <nav class="hidden gap-7 text-sm text-neutral-600 md:flex">
          <span v-for="link in links" :key="link.label">{{ link.label }}</span>
        </nav>
        <div class="flex items-center gap-3 text-neutral-500">
          <Icon name="ph:magnifying-glass-bold" />
          <span class="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white">
            <Icon name="ph:bag-bold" class="text-sm" />
          </span>
        </div>
      </div>
    </div>

    <!-- ── announcement bar + classic ────────────────────────────── -->
    <div v-else-if="style === 'announcement'" class="bg-white">
      <div class="bg-indigo-600 px-4 py-2 text-center text-xs font-semibold text-white">
        Free shipping on orders over $50 · Use code WELCOME10
      </div>
      <div class="flex items-center justify-between border-b border-neutral-100 px-8 py-4">
        <span class="text-base font-bold tracking-[0.15em] text-neutral-900">{{
          store.displayName
        }}</span>
        <nav class="hidden gap-8 text-sm text-neutral-600 md:flex">
          <span v-for="link in links" :key="link.label">{{ link.label }}</span>
        </nav>
        <div class="flex items-center gap-3 text-neutral-500">
          <Icon name="ph:magnifying-glass-bold" />
          <Icon name="ph:bag-bold" />
        </div>
      </div>
    </div>

    <!-- ── search first ──────────────────────────────────────────── -->
    <div v-else-if="style === 'search'" class="border-b border-neutral-100 bg-white">
      <div class="flex items-center gap-4 px-8 py-3">
        <span class="text-base font-black tracking-[0.12em] text-neutral-900">{{
          store.displayName
        }}</span>
        <div
          class="mx-auto flex max-w-xl flex-1 items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-400"
        >
          <Icon name="ph:magnifying-glass-bold" />
          Search products…
        </div>
        <div class="flex items-center gap-3 text-neutral-500">
          <Icon name="ph:heart-bold" />
          <Icon name="ph:user-bold" />
          <Icon name="ph:bag-bold" />
        </div>
      </div>
      <nav
        class="flex items-center justify-center gap-8 border-t border-neutral-100 py-2 text-sm text-neutral-600"
      >
        <span v-for="link in links" :key="link.label">{{ link.label }}</span>
        <span v-if="!links.length" class="italic text-neutral-300">No links</span>
      </nav>
    </div>

    <!-- ── transparent (over hero) ───────────────────────────────── -->
    <div
      v-else
      class="flex items-center justify-between bg-gradient-to-b from-neutral-900 to-neutral-700 px-8 py-6"
    >
      <span class="text-base font-black tracking-[0.2em] text-white">{{
        store.displayName
      }}</span>
      <nav class="hidden gap-8 text-sm text-white/80 md:flex">
        <span v-for="link in links" :key="link.label">{{ link.label }}</span>
      </nav>
      <div class="flex items-center gap-3 text-white/80">
        <Icon name="ph:magnifying-glass-bold" />
        <Icon name="ph:bag-bold" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ selected?: boolean; readonly?: boolean }>(),
  { selected: false, readonly: false },
);

const emit = defineEmits<{ select: [] }>();

const store = useBuilderStore();
const style = computed(() => store.navbarStyle);
const links = computed(() => store.navLinks);
</script>
