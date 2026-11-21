<template>
  <div class="flex shrink-0 items-center gap-1.5">
    <!-- Editing language (multi-language stores only) -->
    <div
      v-if="store.isMultiLocale"
      class="flex items-center rounded-md border border-border-subtle bg-bg-primary p-0.5"
      role="group"
      aria-label="Editing language"
    >
      <button
        v-for="code in store.locales"
        :key="code"
        type="button"
        class="rounded px-2 py-1 text-[10px] font-black tracking-wider transition-colors"
        :class="
          store.contentLocale === code
            ? 'bg-brand text-white'
            : 'text-tx-secondary hover:text-tx-primary'
        "
        :title="`Edit ${nameOf(code)} content`"
        @click="store.setContentLocale(code)"
      >
        {{ code.toUpperCase() }}
      </button>
    </div>

    <button
      type="button"
      class="flex items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-1.5 text-[11px] font-semibold text-tx-secondary transition-colors hover:bg-bg-elevated hover:text-tx-primary"
      title="Website language — the language(s) your store is published in"
      @click="localeSettingsOpen = true"
    >
      <Icon name="ph:translate-bold" class="size-4 shrink-0" />
      <span class="hidden whitespace-nowrap 2xl:inline">{{ summary }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { STORE_LOCALES, type StoreLocale } from "@/data/localize";

const store = useBuilderStore();
const { localeSettingsOpen } = useBuilderModals();

const nameOf = (code: StoreLocale) =>
  STORE_LOCALES.find((l) => l.code === code)?.label ?? code;

const summary = computed(() =>
  store.isMultiLocale
    ? "Site: EN + AR"
    : `Site: ${STORE_LOCALES.find((l) => l.code === store.defaultLocale)?.label ?? "Language"}`,
);
</script>