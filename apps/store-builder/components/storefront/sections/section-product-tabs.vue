<template>
  <div class="px-4 py-10 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <div
        v-if="!isAccordion"
        class="flex overflow-x-auto"
        :class="variant === 'pills' ? 'gap-2 rounded-full bg-neutral-100 p-1' : 'gap-1 border-b border-neutral-200'"
        role="tablist"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          role="tab"
          class="whitespace-nowrap text-sm font-semibold"
          :class="tabClass(tab.id)"
          :aria-selected="active === tab.id"
          @click="active = tab.id"
        >
          {{ tab.title }}
        </button>
      </div>

      <div :class="isAccordion ? 'space-y-3' : ''">
        <template v-for="tab in tabs" :key="tab.id">
          <div :class="isAccordion ? 'overflow-hidden rounded-2xl border border-neutral-200' : ''">
            <button
              v-if="isAccordion"
              type="button"
              class="flex w-full items-center justify-between px-5 py-4 text-start text-sm font-semibold text-neutral-900"
              :aria-expanded="active === tab.id"
              @click="active = active === tab.id ? '' : tab.id"
            >
              {{ tab.title }}
              <Icon :name="active === tab.id ? 'ph:minus-bold' : 'ph:plus-bold'" class="text-neutral-400" />
            </button>

            <div v-if="active === tab.id" class="text-start" :class="isAccordion ? 'px-5 pb-5' : 'py-6'" role="tabpanel">
              <p v-if="tab.id === 'description'" class="text-sm leading-relaxed text-neutral-500">
                {{ str("descriptionText") }}
              </p>
              <dl
                v-else-if="tab.id === 'specs'"
                class="divide-y divide-neutral-200 rounded-2xl border border-neutral-200"
              >
                <div v-for="(row, i) in list('specs')" :key="i" class="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                  <dt class="font-semibold text-neutral-900">{{ row.label }}</dt>
                  <dd class="text-neutral-500">{{ row.value }}</dd>
                </div>
                <p v-if="!list('specs').length" class="px-4 py-6 text-center text-sm text-neutral-400">-</p>
              </dl>
              <p v-else class="text-sm leading-relaxed text-neutral-500">{{ str("shippingText") }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "tabs"));
const isAccordion = computed(() => variant.value === "accordion");
const active = ref("description");
const tabs = computed(() => [
  { id: "description", title: str("descriptionTitle") },
  { id: "specs", title: str("specsTitle") },
  { id: "shipping", title: str("shippingTitle") },
]);

const tabClass = (id: string) => {
  const on = active.value === id;
  if (variant.value === "pills") {
    return [
      "flex-1 rounded-full px-4 py-2",
      on ? "bg-white text-indigo-600 shadow-sm" : "text-neutral-500",
    ];
  }
  return [
    "-mb-px border-b-2 px-4 py-3",
    on ? "border-indigo-600 text-indigo-600" : "border-transparent text-neutral-500",
  ];
}
</script>
