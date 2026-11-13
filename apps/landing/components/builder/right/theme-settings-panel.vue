<template>
  <aside
    class="w-full max-w-full rounded-xl border border-border-subtle bg-bg-primary shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    aria-label="Theme settings"
  >
    <div
      class="flex items-start justify-between gap-3 border-b border-border-subtle px-5 py-4"
    >
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-bold tracking-wide text-tx-primary">Theme</h2>
        <p class="mt-1.5 text-[10px] font-bold tracking-[0.2em] text-tx-muted">
          Global admin appearance
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

    <div
      class="max-h-[min(60vh,520px)] space-y-6 overflow-y-auto px-5 py-5 xl:max-h-[calc(100vh-14rem)]"
    >
      <!-- ── Navbar ─────────────────────────────────────────────── -->
      <lazy-setting-group title="Navbar" default-open>
        <lazy-setting-text
          :model-value="store.storeName"
          label="Store name"
          placeholder="My Store"
          @update:model-value="store.storeName = $event"
        />

        <div class="mt-5 space-y-2">
          <div class="flex items-center justify-between">
            <label
              class="text-[10px] font-bold tracking-wider text-tx-secondary"
            >
              Navigation links
            </label>
            <LazyVButton
              variant="none"
              type="button"
              className="rounded-md border border-dashed border-border-subtle px-2 py-1 text-[10px] font-bold tracking-wider text-brand transition-colors hover:bg-brand/10"
              @click="store.addNavLink()"
            >
              + Add link
            </LazyVButton>
          </div>

          <div
            v-for="(link, i) in store.navLinks"
            :key="i"
            class="rounded-lg border border-border-subtle bg-bg-elevated/60 p-3"
          >
            <div class="flex items-start gap-2">
              <div class="min-w-0 flex-1 space-y-2">
                <LazyVInput
                  type="text"
                  :model-value="link.label"
                  label="Label"
                  placeholder="Collection"
                  input-class="!w-full !rounded-md !border-border-subtle !bg-bg-base !px-2.5 !py-1.5 !text-[12px] !text-tx-primary !outline-none !transition-colors focus:!border-brand"
                  @update:model-value="store.updateNavLink(i, 'label', $event)"
                />
                <LazyVInput
                  type="text"
                  :model-value="link.href"
                  label="URL"
                  placeholder="/collection"
                  input-class="!w-full !rounded-md !border-border-subtle !bg-bg-base !px-2.5 !py-1.5 !text-[11px] !text-tx-primary !outline-none !transition-colors focus:!border-brand"
                  @update:model-value="store.updateNavLink(i, 'href', $event)"
                />
              </div>
              <LazyVButton
                variant="none"
                type="button"
                className="mt-0.5 shrink-0 rounded-md p-1.5 text-tx-muted transition-colors hover:bg-bg-overlay hover:text-red-400"
                title="Remove link"
                @click="store.removeNavLink(i)"
              >
                <Icon name="ph:trash-bold" class="text-base" />
              </LazyVButton>
            </div>
          </div>

          <div
            v-if="store.navLinks.length === 0"
            class="rounded-lg border border-dashed border-border-subtle py-6 text-center"
          >
            <p class="text-[11px] text-tx-muted">No nav links yet.</p>
            <LazyVButton
              variant="none"
              type="button"
              className="mt-2 text-[11px] font-semibold text-brand hover:underline"
              @click="store.addNavLink()"
            >
              Add your first link
            </LazyVButton>
          </div>
        </div>
      </lazy-setting-group>

      <!-- ── Colors ─────────────────────────────────────────────── -->
      <lazy-setting-group title="Colors">
        <lazy-setting-color v-model="primary" label="Primary" />
        <div class="mt-4">
          <lazy-setting-color v-model="secondary" label="Secondary" />
        </div>
        <div class="mt-4">
          <lazy-setting-color v-model="background" label="Background" />
        </div>
      </lazy-setting-group>

      <!-- ── Typography ─────────────────────────────────────────── -->
      <lazy-setting-group title="Typography">
        <lazy-setting-font-picker v-model="headingFont" label="Heading font" />
        <div class="mt-4">
          <lazy-setting-font-picker v-model="bodyFont" label="Body font" />
        </div>
        
        <div class="mt-4">
          <lazy-setting-range
            v-model="baseSize"
            label="Base font size"
            :min="12"
            :max="20"
            :step="1"
            unit="px"
          />
        </div>
      </lazy-setting-group>

      <!-- ── Layout ─────────────────────────────────────────────── -->
      <lazy-setting-group title="Layout">
        <lazy-setting-radio-cards
          v-model="radius"
          label="Corner radius"
          :options="radiusOptions"
        />
      </lazy-setting-group>

      <LazyVButton
        variant="none"
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-brand/40 bg-brand/10 py-3 text-[10px] font-black tracking-wider text-brand transition-colors hover:bg-brand/20"
        @click="planGateOpen = true"
      >
        <Icon name="ph:sparkle-bold" />
        Unlock premium fonts
      </LazyVButton>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const store = useBuilderStore();

defineEmits<{
  collapse: [];
}>();

const UiButton = resolveComponent("VButton");
const { planGateOpen } = useBuilderModals();

const primary = ref("#6366f1");
const secondary = ref("#0ea5e9");
const background = ref("#0c0c14");
const headingFont = ref("Playfair Display");
const bodyFont = ref("Inter");
const baseSize = ref(16);
const radius = ref("medium");

const radiusOptions = [
  { value: "none", label: "None", description: "Sharp corners" },
  { value: "small", label: "Small", description: "Subtle" },
  { value: "medium", label: "Medium", description: "Default" },
  { value: "large", label: "Large", description: "Soft" },
];
</script>