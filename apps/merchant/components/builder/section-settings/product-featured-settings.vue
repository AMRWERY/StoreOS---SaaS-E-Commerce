<template>
  <div class="space-y-6">
    <lazy-setting-group title="Featured product" default-open>
      <lazy-setting-product-picker v-model="productId" label="Product" />
      <div class="mt-4">
        <lazy-setting-text
          v-model="badge"
          label="Badge text"
          placeholder="Bestseller"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-toggle v-model="showPrice" label="Show price" />
      </div>
    </lazy-setting-group>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, bool } = useSectionSettingsForm();

const productId = str("product_id", "");
const badge = str("badge", "");
const showPrice = bool("show_price", true);
</script>