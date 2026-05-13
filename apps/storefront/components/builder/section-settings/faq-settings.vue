<template>
  <div class="space-y-6">
    <SettingGroup title="FAQ" default-open>
      <SettingText v-model="heading" label="Heading" />
      <div class="mt-4">
        <SettingToggle v-model="accordion" label="Accordion behavior" />
      </div>
    </SettingGroup>
    <SettingRepeater v-model="items" label="Questions">
      <template #default="{ item }">
        <SettingText
          :model-value="String(item.q ?? '')"
          label="Question"
          @update:model-value="(v: string) => updateItem(item, 'q', v)"
        />
        <div class="mt-2">
          <SettingTextarea
            :model-value="String(item.a ?? '')"
            label="Answer"
            :rows="2"
            @update:model-value="(v: string) => updateItem(item, 'a', v)"
          />
        </div>
      </template>
    </SettingRepeater>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const { str, bool, patch, section } = useSectionSettingsForm();
const heading = str("heading", "Common questions");
const accordion = bool("accordion", true);

const items = computed({
  get: () => {
    const raw = section.value?.settings.items;
    if (Array.isArray(raw) && raw.length)
      return raw as Record<string, unknown>[];
    return [{ q: "Shipping times?", a: "3–5 business days." }];
  },
  set: (v: Record<string, unknown>[]) => patch({ items: v }),
});

const updateItem = (row: Record<string, unknown>, key: string, v: string) => {
  const next = items.value.map((it) => (it === row ? { ...it, [key]: v } : it));
  patch({ items: next });
};
</script>