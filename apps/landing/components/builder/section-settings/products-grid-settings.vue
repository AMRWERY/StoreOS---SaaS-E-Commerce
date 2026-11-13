<template>
  <div class="space-y-6">
    <lazy-setting-group title="Grid" default-open>
      <lazy-setting-text v-model="heading" label="Heading" />
      <div class="mt-4">
        <lazy-setting-range
          v-model="columns"
          label="Columns"
          :min="2"
          :max="5"
          :step="1"
        />
      </div>

      <div class="mt-4">
        <lazy-setting-range
          v-model="limit"
          label="Products shown"
          :min="4"
          :max="24"
          :step="1"
        />
      </div>
    </lazy-setting-group>

    <lazy-setting-group title="Card style">
      <lazy-setting-radio-cards
        v-model="cardStyle"
        label="Design"
        :options="cardStyleOptions"
      />
    </lazy-setting-group>

    <lazy-setting-product-picker v-model="featuredId" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { str, num } = useSectionSettingsForm();

const heading = str("heading", "Shop the edit");
const columns = num("columns", 3);
const limit = num("limit", 8);
const featuredId = str("featured_product_id", "");
const cardStyle = str("card_style", "shop");

const cardStyleOptions = [
  {
    value: "shop",
    label: "Shop",
    icon: "ph:shopping-bag-bold",
    description: "Category · stars · add button",
  },
  {
    value: "sale",
    label: "Sale",
    icon: "ph:tag-bold",
    description: "Discount badge + wishlist",
  },
  {
    value: "horizontal",
    label: "Horizontal",
    icon: "ph:list-bold",
    description: "Small image · details right",
  },
  {
    value: "editorial",
    label: "Editorial",
    icon: "ph:article-bold",
    description: "Image top · CTA button",
  },
];
</script>