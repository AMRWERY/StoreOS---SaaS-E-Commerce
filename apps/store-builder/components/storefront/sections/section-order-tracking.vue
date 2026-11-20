<template>
  <div class="px-8 py-14">
    <div class="mx-auto" :class="variant === 'stepper' ? 'max-w-3xl' : 'max-w-xl'">
      <div :class="variant === 'compact' ? 'text-start' : 'text-center'">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
      </div>

      <form
        class="mt-8"
        :class="
          variant === 'compact'
            ? 'flex flex-col gap-3 sm:flex-row sm:items-end'
            : 'space-y-4 rounded-2xl border border-neutral-200 bg-white p-6'
        "
        @submit.prevent="submit"
      >
        <label class="block" :class="variant === 'compact' && 'flex-1'">
          <span class="text-xs font-semibold text-neutral-700">{{ str("order_label") }}</span>
          <input
            v-model="orderNo"
            type="text"
            :placeholder="str('order_placeholder')"
            class="mt-1.5 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-indigo-600"
          />
        </label>
        <label class="block" :class="variant === 'compact' && 'flex-1'">
          <span class="text-xs font-semibold text-neutral-700">{{ str("email_label") }}</span>
          <input
            v-model="email"
            type="email"
            :placeholder="str('email_placeholder')"
            class="mt-1.5 w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-indigo-600"
          />
        </label>
        <button
          type="submit"
          class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          :class="variant !== 'compact' && 'w-full'"
        >
          {{ str("button_label") }}
        </button>
      </form>
      <p v-if="error" class="mt-3 text-xs font-medium text-red-600">
        {{ str("error_text") }}
      </p>

      <div
        v-if="result"
        class="mt-6"
        :class="variant === 'compact' ? 'border-t border-neutral-200 pt-6' : 'rounded-2xl border border-neutral-200 bg-white p-6'"
      >
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-bold text-neutral-900">{{ result }}</p>
          <span class="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600">
            {{ steps[currentIndex] }}
          </span>
        </div>

        <!-- stepper: horizontal -->
        <ol v-if="variant === 'stepper'" class="mt-6 flex items-start">
          <li v-for="(label, i) in steps" :key="i" class="flex flex-1 flex-col items-center text-center">
            <div class="flex w-full items-center">
              <span class="h-0.5 flex-1" :class="i === 0 ? 'bg-transparent' : i <= currentIndex ? 'bg-indigo-600' : 'bg-neutral-200'" />
              <span
                class="flex size-7 shrink-0 items-center justify-center rounded-full text-xs"
                :class="i <= currentIndex ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-400'"
              >
                <Icon v-if="i <= currentIndex" name="ph:check-bold" />
                <span v-else>{{ i + 1 }}</span>
              </span>
              <span class="h-0.5 flex-1" :class="i === steps.length - 1 ? 'bg-transparent' : i < currentIndex ? 'bg-indigo-600' : 'bg-neutral-200'" />
            </div>
            <p class="mt-2 px-1 text-[11px] leading-tight" :class="i === currentIndex ? 'font-bold text-neutral-900' : 'text-neutral-500'">
              {{ label }}
            </p>
          </li>
        </ol>

        <!-- timeline: vertical -->
        <ol v-else-if="variant === 'timeline'" class="mt-6">
          <li v-for="(label, i) in steps" :key="i" class="flex gap-3">
            <div class="flex flex-col items-center">
              <span
                class="flex size-6 shrink-0 items-center justify-center rounded-full text-xs"
                :class="i <= currentIndex ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-400'"
              >
                <Icon v-if="i <= currentIndex" name="ph:check-bold" />
                <span v-else>{{ i + 1 }}</span>
              </span>
              <span v-if="i < steps.length - 1" class="h-6 w-px" :class="i < currentIndex ? 'bg-indigo-600' : 'bg-neutral-200'" />
            </div>
            <p
              class="pt-0.5 text-sm"
              :class="i === currentIndex ? 'font-bold text-neutral-900' : i < currentIndex ? 'text-neutral-700' : 'text-neutral-400'"
            >
              {{ label }}
            </p>
          </li>
        </ol>

        <!-- compact: progress bar -->
        <div v-else class="mt-4">
          <div class="h-2 overflow-hidden rounded-full bg-neutral-100">
            <div class="h-full rounded-full bg-indigo-600" :style="{ width: `${((currentIndex + 1) / steps.length) * 100}%` }" />
          </div>
          <div class="mt-2 flex justify-between text-[11px] text-neutral-500">
            <span>{{ steps[0] }}</span>
            <span>{{ steps[steps.length - 1] }}</span>
          </div>
        </div>

        <p class="mt-5 text-sm text-neutral-500" :class="variant !== 'compact' && 'border-t border-neutral-200 pt-4'">
          {{ str("eta_label") }}:
          <span class="font-semibold text-neutral-900">{{ eta }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "stepper"));
const orderNo = ref("");
const email = ref("");
const error = ref(false);
const result = ref("");

const steps = computed(() => [1, 2, 3, 4, 5].map((n) => str(`step_${n}`)));
const currentIndex = computed(() =>
  Math.min(steps.value.length, Math.max(1, num("current_step", 3))) - 1,
);
const eta = computed(() => {
  const d = new Date();
  d.setDate(d.getDate() + num("eta_days", 3));
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
});

function submit() {
  if (!orderNo.value.trim() || !email.value.trim()) {
    error.value = true;
    result.value = "";
    return;
  }
  error.value = false;
  result.value = orderNo.value.trim();
}
</script>
