<template>
  <div>
    <section class="py-24 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ t("home.problem.title") }}
          </h2>
          <p class="text-gray-400">{{ t("home.problem.subtitle") }}</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="p in problems"
            :key="p.title"
            class="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition group"
          >
            <Icon
              :name="p.icon"
              class="w-8 h-8 text-indigo-500 mb-6 group-hover:scale-110 transition-transform"
            />
            <h3 class="text-xl font-bold mb-3">{{ p.title }}</h3>
            <p class="text-gray-400 leading-relaxed text-sm">{{ p.desc }}</p>
          </div>
        </div>

        <div class="mt-16 text-center">
          <p class="text-orange-500 font-bold text-xs tracking-[0.2em] mb-4">
            {{ t("home.problem.betterWay") }}
          </p>
          <div class="animate-bounce">↓</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const problems = computed(() => [
  {
    title: t("home.problem.whatsapp.title"),
    desc: t("home.problem.whatsapp.desc"),
    icon: "ph:chat-centered-dots-bold",
  },
  {
    title: t("home.problem.excel.title"),
    desc: t("home.problem.excel.desc"),
    icon: "ph:file-xls-bold",
  },
  {
    title: t("home.problem.profitability.title"),
    desc: t("home.problem.profitability.desc"),
    icon: "ph:chart-bar-bold",
  },
]);
</script>
