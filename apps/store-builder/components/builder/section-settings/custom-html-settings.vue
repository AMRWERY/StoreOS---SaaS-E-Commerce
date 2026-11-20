<template>
  <div class="space-y-6">
    <lazy-setting-group title="Custom HTML" default-open>
      <lazy-setting-textarea
        v-model="html"
        label="Markup"
        :rows="10"
        placeholder="<div>…</div>"
      />
      <div class="mt-4">
        <lazy-setting-range
          v-model="height"
          label="Frame height"
          :min="40"
          :max="1200"
          :step="10"
          unit="px"
        />
      </div>
    </lazy-setting-group>

    <p class="text-[11px] leading-relaxed text-tx-muted">
      Your markup is shown in a sandboxed frame: styles and layout work, but
      scripts do not run.
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num } = useSectionSettingsForm();

const html = str("html", "");
const height = num("height", 240);
</script>
