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
        <lazy-setting-toggle
          v-model="sandbox"
          label="Sandbox in preview (safer)"
        />
      </div>
    </lazy-setting-group>

    <p class="text-[11px] leading-relaxed text-tx-muted">
      Raw HTML is rendered on the admin. Only paste trusted snippets.
    </p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool } = useSectionSettingsForm();

const html = str("html", "");
const sandbox = bool("sandbox_preview", true);
</script>