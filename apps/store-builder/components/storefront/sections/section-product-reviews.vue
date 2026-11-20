<template>
  <div class="px-4 py-10 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-2xl font-bold text-neutral-900">{{ str("heading") }}</h2>
        <button
          type="button"
          class="px-5 py-2.5 text-sm font-semibold"
          :class="variant === 'minimal' ? 'rounded-xl border border-neutral-900 text-neutral-900' : 'rounded-xl bg-indigo-600 text-white'"
          @click="formOpen = !formOpen"
        >
          {{ str("writeLabel") }}
        </button>
      </div>

      <div v-if="formOpen" class="mt-4 space-y-3 rounded-2xl border border-neutral-200 p-4">
        <div class="flex gap-1 text-xl text-amber-400">
          <button v-for="n in 5" :key="n" type="button" :aria-label="String(n)" @click="draftRating = n">
            <Icon :name="n <= draftRating ? 'ph:star-fill' : 'ph:star-bold'" />
          </button>
        </div>
        <input
          v-model="draftTitle"
          type="text"
          class="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900"
        />
        <textarea
          v-model="draftBody"
          rows="3"
          class="w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900"
        />
        <button
          type="button"
          class="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white"
          @click="submitDraft"
        >
          {{ str("writeLabel") }}
        </button>
      </div>

      <div v-if="reviews.length" class="mt-8" :class="ui.wrap">
        <div class="text-start" :class="ui.summary">
          <div>
            <div class="font-bold text-neutral-900" :class="variant === 'minimal' ? 'text-3xl' : 'text-5xl'">
              {{ average.toFixed(1) }}
            </div>
            <div class="mt-2 flex text-amber-400">
              <Icon v-for="n in 5" :key="n" :name="n <= Math.round(average) ? 'ph:star-fill' : 'ph:star-bold'" />
            </div>
            <p class="mt-1 text-sm text-neutral-500">{{ reviews.length }}</p>
          </div>

          <div v-if="bool('showDistribution') && variant !== 'minimal'" class="min-w-48 flex-1 space-y-2">
            <div v-for="row in distribution" :key="row.stars" class="flex items-center gap-2 text-xs text-neutral-500">
              <span class="w-3">{{ row.stars }}</span>
              <div class="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div class="h-full rounded-full bg-amber-400" :style="{ width: row.pct + '%' }" />
              </div>
              <span class="w-6 text-end">{{ row.count }}</span>
            </div>
          </div>
        </div>

        <div :class="ui.list">
          <article v-for="r in reviews" :key="r.id" class="text-start" :class="ui.card">
            <div class="flex items-center gap-3">
              <img v-if="r.avatar" :src="r.avatar" :alt="r.author" class="size-10 rounded-full object-cover" />
              <div v-else class="flex size-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
                {{ r.author.charAt(0) }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-neutral-900">{{ r.author }}</p>
                <p class="text-xs text-neutral-400">{{ r.date }}</p>
              </div>
              <span v-if="bool('showVerified') && r.verified" class="text-xs font-medium text-emerald-600">
                <Icon name="ph:seal-check-bold" />
              </span>
            </div>
            <div class="mt-3 flex text-sm text-amber-400">
              <Icon v-for="n in 5" :key="n" :name="n <= r.rating ? 'ph:star-fill' : 'ph:star-bold'" />
            </div>
            <h3 class="mt-2 text-sm font-bold text-neutral-900">{{ r.title }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-neutral-500">{{ r.body }}</p>
          </article>
        </div>
      </div>

      <p v-else class="mt-8 rounded-2xl border border-dashed border-neutral-200 py-10 text-center text-sm text-neutral-400">
        {{ str("emptyText") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { DEMO_REVIEWS } from "@/data/demo-catalog";

interface ReviewRow {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

const props = defineProps<{ section: PageSection }>();
const { str, bool, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "sidebar"));
const UI = {
  sidebar: {
    wrap: "grid gap-8 md:grid-cols-3",
    summary: "",
    list: "space-y-4 md:col-span-2",
    card: "rounded-2xl border border-neutral-200 bg-white p-5",
  },
  banner: {
    wrap: "space-y-6",
    summary: "flex flex-wrap items-center gap-8 rounded-2xl bg-neutral-50 p-6",
    list: "grid gap-4 md:grid-cols-2",
    card: "rounded-2xl border border-neutral-200 bg-white p-5",
  },
  minimal: {
    wrap: "space-y-4",
    summary: "flex items-center gap-4 border-b border-neutral-200 pb-4",
    list: "divide-y divide-neutral-200",
    card: "py-5",
  },
} as const;
const ui = computed(() => UI[variant.value as keyof typeof UI] ?? UI.sidebar);

const formOpen = ref(false);
const draftRating = ref(5);
const draftTitle = ref("");
const draftBody = ref("");
const submitted = ref<ReviewRow[]>([]);

const reviews = computed<ReviewRow[]>(() => {
  const custom = list("customReviews").map((r, i) => ({
    id: `c${i}`,
    author: String(r.author ?? ""),
    avatar: "",
    rating: Math.min(5, Math.max(1, Number(r.rating) || 5)),
    title: String(r.title ?? ""),
    body: String(r.body ?? ""),
    date: String(r.date ?? ""),
    verified: false,
  }));
  const demo = bool("showDemoReviews") ? DEMO_REVIEWS : [];
  return [...submitted.value, ...custom, ...demo];
});

const average = computed(() =>
  reviews.value.length ? reviews.value.reduce((n, r) => n + r.rating, 0) / reviews.value.length : 0,
);
const distribution = computed(() =>
  [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.value.filter((r) => r.rating === stars).length;
    return { stars, count, pct: reviews.value.length ? (count / reviews.value.length) * 100 : 0 };
  }),
);

function submitDraft() {
  if (!draftTitle.value && !draftBody.value) return;
  submitted.value.unshift({
    id: `s${Date.now()}`,
    author: "You",
    avatar: "",
    rating: draftRating.value,
    title: draftTitle.value,
    body: draftBody.value,
    date: new Date().toISOString().slice(0, 10),
    verified: false,
  });
  draftTitle.value = "";
  draftBody.value = "";
  formOpen.value = false;
}
</script>
