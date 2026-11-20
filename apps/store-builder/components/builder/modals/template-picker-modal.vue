<template>
  <Teleport to="body">
    <div
      v-if="templatePickerOpen"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-picker-title"
      @keydown.esc="templatePickerOpen = false"
    >
      <div
        class="absolute inset-0 bg-black/65 backdrop-blur-sm"
        @click="templatePickerOpen = false"
      />
      <div
        class="relative flex max-h-[88vh] w-full max-w-3xl flex-col rounded-2xl border border-border-subtle bg-bg-primary shadow-2xl"
      >
        <header class="shrink-0 border-b border-border-subtle p-5">
          <h2
            id="template-picker-title"
            class="text-lg font-bold tracking-wide text-tx-primary"
          >
            Page designs
          </h2>
          <p class="mt-1.5 text-sm text-tx-secondary">
            Pick a ready-made layout for
            <strong class="text-tx-primary">{{ store.currentPage?.title }}</strong>.
            It replaces the current sections — you can undo afterwards.
          </p>

          <div class="mt-4 flex flex-wrap gap-1.5">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              class="rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors"
              :class="
                activeTab === tab.id
                  ? 'border-brand bg-brand/15 text-brand'
                  : 'border-border-subtle text-tx-secondary hover:text-tx-primary'
              "
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
              <span class="ms-1 font-mono text-[10px] opacity-70">{{ tab.count }}</span>
            </button>
          </div>
        </header>

        <div class="min-h-0 flex-1 overflow-y-auto p-5">
          <section v-for="group in groups" :key="group.type" class="mb-6 last:mb-0">
            <h3 class="mb-2.5 text-[10px] font-black tracking-[0.2em] text-tx-muted">
              {{ group.label }}
            </h3>
            <div class="grid gap-2.5 sm:grid-cols-2">
              <button
                v-for="tpl in group.items"
                :key="tpl.id"
                type="button"
                class="flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-elevated/40 p-3 text-start transition-colors hover:border-brand/40 hover:bg-bg-elevated"
                @click="apply(tpl.id)"
              >
                <template-thumb :types="tpl.sections.map((s) => s.type)" />
                <span class="min-w-0 flex-1">
                  <span class="flex items-center gap-1.5 text-[13px] font-semibold text-tx-primary">
                    <Icon :name="tpl.icon" class="shrink-0 text-tx-muted" />
                    <span class="truncate">{{ tpl.name }}</span>
                  </span>
                  <span class="mt-1 block text-[11px] leading-snug text-tx-muted">{{
                    tpl.description
                  }}</span>
                  <span class="mt-1.5 block font-mono text-[10px] text-tx-muted">
                    {{ tpl.sections.length }} blocks
                  </span>
                </span>
              </button>
            </div>
          </section>

          <p v-if="!groups.length" class="py-10 text-center text-sm text-tx-muted">
            No designs in this group.
          </p>
        </div>

        <footer class="shrink-0 border-t border-border-subtle p-4">
          <LazyVButton
            variant="none"
            type="button"
            className="w-full rounded-lg border border-border-subtle py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated"
            @click="templatePickerOpen = false"
          >
            Close
          </LazyVButton>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { PAGE_TEMPLATES, buildTemplateSections } from "@/data/page-templates";
import type { StorePageType } from "@/types/sections";

const store = useBuilderStore();
const { templatePickerOpen } = useBuilderModals();

const TYPE_LABELS: Record<string, string> = {
  home: "Home page",
  product: "Product page",
  category: "Collection page",
  cart: "Cart page",
  search: "Search page",
  track: "Order tracking",
  page: "Content pages",
};

const forThisPage = computed(() =>
  PAGE_TEMPLATES.filter(
    (t) => t.id !== "blank" && t.pageType === store.currentPage?.type,
  ),
);

const activeTab = ref<string>("all");

const tabs = computed(() => [
  ...(forThisPage.value.length
    ? [{ id: "this", label: "For this page", count: forThisPage.value.length }]
    : []),
  { id: "all", label: "All designs", count: PAGE_TEMPLATES.length },
]);

watch(templatePickerOpen, (open) => {
  if (open) activeTab.value = forThisPage.value.length ? "this" : "all";
});

const groups = computed(() => {
  const list = activeTab.value === "this" ? forThisPage.value : PAGE_TEMPLATES;
  const map = new Map<StorePageType, typeof PAGE_TEMPLATES>();
  for (const t of list) {
    if (!map.has(t.pageType)) map.set(t.pageType, []);
    map.get(t.pageType)!.push(t);
  }
  const current = store.currentPage?.type;
  return [...map.entries()]
    .sort(([a], [b]) => Number(b === current) - Number(a === current))
    .map(([type, items]) => ({
      type,
      label: TYPE_LABELS[type] ?? type,
      items,
    }));
});

const apply = (id: string) => {
  const page = store.currentPage;
  if (!page) return;
  store.setSections(buildTemplateSections(id, page.id, page.store_id));
  templatePickerOpen.value = false;
};
</script>
