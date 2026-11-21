<template>
  <div class="px-4 py-14 sm:px-8">
    <div :class="wrapClass">
      <div :class="variant === 'split' ? 'text-start' : ''">
        <h2 class="text-xl font-bold text-neutral-900">
          {{ str("heading", str("headline", "Contact us")) }}
        </h2>
        <p v-if="str('subheadline')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheadline") }}
        </p>
        <p
          v-if="variant === 'split' && str('recipient')"
          class="mt-6 flex items-center gap-2 text-sm text-neutral-600"
        >
          <Icon name="ph:envelope-simple-bold" class="text-lg text-indigo-600" />
          <span dir="ltr">{{ str("recipient") }}</span>
        </p>
      </div>

      <div>
        <div
          v-if="submitted"
          role="status"
          class="mt-6 flex items-start gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-4 text-start"
          :class="variant === 'split' ? 'mt-0' : ''"
        >
          <Icon
            name="ph:check-circle-fill"
            class="mt-0.5 shrink-0 text-xl text-indigo-600"
          />
          <div>
            <p class="text-sm font-semibold text-neutral-900">
              {{ str("success_message", "Message sent. Thank you!") }}
            </p>
            <button
              type="button"
              class="mt-2 text-xs font-medium text-indigo-600 hover:underline"
              @click="reset"
            >
              Send another message
            </button>
          </div>
        </div>

        <form
          v-else
          novalidate
          class="grid gap-4 sm:grid-cols-2"
          :class="variant === 'split' ? '' : 'mt-6'"
          @submit.prevent="onSubmit"
        >
          <div>
            <label :for="`${uid}-name`" class="mb-1 block text-xs font-medium text-neutral-700">Name</label>
            <input
              :id="`${uid}-name`"
              v-model="form.name"
              type="text"
              autocomplete="name"
              placeholder="Your name"
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? `${uid}-name-err` : undefined"
              :class="inputClass(errors.name)"
              @input="errors.name = ''"
            />
            <p v-if="errors.name" :id="`${uid}-name-err`" role="alert" class="mt-1 text-xs font-medium text-red-500">{{ errors.name }}</p>
          </div>

          <div>
            <label :for="`${uid}-email`" class="mb-1 block text-xs font-medium text-neutral-700">Email</label>
            <input
              :id="`${uid}-email`"
              v-model="form.email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? `${uid}-email-err` : undefined"
              :class="inputClass(errors.email)"
              @input="errors.email = ''"
            />
            <p v-if="errors.email" :id="`${uid}-email-err`" role="alert" class="mt-1 text-xs font-medium text-red-500">{{ errors.email }}</p>
          </div>

          <div v-if="showPhone" class="sm:col-span-2">
            <label :for="`${uid}-phone`" class="mb-1 block text-xs font-medium text-neutral-700">Phone <span class="text-neutral-400">(optional)</span></label>
            <input
              :id="`${uid}-phone`"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              placeholder="+1 555 000 0000"
              :class="inputClass('')"
            />
          </div>

          <div class="sm:col-span-2">
            <label :for="`${uid}-message`" class="mb-1 block text-xs font-medium text-neutral-700">Message</label>
            <textarea
              :id="`${uid}-message`"
              v-model="form.message"
              rows="4"
              placeholder="How can we help?"
              :aria-invalid="!!errors.message"
              :aria-describedby="errors.message ? `${uid}-message-err` : undefined"
              :class="inputClass(errors.message)"
              @input="errors.message = ''"
            />
            <p v-if="errors.message" :id="`${uid}-message-err`" role="alert" class="mt-1 text-xs font-medium text-red-500">{{ errors.message }}</p>
          </div>

          <div class="sm:col-span-2">
            <button
              type="submit"
              class="w-full rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 sm:w-fit"
            >
              {{ str("submit_label", str("submitLabel", "Send message")) }}
            </button>
          </div>
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
const variant = computed(() => str("variant", "stacked"));
// Form key is `phone_field`; older data used `show_phone`.
const showPhone = computed(() => bool("phone_field", bool("show_phone", false)));

const wrapClass = computed(() => {
  switch (variant.value) {
    case "split":
      return "mx-auto grid max-w-5xl gap-8 md:grid-cols-2";
    case "card":
      return "mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8";
    default:
      return "mx-auto max-w-xl";
  }
});

const form = reactive({ name: "", email: "", phone: "", message: "" });
const errors = reactive({ name: "", email: "", message: "" });
const submitted = ref(false);

const inputClass = (err: string) =>
  `w-full rounded-md border bg-white px-4 py-2.5 text-start text-sm text-neutral-900 outline-none focus:border-indigo-600 ${
    err ? "border-red-500" : "border-neutral-200"
  }`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const onSubmit = () => {
  errors.name = form.name.trim() ? "" : "Please enter your name.";
  errors.email = !form.email.trim()
    ? "Please enter your email address."
    : EMAIL_RE.test(form.email.trim())
      ? ""
      : "Please enter a valid email address.";
  errors.message = form.message.trim() ? "" : "Please write a message.";
  if (errors.name || errors.email || errors.message) return;
  submitted.value = true;
}

const reset = () => {
  Object.assign(form, { name: "", email: "", phone: "", message: "" });
  submitted.value = false;
}
</script>
