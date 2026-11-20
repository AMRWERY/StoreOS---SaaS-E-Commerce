<template>
  <Teleport to="body">
    <div
      v-if="addSectionOpen"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-section-title"
      @keydown.esc="addSectionOpen = false"
    >
      <div
        class="absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-hidden="true"
        @click="addSectionOpen = false"
      />
      <div
        class="relative flex h-[min(90vh,820px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-base shadow-2xl"
      >
        <header
          class="flex shrink-0 items-start justify-between gap-4 border-b border-border-subtle p-5"
        >
          <div class="min-w-0">
            <h2
              id="add-section-title"
              class="text-lg font-bold tracking-wide text-tx-primary"
            >
              Add section
            </h2>
            <p class="mt-1 text-sm text-tx-secondary">
              {{ SECTION_DEFINITIONS.length }} blocks.
              {{
                afterLabel
                  ? `Inserted after “${afterLabel}”.`
                  : "Added to the end of the page."
              }}
            </p>
          </div>
          <LazyVButton
            variant="none"
            type="button"
            className="rounded-lg border border-border-subtle p-2 text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary"
            @click="addSectionOpen = false"
          >
            <Icon name="ph:x-bold" class="text-xl" />
          </LazyVButton>
        </header>

        <div class="shrink-0 border-b border-border-subtle p-4">
          <div class="relative">
            <Icon
              name="ph:magnifying-glass-bold"
              class="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-tx-muted"
            />
            <input
              v-model="query"
              type="search"
              placeholder="Search blocks (e.g. product, faq, countdown)…"
              class="w-full rounded-lg border border-border-subtle bg-bg-primary py-2.5 ps-9 pe-3 text-sm text-tx-primary outline-none placeholder:text-tx-muted focus:border-brand"
            />
          </div>
        </div>

        <div class="flex min-h-0 flex-1">
          <nav
            class="hidden w-52 shrink-0 space-y-0.5 overflow-y-auto border-e border-border-subtle p-3 sm:block"
            aria-label="Block categories"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              class="flex w-full items-center justify-between rounded-md px-3 py-2 text-start text-[12px] font-medium transition-colors"
              :class="
                activeTab === tab.id
                  ? 'bg-bg-elevated text-brand'
                  : 'text-tx-secondary hover:bg-bg-elevated/50'
              "
              @click="activeTab = tab.id"
            >
              <span class="truncate">{{ tab.label }}</span>
              <span class="font-mono text-[10px] text-tx-muted">{{
                tab.count
              }}</span>
            </button>
          </nav>

          <div class="min-w-0 flex-1 overflow-y-auto p-5">
            <div v-if="!visible.length" class="py-16 text-center">
              <Icon
                name="ph:magnifying-glass-bold"
                class="text-3xl text-tx-muted"
              />
              <p class="mt-3 text-sm text-tx-secondary">
                No blocks match “{{ query }}”.
              </p>
            </div>

            <section
              v-for="group in visible"
              :key="group.category"
              class="mb-8 last:mb-0"
            >
              <h3
                class="mb-3 text-[10px] font-black tracking-[0.2em] text-tx-muted"
              >
                {{ group.label }}
              </h3>
              <div
                class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                <button
                  v-for="item in group.items"
                  :key="item.type"
                  type="button"
                  class="group relative flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-elevated/40 p-3.5 text-start transition-all hover:border-brand/40 hover:bg-bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                  @click="add(item.type)"
                >
                  <span
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-bg-overlay text-tx-secondary transition-colors group-hover:bg-brand/15 group-hover:text-brand"
                  >
                    <Icon :name="item.icon" class="text-lg" />
                  </span>
                  <span class="min-w-0">
                    <span
                      class="flex items-center gap-2 text-[12px] font-bold text-tx-primary"
                    >
                      {{ item.name }}
                      <span
                        v-if="item.popular"
                        class="rounded-md bg-[#f97316] px-1.5 py-0.5 text-[8px] font-black tracking-wider text-white"
                        >Popular</span
                      >
                    </span>
                    <span
                      class="mt-0.5 block text-[11px] leading-snug text-tx-secondary"
                      >{{ item.description }}</span
                    >
                  </span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  SECTION_DEFINITIONS,
  createSectionSettings,
  definitionsByCategory,
} from "@/data/section-registry";
import type { PageSection, SectionType } from "@/types/sections";
import { SECTION_CATEGORY_LABELS, SECTION_TYPE_LABELS } from "@/types/sections";

const store = useBuilderStore();
const { addSectionOpen } = useBuilderModals();

const query = ref("");
const activeTab = ref<string>("all");

// Blocks meant for other page types (e.g. cart on a product page) stay available,
// but the ones built for this page type sort first in "Recommended".
const allGroups = computed(() => definitionsByCategory());

const recommended = computed(() => {
  const type = store.currentPage?.type;
  if (!type) return [];
  return SECTION_DEFINITIONS.filter((d) => d.pages?.includes(type));
});

const tabs = computed(() => [
  ...(recommended.value.length
    ? [
        {
          id: "recommended",
          label: "Recommended for this page",
          count: recommended.value.length,
        },
      ]
    : []),
  { id: "all", label: "All blocks", count: SECTION_DEFINITIONS.length },
  ...allGroups.value.map((g) => ({
    id: g.category,
    label: SECTION_CATEGORY_LABELS[g.category],
    count: g.items.length,
  })),
]);

watch(addSectionOpen, (open) => {
  if (!open) return;
  query.value = "";
  activeTab.value = recommended.value.length ? "recommended" : "all";
});

const visible = computed(() => {
  const q = query.value.trim().toLowerCase();
  const matches = (name: string, description: string) =>
    !q || `${name} ${description}`.toLowerCase().includes(q);

  if (!q && activeTab.value === "recommended") {
    return [
      {
        category: "recommended",
        label: "Recommended for this page",
        items: recommended.value,
      },
    ];
  }

  return allGroups.value
    .filter((g) => q || activeTab.value === "all" || g.category === activeTab.value)
    .map((g) => ({
      category: g.category as string,
      label: SECTION_CATEGORY_LABELS[g.category],
      items: g.items.filter((i) => matches(i.name, i.description)),
    }))
    .filter((g) => g.items.length);
});

const afterLabel = computed(() => {
  const s = store.selectedSection;
  return s ? SECTION_TYPE_LABELS[s.type] : "";
});

const add = (type: SectionType) => {
  const page = store.currentPage;
  if (!page) return;
  const section: PageSection = {
    id: `sec_${crypto.randomUUID().slice(0, 8)}`,
    page_id: page.id,
    store_id: page.store_id,
    type,
    settings: createSectionSettings(type),
    sort_order: store.sections.length,
    is_hidden: false,
  };
  store.insertSection(section, store.selectedId);
  addSectionOpen.value = false;
};
</script>
