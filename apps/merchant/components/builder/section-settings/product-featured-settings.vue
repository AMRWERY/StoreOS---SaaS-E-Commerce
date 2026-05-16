<template>
  <div class="space-y-6">
    <SettingGroup title="Featured product" default-open>
      <SettingProductPicker v-model="productId" label="Product" />
      <div class="mt-4">
        <SettingText v-model="badge" label="Badge text" placeholder="Bestseller" />
      </div>
      <div class="mt-4">
        <SettingToggle v-model="showPrice" label="Show price" />
      </div>
    </SettingGroup>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { str, bool } = useSectionSettingsForm()
const productId = str('product_id', '')
const badge = str('badge', '')
const showPrice = bool('show_price', true)
</script>