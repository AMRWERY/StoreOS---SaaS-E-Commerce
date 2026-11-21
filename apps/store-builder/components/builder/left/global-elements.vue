<template>
  <div class="shrink-0 space-y-3 border-b border-border-subtle p-2">
    <!-- Website: name + language -->
    <div data-tour="website">
      <p
        class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted"
      >
        Website
      </p>

      <div class="space-y-1.5 px-1">
        <label class="block">
          <span
            class="mb-1 flex items-center gap-1.5 px-1 text-[10px] font-semibold text-tx-secondary"
          >
            Website name
            <span
              v-if="store.isMultiLocale"
              class="rounded bg-brand/15 px-1 py-px font-mono text-[9px] font-bold text-brand"
              >{{ store.contentLocale.toUpperCase() }}</span
            >
          </span>
          <input
            :value="store.displayName"
            type="text"
            maxlength="60"
            placeholder="My Store"
            :dir="store.direction"
            class="w-full rounded-md border border-border-subtle bg-bg-primary px-2.5 py-2 text-[12px] font-semibold text-tx-primary outline-none transition-colors placeholder:text-tx-muted focus:border-brand"
            @input="
              store.setStoreName(($event.target as HTMLInputElement).value)
            "
          />
        </label>

        <button
          type="button"
          class="flex w-full items-center gap-2 rounded-md border border-border-subtle bg-bg-primary px-2.5 py-2 text-start transition-colors hover:border-brand/40 hover:bg-bg-elevated"
          @click="localeSettingsOpen = true"
        >
          <Icon
            name="ph:translate-bold"
            class="shrink-0 text-[13px] text-tx-muted"
          />
          <span class="min-w-0 flex-1">
            <span class="block text-[10px] font-semibold text-tx-secondary"
              >Website language</span
            >
            <span
              class="block truncate text-[11px] font-bold text-tx-primary"
              >{{ languageSummary }}</span
            >
          </span>
          <span class="text-[10px] font-bold text-brand">Change</span>
        </button>

        <div
          v-if="store.isMultiLocale"
          class="flex items-center gap-1.5 rounded-md bg-bg-elevated/50 px-2 py-1.5"
        >
          <span class="text-[10px] font-semibold text-tx-secondary"
            >Editing:</span
          >
          <div class="flex flex-1 gap-1">
            <button
              v-for="code in store.locales"
              :key="code"
              type="button"
              class="flex-1 rounded px-2 py-1 text-[10px] font-black tracking-wider transition-colors"
              :class="
                store.contentLocale === code
                  ? 'bg-brand text-white'
                  : 'bg-bg-overlay text-tx-secondary hover:text-tx-primary'
              "
              @click="store.setContentLocale(code)"
            >
              {{ code.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Global: navbar + footer -->
    <div data-tour="global">
      <p
        class="mb-1.5 px-2 text-[9px] font-black tracking-[0.2em] text-tx-muted"
      >
        Global
      </p>
      <div class="grid grid-cols-2 gap-1">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="flex min-w-0 items-center gap-2 rounded-md border px-2.5 py-2 text-start text-[11px] font-semibold transition-all"
          :class="
            item.active
              ? 'border-border-subtle bg-bg-elevated text-brand'
              : 'border-transparent text-tx-secondary hover:bg-bg-elevated/50'
          "
          @click="item.select"
        >
          <Icon
            :name="item.icon"
            class="shrink-0 text-[13px]"
            :class="item.active ? 'text-brand' : 'text-tx-muted'"
          />
          <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
        </button>
      </div>
      <button
        type="button"
        class="mt-1 flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-start text-[11px] font-semibold transition-all"
        :class="
          store.panelMode === 'site-settings'
            ? 'border-border-subtle bg-bg-elevated text-brand'
            : 'border-transparent text-tx-secondary hover:bg-bg-elevated/50'
        "
        @click="select('site-settings')"
      >
        <Icon
          name="ph:gear-six-bold"
          class="shrink-0 text-[13px] text-tx-muted"
        />
        <span class="min-w-0 flex-1 truncate">Site settings</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { STORE_LOCALES } from "@/data/localize";

const store = useBuilderStore();
const { localeSettingsOpen } = useBuilderModals();

const languageSummary = computed(() => {
  const names = store.locales.map(
    (c) => STORE_LOCALES.find((l) => l.code === c)?.label ?? c,
  );
  return store.isMultiLocale
    ? `${names.join(" + ")} (default: ${STORE_LOCALES.find((l) => l.code === store.defaultLocale)?.label})`
    : names[0];
});

const select = (
  mode: "navbar-settings" | "footer-settings" | "site-settings",
) => {
  store.selectedId = null;
  store.setPanelMode(mode);
};

const items = computed(() => [
  {
    id: "navbar",
    label: "Navbar",
    icon: "ph:navigation-arrow-bold",
    count: store.navLinks.length,
    active: store.panelMode === "navbar-settings",
    select: () => select("navbar-settings"),
  },
  {
    id: "footer",
    label: "Footer",
    icon: "ph:layout-bold",
    count: store.footerColumns.length,
    active: store.panelMode === "footer-settings",
    select: () => select("footer-settings"),
  },
]);
</script>