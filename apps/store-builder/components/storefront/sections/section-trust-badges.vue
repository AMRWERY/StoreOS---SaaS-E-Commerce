<template>
  <div class="border-t border-neutral-200 px-4 py-10 sm:px-8">
    <h3
      v-if="str('heading', 'Why shop with us')"
      class="mb-6 text-center text-xs font-bold tracking-widest text-neutral-400"
    >
      {{ str("heading", "Why shop with us") }}
    </h3>

    <!-- inline: single wrapping row of icon + text -->
    <ul
      v-if="variant === 'inline'"
      class="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
    >
      <li
        v-for="(badge, i) in badges"
        :key="i"
        class="flex items-center gap-2 text-sm font-semibold text-neutral-700"
      >
        <Icon
          v-if="showIcons"
          :name="badge.icon"
          class="text-xl text-indigo-600"
        />
        <span>{{ badge.label }}</span>
      </li>
    </ul>

    <!-- cards: bordered tiles with icon at the start -->
    <ul
      v-else-if="variant === 'cards'"
      class="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      <li
        v-for="(badge, i) in badges"
        :key="i"
        class="flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4"
      >
        <span
          v-if="showIcons"
          class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-50"
        >
          <Icon :name="badge.icon" class="text-xl text-indigo-600" />
        </span>
        <span class="min-w-0">
          <span class="block text-sm font-semibold text-neutral-900">{{
            badge.label
          }}</span>
          <span
            v-if="badge.desc"
            class="mt-0.5 block text-xs text-neutral-500"
            >{{ badge.desc }}</span
          >
        </span>
      </li>
    </ul>

    <!-- grid (default): centered columns -->
    <ul
      v-else
      class="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center lg:grid-cols-4"
    >
      <li
        v-for="(badge, i) in badges"
        :key="i"
        class="flex flex-col items-center gap-2"
      >
        <Icon
          v-if="showIcons"
          :name="badge.icon"
          class="text-3xl text-neutral-400"
        />
        <span class="text-xs font-semibold text-neutral-700">{{
          badge.label
        }}</span>
        <span v-if="badge.desc" class="text-[11px] text-neutral-400">{{
          badge.desc
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "grid"));
const showIcons = computed(() => bool("show_icons", true));

const FALLBACK = [
  { icon: "ph:truck-bold", label: "Free shipping", desc: "" },
  { icon: "ph:lock-bold", label: "Secure checkout", desc: "" },
  { icon: "ph:arrow-counter-clockwise-bold", label: "Easy returns", desc: "" },
  { icon: "ph:headset-bold", label: "24/7 support", desc: "" },
];

const ICON_MAP: Record<string, string> = {
  truck: "ph:truck-bold",
  shield: "ph:shield-check-bold",
  lock: "ph:lock-bold",
  "arrow-uturn-left": "ph:arrow-counter-clockwise-bold",
  chat: "ph:chat-circle-bold",
  headset: "ph:headset-bold",
};

const badges = computed(() => {
  const rows = list("items");
  if (!rows.length) return FALLBACK;
  return rows.map((b, i) => {
    const raw = String(b.icon ?? "");
    return {
      icon:
        ICON_MAP[raw] ||
        raw ||
        FALLBACK[i % FALLBACK.length]?.icon ||
        "ph:check-circle-bold",
      label: String(b.title ?? b.label ?? ""),
      desc: String(b.desc ?? b.description ?? ""),
    };
  });
});
</script>
