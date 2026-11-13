<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <LazyVStatCard
        v-for="(stat, index) in localizedStats"
        :key="stat.label"
        v-bind="stat.props"
        class="animate-fade-up"
        :style="{ animationDelay: `${index * 50}ms` }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const { stats } = storeToRefs(useDashboardStore());

const localizedStats = computed(() =>
  stats.value.map(({ labelKey, trendKey, ...rest }) => ({
    label: rest.label,
    props: {
      ...rest,
      label: t(labelKey),
      trend: trendKey ? t(trendKey) : rest.trend,
    },
  })),
);
</script>