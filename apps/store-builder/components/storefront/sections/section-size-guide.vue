<template>
  <div class="px-8 py-14">
    <div class="mx-auto" :class="variant === 'split' ? 'max-w-5xl' : 'max-w-3xl'">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">{{ str("heading") }}</h2>
          <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">{{ str("subheading") }}</p>
        </div>
        <div class="inline-flex rounded-xl border border-neutral-200 p-1">
          <button
            v-for="u in ['cm', 'in']"
            :key="u"
            type="button"
            class="rounded-lg px-3 py-1 text-xs font-semibold"
            :class="unit === u ? 'bg-indigo-600 text-white' : 'text-neutral-500 hover:text-neutral-900'"
            @click="unit = u as 'cm' | 'in'"
          >
            {{ u }}
          </button>
        </div>
      </div>

      <div :class="variant === 'split' ? 'mt-6 grid gap-8 lg:grid-cols-5' : ''">
        <!-- size data -->
        <div v-if="variant === 'cards'" class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div v-for="(r, i) in list('rows')" :key="i" class="rounded-2xl border border-neutral-200 bg-white p-4 text-center">
            <p class="text-2xl font-bold text-indigo-600">{{ r.size }}</p>
            <dl class="mt-3 space-y-1.5 text-xs">
              <div v-for="m in measures" :key="m.key" class="flex justify-between gap-2">
                <dt class="text-neutral-500">{{ m.label }}</dt>
                <dd class="font-semibold text-neutral-900">{{ conv(r[m.key]) }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          v-else
          class="overflow-x-auto rounded-2xl border border-neutral-200"
          :class="variant === 'split' ? 'lg:order-2 lg:col-span-3' : 'mt-6'"
        >
          <table class="w-full min-w-[320px] text-sm">
            <thead class="bg-neutral-50 text-xs text-neutral-500">
              <tr>
                <th v-for="c in cols" :key="c" class="px-4 py-3 text-start font-semibold">{{ c }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in list('rows')" :key="i" class="border-t border-neutral-200">
                <td class="px-4 py-3 font-bold text-neutral-900">{{ r.size }}</td>
                <td v-for="m in measures" :key="m.key" class="px-4 py-3 text-neutral-700">{{ conv(r[m.key]) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- how to measure -->
        <div v-if="list('steps').length" :class="variant === 'split' ? 'lg:order-1 lg:col-span-2' : 'mt-10'">
          <h3 v-if="str('measure_heading')" class="text-base font-bold text-neutral-900">{{ str("measure_heading") }}</h3>
          <div class="mt-4" :class="variant === 'split' ? 'space-y-3' : 'grid gap-4 sm:grid-cols-3'">
            <div
              v-for="(s, i) in list('steps')"
              :key="i"
              class="rounded-2xl border border-neutral-200 bg-white p-4"
              :class="variant === 'split' && 'flex gap-3'"
            >
              <div class="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon :name="s.icon || 'ph:ruler-bold'" class="text-lg" />
              </div>
              <div :class="variant !== 'split' && 'mt-3'">
                <p class="text-sm font-bold text-neutral-900">{{ s.title }}</p>
                <p class="mt-1 text-sm text-neutral-500">{{ s.text }}</p>
              </div>
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
const { str, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "table"));
const unit = ref<"cm" | "in">("cm");
const cols = computed(() => [str("col_size"), str("col_chest"), str("col_waist"), str("col_hip")]);
const measures = computed(() => [
  { key: "chest", label: str("col_chest") },
  { key: "waist", label: str("col_waist") },
  { key: "hip", label: str("col_hip") },
]);

const conv = (v: unknown) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return String(v ?? "");
  return unit.value === "cm" ? String(n) : (n / 2.54).toFixed(1);
}
</script>
