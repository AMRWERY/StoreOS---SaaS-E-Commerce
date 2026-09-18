<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-50"
        @click="$emit('update:modelValue', false)"
      ></div>
    </Transition>

    <!-- Slide-over Drawer -->
    <Transition
      enter-active-class="transform transition ease-in-out duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="modelValue"
        class="fixed inset-y-0 end-0 w-full max-w-md bg-bg-elevated shadow-2xl z-50 flex flex-col border-s border-border-subtle"
      >
        <!-- Header -->
        <div
          class="px-8 py-6 flex items-center justify-between border-b border-border-subtle"
        >
          <h2 class="text-xl font-bold text-tx-primary tracking-tight">
            {{ t("dashboard.inventory.stockAdjustment") }}
          </h2>
          <LazyVButton
            variant="none"
            @click="$emit('update:modelValue', false)"
            className="text-tx-secondary hover:text-tx-primary transition-colors"
          >
            <Icon name="ph:x-bold" class="text-xl" />
          </LazyVButton>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          <!-- Selected Item Card -->
          <div
            v-if="selectedItem"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-4 flex items-center gap-4"
          >
            <div
              class="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 overflow-hidden shrink-0"
            >
              <img
                :src="selectedItem.image"
                class="w-full h-full object-contain"
              />
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
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-widest"
              >{{ t("dashboard.inventory.adjustmentType") }}</label
            >
            <div class="grid grid-cols-3 gap-2">
              <LazyVButton
                variant="none"
                @click="adjType = 'Add'"
                :className="`py-3 border rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                  adjType === 'Add'
                    ? 'bg-bg-elevated text-tx-primary border-border-default'
                    : 'bg-transparent border-border-default text-tx-secondary hover:bg-bg-elevated'
                }`"
              >
                {{ t("dashboard.inventory.addPlus") }}
              </LazyVButton>
              <LazyVButton
                variant="none"
                @click="adjType = 'Remove'"
                :className="`py-3 border rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                  adjType === 'Remove'
                    ? 'bg-bg-elevated text-tx-primary border-border-default'
                    : 'bg-transparent border-border-default text-tx-secondary hover:bg-bg-elevated'
                }`"
              >
                {{ t("dashboard.inventory.removeMinus") }}
              </LazyVButton>
              <LazyVButton
                variant="none"
                @click="adjType = 'Set'"
                :className="`py-3 border rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                  adjType === 'Set'
                    ? 'bg-bg-elevated text-tx-primary border-border-default'
                    : 'bg-transparent border-border-default text-tx-secondary hover:bg-bg-elevated'
                }`"
              >
                {{ t("dashboard.inventory.setEquals") }}
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
            <label
              class="text-[10px] font-bold text-tx-secondary tracking-widest"
              >{{ t("dashboard.inventory.notesOptional") }}</label
            >
            <LazyVTextareaInput
              v-model="adjNotes"
              :placeholder="t('dashboard.inventory.notesPlaceholder')"
              textareaClass="!bg-bg-primary !border-border-subtle !rounded-xl !px-4 !py-4 !text-sm !h-28 focus:!border-brand font-medium"
            />
          </div>
        </div>

        <!-- Footer -->
        <div
          class="p-6 border-t border-border-subtle flex items-center gap-3 bg-bg-elevated"
        >
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
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const props = defineProps<{
  modelValue: boolean;
  selectedItem: any;
}>();

const emit = defineEmits(["update:modelValue", "save"]);

const adjType = ref("Add");
const adjQty = ref<number | null>(null);
const adjReason = ref("");
const adjNotes = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      adjType.value = "Add";
      adjQty.value = null;
      adjReason.value = "";
      adjNotes.value = "";
    }
  }
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