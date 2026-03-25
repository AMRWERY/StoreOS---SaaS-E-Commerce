<template>
  <div>
    <VBreadcrumb :items="[
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'Sales' },
      { label: 'Orders', active: true }
    ]" />
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold">Orders</h1>
        <span
          class="bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-black text-gray-500 tracking-widest border border-white/5">
          2,481 Total
        </span>
      </div>
      <div class="flex items-center gap-3">
        <VButton variant="none"
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-colors border border-white/5">
          <icon name="ph:export-bold" />
          Export
        </VButton>
        <VButton to="/dashboard/orders/order-form"
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20">
          <icon name="ph:plus-bold" />
          New Manual Order
        </VButton>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-wrap gap-4 mb-8">
      <VSearchInput wrapperClass="flex-1 min-w-[300px]" placeholder="Search orders, customers, SKUs..." />

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-3">
          <!-- Status Dropdown -->
          <VDropdownMenu align="end" width="w-48">
            <template #trigger="{ open }">
              <VButton variant="none"
                className="bg-[#0c0c0e] border border-white/5 rounded-2xl px-5 py-3.5 text-xs font-bold text-gray-400 flex items-center gap-3 hover:text-white hover:border-white/10 transition-all">
                Status: {{ selectedStatus }}
                <icon name="ph:caret-down-bold" class="text-gray-600 transition-transform"
                  :class="{ 'rotate-180': open }" />
              </VButton>
            </template>
            <template #default="{ close }">
              <button
                v-for="s in ['All', 'New', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']"
                :key="s" @click="selectStatus(s, close)"
                class="w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-white/5"
                :class="selectedStatus === s ? 'text-indigo-400 bg-indigo-500/5' : 'text-gray-400 hover:text-white'">
                {{ s }}
              </button>
            </template>
          </VDropdownMenu>

          <!-- Payment Dropdown -->
          <VDropdownMenu align="end" width="w-48">
            <template #trigger="{ open }">
              <VButton variant="none"
                className="bg-[#0c0c0e] border border-white/5 rounded-2xl px-5 py-3.5 text-xs font-bold text-gray-400 flex items-center gap-3 hover:text-white hover:border-white/10 transition-all">
                Payment: {{ selectedPayment }}
                <icon name="ph:caret-down-bold" class="text-gray-600 transition-transform"
                  :class="{ 'rotate-180': open }" />
              </VButton>
            </template>
            <template #default="{ close }">
              <button v-for="p in ['All', 'Paid', 'Unpaid', 'COD']" :key="p" @click="selectPayment(p, close)"
                class="w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-white/5"
                :class="selectedPayment === p ? 'text-indigo-400 bg-indigo-500/5' : 'text-gray-400 hover:text-white'">
                {{ p }}
              </button>
            </template>
          </VDropdownMenu>

          <!-- Date Range Dropdown -->
          <VDropdownMenu align="end" width="w-56">
            <template #trigger="{ open }">
              <VButton variant="none"
                className="bg-[#0c0c0e] border border-white/5 rounded-2xl px-5 py-3.5 text-xs font-bold text-gray-400 flex items-center gap-3 hover:text-white hover:border-white/10 transition-all">
                <icon name="ph:calendar-bold" class="text-gray-500" />
                {{ selectedDate }}
                <icon name="ph:caret-down-bold" class="text-gray-600 transition-transform"
                  :class="{ 'rotate-180': open }" />
              </VButton>
            </template>
            <template #default="{ close }">
              <button v-for="d in ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom Range']"
                :key="d" @click="selectDate(d, close)"
                class="w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-white/5"
                :class="selectedDate === d ? 'text-indigo-400 bg-indigo-500/5' : 'text-gray-400 hover:text-white'">
                {{ d }}
              </button>
            </template>
          </VDropdownMenu>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const selectedStatus = ref('All')
const selectedPayment = ref('All')
const selectedDate = ref('Date Range')

const selectStatus = (status: string, close: Function) => {
  selectedStatus.value = status
  close()
}

const selectPayment = (payment: string, close: Function) => {
  selectedPayment.value = payment
  close()
}

const selectDate = (date: string, close: Function) => {
  selectedDate.value = date
  close()
}
</script>