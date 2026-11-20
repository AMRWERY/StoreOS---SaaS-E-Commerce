<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-5xl">
      <h2 v-if="str('heading')" class="mb-8 text-center text-2xl font-bold text-neutral-900">
        {{ str("heading") }}
      </h2>

      <div :class="wrapClass">
        <!-- Details card -->
        <div :class="cardClass">
          <ul class="space-y-3 text-sm text-neutral-700">
            <li v-if="str('address')" class="flex items-start gap-3">
              <Icon name="ph:map-pin-bold" class="mt-0.5 shrink-0 text-lg text-indigo-600" />
              <span>{{ str("address") }}</span>
            </li>
            <li v-if="str('phone')" class="flex items-center gap-3">
              <Icon name="ph:phone-bold" class="shrink-0 text-lg text-indigo-600" />
              <span dir="ltr">{{ str("phone") }}</span>
            </li>
            <li v-if="str('email')" class="flex items-center gap-3">
              <Icon name="ph:envelope-simple-bold" class="shrink-0 text-lg text-indigo-600" />
              <span>{{ str("email") }}</span>
            </li>
          </ul>

          <dl v-if="hours.length" class="mt-5 divide-y divide-neutral-200 border-t border-neutral-200 text-sm">
            <div v-for="(h, i) in hours" :key="i" class="flex justify-between gap-4 py-2">
              <dt class="text-neutral-500">{{ h.day }}</dt>
              <dd class="font-medium text-neutral-900">{{ h.hours }}</dd>
            </div>
          </dl>

          <a
            v-if="str('directions_label') && str('address')"
            :href="directionsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Icon name="ph:navigation-arrow-bold" />
            {{ str("directions_label") }}
          </a>
        </div>

        <!-- Map -->
        <div :class="mapClass">
          <iframe
            v-if="embedUrl"
            :src="embedUrl"
            title="Map"
            class="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <div v-else class="absolute inset-0">
            <div
              class="absolute inset-0 opacity-60"
              style="background-image: linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px); background-size: 32px 32px"
            />
            <div class="absolute inset-0 flex flex-col items-center justify-center text-indigo-600">
              <Icon name="ph:map-pin-fill" class="text-5xl" />
              <span v-if="variant !== 'overlay'" class="mt-2 text-xs font-medium text-neutral-500">{{ str("address") }}</span>
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

const variant = computed(() => str("variant", "split"));
const mapFirst = computed(() => str("map_side", "end") === "start");
const hours = computed(() => list("hours"));
const embedUrl = computed(() => {
  const url = str("map_embed_url").trim();
  return url.startsWith("https://") ? url : "";
});
const directionsUrl = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(str("address"))}`,
);

const wrapClass = computed(() => {
  if (variant.value === "stacked") return "flex flex-col gap-6";
  if (variant.value === "overlay") return "relative min-h-[30rem] overflow-hidden rounded-2xl border border-neutral-200";
  return "grid gap-6 md:grid-cols-2";
});

const cardClass = computed(() => {
  const base = "rounded-2xl border border-neutral-200 bg-white p-6";
  if (variant.value === "overlay")
    return `${base} relative z-10 m-4 shadow-lg md:absolute md:top-6 md:w-80 ${mapFirst.value ? "md:end-6" : "md:start-6"}`;
  if (variant.value === "stacked") return `${base} order-2`;
  return `${base} ${mapFirst.value ? "md:order-2" : ""}`;
});

const mapClass = computed(() => {
  const base = "relative overflow-hidden bg-neutral-100";
  if (variant.value === "overlay") return `${base} absolute inset-0`;
  if (variant.value === "stacked") return `${base} order-1 min-h-72 rounded-2xl border border-neutral-200`;
  return `${base} min-h-64 rounded-2xl border border-neutral-200 ${mapFirst.value ? "md:order-1" : ""}`;
});
</script>
