<template>
  <div class="px-4 py-10 sm:px-8 sm:py-14">
    <h2
      v-if="bool('show_title', true) && heading"
      class="mb-8 text-center text-xl font-bold text-neutral-900"
    >
      {{ heading }}
    </h2>

    <!-- Cards -->
    <div v-if="variant === 'cards'" class="grid gap-4 sm:gap-6" :class="COLS[cols]">
      <figure
        v-for="(item, i) in items"
        :key="i"
        class="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 text-start shadow-sm"
      >
        <div class="mb-3 flex text-amber-400">
          <Icon v-for="s in item.rating" :key="s" name="ph:star-fill" class="text-sm" />
        </div>
        <blockquote class="flex-1 text-sm leading-relaxed text-neutral-600">
          "{{ item.text }}"
        </blockquote>
        <figcaption class="mt-4 flex items-center gap-3">
          <img
            v-if="item.avatar"
            :src="item.avatar"
            :alt="item.name"
            class="size-8 rounded-full object-cover"
            loading="lazy"
          />
          <span>
            <span class="block text-xs font-semibold text-neutral-800">{{ item.name }}</span>
            <span v-if="item.role" class="block text-[11px] text-neutral-400">{{ item.role }}</span>
          </span>
        </figcaption>
      </figure>
    </div>

    <!-- Slider / Single: one large quote at a time -->
    <div
      v-else
      class="mx-auto max-w-2xl text-center"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <figure v-if="current">
        <div class="mb-4 flex justify-center text-amber-400">
          <Icon v-for="s in current.rating" :key="s" name="ph:star-fill" class="text-base" />
        </div>
        <blockquote class="text-lg font-medium leading-relaxed text-neutral-900 sm:text-xl">
          "{{ current.text }}"
        </blockquote>
        <figcaption class="mt-6 flex items-center justify-center gap-3">
          <img
            v-if="current.avatar"
            :src="current.avatar"
            :alt="current.name"
            class="size-10 rounded-full object-cover"
            loading="lazy"
          />
          <span class="text-start">
            <span class="block text-sm font-semibold text-neutral-800">{{ current.name }}</span>
            <span v-if="current.role" class="block text-xs text-neutral-400">{{ current.role }}</span>
          </span>
        </figcaption>
      </figure>

      <div v-if="variant === 'slider' && items.length > 1" class="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous"
          class="rounded-full border border-neutral-300 p-1.5 text-neutral-700"
          @click="go(-1)"
        >
          <Icon name="ph:arrow-left-bold" class="text-xs icon-nudge-start" />
        </button>
        <div class="flex gap-1.5">
          <button
            v-for="(_, i) in items"
            :key="i"
            type="button"
            :aria-label="`Go to testimonial ${i + 1}`"
            class="size-2 rounded-full"
            :class="i === index ? 'bg-indigo-600' : 'bg-neutral-300'"
            @click="index = i"
          />
        </div>
        <button
          type="button"
          aria-label="Next"
          class="rounded-full border border-neutral-300 p-1.5 text-neutral-700"
          @click="go(1)"
        >
          <Icon name="ph:arrow-right-bold" class="text-xs icon-nudge-end" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

interface Item {
  text: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

const FALLBACK_ITEMS: Item[] = [
  { text: "Great product, highly recommended to everyone who values quality!", name: "Happy Customer 1", role: "", avatar: "", rating: 5 },
  { text: "Fast shipping and exactly as described. Will definitely order again.", name: "Happy Customer 2", role: "", avatar: "", rating: 5 },
  { text: "Exceeded my expectations. The quality is outstanding for the price.", name: "Happy Customer 3", role: "", avatar: "", rating: 5 },
];

const variant = computed(() => str("variant", "cards"));
const heading = computed(() => str("heading", str("title", "What our customers say")));
const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
};
const cols = computed(() => Math.min(3, Math.max(1, Math.round(num("columns", 3)))));

const items = computed<Item[]>(() => {
  const mapped = list<any>("items")
    .map((r): Item | null => {
      const text = String(r?.text ?? r?.quote ?? "");
      if (!text) return null;
      return {
        text,
        name: String(r?.name ?? r?.author ?? ""),
        role: String(r?.role ?? ""),
        avatar: String(r?.avatar ?? r?.image ?? ""),
        rating: Math.min(5, Math.max(0, Math.round(Number(r?.rating ?? 5)))) || 5,
      };
    })
    .filter((x): x is Item => !!x);

  const out = mapped.length ? mapped : [...FALLBACK_ITEMS];
  // Featured quote from the form goes first.
  const quote = str("quote");
  if (quote) out.unshift({ text: quote, name: str("author"), role: str("role"), avatar: "", rating: 5 });
  return out;
});

// Slider state
const index = ref(0);
const paused = ref(false);
const current = computed(() => {
  if (variant.value === "single") return items.value[0];
  return items.value[index.value % items.value.length];
});

function go(d: 1 | -1) {
  const n = items.value.length;
  index.value = (index.value + d + n) % n;
}

let timer: ReturnType<typeof setInterval> | undefined;
function stop() {
  if (timer) clearInterval(timer);
  timer = undefined;
}
function start() {
  stop();
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  if (variant.value !== "slider" || !bool("autoplay", true) || items.value.length < 2) return;
  timer = setInterval(() => {
    if (!paused.value) go(1);
  }, Math.max(2, num("interval", 6)) * 1000);
}

onMounted(start);
watch([variant, () => items.value.length], start);
onBeforeUnmount(stop);
</script>
