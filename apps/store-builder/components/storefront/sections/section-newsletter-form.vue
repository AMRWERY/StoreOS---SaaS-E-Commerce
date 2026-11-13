<template>
  <div
    class="px-8 py-14 text-center"
    :class="
      str('bg_style', 'light') === 'dark'
        ? 'bg-neutral-900 text-white'
        : 'bg-neutral-50'
    "
  >
    <h2
      class="text-xl font-bold"
      :class="str('bg_style') === 'dark' ? 'text-white' : 'text-neutral-900'"
    >
      {{ str("heading", str("headline", "Stay in the loop")) }}
    </h2>
    <p
      class="mt-2 text-sm"
      :class="
        str('bg_style') === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
      "
    >
      {{
        str(
          "subheading",
          str("subheadline", "Get the latest news and exclusive offers."),
        )
      }}
    </p>
    <LazyVFormWrapper formClass="!space-y-0 !mt-6 !flex !justify-center !gap-2">
      <LazyVInput
        type="email"
        :placeholder="str('placeholder', 'you@example.com')"
        inputClass="!w-64 !rounded-md !border-neutral-300 !px-4 !py-2 !text-sm !outline-none focus:!border-neutral-500"
      />

      <LazyVButton
        type="submit"
        variant="none"
        className="rounded-md bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
      >
        {{ str("button_text", str("buttonText", "Subscribe")) }}
      </LazyVButton>
    </LazyVFormWrapper>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();

const str = (key: string, fallback = "") =>
  String(props.section.settings[key] ?? fallback);
</script>