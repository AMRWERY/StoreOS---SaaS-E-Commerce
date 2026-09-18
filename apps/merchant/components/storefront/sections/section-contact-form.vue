<template>
  <div class="px-8 py-14">
    <h2 class="text-xl font-bold text-neutral-900">
      {{ str("heading", str("headline", "Contact us")) }}
    </h2>
    <p v-if="str('subheadline')" class="mt-2 text-sm text-neutral-500">
      {{ str("subheadline") }}
    </p>
    <LazyVFormWrapper formClass="!space-y-0 !mt-6 !grid !max-w-xl !grid-cols-2 !gap-4">
      <LazyVInput
        type="text"
        placeholder="Name"
        readonly
        inputClass="!rounded-md !border-neutral-300 !bg-white !px-4 !py-2.5 !text-sm !text-neutral-900"
      />

      <LazyVInput
        type="email"
        placeholder="Email"
        readonly
        inputClass="!rounded-md !border-neutral-300 !bg-white !px-4 !py-2.5 !text-sm !text-neutral-900"
      />

      <LazyVInput
        v-if="bool('show_phone', true)"
        type="tel"
        placeholder="Phone"
        readonly
        inputClass="!rounded-md !border-neutral-300 !bg-white !px-4 !py-2.5 !text-sm !text-neutral-900"
      />

      <LazyVTextareaInput
        placeholder="Message"
        readonly
        textareaClass="!col-span-2 !rounded-md !border-neutral-300 !bg-white !px-4 !py-2.5 !text-sm !text-neutral-900"
      />

      <LazyVButton
        type="submit"
        variant="none"
        className="w-fit rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white"
      >
        {{ str("submit_label", str("submitLabel", "Send message")) }}
      </LazyVButton>
    </LazyVFormWrapper>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();

const str = (key: string, fallback = "") =>
  String(props.section.settings[key] ?? fallback);

const bool = (key: string, fallback = false) =>
  Boolean(props.section.settings[key] ?? fallback);
</script>