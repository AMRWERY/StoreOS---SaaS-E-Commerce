<template>
  <div>
    <section class="py-20 px-12 md:px-24 max-w-7xl mx-auto">
      <div class="mb-12">
        <span class="text-[10px] font-bold tracking-[0.4em] text-tx-muted">{{ $t('storefront.home.rootDirectory') }}</span>
        <h2 class="mt-1 text-3xl font-bold text-tx-primary tracking-tight">{{ $t('storefront.home.shopByCategory') }}</h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="cat in categories" :key="cat.name" class="group cursor-pointer flex flex-col items-center text-center">
          <div
            class="overflow-hidden rounded-full w-24 h-24 md:w-32 md:h-32 bg-bg-primary border border-border-subtle transition-all duration-500 group-hover:border-brand/40 group-hover:shadow-xl group-hover:shadow-brand/5 group-hover:-translate-y-1">
            <img :src="cat.image"
              class="w-full h-full object-cover opacity-90 grayscale-[10%] transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0" />
          </div>
          <div class="mt-4 flex-1 flex flex-col">
            <h3 class="text-[12px] font-bold text-tx-primary group-hover:text-brand transition-colors">{{ cat.name }}
            </h3>
            <p class="text-[9px] text-tx-muted tracking-tight mt-0.5">{{ cat.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  categories: Array<{ name: string; desc: string; image: string }>;
}>();
</script>
