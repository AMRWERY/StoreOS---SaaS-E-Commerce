<template>
  <div>
    <div class="max-w-7xl mx-auto px-12 md:px-24 py-12">
      <div
        class="bg-brand py-4 overflow-hidden whitespace-nowrap border-y border-brand/20 shadow-lg shadow-brand/10 rounded"
      >
        <div class="flex gap-20 items-center justify-center animate-scroll">
          <span
            v-for="i in 6"
            :key="i"
            class="text-[10px] font-black text-white tracking-[0.4em] opacity-90 drop-shadow-sm"
          >
            {{ t("storefront.home.activeBar") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.animate-scroll {
  display: flex;
  width: max-content;
  animation: scroll 40s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>