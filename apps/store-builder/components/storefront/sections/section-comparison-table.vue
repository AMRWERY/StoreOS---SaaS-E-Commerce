<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-4xl">
      <div class="text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
      </div>

      <!-- Table -->
      <div
        v-if="variant === 'table'"
        class="mt-10 overflow-x-auto rounded-2xl border border-neutral-200 bg-white"
      >
        <table class="w-full min-w-[32rem] border-collapse text-sm">
          <thead>
            <tr>
              <th class="sticky start-0 z-10 bg-white p-4" />
              <th
                v-for="(col, ci) in columns"
                :key="ci"
                class="p-4 text-center font-bold text-neutral-900"
                :class="ci + 1 === highlight ? 'bg-indigo-50 text-indigo-700' : ''"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, ri) in rows" :key="ri" class="border-t border-neutral-200">
              <th class="sticky start-0 z-10 bg-white p-4 text-start font-medium text-neutral-700">
                {{ row.label }}
              </th>
              <td
                v-for="(cell, ci) in row.cells"
                :key="ci"
                class="p-4 text-center text-neutral-700"
                :class="ci + 1 === highlight ? 'bg-indigo-50/60' : ''"
              >
                <Icon v-if="cell.kind !== 'text'" :name="ICONS[cell.kind].name" class="text-lg" :class="ICONS[cell.kind].cls" />
                <span v-else>{{ cell.text }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- One card per column -->
      <div
        v-else-if="variant === 'cards'"
        class="mt-10 grid gap-5"
        :class="columns.length === 2 ? 'sm:grid-cols-2' : columns.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'"
      >
        <div
          v-for="(col, ci) in columns"
          :key="ci"
          class="rounded-2xl border bg-white p-6"
          :class="ci + 1 === highlight ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-neutral-200'"
        >
          <h3 class="text-base font-bold text-neutral-900">{{ col }}</h3>
          <ul class="mt-4 space-y-3 text-sm">
            <li v-for="(row, ri) in rows" :key="ri" class="flex items-center justify-between gap-3">
              <span class="text-neutral-500">{{ row.label }}</span>
              <Icon v-if="row.cells[ci]?.kind !== 'text'" :name="ICONS[row.cells[ci]?.kind ?? 'no'].name" class="text-lg" :class="ICONS[row.cells[ci]?.kind ?? 'no'].cls" />
              <span v-else class="font-medium text-neutral-900">{{ row.cells[ci]?.text }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- One card per feature -->
      <div v-else class="mt-10 space-y-3">
        <div
          v-for="(row, ri) in rows"
          :key="ri"
          class="rounded-2xl border border-neutral-200 bg-white p-4"
        >
          <div class="text-sm font-bold text-neutral-900">{{ row.label }}</div>
          <div class="mt-3 grid gap-2" :style="{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }">
            <div
              v-for="(cell, ci) in row.cells"
              :key="ci"
              class="rounded-xl bg-neutral-50 px-3 py-2 text-center"
              :class="ci + 1 === highlight ? 'bg-indigo-50' : ''"
            >
              <div class="text-[11px] text-neutral-400">{{ columns[ci] }}</div>
              <Icon v-if="cell.kind !== 'text'" :name="ICONS[cell.kind].name" class="mt-0.5 text-lg" :class="ICONS[cell.kind].cls" />
              <div v-else class="mt-0.5 text-sm font-medium text-neutral-900">{{ cell.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, list } = useSectionData(() => props.section);

type CellKind = "yes" | "no" | "text";
const ICONS: Record<"yes" | "no", { name: string; cls: string }> = {
  yes: { name: "ph:check-circle-bold", cls: "text-emerald-600" },
  no: { name: "ph:x-circle-bold", cls: "text-neutral-300" },
};

const variant = computed(() => str("variant", "table"));
const columns = computed(() =>
  str("columns")
    .split("\n")
    .map((c) => c.trim())
    .filter(Boolean)
    .slice(0, 4),
);
const highlight = computed(() => num("highlight", 0));

const rows = computed(() =>
  list("rows").map((row) => {
    const parts = String(row.values ?? "")
      .split(",")
      .map((v: string) => v.trim());
    return {
      label: String(row.label ?? ""),
      cells: columns.value.map((_, i) => {
        const text = parts[i] ?? "";
        const low = text.toLowerCase();
        const kind: CellKind = low === "yes" ? "yes" : low === "no" ? "no" : "text";
        return { text, kind };
      }),
    };
  }),
);
</script>
