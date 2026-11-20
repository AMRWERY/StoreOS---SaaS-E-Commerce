<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Navbar settings"
  >
    <!-- Header -->
    <div
      class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4"
    >
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <Icon name="ph:navigation-arrow-bold" class="text-brand" />
          <h2 class="text-sm font-bold tracking-wide text-tx-primary">
            Navbar
          </h2>
        </div>
        <p class="mt-1 text-[10px] font-bold tracking-[0.2em] text-tx-muted">
          Store name &amp; navigation links
        </p>
      </div>
      <component
        :is="UiButton"
        variant="none"
        type="button"
        class-name="hidden size-9 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-tx-muted transition-colors hover:bg-bg-elevated hover:text-tx-primary xl:inline-flex"
        title="Collapse panel"
        @click="$emit('collapse')"
      >
        <Icon
          name="ph:caret-double-right-bold"
          class="text-lg rtl:rotate-180"
        />
      </component>
    </div>

    <!-- Body -->
    <div
      class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]"
    >
      <!-- Style picker -->
      <div>
        <label
          class="mb-2.5 block text-[10px] font-bold tracking-wider text-tx-secondary"
        >
          Navbar style
        </label>
        <div class="grid grid-cols-2 gap-2">
          <LazyVButton
            v-for="style in NAVBAR_STYLES"
            :key="style.value"
            variant="none"
            type="button"
            :class-name="[
              'group relative flex flex-col items-start overflow-hidden rounded-xl border-2 p-3 text-start transition-all',
              store.navbarStyle === style.value
                ? 'border-brand bg-brand/5'
                : 'border-border-default bg-bg-elevated hover:border-border-subtle',
            ].join(' ')"
            @click="store.navbarStyle = style.value"
          >
            <!-- Mini preview sketch -->
            <div
              class="mb-2.5 w-full overflow-hidden rounded-lg border border-border-subtle bg-white"
              :class="style.dark ? 'bg-neutral-900' : 'bg-white'"
            >
              <chrome-sketch kind="navbar" :variant="style.value" />
            </div>
            <p
              class="text-[11px] font-bold"
              :class="
                store.navbarStyle === style.value
                  ? 'text-brand'
                  : 'text-tx-primary'
              "
            >
              {{ style.label }}
            </p>
            <p class="mt-0.5 text-[10px] text-tx-muted">
              {{ style.description }}
            </p>
            <div
              v-if="store.navbarStyle === style.value"
              class="absolute end-2 top-2 flex size-4 items-center justify-center rounded-full bg-brand"
            >
              <Icon name="ph:check-bold" class="text-[9px] text-white" />
            </div>
          </LazyVButton>
        </div>
      </div>

      <!-- Store name -->
      <div>
        <LazyVInput
          type="text"
          :model-value="store.displayName"
          label="Store name / Logo text"
          placeholder="My Store"
          input-class="!w-full !rounded-lg !border-border-subtle !bg-bg-elevated !px-3 !py-2.5 !text-sm !font-semibold !text-tx-primary !outline-none !transition-colors focus:!border-brand"
          @update:model-value="store.setStoreName($event)"
        />
        <p class="mt-1.5 text-[10px] text-tx-muted">
          Displayed in the top-left of every page.
        </p>
      </div>

      <!-- Nav links -->
      <div>
        <div class="mb-3 flex items-center justify-between">
          <label class="text-[10px] font-bold tracking-wider text-tx-secondary">
            Navigation links
            <span
              class="ms-1.5 rounded-full bg-bg-elevated px-1.5 py-0.5 text-tx-muted"
            >
              {{ store.navLinks.length }}
            </span>
          </label>
          <LazyVButton
            variant="none"
            type="button"
            className="flex items-center gap-1 rounded-lg border border-brand/40 bg-brand/10 px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-brand transition-colors hover:bg-brand/20"
            @click="store.addNavLink()"
          >
            <Icon name="ph:plus-bold" class="text-[11px]" />
            Add link
          </LazyVButton>
        </div>

        <p
          v-if="store.navLinks.length === 0"
          class="rounded-xl border border-dashed border-border-subtle py-8 text-center text-[12px] text-tx-muted"
        >
          No links yet — click
          <strong class="text-tx-primary">Add link</strong> to start.
        </p>

        <div v-else class="space-y-2">
          <div
            v-for="(link, i) in store.navLinks"
            :key="i"
            class="group rounded-xl border border-border-subtle bg-bg-elevated/50 p-3 transition-colors hover:border-border-default"
          >
            <div class="flex items-start gap-2">
              <!-- drag handle (visual only) -->
              <Icon
                name="ph:dots-six-vertical-bold"
                class="mt-2.5 shrink-0 cursor-grab text-tx-muted opacity-0 transition-opacity group-hover:opacity-100"
              />

              <div class="min-w-0 flex-1 space-y-2.5">
                <!-- Label row -->
                <LazyVInput
                  type="text"
                  :model-value="link.label"
                  label="Label"
                  placeholder="Collection"
                  input-class="!w-full !rounded-md !border-border-subtle !bg-bg-base !px-2.5 !py-1.5 !text-[12px] !font-medium !text-tx-primary !outline-none !transition-colors focus:!border-brand"
                  @update:model-value="store.updateNavLink(i, 'label', $event)"
                />
                <!-- URL row -->
                <LazyVInput
                  type="text"
                  :model-value="link.href"
                  label="URL path"
                  placeholder="/collection"
                  input-class="!w-full !rounded-md !border-border-subtle !bg-bg-base !px-2.5 !py-1.5 !text-[11px] !text-tx-primary !outline-none !transition-colors focus:!border-brand"
                  @update:model-value="store.updateNavLink(i, 'href', $event)"
                />
              </div>

              <!-- Delete -->
              <LazyVButton
                variant="none"
                type="button"
                className="mt-0.5 shrink-0 rounded-lg p-1.5 text-tx-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400"
                title="Remove link"
                @click="store.removeNavLink(i)"
              >
                <Icon name="ph:trash-bold" class="text-base" />
              </LazyVButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview hint -->
      <div
        class="flex items-start gap-2 rounded-lg border border-border-subtle bg-bg-elevated/30 p-3"
      >
        <Icon
          name="ph:info-bold"
          class="mt-0.5 shrink-0 text-[13px] text-tx-muted"
        />
        <p class="text-[11px] leading-relaxed text-tx-muted">
          Changes appear instantly in the preview. Links open on the live admin.
        </p>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { NAVBAR_STYLE_OPTIONS } from "@/data/chrome-styles";
const { t } = useI18n();

defineEmits<{
  collapse: [];
}>();

const UiButton = resolveComponent("VButton");
const NAVBAR_STYLES = NAVBAR_STYLE_OPTIONS;
const store = useBuilderStore();

</script>