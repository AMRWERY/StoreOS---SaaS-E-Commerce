<template>
  <div>
    <!-- Boxes -->
    <div v-if="variant === 'boxes'" class="bg-neutral-900 px-6 py-12 text-center md:px-8">
      <p class="text-xs font-bold tracking-widest text-neutral-400">{{ heading }}</p>
      <div class="mt-6 flex justify-center gap-4 md:gap-6">
        <div
          v-for="u in units"
          :key="u.label"
          class="flex flex-col items-center gap-1"
        >
          <span
            class="text-3xl font-bold tabular-nums text-white md:text-4xl"
            :style="{ color: accent }"
            >{{ u.val }}</span
          >
          <span class="text-[10px] font-medium tracking-widest text-neutral-500">{{ u.label }}</span>
        </div>
      </div>
      <p v-if="expired" class="mt-4 text-xs text-neutral-400">This offer has ended.</p>
      <a
        v-if="ctaText"
        :href="ctaUrl"
        class="mt-8 inline-block rounded-md px-8 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        :style="{ backgroundColor: accent }"
      >
        {{ ctaText }}
      </a>
    </div>

    <!-- Inline -->
    <div
      v-else-if="variant === 'inline'"
      class="bg-neutral-900 px-6 py-3 md:px-8"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-5"
      >
        <p class="text-sm font-bold text-white">{{ heading }}</p>
        <p class="flex items-center gap-1.5 text-sm font-bold tabular-nums" :style="{ color: accent }">
          <template v-for="(u, i) in units" :key="u.label">
            <span v-if="i > 0" class="text-neutral-500">:</span>
            <span>{{ u.val }}<span class="ms-0.5 text-[10px] font-medium text-neutral-400">{{ u.short }}</span></span>
          </template>
        </p>
        <a
          v-if="ctaText"
          :href="ctaUrl"
          class="rounded-md px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
          :style="{ backgroundColor: accent }"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>

    <!-- Cards -->
    <div v-else class="bg-neutral-50 px-6 py-12 text-center md:px-8">
      <p class="text-lg font-bold text-neutral-900 md:text-xl">{{ heading }}</p>
      <div class="mx-auto mt-6 grid max-w-xl gap-3" :style="{ gridTemplateColumns: `repeat(${units.length}, minmax(0, 1fr))` }">
        <div
          v-for="u in units"
          :key="u.label"
          class="rounded-xl border border-neutral-200 bg-white px-2 py-4 shadow-sm"
        >
          <p class="text-3xl font-bold tabular-nums md:text-4xl" :style="{ color: accent }">
            {{ u.val }}
          </p>
          <p class="mt-1 text-[10px] font-medium tracking-widest text-neutral-500">{{ u.label }}</p>
        </div>
      </div>
      <p v-if="expired" class="mt-4 text-xs text-neutral-500">This offer has ended.</p>
      <a
        v-if="ctaText"
        :href="ctaUrl"
        class="mt-7 inline-block rounded-md px-8 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        :style="{ backgroundColor: accent }"
      >
        {{ ctaText }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "boxes"));
const heading = computed(() => str("heading") || str("label") || str("headline", "Sale ends soon"));
const ctaText = computed(() => str("cta_text"));
const ctaUrl = computed(() => str("cta_url") || "#");
const accent = computed(() => str("accent", "#f97316"));
const showDays = computed(() => bool("show_days", true));

// Demo countdown (12d 3h 47m 22s) used until mounted, and when no valid end date is set.
const DEMO_MS = ((12 * 24 + 3) * 60 + 47) * 60_000 + 22_000;

const mounted = ref(false);
const now = ref(0);
const demoEnd = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  now.value = Date.now();
  demoEnd.value = now.value + DEMO_MS;
  mounted.value = true;
  timer = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
  timer = null;
});

const endMs = computed(() => {
  const raw = str("end_at") || str("end_date");
  const t = raw ? new Date(raw).getTime() : NaN;
  return Number.isFinite(t) ? t : null;
});

const remaining = computed(() => {
  if (!mounted.value) return DEMO_MS;
  const end = endMs.value ?? demoEnd.value;
  return Math.max(0, end - now.value);
});
const expired = computed(() => mounted.value && endMs.value !== null && remaining.value <= 0);

const pad = (n: number) => String(n).padStart(2, "0");

const units = computed(() => {
  const ms = remaining.value;
  const totalHours = Math.floor(ms / 3_600_000);
  const d = Math.floor(ms / 86_400_000);
  const h = showDays.value ? totalHours - d * 24 : totalHours;
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const rows = [
    { val: pad(d), label: "Days", short: "d" },
    { val: pad(h), label: "Hours", short: "h" },
    { val: pad(m), label: "Minutes", short: "m" },
    { val: pad(s), label: "Seconds", short: "s" },
  ];
  return showDays.value ? rows : rows.slice(1);
});
</script>
