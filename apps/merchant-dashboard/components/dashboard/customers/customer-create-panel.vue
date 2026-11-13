<template>
  <VSidePanel
    :model-value="isOpen"
    :title="t('dashboard.customers.addCustomer')"
    :subtitle="t('dashboard.customers.addCustomerSubtitle')"
    @close="$emit('close')"
  >
    <div class="space-y-8">
      <LazyVInput
        v-model="form.name"
        required
        :label="t('dashboard.customers.fullName')"
        placeholder="e.g. Alex Rivera"
      />

      <LazyVInput
        v-model="form.email"
        type="email"
        required
        :label="t('dashboard.customers.primaryEmail')"
        placeholder="name@example.com"
      />

      <LazyVInput
        v-model="form.phone"
        type="tel"
        :label="t('dashboard.customers.primaryPhone')"
        placeholder="+1 555-012-3456"
      />

      <LazyVInput
        v-model="form.location"
        :label="t('dashboard.customers.location')"
        placeholder="e.g. San Francisco, CA"
      />

      <LazyVSelectInput
        v-model="form.tag"
        :label="t('dashboard.customers.customerTags')"
        :options="tagOptions"
      />

      <div class="space-y-3">
        <label class="text-[10px] font-bold text-tx-secondary tracking-widest">{{
          t("dashboard.customers.addNote")
        }}</label>
        <LazyVTextareaInput
          v-model="form.note"
          :placeholder="t('dashboard.customers.notePlaceholder')"
        />
      </div>
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
          :label="t('dashboard.customers.addCustomer')"
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
  create: [customer: CustomerForm];
}>();

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  tag: string;
  note: string;
}

const { t } = useI18n();

const tagOptions = ["Regular", "VIP", "Wholesale"];

const emptyForm = (): CustomerForm => ({
  name: "",
  email: "",
  phone: "",
  location: "",
  tag: "Regular",
  note: "",
});

const form = ref<CustomerForm>(emptyForm());

// Start from a blank form every time the panel opens.
watch(
  () => props.isOpen,
  (open) => {
    if (open) form.value = emptyForm();
  },
);

const canSubmit = computed(
  () => form.value.name.trim() !== "" && form.value.email.trim() !== "",
);

const submit = () => {
  if (!canSubmit.value) return;
  emit("create", { ...form.value });
};
</script>
