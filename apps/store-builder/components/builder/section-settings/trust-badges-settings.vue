<template>
  <div class="space-y-6">
    <lazy-setting-group title="Trust row" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-toggle v-model="icons" label="Show icons" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Design">
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-repeater v-model="items" label="Badges" :new-item="{ title: 'New badge', desc: '', icon: '' }">
      <template #default="{ item }">
        <lazy-setting-text
          :model-value="String(item.title ?? '')"
          label="Line"
          @update:model-value="(v: string) => updateItem(item, 'title', v)"
        />
        <div class="mt-2">
          <lazy-setting-text
            :model-value="String(item.desc ?? '')"
            label="Description"
            @update:model-value="(v: string) => updateItem(item, 'desc', v)"
          />
        </div>
        <div class="mt-2">
          <lazy-setting-text
            :model-value="String(item.icon ?? '')"
            label="Icon (e.g. ph:truck-bold)"
            @update:model-value="(v: string) => updateItem(item, 'icon', v)"
          />
        </div>
      </template>
    </lazy-setting-repeater>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool, patch, section } = useSectionSettingsForm();

const heading = str("heading", "Why shop with us");
const icons = bool("show_icons", true);
const variant = str("variant", "grid");

const variantOptions = [
  { value: "grid", label: "Grid", icon: "ph:squares-four-bold", description: "Centered columns" },
  { value: "inline", label: "Inline", icon: "ph:minus-bold", description: "One compact row" },
  { value: "cards", label: "Cards", icon: "ph:cards-bold", description: "Bordered tiles" },
];

const items = computed({
  get: () => {
    const raw = section.value?.settings.items;
    if (Array.isArray(raw) && raw.length)
      return raw as Record<string, unknown>[];
    return [
      { title: "Free returns" },
      { title: "Secure checkout" },
      { title: "Carbon neutral" },
    ];
  },
  set: (v: Record<string, unknown>[]) => patch({ items: v }),
});

const updateItem = (row: Record<string, unknown>, key: string, v: string) => {
  const next = items.value.map((it) => {
    if (it !== row) return it;
    return { ...it, [key]: v };
  });
  patch({ items: next });
};
</script>
