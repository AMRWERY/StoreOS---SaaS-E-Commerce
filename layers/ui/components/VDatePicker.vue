<template>
  <div class="relative w-full">
    <!-- Trigger: Slot or Default Card -->
    <div @click="toggle" class="cursor-pointer">
      <slot name="trigger" :selectedDate="formattedDate" :isOpen="isOpen">
        <div class="bg-[#121214] border border-white/5 rounded-2xl p-6 flex items-center gap-5 hover:border-white/10 transition-colors group">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/10">
            <icon name="ph:calendar-blank-bold" class="text-xl text-indigo-400" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-black text-gray-600 tracking-widest mb-1">{{ label || 'Select Date' }}</p>
            <h4 class="text-base font-bold text-white tracking-tight">{{ formattedDate || 'No date selected' }}</h4>
          </div>
          <icon :name="isOpen ? 'ph:caret-up-bold' : 'ph:caret-down-bold'" class="text-gray-700 group-hover:text-white transition-colors" />
        </div>
      </slot>
    </div>

    <!-- Calendar Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div v-if="isOpen" class="absolute z-[60] mt-3 w-full bg-[#16171a] border border-white/10 rounded-2xl shadow-2xl p-5 overflow-hidden ring-1 ring-black">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button @click="handlePrev" class="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <icon name="ph:caret-left-bold" />
          </button>
          
          <!-- Month/Year Toggle -->
          <div class="flex items-center gap-1">
            <button @click="toggleView('month')" class="text-xs font-bold text-white tracking-tight px-2 py-1 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1 group/header">
              {{ currentMonthName }}
              <icon name="ph:caret-down-bold" class="text-[10px] text-gray-600 group-hover/header:text-indigo-400 transition-colors" :class="{ 'rotate-180': view === 'month' }" />
            </button>
            <button @click="toggleView('year')" class="text-xs font-bold text-white tracking-tight px-2 py-1 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1 group/header">
              {{ view === 'year' ? yearRangeTitle : currentYear }}
              <icon name="ph:caret-down-bold" class="text-[10px] text-gray-600 group-hover/header:text-indigo-400 transition-colors" :class="{ 'rotate-180': view === 'year' }" />
            </button>
          </div>

          <button @click="handleNext" class="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <icon name="ph:caret-right-bold" />
          </button>
        </div>

        <div class="relative min-h-[220px]">
          <!-- Days View -->
          <Transition name="fade-view">
            <div v-if="view === 'day'" class="space-y-4">
              <!-- Weekdays -->
              <div class="grid grid-cols-7">
                <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-center text-[9px] font-black text-gray-700">
                  {{ day }}
                </div>
              </div>

              <!-- Days Grid -->
              <div class="grid grid-cols-7 gap-1">
                <button
                  v-for="{ date, isCurrentMonth, isToday, isSelected } in calendarDays"
                  :key="date.getTime()"
                  @click="selectDate(date)"
                  :disabled="!isCurrentMonth"
                  class="h-10 w-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all relative group"
                  :class="[
                    !isCurrentMonth ? 'text-gray-800 pointer-events-none' : 'text-gray-400 hover:bg-white/5 hover:text-white',
                    isSelected ? 'bg-indigo-600 !text-white shadow-lg shadow-indigo-600/30 border border-indigo-500/50' : '',
                    isToday && !isSelected ? 'text-indigo-400 ring-1 ring-indigo-500/20' : ''
                  ]"
                >
                  {{ date.getDate() }}
                  <div v-if="isToday && !isSelected" class="absolute bottom-1.5 w-1 h-1 rounded-full bg-indigo-500/50"></div>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Month View -->
          <Transition name="fade-view">
            <div v-if="view === 'month'" class="absolute inset-0 grid grid-cols-3 gap-2 py-2">
              <button
                v-for="(name, index) in monthNames"
                :key="name"
                @click="selectMonth(index)"
                class="flex items-center justify-center rounded-xl text-[10px] font-bold tracking-widest transition-all"
                :class="viewDate.getMonth() === index ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'"
              >
                {{ name }}
              </button>
            </div>
          </Transition>

          <!-- Year View -->
          <Transition name="fade-view">
            <div v-if="view === 'year'" class="absolute inset-0 grid grid-cols-3 gap-2 py-2">
              <button
                v-for="year in yearRange"
                :key="year"
                @click="selectYear(year)"
                class="flex items-center justify-center rounded-xl text-xs font-bold transition-all"
                :class="viewDate.getFullYear() === year ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'"
              >
                {{ year }}
              </button>
            </div>
          </Transition>
        </div>

        <!-- Footer Actions -->
        <div class="mt-6 pt-5 border-t border-white/5 flex justify-end gap-2">
          <button @click="isOpen = false" class="px-4 py-2 text-[10px] font-black text-gray-600 hover:text-white tracking-widest transition-colors">
            Cancel
          </button>
          <button @click="setToday" class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white hover:bg-white/10 tracking-widest transition-all">
            Today
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue?: string | Date
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const view = ref<'day' | 'month' | 'year'>('day')
const viewDate = ref(new Date())
const selectedDate = ref(props.modelValue ? new Date(props.modelValue) : null)

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const yearRangeStart = ref(Math.floor(new Date().getFullYear() / 12) * 12)
const yearRange = computed(() => Array.from({ length: 12 }, (_, i) => yearRangeStart.value + i))
const yearRangeTitle = computed(() => `${yearRange.value[0]} - ${yearRange.value[11]}`)

const currentMonthName = computed(() => {
  return viewDate.value.toLocaleString('default', { month: 'long' })
})

const currentYear = computed(() => viewDate.value.getFullYear())

const formattedDate = computed(() => {
  if (!selectedDate.value) return null
  return selectedDate.value.toLocaleDateString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const toggleView = (target: 'day' | 'month' | 'year') => {
  if (view.value === target) view.value = 'day'
  else view.value = target
  
  if (target === 'year') {
    yearRangeStart.value = Math.floor(viewDate.value.getFullYear() / 12) * 12
  }
}

const handlePrev = () => {
  if (view.value === 'day') {
    viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() - 1, 1)
  } else if (view.value === 'month') {
    viewDate.value = new Date(viewDate.value.getFullYear() - 1, viewDate.value.getMonth(), 1)
  } else {
    yearRangeStart.value -= 12
  }
}

const handleNext = () => {
  if (view.value === 'day') {
    viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 1)
  } else if (view.value === 'month') {
    viewDate.value = new Date(viewDate.value.getFullYear() + 1, viewDate.value.getMonth(), 1)
  } else {
    yearRangeStart.value += 12
  }
}

const selectMonth = (index: number) => {
  viewDate.value = new Date(viewDate.value.getFullYear(), index, 1)
  view.value = 'day'
}

const selectYear = (year: number) => {
  viewDate.value = new Date(year, viewDate.value.getMonth(), 1)
  view.value = 'day'
}

const setToday = () => {
  const today = new Date()
  viewDate.value = new Date(today.getFullYear(), today.getMonth(), 1)
  selectDate(today)
  view.value = 'day'
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  emit('update:modelValue', date)
  isOpen.value = false
}

const toggle = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) view.value = 'day'
}

const calendarDays = computed(() => {
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const days = []

  const startDay = firstDayOfMonth.getDay()
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month, -i),
      isCurrentMonth: false,
      isToday: false,
      isSelected: false
    })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      isCurrentMonth: true,
      isToday: date.getTime() === today.getTime(),
      isSelected: selectedDate.value?.getTime() === date.getTime()
    })
  }
  return days
})

if (typeof window !== 'undefined') {
  onMounted(() => {
    window.addEventListener('click', (e) => {
      if (!(e.target as HTMLElement).closest('.relative')) {
        isOpen.value = false
        view.value = 'day'
      }
    })
  })
}
</script>

<style scoped>
.fade-view-enter-active,
.fade-view-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-view-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-view-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>