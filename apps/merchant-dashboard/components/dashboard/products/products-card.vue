<template>
  <LazyVProductCard :product="product" :viewMode="viewMode" />
</template>

<script lang="ts" setup>
import type { Product } from "@/types/VProductCard";

withDefaults(
  defineProps<{
    product: Product;
    viewMode?: "grid" | "list";
  }>(),
  {
    viewMode: "grid",
  },
);
</script>
