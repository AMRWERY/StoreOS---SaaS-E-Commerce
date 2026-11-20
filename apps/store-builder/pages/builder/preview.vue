<template>
  <div
    v-bind="siteRootAttrs"
    class="sb-site min-h-screen font-sans antialiased"
    :dir="store.direction"
    :lang="store.contentLocale"
  >
    <!-- Preview bar -->
    <div
      class="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-neutral-200 bg-white px-4 py-2.5 shadow-sm sm:px-6 print:hidden"
    >
      <div class="flex min-w-0 items-center gap-3">
        <div class="flex size-6 shrink-0 items-center justify-center rounded bg-indigo-600 text-white">
          <Icon name="ph:storefront-bold" class="text-xs" />
        </div>
        <span class="truncate text-sm font-bold text-neutral-900">{{ store.displayName }}</span>
        <span class="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black tracking-widest text-emerald-700">
          LIVE PREVIEW
        </span>
      </div>

      <div class="flex flex-wrap items-center gap-2 sm:gap-3">
        <label v-if="hasState" class="flex items-center gap-1.5 text-xs text-neutral-500">
          <Icon name="ph:file-text-bold" />
          <span class="sr-only">Page</span>
          <select
            :value="currentSlug"
            class="max-w-[160px] rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-semibold text-neutral-700 outline-none"
            @change="go(($event.target as HTMLSelectElement).value)"
          >
            <option v-for="p in store.pages" :key="p.id" :value="p.slug">
              {{ store.pageText(p, "title") || p.title }}
            </option>
          </select>
        </label>

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
            {{ code === "ar" ? "العربية" : "English" }}
          </button>
        </div>

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

    <!-- Loading -->
    <div v-if="loading" class="flex min-h-[60vh] items-center justify-center">
      <Icon name="ph:spinner-gap-bold" class="animate-spin text-3xl text-neutral-300" />
    </div>

    <!-- Nothing saved yet -->
    <div
      v-else-if="!hasState"
      class="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center"
    >
      <div class="flex size-20 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
        <Icon name="ph:paint-brush-bold" class="text-3xl text-neutral-300" />
      </div>
      <h2 class="text-xl font-bold text-neutral-800">Nothing to preview yet</h2>
      <p class="max-w-sm text-sm text-neutral-500">
        Go back to the builder and use “Preview store” or “Publish” to see your whole store here.
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

    <!-- Maintenance mode: what visitors would see -->
    <div
      v-else-if="store.siteSettings.maintenance && !bypassMaintenance"
      class="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-8 text-center"
    >
      <div class="flex size-20 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
        <Icon name="ph:wrench-bold" class="text-3xl text-neutral-400" />
      </div>
      <h2 class="text-2xl font-bold text-neutral-900">{{ store.displayName }}</h2>
      <p class="max-w-md text-sm text-neutral-500">{{ store.localMaintenanceMessage }}</p>
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

    <!-- The store (links, buttons and the cart work across pages) -->
    <div v-else @click="onSiteClick">
      <!-- Checkout flow screens bring their own header -->
      <checkout-preview v-if="page?.type === 'checkout'" />
      <order-summary-preview v-else-if="page?.type === 'order_confirmed'" />

      <template v-else>
        <navbar-preview readonly />

        <main v-if="page">
          <lazy-section-render
            v-for="section in visibleSections"
            :key="section.id"
            :section="section"
          />
          <div
            v-if="!visibleSections.length"
            class="flex min-h-[40vh] items-center justify-center p-8 text-sm text-neutral-400"
          >
            This page has no content yet.
          </div>
        </main>

        <!-- Unknown link target -->
        <main v-else class="flex min-h-[50vh] flex-col items-center justify-center gap-3 p-8 text-center">
          <p class="font-mono text-5xl font-black text-neutral-300">404</p>
          <h2 class="text-xl font-bold text-neutral-900">Page not found</h2>
          <p class="max-w-sm text-sm text-neutral-500">
            This link points to a page that does not exist in your store yet. Create it in the builder or fix the link.
          </p>
          <a href="/" class="mt-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">
            Back to home
          </a>
        </main>

        <footer-preview readonly />
      </template>
    </div>

    <cookie-consent-banner
      :visible="showBanner"
      :locale="store.contentLocale"
      @accept="setConsent('granted')"
      @decline="setConsent('denied')"
    />
  </div>
</template>

<script lang="ts" setup>
const store = useBuilderStore();
const { siteRootAttrs } = useSiteStyle();
const localePath = useLocalePath();
const { slug: currentSlug, page, navigate, go } = useSitePreview();
const { showBanner, setConsent } = useTracking();

const loading = ref(true);
const hasState = ref(false);
const bypassMaintenance = ref(false);

onMounted(async () => {
  // Same tab as the builder: the store is already populated. New tab: load the saved copy.
  if (store.pages.length > 0) hasState.value = true;
  else hasState.value = await store.hydrateFromStorage();
  // Open the page the merchant was on (?page=slug), falling back to the home page.
  if (hasState.value && !store.pages.some((p) => p.slug === currentSlug.value) && currentSlug.value !== "__404__") {
    go(store.pages.find((p) => p.type === "home")?.slug ?? store.pages[0]!.slug);
  }
  loading.value = false;
});

const visibleSections = computed(() =>
  page.value ? store.sectionsFor(page.value.id).filter((s) => !s.is_hidden) : [],
);

/** Internal links, [data-href] buttons and #anchors navigate inside the preview. */
const onSiteClick = (e: MouseEvent) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>("a[href],[data-href]");
  if (!el) return;
  const href = el.getAttribute("data-href") ?? el.getAttribute("href");
  if (!href || /^(mailto:|tel:)/i.test(href)) return;
  e.preventDefault();
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  } else if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) {
    window.open(href, "_blank", "noopener");
  } else {
    navigate(href);
  }
};

const goBackToBuilder = () => {
  const target = currentSlug.value === "__404__" ? "home" : currentSlug.value;
  window.location.href = localePath(`/builder/${target}`);
};

definePageMeta({ layout: false });

const pageTitle = computed(() => {
  const p = page.value;
  if (!p) return store.displayName;
  return store.pageText(p, "seo_title") || `${store.pageText(p, "title") || p.title} · ${store.displayName}`;
});

useSeoMeta({
  title: () => pageTitle.value,
  description: () => (page.value ? store.pageText(page.value, "seo_desc") : ""),
  robots: "noindex, nofollow",
});

useHead({
  htmlAttrs: { lang: () => store.contentLocale, dir: () => store.direction },
  link: () =>
    store.siteSettings.faviconUrl
      ? [{ rel: "icon", href: store.siteSettings.faviconUrl }]
      : [],
});
</script>
