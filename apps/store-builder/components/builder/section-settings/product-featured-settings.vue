<template>
  <div class="space-y-6">
    <lazy-setting-group title="Design" default-open>
      <lazy-setting-radio-cards v-model="variant" label="Layout" :options="variantOptions" />
    </lazy-setting-group>

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
const variant = str("variant", "split");
const variantOptions = [
  { value: "split", label: "Split", icon: "ph:columns-bold", description: "Image beside details" },
  { value: "centered", label: "Centered", icon: "ph:align-center-horizontal-bold", description: "Stacked and centered" },
  { value: "overlay", label: "Overlay", icon: "ph:image-bold", description: "Card over full image" },
];

const productId = str("product_id", "");
const badge = str("badge", "");
const showPrice = bool("show_price", true);
</script>