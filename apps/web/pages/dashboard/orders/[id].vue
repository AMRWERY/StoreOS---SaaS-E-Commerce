<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] -mt-4">
      <!-- Top Breadcrumb & Actions -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <VBackButton to="/dashboard/orders" label="Orders" />
            <span class="text-[10px] font-black text-gray-800 tracking-widest">/</span>
            <span class="text-[10px] font-black text-indigo-400 tracking-widest">{{ orderId }}</span>
          </div>
          <div class="flex items-center gap-4">
            <h1 class="text-3xl font-bold tracking-tight">{{ orderId }}</h1>
            <div class="flex gap-2">
              <span
                class="bg-orange-500/10 text-orange-500 text-[10px] font-black px-2 py-1 rounded tracking-widest border border-orange-500/10">Processing</span>
              <span
                class="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-2 py-1 rounded tracking-widest border border-emerald-500/10">Paid</span>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2 font-medium">Created on {{ createdAt }}</p>
        </div>

        <div class="flex items-center gap-3">
          <VButton variant="secondary"
            className="px-5 py-2.5 rounded-xl text-xs font-bold border-white/5 bg-white/5 hover:bg-white/10 transition-all">
            Confirm
          </VButton>
          <VButton
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20">
            Ship items
          </VButton>
          <VButton variant="none"
            className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors">
            <icon name="ph:printer-bold" />
          </VButton>
          <VButton variant="none"
            className="px-5 py-2.5 text-red-500/70 hover:text-red-500 text-xs font-bold transition-colors">
            Cancel
          </VButton>
          <VButton variant="none"
            className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-white transition-colors">
            <icon name="ph:dots-three-bold" />
          </VButton>
        </div>
      </header>

      <!-- Order Timeline / Stepper -->
      <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div class="flex justify-between items-start relative z-10">
          <div v-for="(step, i) in timeline" :key="step.name" class="flex flex-col items-center flex-1 relative">
            <!-- Connector Line -->
            <div v-if="i < timeline.length - 1" class="absolute top-5 start-[50%] w-full h-[2px] -z-10"
              :class="step.status === 'completed' ? 'bg-indigo-500' : 'bg-white/5'"></div>

            <!-- Step Icon -->
            <div class="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-all" :class="[
              step.status === 'completed' ? 'bg-indigo-500 text-white' :
                step.status === 'active' ? 'bg-indigo-500/20 text-indigo-400 ring-2 ring-indigo-500/30' :
                  'bg-white/5 text-gray-700'
            ]">
              <icon v-if="step.status === 'completed'" name="ph:check-bold" />
              <icon v-else-if="step.status === 'active'" name="ph:circle-dashed-bold" class="animate-spin-slow" />
              <icon v-else name="ph:circle-bold" />
            </div>

            <h4 class="text-[10px] font-black tracking-widest"
              :class="step.status === 'upcoming' ? 'text-gray-700' : 'text-white'">{{ step.name }}</h4>
            <p class="text-[9px] font-bold mt-1"
              :class="step.status === 'active' ? 'text-indigo-400' : 'text-gray-600'">
              {{ step.date }}</p>
          </div>
        </div>
      </section>

      <!-- Main Grid Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <!-- Left Column: Items and Notes -->
        <div class="lg:col-span-2 h-full">
          <div class="h-full space-y-8 overflow-y-auto hide-scrollbar pb-10">
            <!-- Order Items Card -->
            <div class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden">
              <div class="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 class="text-xs font-black tracking-[0.15em] flex items-center gap-2">
                  <icon name="ph:package-bold" class="text-indigo-500" />
                  Order Items
                </h3>
                <span class="text-[10px] font-bold text-gray-600">1 Item</span>
              </div>

              <div class="p-8">
                <VTable :headers="itemHeaders" :items="orderItems">
                  <template #cell(product)="{ item }">
                    <div class="py-2 flex items-center gap-4 text-start">
                      <img :src="item.image"
                        class="w-14 h-14 rounded-xl object-cover grayscale opacity-70 border border-white/5" />
                      <div>
                        <h5 class="text-sm font-bold">{{ item.name }}</h5>
                        <p class="text-[10px] text-gray-600 font-bold mt-1">Size: {{ item.size }} | {{ item.color }}</p>
                        <p class="text-[9px] text-gray-700 font-medium">SKU: {{ item.sku }}</p>
                      </div>
                    </div>
                  </template>
                  <template #cell(qty)="{ item }">
                    <span class="text-sm font-bold">{{ item.qty }}</span>
                  </template>
                  <template #cell(unitPrice)="{ item }">
                    <span class="text-sm font-bold text-gray-500">${{ item.unitPrice.toFixed(2) }}</span>
                  </template>
                  <template #cell(total)="{ item }">
                    <span class="text-sm font-bold">${{ (item.qty * item.unitPrice).toFixed(2) }}</span>
                  </template>
                </VTable>

                <!-- Summary -->
                <div class="mt-8 pt-8 border-t border-white/5 flex flex-col items-end space-y-4">
                  <div class="w-full max-w-[240px] space-y-3">
                    <div class="flex justify-between text-xs font-bold text-gray-600">
                      <span>Subtotal</span>
                      <span>$189.00</span>
                    </div>
                    <div class="flex justify-between text-xs font-bold text-gray-600">
                      <span>Shipping (Standard)</span>
                      <span>$10.00</span>
                    </div>
                    <div class="flex justify-between text-xs font-bold text-gray-600">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div class="flex justify-between items-center pt-4 border-t border-white/5">
                      <span class="text-xs font-black tracking-widest">Total</span>
                      <span class="text-xl font-bold text-indigo-400">$199.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Notes/Logs Card -->
            <div class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
              <h3 class="text-xs font-black tracking-[0.15em] flex items-center gap-2 mb-8">
                <icon name="ph:notebook-bold" class="text-indigo-500" />
                Order Notes
              </h3>
              <div class="space-y-6">
                <div class="relative">
                  <textarea placeholder="Add internal note for this order..."
                    class="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm h-32 focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-gray-800 resize-none"></textarea>
                  <VButton variant="none"
                    className="absolute bottom-4 end-4 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-colors">
                    Add Note
                  </VButton>
                </div>

                <div class="space-y-6 pt-4">
                  <div v-for="log in orderLogs" :key="log.time" class="flex gap-4 group">
                    <div
                      class="w-2 h-2 rounded-full bg-indigo-500/40 mt-1.5 shrink-0 group-hover:bg-indigo-500 transition-colors">
                    </div>
                    <div>
                      <p class="text-xs leading-relaxed text-gray-400">{{ log.text }}</p>
                      <div class="mt-2 text-[10px] font-bold">
                        <span class="text-indigo-400">added by {{ log.author }}</span>
                        <span class="mx-2 text-gray-800">•</span>
                        <span class="text-gray-600">{{ log.time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar Panels -->
        <aside class="space-y-8">
          <!-- Customer Panel -->
          <div class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-[10px] font-black text-gray-600 tracking-widest">Customer</h3>
              <VButton variant="none" className="text-[10px] font-bold text-indigo-400 hover:underline">
                Profile
                <icon name="ph:arrow-square-out-bold" class="inline ms-1" />
              </VButton>
            </div>
            <div class="flex items-center gap-4 mb-8">
              <img src="https://i.pravatar.cc/100?u=ethan" class="w-12 h-12 rounded-xl border border-white/10" />
              <div>
                <h4 class="font-bold">Ethan Laurent</h4>
                <p class="text-[10px] text-gray-500 font-bold mt-1">ethan.l@designstack.io</p>
                <p class="text-[10px] text-gray-700 mt-0.5">+1 (555) 012-9842</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <p class="text-[9px] font-black text-gray-600 mb-2">Orders</p>
                <p class="text-xl font-bold">12</p>
              </div>
              <div class="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                <p class="text-[9px] font-black text-gray-600 mb-2">LTV</p>
                <p class="text-xl font-bold">$4,200</p>
              </div>
            </div>
          </div>

          <!-- Shipping & Logistics Panel -->
          <div class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6">
            <h3 class="text-[10px] font-black text-gray-600 tracking-widest mb-8">Shipping & Logistics</h3>
            <div class="space-y-8">
              <div class="flex gap-4">
                <icon name="ph:map-pin-bold" class="text-indigo-500 mt-1 shrink-0" />
                <div>
                  <h4 class="text-[10px] font-black text-gray-400 tracking-widest mb-2">Delivery Address</h4>
                  <p class="text-xs text-gray-500 leading-relaxed font-medium">
                    88 Market St, Suite 200<br />
                    San Francisco, CA 94103<br />
                    United States
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <icon name="ph:truck-bold" class="text-indigo-500 mt-1 shrink-0" />
                <div>
                  <h4 class="text-[10px] font-black text-gray-400 tracking-widest mb-2">Carrier & Tracking</h4>
                  <p class="text-xs text-white font-bold mb-3">FedEx - <span class="text-gray-500 font-medium">Standard
                      Worldwide</span></p>
                  <div class="flex items-center gap-2">
                    <div
                      class="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-[10px] font-bold text-gray-400">
                      FX-89323-2394
                    </div>
                    <VButton variant="none"
                      className="bg-white/5 p-2 rounded-lg text-gray-500 hover:text-white transition-colors">
                      <icon name="ph:copy-bold" />
                    </VButton>
                  </div>
                  <VButton variant="none"
                    className="text-[10px] font-bold text-indigo-400 mt-4 hover:underline block text-start">
                    Track Package
                  </VButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method Panel -->
          <div class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6">
            <h3 class="text-[10px] font-black text-gray-600 tracking-widest mb-6">Payment Method</h3>
            <div class="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-indigo-600/10 rounded-lg flex items-center justify-center">
                  <icon name="ph:stripe-logo-bold" class="text-indigo-400 text-lg" />
                </div>
                <div>
                  <h4 class="text-xs font-bold">Stripe Checkout</h4>
                  <p class="text-[9px] text-gray-600 font-bold mt-0.5">ch_3Nle...8Zkz</p>
                </div>
              </div>
              <span class="text-[8px] font-black text-emerald-500 px-1.5 py-0.5 bg-emerald-500/10 rounded">Paid</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Order Metadata
const orderId = "ORD-0889"
const createdAt = "Oct 24, 2023, 10:45 AM"

const itemHeaders = [
  { label: 'Product', key: 'product', align: 'start' },
  { label: 'Qty', key: 'qty', align: 'center' },
  { label: 'Unit Price', key: 'unitPrice', align: 'end' },
  { label: 'Total', key: 'total', align: 'end' }
]

const orderItems = [
  {
    id: 1,
    name: 'Velocity Elite Runner',
    size: '42',
    color: 'Crimson',
    sku: 'VER-42-CRIM',
    qty: 1,
    unitPrice: 189.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80'
  }
]

// Timeline steps
const timeline = [
  { name: 'New', date: 'Oct 24, 10:45', status: 'completed' },
  { name: 'Confirmed', date: 'Oct 24, 11:30', status: 'completed' },
  { name: 'Processing', date: 'ACTIVE', status: 'active' },
  { name: 'Shipped', date: 'pending', status: 'upcoming' },
  { name: 'Delivered', date: 'pending', status: 'upcoming' },
]

// Log/Notes items
const orderLogs = [
  { text: "Customer requested express shipping as they need it before the weekend.", author: "Sarah J.", time: "Oct 24, 10:50 AM" },
  { text: "Payment confirmed via Stripe (ch_3Nle...8Zkz)", author: "System", time: "Oct 24, 10:45 AM" }
]

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Order ' + orderId,
});
</script>

<style scoped>
/* Scoped adjustments for StoreOS visual fidelity */
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>