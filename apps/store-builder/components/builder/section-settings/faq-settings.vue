<template>
  <div class="space-y-6">
    <lazy-setting-group title="FAQ" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-toggle v-model="accordion" label="Accordion behavior" />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Design">
      <lazy-setting-radio-cards
        v-model="variant"
        label="Design"
        :options="variantOptions"
      />
    </lazy-setting-group>

    <lazy-setting-repeater v-model="items" label="Questions" :new-item="{ q: 'New question', a: '' }">
      <template #default="{ item }">
        <lazy-setting-text
          :model-value="String(item.q ?? '')"
          label="Question"
          @update:model-value="(v: string) => updateItem(item, 'q', v)"
        />

        <div class="mt-2">
          <lazy-setting-textarea
            :model-value="String(item.a ?? '')"
            label="Answer"
            :rows="2"
            @update:model-value="(v: string) => updateItem(item, 'a', v)"
          />
        </div>
      </template>
    </lazy-setting-repeater>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const { str, bool, patch, section } = useSectionSettingsForm();
const heading = str("heading", "Common questions");
const accordion = bool("accordion", true);
const variant = str("variant", "classic");

const variantOptions = [
  { value: "classic", label: "Classic", icon: "ph:list-bold", description: "Divided list" },
  { value: "cards", label: "Cards", icon: "ph:cards-bold", description: "Boxed questions" },
  { value: "two_column", label: "Two column", icon: "ph:columns-bold", description: "Heading beside list" },
];

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
