<template>
  <div class="space-y-6">
    <lazy-setting-group title="Divider" default-open>
      <lazy-setting-select
        v-model="style"
        label="Style"
        :options="[
          { value: 'solid', label: 'Solid' },
          { value: 'dashed', label: 'Dashed' },
          { value: 'dotted', label: 'Dotted' },
          { value: 'gradient', label: 'Gradient' },
          { value: 'ornament', label: 'Ornament' },
        ]"
      />

      <div class="mt-4">
        <lazy-setting-select
          v-model="width"
          label="Width"
          :options="[
            { value: 'full', label: 'Full' },
            { value: 'medium', label: 'Medium' },
            { value: 'narrow', label: 'Narrow' },
          ]"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-range
          v-model="thickness"
          label="Thickness"
          :min="1"
          :max="8"
          :step="1"
          unit="px"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-color v-model="color" label="Color" />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num } = useSectionSettingsForm();

const style = str("style", "solid");
const width = str("width", "full");
const thickness = num("thickness", 1);
const color = str("color", "#e5e5e5");
</script>
