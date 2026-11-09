<template>
  <VSidePanel
    :model-value="modelValue"
    :title="t('dashboard.inventory.stockAdjustment')"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="space-y-8">
      <!-- Selected Item Card -->
      <div
        v-if="selectedItem"
        class="bg-bg-primary border border-border-subtle rounded-2xl p-4 flex items-center gap-4"
      >
        <div
          class="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 overflow-hidden shrink-0"
        >
          <img :src="selectedItem.image" class="w-full h-full object-contain" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-[10px] text-tx-secondary mb-0.5">
            {{ t("dashboard.inventory.selectedItem") }}
          </p>
          <h3 class="font-bold text-base text-tx-primary truncate">
            {{ selectedItem.name }}
          </h3>
          <p class="text-[10px] text-tx-secondary mt-1">
            {{ t("dashboard.inventory.current") }}:
            {{ selectedItem.current }} {{ t("dashboard.inventory.units") }}
          </p>
        </div>
      </div>

      <!-- Adjustment Type -->
      <div class="space-y-3">
        <label class="text-[10px] font-bold text-tx-secondary tracking-widest">{{
          t("dashboard.inventory.adjustmentType")
        }}</label>
        <div class="grid grid-cols-3 gap-2">
          <LazyVButton
            v-for="option in adjTypes"
            :key="option.value"
            variant="none"
            @click="adjType = option.value"
            :className="`py-3 border rounded-lg text-[10px] font-bold tracking-widest transition-all ${
              adjType === option.value
                ? 'bg-bg-elevated text-tx-primary border-border-default'
                : 'bg-transparent border-border-default text-tx-secondary hover:bg-bg-elevated'
            }`"
          >
            {{ option.label }}
          </LazyVButton>
        </div>
      </div>

      <!-- Quantity -->
      <LazyVInput
        type="number"
        v-model="adjQty"
        :label="t('dashboard.inventory.quantity')"
        placeholder="0"
        inputClass="!w-full !bg-bg-primary !border !border-border-subtle !rounded-xl !px-4 !py-4 !text-base !font-medium !text-tx-primary focus:!outline-none focus:!border-brand !transition-colors placeholder:!text-tx-muted"
      />

      <!-- Reason -->
      <LazyVSelectInput
        v-model="adjReason"
        :label="t('dashboard.inventory.reasonForChange')"
        placeholder="Select a reason..."
        :options="['Purchase', 'Sale', 'Return', 'Damage', 'Correction']"
        selectClass="!bg-bg-primary !border-border-subtle !rounded-xl !px-4 !py-4 !text-sm !text-tx-secondary font-medium focus:!border-brand"
      />

      <!-- Notes -->
      <div class="space-y-3">
        <label class="text-[10px] font-bold text-tx-secondary tracking-widest">{{
          t("dashboard.inventory.notesOptional")
        }}</label>
        <LazyVTextareaInput
          v-model="adjNotes"
          :placeholder="t('dashboard.inventory.notesPlaceholder')"
          textareaClass="!bg-bg-primary !border-border-subtle !rounded-xl !px-4 !py-4 !text-sm !h-28 focus:!border-brand font-medium"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex items-center gap-3">
        <LazyVButton
          variant="none"
          @click="$emit('update:modelValue', false)"
          className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-transparent border border-border-default text-tx-primary hover:bg-bg-elevated transition-colors"
        >
          {{ t("common.cancel") }}
        </LazyVButton>

        <LazyVButton
          variant="none"
          @click="save"
          className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-brand text-tx-primary hover:bg-brand-hover transition-colors shadow-lg shadow-brand/20"
        >
          {{ t("common.save") }}
        </LazyVButton>
      </div>
    </template>
  </VSidePanel>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const props = defineProps<{
  modelValue: boolean;
  selectedItem: any;
}>();

const emit = defineEmits(["update:modelValue", "save"]);

const adjType = ref("Add");
const adjQty = ref<number | null>(null);
const adjReason = ref("");
const adjNotes = ref("");

const adjTypes = computed(() => [
  { value: "Add", label: t("dashboard.inventory.addPlus") },
  { value: "Remove", label: t("dashboard.inventory.removeMinus") },
  { value: "Set", label: t("dashboard.inventory.setEquals") },
]);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      adjType.value = "Add";
      adjQty.value = null;
      adjReason.value = "";
      adjNotes.value = "";
    }
  },
);

const save = () => {
  if (
    !props.selectedItem ||
    adjQty.value === null ||
    adjQty.value === undefined ||
    !adjReason.value
  )
    return;
  emit("save", {
    item: props.selectedItem,
    type: adjType.value,
    qty: Number(adjQty.value),
    reason: adjReason.value,
    notes: adjNotes.value,
  });
};
</script>
