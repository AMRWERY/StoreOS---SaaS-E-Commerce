<template>
  <div class="space-y-6">
    <lazy-setting-group title="Spacer" default-open>
      <lazy-setting-range
        v-model="height"
        label="Height"
        :min="8"
        :max="160"
        unit="px"
      />
      <div class="mt-4">
        <lazy-setting-toggle v-model="mobileHide" label="Hide on mobile" />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { num, bool } = useSectionSettingsForm();

const height = num("height", 48);
const mobileHide = bool("hide_mobile", false);
</script>