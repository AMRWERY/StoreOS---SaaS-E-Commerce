<template>
  <div>
    <section class="relative h-[80vh] w-full overflow-hidden">
      <img
        src="/img/hero-banner.avif"
        class="absolute inset-0 h-full w-full object-cover opacity-80"
        alt="Hero Image"
      />
      <!-- Gradient overlay to blend with bg-base -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-bg-base/40 via-transparent to-transparent"
      ></div>

      <div
        class="relative flex h-full items-center px-12 md:px-24 max-w-7xl mx-auto"
      >
        <div class="max-w-2xl space-y-6">
          <span class="text-[10px] font-black tracking-[0.5em] text-brand">{{
            t("storefront.hero.systemReady")
          }}</span>
          <h1
            class="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter text-tx-primary"
          >
            {{ t("storefront.hero.titleLine1") }} <br />
            {{ t("storefront.hero.titleLine2") }}
          </h1>
          <p
            class="text-[15px] font-normal leading-relaxed text-tx-secondary max-w-lg"
          >
            {{ t("storefront.hero.subtitle") }}
          </p>
          <VButton variant="primary" className="px-10 py-4 tracking-[0.2em]">
            {{ t("storefront.hero.accessCatalog") }}
          </VButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
</script>