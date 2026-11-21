<script lang="ts" setup>
import { TOUR_UI } from "@/data/tour-steps";

const { start } = useTour();
const { locale } = useI18n();

const lang = computed<"en" | "ar">(() => (locale.value === "ar" ? "ar" : "en"));
const label = computed(() => TOUR_UI.guide[lang.value]);
const title = computed(() => TOUR_UI.guideTitle[lang.value]);
</script>

<template>
  <button
    type="button"
    data-tour="tour-launcher"
    class="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border-subtle px-2.5 text-[12px] font-medium text-tx-secondary transition-colors duration-200 hover:bg-bg-elevated hover:text-tx-primary"
    :title="title"
    :aria-label="title"
    @click="start()"
  >
    <Icon name="ph:question-bold" class="h-3.5 w-3.5" />
    <span class="hidden whitespace-nowrap 2xl:inline">{{ label }}</span>
  </button>
</template>
