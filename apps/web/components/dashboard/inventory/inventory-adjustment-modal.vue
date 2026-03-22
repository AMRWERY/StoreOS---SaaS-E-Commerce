<template>
  <div>
    <!-- Backdrop -->
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="modelValue" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        @click="$emit('update:modelValue', false)"></div>
    </Transition>

    <!-- Slide-over Drawer -->
    <Transition enter-active-class="transform transition ease-in-out duration-300" enter-from-class="translate-x-full"
      enter-to-class="translate-x-0" leave-active-class="transform transition ease-in-out duration-300"
      leave-from-class="translate-x-0" leave-to-class="translate-x-full">
      <div v-if="modelValue"
        class="fixed inset-y-0 end-0 w-full max-w-md bg-[#1f2024] shadow-2xl z-50 flex flex-col border-s border-white/5">
        <!-- Header -->
        <div class="px-8 py-6 flex items-center justify-between border-b border-white/5">
          <h2 class="text-xl font-bold text-white tracking-tight">Stock Adjustment</h2>
          <button @click="$emit('update:modelValue', false)" class="text-gray-400 hover:text-white transition-colors">
            <icon name="ph:x-bold" class="text-xl" />
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          <!-- Selected Item Card -->
          <div v-if="selectedItem" class="bg-[#121214] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
            <div class="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 overflow-hidden shrink-0">
              <img :src="selectedItem.image" class="w-full h-full object-contain" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[10px] text-gray-400 mb-0.5">Selected Item</p>
              <h3 class="font-bold text-base text-white truncate">{{ selectedItem.name }}</h3>
              <p class="text-[10px] font-mono text-gray-500 mt-1">Current: {{ selectedItem.current }} units</p>
            </div>
          </div>

          <!-- Adjustment Type -->
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Adjustment Type</label>
            <div class="grid grid-cols-3 gap-2">
              <button @click="adjType = 'Add'"
                :class="adjType === 'Add' ? 'bg-[#31323a] text-white border-white/10' : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'"
                class="py-3 border rounded-lg text-[10px] font-bold tracking-widest transition-all">
                ADD (+)
              </button>
              <button @click="adjType = 'Remove'"
                :class="adjType === 'Remove' ? 'bg-[#31323a] text-white border-white/10' : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'"
                class="py-3 border rounded-lg text-[10px] font-bold tracking-widest transition-all">
                REMOVE (-)
              </button>
              <button @click="adjType = 'Set'"
                :class="adjType === 'Set' ? 'bg-[#31323a] text-white border-white/10' : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5'"
                class="py-3 border rounded-lg text-[10px] font-bold tracking-widest transition-all">
                SET (=)
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quantity</label>
            <input type="number" v-model="adjQty" placeholder="0"
              class="w-full bg-[#121214] border border-white/5 rounded-xl px-4 py-4 text-base font-medium text-white focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-gray-600" />
          </div>

          <!-- Reason -->
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reason For Change</label>
            <div class="relative">
              <select v-model="adjReason"
                class="w-full bg-[#121214] border border-white/5 rounded-xl px-4 py-4 text-sm text-gray-300 font-medium appearance-none focus:outline-none focus:border-indigo-500/50 transition-colors cursor-pointer">
                <option value="" disabled>Select a reason...</option>
                <option>Purchase</option>
                <option>Sale</option>
                <option>Return</option>
                <option>Damage</option>
                <option>Correction</option>
              </select>
              <icon name="ph:caret-down-bold"
                class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <!-- Notes -->
          <div class="space-y-3">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Notes (Optional)</label>
            <textarea v-model="adjNotes" placeholder="Add any extra details..."
              class="w-full bg-[#121214] border border-white/5 rounded-xl px-4 py-4 text-sm h-28 focus:border-indigo-500/50 outline-none resize-none placeholder:text-gray-600 transition-colors font-medium"></textarea>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-white/5 flex items-center gap-3 bg-[#1f2024]">
          <button @click="$emit('update:modelValue', false)"
            class="flex-1 py-3.5 rounded-xl font-bold text-sm bg-transparent border border-white/10 text-white hover:bg-white/5 transition-colors">Cancel</button>
          <button @click="save"
            class="flex-1 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">Save</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
  selectedItem: any
}>()

const emit = defineEmits(['update:modelValue', 'save'])

const adjType = ref('Add')
const adjQty = ref<number | null>(null)
const adjReason = ref('')
const adjNotes = ref('')

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    adjType.value = 'Add'
    adjQty.value = null
    adjReason.value = ''
    adjNotes.value = ''
  }
})

const save = () => {
  if (!props.selectedItem || adjQty.value === null || adjQty.value === undefined || !adjReason.value) return
  emit('save', {
    item: props.selectedItem,
    type: adjType.value,
    qty: Number(adjQty.value),
    reason: adjReason.value,
    notes: adjNotes.value
  })
}
</script>