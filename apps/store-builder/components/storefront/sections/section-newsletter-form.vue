<template>
  <div class="px-4 py-14 sm:px-8" :class="outerClass">
    <div :class="innerClass">
      <div :class="variant === 'split' ? 'text-start' : ''">
        <h2 class="text-xl font-bold" :class="headingClass">
          {{ str("heading", str("headline", "Stay in the loop")) }}
        </h2>
        <p v-if="subheading" class="mt-2 text-sm" :class="mutedClass">
          {{ subheading }}
        </p>
      </div>

      <div :class="variant === 'split' ? 'w-full' : ''">
        <!-- success state -->
        <div
          v-if="submitted"
          role="status"
          class="mt-6 flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-start text-sm font-medium text-neutral-900"
          :class="variant === 'split' ? 'mt-0' : 'mx-auto max-w-md'"
        >
          <Icon
            name="ph:check-circle-fill"
            class="shrink-0 text-xl text-indigo-600"
          />
          <span>{{
            str("success_message", "Thanks for subscribing! Check your inbox.")
          }}</span>
        </div>

        <form
          v-else
          novalidate
          :class="variant === 'split' ? '' : 'mx-auto mt-6 max-w-md'"
          @submit.prevent="onSubmit"
        >
          <div class="flex flex-col gap-2 sm:flex-row">
            <div class="min-w-0 flex-1">
              <label :for="`${uid}-email`" class="sr-only">{{
                placeholder
              }}</label>
              <input
                :id="`${uid}-email`"
                v-model="email"
                type="email"
                autocomplete="email"
                :placeholder="placeholder"
                :aria-invalid="!!error"
                :aria-describedby="error ? `${uid}-err` : undefined"
                class="w-full rounded-md border bg-white px-4 py-2.5 text-start text-sm text-neutral-900 outline-none focus:border-indigo-600"
                :class="error ? 'border-red-500' : 'border-neutral-200'"
                @input="error = ''"
              />
            </div>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              {{ buttonLabel }}
            </button>
          </div>
          <p
            v-if="error"
            :id="`${uid}-err`"
            role="alert"
            class="mt-2 text-start text-xs font-medium text-red-500"
          >
            {{ error }}
          </p>
          <p
            v-if="bool('gdpr_note', true)"
            class="mt-3 text-xs"
            :class="[mutedClass, variant === 'split' ? 'text-start' : '']"
          >
            {{
              str(
                "gdpr_text",
                "By subscribing you agree to receive marketing emails. Unsubscribe at any time.",
              )
            }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool } = useSectionData(() => props.section);

const uid = useId();
const email = ref("");
const error = ref("");
const submitted = ref(false);

const variant = computed(() => str("variant", "centered"));
const dark = computed(() => str("bg_style", "light") === "dark");

const subheading = computed(() =>
  str(
    "subheading",
    str("subheadline", "Get the latest news and exclusive offers."),
  ),
);
const placeholder = computed(() => str("placeholder", "you@example.com"));
const buttonLabel = computed(() =>
  str("button_label", str("button_text", str("buttonText", "Subscribe"))),
);

const outerClass = computed(() => {
  if (dark.value) return "bg-neutral-900 text-white";
  return variant.value === "card" ? "" : "bg-neutral-50";
});
const innerClass = computed(() => {
  switch (variant.value) {
    case "split":
      return "mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2";
    case "card":
      return `mx-auto max-w-xl rounded-2xl border p-8 text-center ${
        dark.value
          ? "border-neutral-700 bg-neutral-900"
          : "border-neutral-200 bg-white"
      }`;
    default:
      return "text-center";
  }
});
const headingClass = computed(() =>
  dark.value ? "text-white" : "text-neutral-900",
);
const mutedClass = computed(() =>
  dark.value ? "text-neutral-400" : "text-neutral-500",
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const onSubmit = () => {
  const v = email.value.trim();
  if (!v) {
    error.value = "Please enter your email address.";
    return;
  }
  if (!EMAIL_RE.test(v)) {
    error.value = "Please enter a valid email address.";
    return;
  }
  error.value = "";
  submitted.value = true;
}
</script>
