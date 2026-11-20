<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
        <div class="mt-6 inline-flex rounded-full border border-neutral-200 bg-neutral-50 p-1">
          <button
            v-for="opt in billingOptions"
            :key="opt.value"
            type="button"
            class="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
            :class="billing === opt.value ? 'bg-indigo-600 text-white' : 'text-neutral-600 hover:text-neutral-900'"
            @click="billing = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
        <p v-if="discount > 0 && billing === 'yearly'" class="mt-2 text-xs font-semibold text-indigo-600">
          -{{ discount }}%
        </p>
      </div>

      <div class="mt-10" :class="containerClass">
        <div
          v-for="(plan, i) in plans"
          :key="i"
          class="relative"
          :class="cardClass(plan.highlighted, i)"
        >
          <span
            v-if="plan.highlighted && str('badgeLabel')"
            class="absolute -top-3 start-6 rounded-full bg-indigo-600 px-3 py-0.5 text-[11px] font-semibold text-white"
          >
            {{ str("badgeLabel") }}
          </span>
          <div :class="isRows ? 'sm:w-48 sm:shrink-0' : ''">
            <h3 class="text-sm font-bold text-neutral-900">{{ plan.name }}</h3>
            <div class="mt-3 flex items-baseline gap-1">
              <span class="text-4xl font-bold text-neutral-900">{{ str("currency") }}{{ priceFor(plan.price) }}</span>
              <span class="text-sm text-neutral-500">{{ plan.period }}</span>
            </div>
          </div>
          <ul class="flex-1" :class="isRows ? 'grid gap-2.5 sm:grid-cols-2' : 'mt-6 space-y-2.5'">
            <li v-for="(f, j) in featuresOf(plan.features)" :key="j" class="flex items-start gap-2 text-sm text-neutral-600">
              <Icon name="ph:check-circle-bold" class="mt-0.5 shrink-0 text-base text-indigo-600" />
              <span>{{ f }}</span>
            </li>
          </ul>
          <a
            :href="plan.url || '#'"
            class="inline-flex items-center justify-center text-sm font-semibold transition-colors"
            :class="[buttonClass(plan.highlighted), isRows ? 'sm:shrink-0' : 'mt-6']"
          >
            {{ plan.buttonLabel }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "cards"));
const isRows = computed(() => variant.value === "rows");
const isMinimal = computed(() => variant.value === "minimal");

const billing = ref<"monthly" | "yearly">("monthly");
const billingOptions = computed(() => [
  { value: "monthly" as const, label: str("monthlyLabel", "Monthly") },
  { value: "yearly" as const, label: str("yearlyLabel", "Yearly") },
]);

const plans = computed(() => list("items").slice(0, 4));
const discount = computed(() => Math.min(Math.max(num("yearlyDiscount", 0), 0), 100));

const containerClass = computed(() => {
  if (isRows.value) return "mx-auto flex max-w-3xl flex-col gap-4";
  const grid =
    ({
      1: "grid-cols-1 max-w-sm mx-auto",
      2: "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto",
      3: "grid-cols-1 md:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    })[plans.value.length] ?? "grid-cols-1 md:grid-cols-3";
  return `grid ${isMinimal.value ? "gap-0 gap-y-8" : "gap-6"} ${grid}`;
});

function cardClass(highlighted: unknown, index: number): string {
  if (isRows.value) {
    return `flex flex-col gap-4 rounded-2xl border bg-white p-6 sm:flex-row sm:items-center sm:gap-8 ${
      highlighted ? "border-indigo-600 ring-1 ring-indigo-600" : "border-neutral-200"
    }`;
  }
  if (isMinimal.value) {
    return `flex flex-col px-6 pt-5 ${index > 0 ? "md:border-s md:border-neutral-200" : ""} ${
      highlighted ? "border-t-2 border-indigo-600" : "border-t-2 border-transparent"
    }`;
  }
  return `flex flex-col rounded-2xl border bg-white p-6 ${
    highlighted ? "border-indigo-600 ring-1 ring-indigo-600" : "border-neutral-200"
  }`;
}

function buttonClass(highlighted: unknown): string {
  if (isMinimal.value) {
    return highlighted
      ? "rounded-xl bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
      : "px-1 py-2.5 text-indigo-600 underline underline-offset-4 hover:text-indigo-700";
  }
  return highlighted
    ? "rounded-xl bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
    : "rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 hover:bg-neutral-50";
}

function priceFor(price: unknown): string {
  const monthly = Number(price) || 0;
  const value = billing.value === "yearly" ? monthly * (1 - discount.value / 100) : monthly;
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function featuresOf(text: unknown): string[] {
  return String(text ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
</script>
