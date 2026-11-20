<template>
  <div v-if="definition?.groups" class="space-y-6">
    <lazy-setting-group
      v-for="group in definition.groups"
      :key="group.title"
      :title="group.title"
      :default-open="group.open"
    >
      <div class="space-y-4">
        <template v-for="field in group.fields" :key="field.key">
          <lazy-setting-repeater
            v-if="field.type === 'repeater'"
            :model-value="rows(field.key)"
            :label="field.label"
            :new-item="field.newItem"
            @update:model-value="(v: Record<string, unknown>[]) => set(field.key, v)"
          >
            <template #default="{ item, index }">
              <div class="space-y-2">
                <template v-for="sub in field.itemFields" :key="sub.key">
                  <schema-field
                    :field="sub"
                    :model-value="item[sub.key]"
                    @update:model-value="(v: unknown) => setRow(field.key, index, sub.key, v)"
                  />
                </template>
              </div>
            </template>
          </lazy-setting-repeater>

          <schema-field
            v-else
            :field="field"
            :model-value="value(field.key)"
            @update:model-value="(v: unknown) => set(field.key, v)"
          />
        </template>
      </div>
    </lazy-setting-group>
  </div>
  <generic-section-settings v-else />
</template>

<script lang="ts" setup>
import { getSectionDefinition } from "@/data/section-registry";

const { section, patch } = useSectionSettingsForm();

const definition = computed(() =>
  section.value ? getSectionDefinition(section.value.type) : undefined,
);

/** Stored value, falling back to the definition's default. */
const value = (key: string) =>
  section.value?.settings[key] ?? definition.value?.defaults[key];

const rows = (key: string): Record<string, unknown>[] => {
  const v = value(key);
  return Array.isArray(v) ? (v as Record<string, unknown>[]) : [];
};

const set = (key: string, v: unknown) => patch({ [key]: v });

const setRow = (key: string, index: number, field: string, v: unknown) => {
  const next = rows(key).map((row, i) =>
    i === index ? { ...row, [field]: v } : row,
  );
  patch({ [key]: next });
};
</script>
