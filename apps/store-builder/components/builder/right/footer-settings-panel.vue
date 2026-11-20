<template>
  <aside
    class="flex h-full flex-col overflow-hidden"
    aria-label="Footer settings"
  >
    <!-- Header -->
    <div
      class="flex h-12 shrink-0 items-center gap-2.5 border-b border-border-subtle px-4"
    >
      <Icon name="ph:layout-bold" class="text-sm text-brand" />
      <span class="text-[13px] font-semibold text-tx-primary">Footer</span>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-5">
      <!-- Style picker -->
      <div class="space-y-2">
        <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">
          Footer style
        </p>
        <div class="grid grid-cols-2 gap-2">
          <LazyVButton
            v-for="style in FOOTER_STYLES"
            :key="style.value"
            variant="none"
            type="button"
            :class-name="[
              'relative flex flex-col items-start overflow-hidden rounded-xl border-2 p-3 text-start transition-all',
              store.footerStyle === style.value
                ? 'border-brand bg-brand/5'
                : 'border-border-default bg-bg-elevated hover:border-border-subtle',
            ].join(' ')"
            @click="store.footerStyle = style.value"
          >
            <div
              class="mb-2.5 w-full overflow-hidden rounded-lg border border-border-subtle"
              :class="style.dark ? 'bg-neutral-900' : 'bg-neutral-50'"
            >
              <chrome-sketch kind="footer" :variant="style.value" />
            </div>
            <p
              class="text-[11px] font-bold"
              :class="
                store.footerStyle === style.value
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
              v-if="store.footerStyle === style.value"
              class="absolute end-2 top-2 flex size-4 items-center justify-center rounded-full bg-brand"
            >
              <Icon name="ph:check-bold" class="text-[9px] text-white" />
            </div>
          </LazyVButton>
        </div>
      </div>

      <!-- Tagline -->
      <div class="space-y-1.5">
        <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">
          Brand
        </p>
        <LazyVInput
          type="text"
          :model-value="store.localTagline"
          label="Tagline"
          placeholder="Short brand tagline…"
          input-class="!w-full !rounded-lg !border-border-default !bg-bg-elevated !px-3 !py-2 !text-xs !text-tx-primary focus:!border-brand focus:!outline-none"
          @update:model-value="store.setFooterTagline($event)"
        />
        <div class="mt-2">
          <LazyVInput
            type="text"
            :model-value="store.localCopyright"
            label="Copyright text"
            placeholder="© 2025 My Store…"
            input-class="!w-full !rounded-lg !border-border-default !bg-bg-elevated !px-3 !py-2 !text-xs !text-tx-primary focus:!border-brand focus:!outline-none"
            @update:model-value="store.setFooterCopyright($event)"
          />
        </div>
      </div>

      <!-- Social toggle -->
      <div class="space-y-1.5">
        <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">
          Social
        </p>
        <div
          class="flex items-center justify-between rounded-lg border border-border-default bg-bg-elevated px-3 py-2.5"
        >
          <span class="text-xs text-tx-primary">Show social icons</span>
          <LazyVButton
            variant="none"
            type="button"
            :class-name="[
              'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none',
              store.footerShowSocial ? 'bg-brand' : 'bg-bg-overlay',
            ].join(' ')"
            role="switch"
            :aria-checked="store.footerShowSocial"
            @click="store.footerShowSocial = !store.footerShowSocial"
          >
            <span
              class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition-transform"
              :class="
                store.footerShowSocial ? 'translate-x-4' : 'translate-x-0'
              "
            />
          </LazyVButton>
        </div>
      </div>

      <!-- Columns -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between">
          <p class="text-[9px] font-black tracking-[0.2em] text-tx-muted">
            Link columns
            <span
              class="ms-1 rounded-full bg-bg-overlay px-1.5 py-0.5 text-tx-secondary"
              >{{ store.footerColumns.length }}</span
            >
          </p>
          <LazyVButton
            variant="none"
            type="button"
            className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-brand hover:bg-brand/10"
            @click="store.addFooterColumn()"
          >
            <Icon name="ph:plus-bold" class="text-[9px]" />
            Add column
          </LazyVButton>
        </div>

        <p
          v-if="store.footerColumns.length === 0"
          class="rounded-lg border border-dashed border-border-default px-4 py-6 text-center text-xs text-tx-muted"
        >
          No columns yet
        </p>

        <div v-else class="space-y-3">
          <div
            v-for="(col, ci) in store.localFooterColumns"
            :key="ci"
            class="overflow-hidden rounded-xl border border-border-default bg-bg-elevated"
          >
            <!-- Column header -->
            <div
              class="flex items-center gap-2 border-b border-border-subtle px-3 py-2.5"
            >
              <Icon
                name="ph:dots-six-vertical-bold"
                class="text-sm text-tx-muted"
              />
              <LazyVInput
                type="text"
                :model-value="col.title"
                placeholder="Column title"
                input-class="!min-w-0 !flex-1 !bg-transparent !text-xs !font-semibold !text-tx-primary !placeholder-tx-muted focus:!outline-none"
                @update:model-value="store.updateFooterColumn(ci, $event)"
              />
              <LazyVButton
                variant="none"
                type="button"
                className="rounded-md p-1 text-tx-muted hover:bg-bg-overlay hover:text-red-400"
                title="Remove column"
                @click="store.removeFooterColumn(ci)"
              >
                <Icon name="ph:trash-bold" class="text-xs" />
              </LazyVButton>
            </div>

            <!-- Links -->
            <div class="p-2.5">
              <div
                v-if="col.links.length === 0"
                class="py-2 text-center text-[10px] text-tx-muted"
              >
                No links
              </div>
              <div v-else class="space-y-1.5 mb-2">
                <div
                  v-for="(link, li) in col.links"
                  :key="li"
                  class="flex items-center gap-1.5 rounded-lg bg-bg-base px-2 py-1.5"
                >
                  <div class="min-w-0 flex-1 space-y-1">
                    <LazyVInput
                      type="text"
                      :model-value="link.label"
                      placeholder="Label"
                      input-class="!w-full !bg-transparent !text-[11px] !font-medium !text-tx-primary !placeholder-tx-muted focus:!outline-none"
                      @update:model-value="
                        store.updateFooterLink(ci, li, 'label', $event)
                      "
                    />
                    <LazyVInput
                      type="text"
                      :model-value="link.href"
                      placeholder="/path"
                      input-class="!w-full !bg-transparent !text-[10px] !text-tx-muted !placeholder-tx-muted focus:!outline-none"
                      @update:model-value="
                        store.updateFooterLink(ci, li, 'href', $event)
                      "
                    />
                  </div>
                  <LazyVButton
                    variant="none"
                    type="button"
                    className="shrink-0 rounded p-1 text-tx-muted hover:text-red-400"
                    @click="store.removeFooterLink(ci, li)"
                  >
                    <Icon name="ph:x-bold" class="text-[10px]" />
                  </LazyVButton>
                </div>
              </div>
              <LazyVButton
                variant="none"
                type="button"
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-border-default py-1.5 text-[10px] font-semibold text-tx-muted hover:border-brand hover:text-brand"
                @click="store.addFooterLink(ci)"
              >
                <Icon name="ph:plus-bold" class="text-[9px]" />
                Add link
              </LazyVButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { FOOTER_STYLE_OPTIONS } from "@/data/chrome-styles";

const FOOTER_STYLES = FOOTER_STYLE_OPTIONS;
const { t } = useI18n();
const store = useBuilderStore();

</script>