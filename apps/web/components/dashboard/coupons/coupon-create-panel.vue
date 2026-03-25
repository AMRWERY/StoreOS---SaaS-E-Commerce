<template>
  <div>
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" @click="$emit('close')"></div>
    </Transition>

    <!-- Slide-over Drawer -->
    <Transition enter-active-class="transform transition ease-in-out duration-300" enter-from-class="translate-x-full"
      enter-to-class="translate-x-0" leave-active-class="transform transition ease-in-out duration-300"
      leave-from-class="translate-x-0" leave-to-class="translate-x-full">
      <div v-if="isOpen"
        class="fixed inset-y-0 end-0 w-full max-w-[460px] bg-[#0c0c0e] border-s border-white/10 shadow-2xl flex flex-col z-50">
        <!-- Header -->
        <div class="p-8 border-b border-white/5 flex justify-between items-center bg-[#0e0e11]">
          <div>
            <h2 class="text-xl font-bold text-white tracking-tight">Create New Coupon</h2>
            <p class="text-[10px] text-gray-600 font-bold tracking-widest mt-1">
              Configure your discount campaign settings
            </p>
          </div>
          <VButton @click="$emit('close')" variant="none" className="text-gray-600 hover:text-white transition-colors">
            <Icon name="ph:x-bold" class="text-xl" />
          </VButton>
        </div>

        <div class="flex-1 p-8 overflow-y-auto hide-scrollbar space-y-10">
          <!-- Coupon Code Input -->
          <div class="space-y-3">
            <label class="text-[10px] font-black text-gray-600 tracking-widest">Coupon Code</label>
            <div class="relative group">
              <VInput v-model="form.code" placeholder="e.g. SUMMER24"
                inputClass="bg-black border border-white/10 rounded-xl px-5 py-4 text-sm font-bold tracking-widest focus:border-indigo-500/50 outline-none transition pe-14" />
              <button @click="generateCode"
                class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-indigo-400 transition-colors"
                type="button">
                <Icon name="ph:arrows-clockwise-bold" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Discount Type Segmented Control -->
          <div class="space-y-3">
            <label class="text-[10px] font-black text-gray-600 tracking-widest">Discount Type</label>
            <div class="bg-black p-1.5 rounded-2xl flex border border-white/5">
              <button v-for="type in discountTypes" :key="type.value" @click="form.discountType = type.value"
                class="flex-1 py-3.5 text-xs font-bold tracking-tight rounded-xl transition-all duration-300"
                :class="form.discountType === type.value ? 'bg-[#1f2024] text-indigo-400 shadow-xl border border-white/5' : 'text-gray-500 hover:text-gray-400'">
                {{ type.label }}
              </button>
            </div>
          </div>

          <!-- Value Input -->
          <VInput v-model="form.value" :label="form.discountType === 'percentage' ? 'Percentage (%)' : 'Fixed Amount'"
            placeholder="0.00" :type="form.discountType === 'percentage' ? 'text' : 'number'">
            <template #prefix v-if="form.discountType === 'percentage'">
              <span class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-700 font-bold">%</span>
            </template>
          </VInput>

          <!-- Min Order & Max Uses -->
          <div class="grid grid-cols-2 gap-6">
            <VInput v-model="form.minOrder" label="Min Order" placeholder="Opt." />
            <VInput v-model="form.maxUses" label="Max Redemption Users" placeholder="Unlimited" />
          </div>

          <!-- Date Selection Design -->
          <div class="space-y-4">
            <!-- Starts -->
            <VDatePicker v-model="form.startDate" label="Starts">
              <template #trigger="{ selectedDate }">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-gray-600 tracking-widest">Starts</label>
                  <div class="relative group cursor-pointer">
                    <Icon name="ph:calendar-blank-bold"
                      class="absolute start-5 top-1/2 -translate-y-1/2 text-xl text-indigo-400" />
                    <input readonly :value="selectedDate || 'Immediate Activation'"
                      class="w-full bg-[#121214] border border-white/5 rounded-2xl ps-14 pe-5 py-4 text-sm font-bold text-white outline-none group-hover:border-white/10 transition-colors" />
                  </div>
                </div>
              </template>
            </VDatePicker>

            <!-- Expires -->
            <VDatePicker v-model="form.expiryDate" label="Expires">
              <template #trigger="{ selectedDate }">
                <div class="space-y-2">
                  <label class="text-[10px] font-black text-gray-600 tracking-widest">Expires</label>
                  <div class="relative group cursor-pointer">
                    <Icon name="ph:calendar-x-bold"
                      class="absolute start-5 top-1/2 -translate-y-1/2 text-xl text-orange-400" />
                    <input readonly :value="selectedDate || 'Dec 31, 2024'"
                      class="w-full bg-[#121214] border border-white/5 rounded-2xl ps-14 pe-5 py-4 text-sm font-bold text-white outline-none group-hover:border-white/10 transition-colors" />
                  </div>
                </div>
              </template>
            </VDatePicker>
          </div>
        </div>

        <!-- Footer Action -->
        <div class="p-8 border-t border-white/5 bg-[#080809] flex flex-col gap-4">
          <VButton
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
            variant="none" @click="$emit('create')">
            <Icon name="ph:check-circle-bold" class="text-lg" />
            Create Coupon
          </VButton>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'create']);

const form = ref({
  code: '',
  discountType: 'percentage',
  value: '',
  minOrder: '',
  maxUses: '',
  startDate: '', // Added startDate
  expiryDate: '',
});

const discountTypes = [
  { label: 'Percentage', value: 'percentage' },
  { label: 'Fixed Amount', value: 'fixed' },
];

const generateCode = () => {
  form.value.code = Math.random().toString(36).substring(2, 8).toUpperCase();
};
</script>