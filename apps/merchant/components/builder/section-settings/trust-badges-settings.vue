<template>
  <div class="space-y-6">
    <lazy-setting-group title="Trust row" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-toggle v-model="icons" label="Show icons" />
      </div>
    </lazy-setting-group>

    <lazy-setting-repeater v-model="items" label="Badges">
      <template #default="{ item }">
        <lazy-setting-text
          :model-value="String(item.title ?? '')"
          label="Line"
          @update:model-value="(v: string) => updateItem(item, 'title', v)"
        />
      </template>
    </lazy-setting-repeater>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool, patch, section } = useSectionSettingsForm();

const heading = str("heading", "Why shop with us");
const icons = bool("show_icons", true);

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