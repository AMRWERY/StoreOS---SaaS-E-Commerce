<template>
  <div
    class="group relative"
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
      Footer
    </div>

    <!-- ── columns ───────────────────────────────────────────────── -->
    <div v-if="style === 'columns'" class="bg-neutral-900 px-8 py-10">
      <div class="flex flex-col gap-8 md:flex-row md:justify-between">
        <div class="md:w-1/3">
          <p class="text-base font-bold text-white">{{ store.displayName }}</p>
          <p class="mt-2 text-sm leading-relaxed text-neutral-400">
            {{ store.footerTagline }}
          </p>
          <div v-if="store.footerShowSocial" class="mt-4 flex gap-3 text-neutral-400">
            <Icon v-for="s in SOCIALS.slice(0, 3)" :key="s" :name="s" class="text-lg" />
          </div>
        </div>
        <div class="flex flex-wrap gap-10">
          <div v-for="col in store.footerColumns" :key="col.title">
            <p class="text-xs font-bold tracking-wider text-neutral-400">{{ col.title }}</p>
            <div class="mt-3 space-y-2">
              <p v-for="link in col.links" :key="link.label" class="text-sm text-neutral-500">
                {{ link.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-neutral-800 pt-5 text-xs text-neutral-600">
        {{ store.footerCopyright }}
      </div>
    </div>

    <!-- ── centered ──────────────────────────────────────────────── -->
    <div v-else-if="style === 'centered'" class="bg-neutral-50 px-8 py-12 text-center">
      <p class="text-xl font-black tracking-tight text-neutral-900">{{ store.displayName }}</p>
      <p class="mt-2 text-sm text-neutral-500">{{ store.footerTagline }}</p>
      <nav
        class="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-neutral-600"
      >
        <span v-for="link in allLinks" :key="link.key">{{ link.label }}</span>
      </nav>
      <div
        v-if="store.footerShowSocial"
        class="mt-6 flex items-center justify-center gap-4 text-neutral-400"
      >
        <Icon v-for="s in SOCIALS" :key="s" :name="s" class="text-xl" />
      </div>
      <div class="mt-8 border-t border-neutral-200 pt-5 text-xs text-neutral-400">
        {{ store.footerCopyright }}
      </div>
    </div>

    <!-- ── newsletter ────────────────────────────────────────────── -->
    <div v-else-if="style === 'newsletter'" class="bg-neutral-900 px-8 py-10">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-base font-bold text-white">{{ store.displayName }}</p>
          <p class="mt-2 text-sm text-neutral-400">{{ store.footerTagline }}</p>
          <div class="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <span v-for="link in allLinks" :key="link.key" class="text-sm text-neutral-500">{{
              link.label
            }}</span>
          </div>
        </div>
        <div class="shrink-0 rounded-2xl border border-neutral-700/60 bg-neutral-800 p-6 md:w-80">
          <p class="text-sm font-bold text-white">Stay in the loop</p>
          <p class="mt-1 text-xs text-neutral-400">Get new arrivals and exclusive offers first.</p>
          <div class="mt-4 flex gap-2">
            <div
              class="flex-1 rounded-xl border border-neutral-600 bg-neutral-700/50 px-3 py-2.5 text-xs text-neutral-400"
            >
              your@email.com
            </div>
            <span class="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white">
              Subscribe
            </span>
          </div>
          <div v-if="store.footerShowSocial" class="mt-4 flex gap-3 text-neutral-500">
            <Icon v-for="s in SOCIALS.slice(0, 3)" :key="s" :name="s" />
          </div>
        </div>
      </div>
      <div class="mt-8 border-t border-neutral-800 pt-5 text-xs text-neutral-600">
        {{ store.footerCopyright }}
      </div>
    </div>

    <!-- ── minimal ───────────────────────────────────────────────── -->
    <div v-else-if="style === 'minimal'" class="border-t border-neutral-200 bg-white px-8 py-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <span class="text-sm font-bold text-neutral-900">{{ store.displayName }}</span>
        <nav class="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-neutral-500">
          <span v-for="link in allLinks" :key="link.key">{{ link.label }}</span>
        </nav>
        <div class="flex items-center gap-4">
          <div v-if="store.footerShowSocial" class="flex gap-2.5 text-neutral-400">
            <Icon v-for="s in SOCIALS.slice(0, 2)" :key="s" :name="s" />
          </div>
          <p class="text-xs text-neutral-400">{{ store.footerCopyright }}</p>
        </div>
      </div>
    </div>

    <!-- ── big brand ─────────────────────────────────────────────── -->
    <div v-else-if="style === 'big-brand'" class="overflow-hidden bg-neutral-900 px-8 pt-10">
      <div class="flex flex-wrap items-start justify-between gap-8">
        <div class="flex flex-wrap gap-10">
          <div v-for="col in store.footerColumns" :key="col.title">
            <p class="text-xs font-bold tracking-wider text-neutral-400">{{ col.title }}</p>
            <div class="mt-3 space-y-2">
              <p v-for="link in col.links" :key="link.label" class="text-sm text-neutral-500">
                {{ link.label }}
              </p>
            </div>
          </div>
        </div>
        <div class="max-w-xs text-sm text-neutral-400">
          {{ store.footerTagline }}
          <div v-if="store.footerShowSocial" class="mt-4 flex gap-3 text-neutral-500">
            <Icon v-for="s in SOCIALS.slice(0, 3)" :key="s" :name="s" class="text-lg" />
          </div>
        </div>
      </div>
      <p
        class="mt-10 whitespace-nowrap text-center text-[clamp(3rem,13vw,9rem)] font-black leading-[0.85] tracking-tighter text-white/90"
      >
        {{ store.displayName }}
      </p>
      <p class="py-4 text-center text-xs text-neutral-600">{{ store.footerCopyright }}</p>
    </div>

    <!-- ── split ─────────────────────────────────────────────────── -->
    <div v-else-if="style === 'split'" class="border-t border-neutral-200 bg-white px-8 py-12">
      <div class="grid gap-10 md:grid-cols-2">
        <div>
          <p class="text-lg font-black tracking-tight text-neutral-900">{{ store.displayName }}</p>
          <p class="mt-2 max-w-sm text-sm text-neutral-500">{{ store.footerTagline }}</p>
          <div class="mt-5 flex max-w-sm gap-2">
            <div
              class="flex-1 rounded-lg border border-neutral-200 px-3 py-2.5 text-xs text-neutral-400"
            >
              your@email.com
            </div>
            <span class="rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white">
              Subscribe
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-12 md:justify-end">
          <div v-for="col in store.footerColumns" :key="col.title">
            <p class="text-xs font-bold tracking-wider text-neutral-900">{{ col.title }}</p>
            <div class="mt-3 space-y-2">
              <p v-for="link in col.links" :key="link.label" class="text-sm text-neutral-500">
                {{ link.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-5 text-xs text-neutral-400"
      >
        <span>{{ store.footerCopyright }}</span>
        <div v-if="store.footerShowSocial" class="flex gap-3 text-base">
          <Icon v-for="s in SOCIALS.slice(0, 3)" :key="s" :name="s" />
        </div>
      </div>
    </div>

    <!-- ── link cards ────────────────────────────────────────────── -->
    <div v-else-if="style === 'cards'" class="bg-neutral-100 px-8 py-10">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="col in store.footerColumns"
          :key="col.title"
          class="rounded-2xl border border-neutral-200 bg-white p-5"
        >
          <p class="text-xs font-bold tracking-wider text-neutral-900">{{ col.title }}</p>
          <div class="mt-3 space-y-2">
            <p v-for="link in col.links" :key="link.label" class="text-sm text-neutral-500">
              {{ link.label }}
            </p>
          </div>
        </div>
      </div>
      <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span class="text-sm font-bold text-neutral-900">{{ store.displayName }}</span>
          <span class="ms-3 text-xs text-neutral-400">{{ store.footerCopyright }}</span>
        </div>
        <div v-if="store.footerShowSocial" class="flex gap-3 text-neutral-500">
          <Icon v-for="s in SOCIALS.slice(0, 3)" :key="s" :name="s" class="text-lg" />
        </div>
      </div>
    </div>

    <!-- ── payments ──────────────────────────────────────────────── -->
    <div v-else class="border-t border-neutral-200 bg-white px-8 py-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <span class="text-sm font-black text-neutral-900">{{ store.displayName }}</span>
        <nav class="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-neutral-500">
          <span v-for="link in allLinks" :key="link.key">{{ link.label }}</span>
        </nav>
      </div>
      <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-2 text-neutral-500">
          <span
            v-for="p in PAYMENTS"
            :key="p"
            class="flex h-8 w-12 items-center justify-center rounded-md border border-neutral-200 bg-white"
          >
            <Icon :name="p" class="text-lg" />
          </span>
        </div>
        <div v-if="store.footerShowSocial" class="flex gap-3 text-neutral-400">
          <Icon v-for="s in SOCIALS.slice(0, 3)" :key="s" :name="s" class="text-lg" />
        </div>
      </div>
      <p class="mt-6 border-t border-neutral-200 pt-4 text-xs text-neutral-400">
        {{ store.footerCopyright }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ selected?: boolean; readonly?: boolean }>(), {
  selected: false,
  readonly: false,
});

const emit = defineEmits<{ select: [] }>();

const store = useBuilderStore();
const style = computed(() => store.footerStyle);

const SOCIALS = [
  "ph:instagram-logo-bold",
  "ph:facebook-logo-bold",
  "ph:twitter-logo-bold",
  "ph:tiktok-logo-bold",
];
const PAYMENTS = [
  "ph:credit-card-bold",
  "ph:paypal-logo-bold",
  "ph:apple-logo-bold",
  "ph:google-logo-bold",
  "ph:bank-bold",
];

/** Every footer link flattened (for the single-row designs). */
const allLinks = computed(() =>
  store.footerColumns.flatMap((col) =>
    col.links.map((l) => ({ key: `${col.title}-${l.label}`, label: l.label })),
  ),
);
</script>
