<template>
  <div>
    <p class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted">
      Blocks
    </p>
    <p class="mb-2 px-2 text-[10px] leading-snug text-tx-muted">
      Drag a block onto the page, or click to add it.
    </p>

    <div class="relative mb-3 px-1">
      <Icon
        name="ph:magnifying-glass-bold"
        class="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-xs text-tx-muted"
      />
      <input
        v-model="query"
        type="search"
        placeholder="Search blocks…"
        class="w-full rounded-md border border-border-subtle bg-bg-primary py-1.5 ps-8 pe-2 text-[11px] text-tx-primary outline-none placeholder:text-tx-muted focus:border-brand"
      />
    </div>

    <p
      v-if="!visibleGroups.length"
      class="px-2 py-4 text-center text-[11px] text-tx-muted"
    >
      No blocks match “{{ query }}”.
    </p>

    <section v-for="group in visibleGroups" :key="group.category" class="mb-3">
      <button
        type="button"
        class="flex w-full items-center justify-between px-2 py-1 text-start text-[10px] font-bold tracking-wider text-tx-secondary hover:text-tx-primary"
        @click="toggle(group.category)"
      >
        {{ SECTION_CATEGORY_LABELS[group.category] }}
        <Icon
          name="ph:caret-down-bold"
          class="text-[10px] transition-transform"
          :class="isOpen(group.category) ? '' : '-rotate-90 rtl:rotate-90'"
        />
      </button>

      <VueDraggable
        v-if="isOpen(group.category)"
        v-model="group.items"
        :group="{ name: 'sections', pull: 'clone', put: false }"
        :sort="false"
        :animation="150"
        :clone="cloneBlock"
        class="mt-1 grid grid-cols-2 gap-1.5"
        ghost-class="sb-ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <button
          v-for="item in group.items"
          :key="item.id"
          type="button"
          class="flex cursor-grab flex-col items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-elevated/40 px-1.5 py-2.5 text-center transition-colors hover:border-brand/40 hover:bg-bg-elevated active:cursor-grabbing"
          :title="definitionOf(item.type)?.description"
          @click="addByClick(item.type)"
        >
          <Icon
            :name="definitionOf(item.type)?.icon ?? 'ph:squares-four-bold'"
            class="text-lg text-tx-secondary"
          />
          <span class="line-clamp-2 text-[10px] font-medium leading-tight text-tx-primary">
            {{ definitionOf(item.type)?.name ?? item.type }}
          </span>
        </button>
      </VueDraggable>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { VueDraggable } from "vue-draggable-plus";
import {
  createSectionSettings,
  definitionsByCategory,
  getSectionDefinition,
} from "@/data/section-registry";
import type { PageSection, SectionCategory, SectionType } from "@/types/sections";
import { SECTION_CATEGORY_LABELS } from "@/types/sections";

const store = useBuilderStore();

const query = ref("");
const dragging = ref(false);
const closed = ref<Set<SectionCategory>>(new Set());

const definitionOf = (type: SectionType) => getSectionDefinition(type);

/** Library items are lightweight placeholder sections; `cloneBlock` turns one into a real section on drag. */
const makeItem = (type: SectionType): PageSection => ({
  id: `tpl_${type}`,
  page_id: "",
  store_id: "",
  type,
  settings: {},
  sort_order: 0,
  is_hidden: false,
});

const allGroups = definitionsByCategory().map((g) => ({
  category: g.category,
  items: g.items.map((d) => makeItem(d.type)),
}));

const visibleGroups = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return allGroups;
  return allGroups
    .map((g) => ({
      category: g.category,
      items: g.items.filter((i) => {
        const d = definitionOf(i.type);
        return `${d?.name} ${d?.description}`.toLowerCase().includes(q);
      }),
    }))
    .filter((g) => g.items.length);
});

const isOpen = (c: SectionCategory) => !!query.value || !closed.value.has(c);
const toggle = (c: SectionCategory) => {
  const next = new Set(closed.value);
  if (next.has(c)) next.delete(c);
  else next.add(c);
  closed.value = next;
};

const cloneBlock = (item: PageSection): PageSection => {
  const page = store.currentPage;
  return {
    id: `sec_${crypto.randomUUID().slice(0, 8)}`,
    page_id: page?.id ?? "",
    store_id: page?.store_id ?? "",
    type: item.type,
    settings: createSectionSettings(item.type),
    sort_order: 0,
    is_hidden: false,
  };
};

const addByClick = (type: SectionType) => {
  if (dragging.value) return;
  const section = cloneBlock(makeItem(type));
  store.insertSection(section, store.selectedId);
};
</script>
