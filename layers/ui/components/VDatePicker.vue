<template>
  <div class="v-date-picker relative w-full">
    <VueDatePicker
      :model-value="dateValue"
      :locale="dpLocale"
      :min-date="minDate"
      :max-date="maxDate"
      :disabled="disabled"
      :time-config="{ enableTimePicker }"
      :config="{ keepActionRow: true }"
      :action-row="{
        showNow: true,
        showSelect: false,
        showCancel: false,
        nowBtnLabel: t('common.today'),
      }"
      :formats="{ input: enableTimePicker ? 'PP p' : 'PP' }"
      :dark="isDark"
      auto-apply
      teleport
      @update:model-value="onUpdate"
      @open="isOpen = true"
      @closed="isOpen = false"
    >
      <!-- Trigger: slot or default card -->
      <template #trigger>
        <slot name="trigger" :selectedDate="formattedDate" :isOpen="isOpen">
          <div
            class="bg-bg-primary border border-border-subtle rounded-xl px-4 py-3.5 flex items-center gap-5 hover:border-border-default transition-colors group cursor-pointer"
          >
            <div
              class="w-12 h-12 rounded-xl bg-brand-dim flex items-center justify-center shrink-0 border border-brand/10"
            >
              <Icon name="ph:calendar-blank-bold" class="text-xl text-brand" />
            </div>
            <div class="flex-1 min-w-0">
              <p
                class="text-[10px] font-black text-tx-muted tracking-widest mb-1"
              >
                {{ label || t("common.selectDate") }}
              </p>
              <h4 class="text-base font-bold text-tx-primary tracking-tight">
                {{ formattedDate || t("common.noDateSelected") }}
              </h4>
            </div>
            <Icon
              :name="isOpen ? 'ph:caret-up-bold' : 'ph:caret-down-bold'"
              class="text-tx-muted group-hover:text-tx-primary transition-colors"
            />
          </div>
        </slot>
      </template>
    </VueDatePicker>
  </div>
</template>

<script lang="ts" setup>
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { ar, enUS } from "date-fns/locale";

const props = withDefaults(
  defineProps<{
    modelValue?: string | Date | null;
    label?: string;
    minDate?: Date | string;
    maxDate?: Date | string;
    disabled?: boolean;
    enableTimePicker?: boolean;
  }>(),
  { modelValue: null, enableTimePicker: false },
);

const emit = defineEmits<{
  "update:modelValue": [value: Date | null];
}>();

const { t, locale } = useI18n();
const { isDark } = useAppTheme();

const isOpen = ref(false);

const dpLocale = computed(() => (locale.value === "ar" ? ar : enUS));

// The form state may hold "" or an ISO string; the picker needs a Date or null.
const dateValue = computed<Date | null>(() => {
  if (!props.modelValue) return null;
  const date = new Date(props.modelValue);
  return Number.isNaN(date.getTime()) ? null : date;
});

const formattedDate = computed(() => {
  if (!dateValue.value) return null;
  return dateValue.value.toLocaleDateString(dpLocale.value.code, {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(props.enableTimePicker && { hour: "numeric", minute: "2-digit" }),
  });
});

const onUpdate = (value: Date | null) => emit("update:modelValue", value);
</script>

<style>
/*
 * Map the picker's --dp-* variables onto StoreOS design tokens so it follows
 * the html[data-theme] toggle. The menu is teleported to <body>, so this must
 * not depend on the component's wrapper. The :root prefix raises specificity
 * above the library's own .dp--theme-* rules, which use fixed hex colors.
 */
:root .dp--theme-dark,
:root .dp--theme-light {
  --dp-font-family: inherit;
  --dp-border-radius: 12px;
  --dp-cell-border-radius: 10px;
  --dp-font-size: 0.75rem;
  --dp-common-transition: all 0.15s ease-out;

  --dp-background-color: var(--bg-primary);
  --dp-text-color: var(--text-primary);
  --dp-hover-color: var(--bg-elevated);
  --dp-hover-text-color: var(--text-primary);
  --dp-hover-icon-color: var(--text-primary);
  --dp-primary-color: var(--brand);
  --dp-primary-disabled-color: var(--brand-dim);
  --dp-primary-text-color: #fff;
  --dp-secondary-color: var(--text-muted);
  --dp-border-color: var(--border-subtle);
  --dp-menu-border-color: var(--border-default);
  --dp-border-color-hover: var(--border-default);
  --dp-border-color-focus: var(--brand);
  --dp-disabled-color: var(--bg-elevated);
  --dp-disabled-color-text: var(--text-muted);
  --dp-scroll-bar-background: var(--bg-elevated);
  --dp-scroll-bar-color: var(--border-default);
  --dp-icon-color: var(--text-muted);
  --dp-success-color: var(--success);
  --dp-danger-color: var(--danger);
  --dp-marker-color: var(--danger);
  --dp-tooltip-color: var(--bg-overlay);
  --dp-highlight-color: var(--brand-dim);
}
</style>