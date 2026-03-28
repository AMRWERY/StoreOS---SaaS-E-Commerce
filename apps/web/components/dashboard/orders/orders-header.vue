<template>
  <div>
    <VBreadcrumb />

    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <h1 class="text-2xl font-bold">Orders</h1>
        <span
          class="bg-bg-elevated px-2.5 py-1 rounded-lg text-[10px] font-black text-tx-secondary tracking-widest border border-border-subtle">
          2,481 Total
        </span>
      </div>
      <div class="flex items-center gap-3">
        <VButton variant="none"
          className="flex items-center gap-2 px-4 py-2.5 bg-bg-elevated hover:bg-bg-elevated rounded-xl text-xs font-bold transition-colors border border-border-subtle">
          <Icon name="ph:export-bold" />
          Export
        </VButton>
        <VButton to="/dashboard/orders/order-form"
          className="flex items-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand-hover rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand/20">
          <Icon name="ph:plus-bold" />
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
                className="bg-bg-primary border border-border-subtle rounded-2xl px-5 py-3.5 text-xs font-bold text-tx-secondary flex items-center gap-3 hover:text-tx-primary hover:border-border-default transition-all">
                Status: {{ selectedStatus }}
                <Icon name="ph:caret-down-bold" class="text-tx-muted transition-transform"
                  :class="{ 'rotate-180': open }" />
              </VButton>
            </template>
            <template #default="{ close }">
              <button
                v-for="s in ['All', 'New', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']"
                :key="s" @click="selectStatus(s, close)"
                class="w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-bg-elevated"
                :class="selectedStatus === s ? 'text-brand bg-brand/5' : 'text-tx-secondary hover:text-tx-primary'">
                {{ s }}
              </button>
            </template>
          </VDropdownMenu>

          <!-- Payment Dropdown -->
          <VDropdownMenu align="end" width="w-48">
            <template #trigger="{ open }">
              <VButton variant="none"
                className="bg-bg-primary border border-border-subtle rounded-2xl px-5 py-3.5 text-xs font-bold text-tx-secondary flex items-center gap-3 hover:text-tx-primary hover:border-border-default transition-all">
                Payment: {{ selectedPayment }}
                <Icon name="ph:caret-down-bold" class="text-tx-muted transition-transform"
                  :class="{ 'rotate-180': open }" />
              </VButton>
            </template>
            <template #default="{ close }">
              <button v-for="p in ['All', 'Paid', 'Unpaid', 'COD']" :key="p" @click="selectPayment(p, close)"
                class="w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-bg-elevated"
                :class="selectedPayment === p ? 'text-brand bg-brand/5' : 'text-tx-secondary hover:text-tx-primary'">
                {{ p }}
              </button>
            </template>
          </VDropdownMenu>

          <!-- Date Range Dropdown -->
          <VDropdownMenu align="end" width="w-56">
            <template #trigger="{ open }">
              <VButton variant="none"
                className="bg-bg-primary border border-border-subtle rounded-2xl px-5 py-3.5 text-xs font-bold text-tx-secondary flex items-center gap-3 hover:text-tx-primary hover:border-border-default transition-all">
                <Icon name="ph:calendar-bold" class="text-tx-secondary" />
                {{ selectedDate }}
                <Icon name="ph:caret-down-bold" class="text-tx-muted transition-transform"
                  :class="{ 'rotate-180': open }" />
              </VButton>
            </template>
            <template #default="{ close }">
              <button v-for="d in ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Custom Range']"
                :key="d" @click="selectDate(d, close)"
                class="w-full text-start px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-bg-elevated"
                :class="selectedDate === d ? 'text-brand bg-brand/5' : 'text-tx-secondary hover:text-tx-primary'">
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