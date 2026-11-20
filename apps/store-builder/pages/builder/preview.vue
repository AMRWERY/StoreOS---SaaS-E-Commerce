<template>
  <div
    v-bind="siteRootAttrs"
    class="sb-site min-h-screen font-sans antialiased"
    :dir="store.direction"
    :lang="store.contentLocale"
  >
    <!-- Preview bar -->
    <div
      class="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-neutral-200 bg-white px-6 py-2.5 shadow-sm print:hidden"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex size-6 items-center justify-center rounded bg-indigo-600 text-white"
        >
          <Icon name="ph:storefront-bold" class="text-xs" />
        </div>
        <span class="text-sm font-bold text-neutral-900">{{
          store.displayName
        }}</span>
        <span
          class="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black tracking-widest text-emerald-700"
        >
          LIVE PREVIEW
        </span>
      </div>
      <div class="flex items-center gap-3">
        <div
          v-if="store.isMultiLocale"
          class="flex items-center rounded-lg border border-neutral-200 bg-neutral-50 p-0.5"
          role="group"
          aria-label="Language"
        >
          <button
            v-for="code in store.locales"
            :key="code"
            type="button"
            class="rounded-md px-2.5 py-1 text-[11px] font-bold transition-colors"
            :class="
              store.contentLocale === code
                ? 'bg-indigo-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            "
            @click="store.setContentLocale(code)"
          >
            {{ code === 'ar' ? 'العربية' : 'English' }}
          </button>
        </div>
        <span class="text-xs text-neutral-400">
          {{ visibleSections.length }} section{{
            visibleSections.length !== 1 ? "s" : ""
          }}
        </span>
        <LazyVButton
          variant="none"
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
          @click="goBackToBuilder"
        >
          <Icon name="ph:pencil-simple-bold" class="text-sm" />
          Edit in Builder
        </LazyVButton>
      </div>
    </div>

    <site-custom-css />

    <!-- Maintenance mode: visitors would see this instead of the store -->
    <div
      v-if="hasState && store.siteSettings.maintenance && !bypassMaintenance"
      class="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-8 text-center"
    >
      <div class="flex size-20 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
        <Icon name="ph:wrench-bold" class="text-3xl text-neutral-400" />
      </div>
      <h2 class="text-2xl font-bold text-neutral-900">{{ store.displayName }}</h2>
      <p class="max-w-md text-sm text-neutral-500">{{ store.siteSettings.maintenanceMessage }}</p>
      <p class="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700">
        Maintenance mode is ON — this is what visitors see
      </p>
      <button
        type="button"
        class="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
        @click="bypassMaintenance = true"
      >
        Preview the store anyway
      </button>
    </div>

    <!-- No state fallback -->
    <div
      v-if="!hasState"
      class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center p-8"
    >
      <div
        class="flex size-20 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50"
      >
        <Icon name="ph:paint-brush-bold" class="text-3xl text-neutral-300" />
      </div>
      <h2 class="text-xl font-bold text-neutral-800">Nothing published yet</h2>
      <p class="max-w-sm text-sm text-neutral-500">
        Go back to the builder, make some edits and click "Publish now" to see
        your store here.
      </p>
      <LazyVButton
        variant="none"
        type="button"
        className="mt-2 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-700"
        @click="goBackToBuilder"
      >
        <Icon name="ph:arrow-left-bold" class="icon-nudge-start" />
        Back to Builder
      </LazyVButton>
    </div>

    <!-- Rendered store -->
    <template v-else-if="!store.siteSettings.maintenance || bypassMaintenance">
      <!-- Navbar (same component as the editor, read-only) -->
      <navbar-preview readonly />

      <!-- Sections -->
      <main>
        <lazy-section-render
          v-for="section in visibleSections"
          :key="section.id"
          :section="section"
        />
      </main>

      <!-- Footer (same component as the editor, read-only) -->
      <footer-preview readonly />
    </template>
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore();
const { siteRootAttrs } = useSiteStyle();
const localePath = useLocalePath();

const hasState = ref(false);
const bypassMaintenance = ref(false);

useHead({
  link: () =>
    store.siteSettings.faviconUrl
      ? [{ rel: "icon", href: store.siteSettings.faviconUrl }]
      : [],
});

onMounted(() => {
  if (store.pages.length > 0 && store.sections.length > 0) {
    // Store already has data (same-tab navigation)
    hasState.value = true;
  } else {
    // New tab — hydrate from localStorage
    hasState.value = store.hydrateFromStorage();
  }
});

const visibleSections = computed(() =>
  store.sections.filter((s) => !s.is_hidden),
);

const goBackToBuilder = () => {
  const slug = store.currentPage?.slug ?? "home";
  window.location.href = localePath(`/builder/${slug}`);
};

definePageMeta({ layout: false });

useSeoMeta({
  title: "Store Preview",
  robots: "noindex, nofollow",
});
</script>