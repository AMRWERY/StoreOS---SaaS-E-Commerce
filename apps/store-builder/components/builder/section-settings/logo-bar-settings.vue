<template>
  <div class="space-y-6">
    <lazy-setting-group title="Logo bar" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-range
          v-model="logoCount"
          label="Placeholder slots (when no logos added)"
          :min="4"
          :max="12"
          :step="1"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="grayscale" label="Grayscale logos" />
      </div>
      <div class="mt-4">
        <lazy-setting-toggle v-model="marquee" label="Scroll as marquee" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Design">
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-repeater v-model="logos" label="Logos" :new-item="{ name: 'Brand', url: '' }">
      <template #default="{ item }">
        <lazy-setting-text
          :model-value="String(item.name ?? '')"
          label="Name"
          @update:model-value="(v: string) => updateItem(item, 'name', v)"
        />
        <div class="mt-2">
          <lazy-setting-text
            :model-value="String(item.url ?? '')"
            label="Image URL"
            @update:model-value="(v: string) => updateItem(item, 'url', v)"
          />
        </div>
      </template>
    </lazy-setting-repeater>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num, bool, patch, section } = useSectionSettingsForm();

const heading = str("heading", "As featured in");
const logoCount = num("logo_count", 6);
const grayscale = bool("grayscale", true);
const marquee = bool("marquee", false);
const variant = str("variant", "row");

const variantOptions = [
  { value: "row", label: "Row", icon: "ph:minus-bold", description: "Centered, wrapping" },
  { value: "grid", label: "Grid", icon: "ph:squares-four-bold", description: "Even columns" },
  { value: "boxed", label: "Boxed", icon: "ph:frame-corners-bold", description: "Logo tiles" },
];

const logos = computed({
  get: () => {
    const raw = section.value?.settings.logos;
    return Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
  },
  set: (v: Record<string, unknown>[]) => patch({ logos: v }),
});

const updateItem = (row: Record<string, unknown>, key: string, v: string) => {
  patch({ logos: logos.value.map((it) => (it === row ? { ...it, [key]: v } : it)) });
};
</script>
