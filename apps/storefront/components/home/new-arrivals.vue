<template>
  <div>
    <section class="bg-bg-primary py-24 border-y border-border-subtle">
      <div class="max-w-7xl mx-auto px-12 md:px-24">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-tx-primary tracking-tight">
              {{ t("storefront.home.newArrivals") }}
            </h2>
            <div class="h-1 w-12 bg-brand mt-3 rounded-full"></div>
          </div>
          <nuxt-link-locale
            to="/shop-all"
            class="text-[11px] font-bold text-brand hover:text-brand-hover transition-colors tracking-widest flex items-center gap-2 group"
          >
            {{ t("common.viewAll") }}
            <Icon
              name="ph:arrow-right"
              class="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </nuxt-link-locale>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <nuxt-link-locale
            v-for="product in products"
            :key="product.id"
            :to="`/shop-all/${product.slug}`"
            class="group relative bg-bg-base border border-border-subtle rounded-[16px] p-2 transition-all hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 flex flex-col h-full cursor-pointer"
          >
            <div
              class="relative overflow-hidden rounded-[12px] h-[200px] bg-bg-elevated"
            >
              <img
                :src="product.image"
                class="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <span
                v-if="product.tag"
                :class="[
                  product.tag.type === 'new' ? 'bg-brand' : 'bg-red-500',
                ]"
                class="absolute top-4 start-4 rounded-full px-3 py-1 text-[9px] font-black text-white tracking-widest shadow-lg"
              >
                {{ product.tag.text }}
              </span>
            </div>
            <div class="p-3 flex-1 flex flex-col">
              <h3
                class="text-[13px] font-bold text-tx-secondary group-hover:text-tx-primary transition-colors truncate"
              >
                {{ product.name }}
              </h3>
              <div class="mt-2 flex items-baseline gap-2 font-bold">
                <span class="text-tx-primary text-[16px]"
                  >${{ product.price.toLocaleString() }}</span
                >
                <span
                  v-if="product.oldPrice"
                  class="text-tx-muted opacity-60 line-through text-[11px]"
                  >${{ product.oldPrice.toLocaleString() }}</span
                >
              </div>
              <div class="mt-auto pt-4">
                <VButton
                  variant="none"
                  className="w-full bg-bg-elevated hover:bg-white border border-border-subtle hover:border-brand/40 text-[10px] font-black tracking-widest py-3 transition-all rounded-xl"
                >
                  {{ t("storefront.home.quickAdd") }}
                </VButton>
              </div>
            </div>
          </nuxt-link-locale>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  products: Array<any>;
}>();
</script>