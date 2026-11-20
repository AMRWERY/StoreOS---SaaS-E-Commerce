<template>
  <Teleport to="body">
    <div
      v-if="localeSettingsOpen"
      class="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="locale-settings-title"
      @keydown.esc="close"
    >
      <div class="absolute inset-0 bg-black/65 backdrop-blur-sm" @click="close" />
      <div
        class="relative w-full max-w-md rounded-2xl border border-border-subtle bg-bg-primary p-6 shadow-2xl"
      >
        <h2
          id="locale-settings-title"
          class="text-lg font-bold tracking-wide text-tx-primary"
        >
          Store languages
        </h2>
        <p class="mt-2 text-sm text-tx-secondary">
          This is the language your <strong>customers</strong> see on your
          website. Pick one language, or offer several and let customers switch.
          (The globe icon in the top bar only changes the builder's own
          interface.)
        </p>

        <div class="mt-5 grid grid-cols-2 gap-2">
          <button
            v-for="m in modes"
            :key="m.id"
            type="button"
            class="rounded-xl border p-3 text-start transition-colors"
            :class="
              mode === m.id
                ? 'border-brand bg-brand/10'
                : 'border-border-subtle bg-bg-elevated/40 hover:border-border-default'
            "
            @click="mode = m.id"
          >
            <Icon :name="m.icon" class="text-lg text-tx-secondary" />
            <p class="mt-1.5 text-[12px] font-bold text-tx-primary">
              {{ m.label }}
            </p>
            <p class="mt-0.5 text-[11px] leading-snug text-tx-muted">
              {{ m.hint }}
            </p>
          </button>
        </div>

        <!-- Single: pick the language -->
        <div v-if="mode === 'single'" class="mt-5 space-y-2">
          <p class="text-[10px] font-bold tracking-wider text-tx-secondary">
            Store language
          </p>
          <label
            v-for="l in STORE_LOCALES"
            :key="l.code"
            class="flex cursor-pointer items-center gap-3 rounded-lg border border-border-subtle bg-bg-elevated/40 px-3 py-2.5"
          >
            <input v-model="single" type="radio" :value="l.code" class="accent-[#6366f1]" />
            <span class="flex-1 text-[13px] font-medium text-tx-primary">
              {{ l.label }}
              <span class="ms-1 text-tx-muted">{{ l.native }}</span>
            </span>
            <span class="font-mono text-[10px] text-tx-muted">{{
              l.dir.toUpperCase()
            }}</span>
          </label>
        </div>

        <!-- Multi: pick several + default -->
        <div v-else class="mt-5 space-y-2">
          <p class="text-[10px] font-bold tracking-wider text-tx-secondary">
            Languages offered
          </p>
          <div
            v-for="l in STORE_LOCALES"
            :key="l.code"
            class="flex items-center gap-3 rounded-lg border border-border-subtle bg-bg-elevated/40 px-3 py-2.5"
          >
            <input
              :id="`loc-${l.code}`"
              v-model="multi"
              type="checkbox"
              :value="l.code"
              class="accent-[#6366f1]"
              :disabled="multi.length === 1 && multi.includes(l.code)"
            />
            <label
              :for="`loc-${l.code}`"
              class="flex-1 cursor-pointer text-[13px] font-medium text-tx-primary"
            >
              {{ l.label }}
              <span class="ms-1 text-tx-muted">{{ l.native }}</span>
            </label>
            <button
              type="button"
              class="rounded-full px-2 py-0.5 text-[9px] font-bold"
              :class="
                multiDefault === l.code
                  ? 'bg-brand text-white'
                  : 'bg-bg-overlay text-tx-muted hover:text-tx-primary'
              "
              :disabled="!multi.includes(l.code)"
              @click="multiDefault = l.code"
            >
              {{ multiDefault === l.code ? "Default" : "Make default" }}
            </button>
          </div>
          <p class="text-[11px] leading-snug text-tx-muted">
            Write your content in the default language first. Then switch the
            EN / AR toggle in the top bar to translate each block. Anything not
            translated falls back to the default language.
          </p>
        </div>

        <div class="mt-6 flex gap-3">
          <LazyVButton
            variant="none"
            type="button"
            className="flex-1 rounded-lg border border-border-subtle py-2.5 text-[11px] font-bold tracking-wider text-tx-secondary hover:bg-bg-elevated"
            @click="close"
          >
            Cancel
          </LazyVButton>
          <LazyVButton
            variant="none"
            type="button"
            className="flex-1 rounded-lg bg-brand py-2.5 text-[11px] font-black tracking-wider text-white hover:bg-brand/90"
            @click="save"
          >
            Save languages
          </LazyVButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { STORE_LOCALES, type StoreLocale } from "@/data/localize";

const store = useBuilderStore();
const { localeSettingsOpen } = useBuilderModals();

const modes = [
  {
    id: "single",
    label: "Single language",
    hint: "One language, RTL for Arabic",
    icon: "ph:globe-hemisphere-west-bold",
  },
  {
    id: "multi",
    label: "Multi-language",
    hint: "English and Arabic with a switcher",
    icon: "ph:translate-bold",
  },
] as const;

const mode = ref<"single" | "multi">("single");
const single = ref<StoreLocale>("en");
const multi = ref<StoreLocale[]>(["en", "ar"]);
const multiDefault = ref<StoreLocale>("en");

// Load the current settings each time the dialog opens.
watch(localeSettingsOpen, (open) => {
  if (!open) return;
  mode.value = store.isMultiLocale ? "multi" : "single";
  single.value = store.defaultLocale;
  multi.value = store.isMultiLocale ? [...store.locales] : ["en", "ar"];
  multiDefault.value = store.defaultLocale;
});

watch(multi, (list) => {
  if (!list.includes(multiDefault.value) && list[0])
    multiDefault.value = list[0];
});

const close = () => {
  localeSettingsOpen.value = false;
};

const save = () => {
  if (mode.value === "single") store.setLocales([single.value], single.value);
  else store.setLocales(multi.value, multiDefault.value);
  // Start editing in the default language.
  store.setContentLocale(store.defaultLocale);
  close();
};
</script>
