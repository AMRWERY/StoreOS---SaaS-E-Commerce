<template>
  <div>
    <div class="min-h-screen">
      <NuxtRouteAnnouncer />

      <navbar v-if="!$route.path.includes('/dashboard')" />
      
      <nuxt-layout>
        <main>
          <nuxt-page />
        </main>

        <Footer v-if="!$route.path.includes('/dashboard')" />
      </nuxt-layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur']

useHead(computed(() => ({
  htmlAttrs: {
    dir: RTL_LOCALES.includes(locale.value) ? 'rtl' : 'ltr',
    lang: locale.value,
  },
})))
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>