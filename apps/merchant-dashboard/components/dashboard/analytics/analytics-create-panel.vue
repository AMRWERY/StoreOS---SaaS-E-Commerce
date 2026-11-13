<template>
  <VSidePanel
    :model-value="isOpen"
    :title="t('dashboard.analytics.createReport')"
    :subtitle="t('dashboard.analytics.createReportSubtitle')"
    @close="$emit('close')"
  >
    <div class="space-y-8">
      <LazyVInput
        v-model="form.name"
        required
        :label="t('dashboard.analytics.reportName')"
        placeholder="e.g. Weekly revenue"
      />

      <LazyVSelectInput
        v-model="form.metric"
        :label="t('dashboard.analytics.metric')"
        :options="metricOptions"
      />

      <LazyVSelectInput
        v-model="form.timeframe"
        :label="t('dashboard.analytics.timeframe')"
        :options="timeframeOptions"
      />

      <LazyVSelectInput
        v-model="form.groupBy"
        :label="t('dashboard.analytics.groupBy')"
        :options="groupByOptions"
      />

      <LazyVSwitchButton
        v-model="form.compare"
        :label="t('dashboard.analytics.compare')"
      />
    </div>

    <template #footer>
      <div class="flex items-center gap-3">
        <LazyVButton
          variant="secondary"
          :label="t('common.cancel')"
          className="flex-1"
          @click="$emit('close')"
        />
        <LazyVButton
          variant="primary"
          :label="t('dashboard.analytics.createReport')"
          icon="ph:plus-bold"
          :disabled="!canSubmit"
          className="flex-1"
          @click="submit"
        />
      </div>
    </template>
  </VSidePanel>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
  create: [report: ReportForm];
}>();

interface ReportForm {
  name: string;
  metric: string;
  timeframe: string;
  groupBy: string;
  compare: boolean;
}

const { t } = useI18n();

const metricOptions = computed(() => [
  { value: "revenue", label: t("dashboard.analytics.revenue") },
  { value: "orders", label: t("dashboard.analytics.orders") },
  { value: "aov", label: t("dashboard.analytics.avgOrderValue") },
  { value: "newCustomers", label: t("dashboard.analytics.newCustomers") },
  {
    value: "returningCustomers",
    label: t("dashboard.analytics.returningCustomers"),
  },
]);

const timeframeOptions = computed(() => [
  { value: "today", label: t("dashboard.analytics.today") },
  { value: "yesterday", label: t("dashboard.analytics.yesterday") },
  { value: "last7days", label: t("dashboard.analytics.last7days") },
  { value: "last30days", label: t("dashboard.analytics.last30days") },
]);

const groupByOptions = computed(() => [
  { value: "day", label: t("dashboard.analytics.day") },
  { value: "week", label: t("dashboard.analytics.week") },
  { value: "month", label: t("dashboard.analytics.month") },
]);

const emptyForm = (): ReportForm => ({
  name: "",
  metric: "revenue",
  timeframe: "last7days",
  groupBy: "day",
  compare: false,
});

const form = ref<ReportForm>(emptyForm());

// Start from a blank form every time the panel opens.
watch(
  () => props.isOpen,
  (open) => {
    if (open) form.value = emptyForm();
  },
);

const canSubmit = computed(() => form.value.name.trim() !== "");

const submit = () => {
  if (!canSubmit.value) return;
  emit("create", { ...form.value });
};
</script>
