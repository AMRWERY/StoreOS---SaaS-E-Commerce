<template>
  <div>
    <div class="min-h-screen bg-[#050505] text-[#e1e1e1] -mt-4 pb-20">
    <!-- Header -->
    <header class="flex items-center justify-between mb-10">
      <div class="flex items-center gap-6">
        <VBackButton to="/dashboard/orders" label="Orders" />
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ isEdit ? 'Edit Order' : 'Create New Order' }}</h1>
          <p class="text-xs text-gray-500 mt-1 font-medium">
            {{ isEdit ? 'Modify existing order details and status.' : 'Fill in the details to create a new manual order.' }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <VButton variant="none" to="/dashboard/orders"
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold transition-all text-gray-400 hover:text-white">
          Discard
        </VButton>
        <VButton @click="saveOrder"
          className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20">
          {{ isEdit ? 'Save Changes' : 'Create Order' }}
        </VButton>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left side: Main Form -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Customer Selection -->
        <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
          <h3 class="text-xs font-black tracking-[0.15em] flex items-center gap-2 mb-8">
            <icon name="ph:user-bold" class="text-indigo-500" />
            Customer Information
          </h3>

          <div class="grid grid-cols-2 gap-6">
            <div class="relative">
              <icon name="ph:magnifying-glass-bold"
                class="absolute start-4 top-[38px] text-gray-700 z-10 pointer-events-none" />
              <VInput
                label="Search Customer"
                placeholder="Start typing name or email..."
                inputClass="!ps-10"
              />
            </div>
            <VInput
              label="Contact Email"
              type="email"
              v-model="form.email"
              placeholder="customer@example.com"
            />
          </div>

          <div
            class="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-colors cursor-pointer">
            <div class="flex items-center gap-4">
              <div
                class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-indigo-400 transition-colors">
                <icon name="ph:plus-bold" />
              </div>
              <div>
                <h4 class="text-sm font-bold">New Customer</h4>
                <p class="text-[10px] text-gray-600 font-medium mt-0.5">Create a new customer profile for this order.</p>
              </div>
            </div>
            <icon name="ph:caret-right-bold" class="text-gray-800 group-hover:text-white transition-colors" />
          </div>
        </section>

        <!-- Order Items -->
        <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden">
          <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h3 class="text-xs font-black tracking-[0.15em] flex items-center gap-2">
              <icon name="ph:package-bold" class="text-indigo-500" />
              Products selection
            </h3>
            <VButton variant="none"
              className="text-[10px] font-black text-indigo-400 tracking-widest flex items-center gap-1.5 hover:text-white transition-colors">
              <icon name="ph:plus-circle-bold" class="text-sm" /> Add Product
            </VButton>
          </div>

          <div class="p-8">
            <div v-if="form.items.length === 0" class="py-12 flex flex-col items-center text-center">
              <div
                class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-700 mb-4 border border-white/[0.02]">
                <icon name="ph:shopping-cart-bold" class="text-2xl" />
              </div>
              <h4 class="text-sm font-bold text-gray-500">No products added yet</h4>
              <p class="text-[10px] text-gray-700 mt-1 max-w-[200px]">Search and add products from your inventory to
                this order.</p>
            </div>

            <div v-else class="space-y-3">
              <div v-for="item in form.items" :key="item.id"
                class="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-all">
                <img :src="item.image" class="w-14 h-14 rounded-xl object-cover border border-white/5 grayscale opacity-70" />
                <div class="flex-1 min-w-0">
                  <h5 class="text-sm font-bold truncate">{{ item.name }}</h5>
                  <p class="text-[10px] text-gray-600 font-bold mt-0.5">{{ item.variant }}</p>
                  <p class="text-[9px] text-gray-700 font-medium">SKU: {{ item.sku }}</p>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <div class="flex items-center gap-1 bg-black border border-white/10 rounded-lg overflow-hidden">
                    <VButton variant="none" className="px-2.5 py-1.5 text-gray-500 hover:text-white transition-colors text-xs"
                      @click="item.qty = Math.max(1, item.qty - 1)">
                      <icon name="ph:minus-bold" />
                    </VButton>
                    <span class="text-xs font-bold px-2 min-w-[24px] text-center">{{ item.qty }}</span>
                    <VButton variant="none" className="px-2.5 py-1.5 text-gray-500 hover:text-white transition-colors text-xs"
                      @click="item.qty++">
                      <icon name="ph:plus-bold" />
                    </VButton>
                  </div>
                  <span class="text-sm font-bold text-indigo-400 min-w-[60px] text-end">${{ (item.price * item.qty).toFixed(2) }}</span>
                  <VButton variant="none" className="p-1.5 text-gray-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    @click="form.items = form.items.filter(i => i.id !== item.id)">
                    <icon name="ph:x-bold" class="text-xs" />
                  </VButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Order Notes -->
        <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
          <h3 class="text-xs font-black tracking-[0.15em] flex items-center gap-2 mb-8">
            <icon name="ph:notebook-bold" class="text-indigo-500" />
            Order Notes
          </h3>
          <textarea v-model="form.notes" placeholder="Internal notes (not visible to customer)..."
            class="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm h-32 focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-gray-800 resize-none"
          ></textarea>
        </section>
      </div>

      <!-- Right side: Meta Panels -->
      <aside class="space-y-8">
        <!-- Status & Tags -->
        <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <h3 class="text-[10px] font-black text-gray-600 tracking-widest mb-6 px-1">Order Status</h3>
          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[9px] font-bold text-gray-700 tracking-widest ps-1">Payment Status</label>
              <select v-model="form.paymentStatus"
                class="w-full bg-black border border-white/10 rounded-xl py-2.5 px-4 text-xs font-bold focus:outline-none focus:border-indigo-500/50 transition-all select-scrollbar cursor-pointer appearance-none">
                <option value="PAID">Paid</option>
                <option value="UNPAID">Unpaid</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-bold text-gray-700 tracking-widest ps-1">Fulfillment Status</label>
              <select v-model="form.status"
                class="w-full bg-black border border-white/10 rounded-xl py-2.5 px-4 text-xs font-bold focus:outline-none focus:border-indigo-500/50 transition-all select-scrollbar cursor-pointer appearance-none">
                <option value="NEW">New</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Summary Statistics -->
        <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div class="absolute -end-8 -top-8 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
          <h3 class="text-[10px] font-black text-gray-600 tracking-widest mb-8 px-1 relative z-10">Order Summary</h3>

          <div class="space-y-4 relative z-10 px-1">
            <div class="flex justify-between text-xs font-bold text-gray-700">
              <span>Subtotal</span>
              <span class="text-white">$0.00</span>
            </div>
            <div class="flex justify-between text-xs font-bold text-gray-700">
              <span>Shipping</span>
              <span class="text-white">$0.00</span>
            </div>
            <div class="flex justify-between text-xs font-bold text-gray-700">
              <span>Discount</span>
              <span class="text-red-500">-$0.00</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-white/5">
              <span class="text-sm font-black text-white tracking-widest">Total</span>
              <span class="text-2xl font-bold text-indigo-400">$0.00</span>
            </div>
          </div>
        </section>

        <!-- Tags Panel -->
        <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <h3 class="text-[10px] font-black text-gray-600 tracking-widest mb-6 px-1">Tags & Category</h3>
          <div class="space-y-4">
            <VInput placeholder="Add tag (press Enter)" />
            <div class="flex flex-wrap gap-2 pt-2">
              <span v-for="tag in ['Manual', 'B2B', 'Urgent']" :key="tag"
                class="bg-white/5 text-gray-500 text-[9px] font-black px-2.5 py-1 rounded tracking-wider border border-white/[0.02] hover:text-white hover:border-white/10 transition-all cursor-default">
                {{ tag }}
              </span>
            </div>
          </div>
        </section>
      </aside>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const isEdit = computed(() => !!route.query.id)

const form = reactive({
  email: 'ethan.l@designstack.io',
  items: [
    {
      id: 1,
      name: 'Velocity Elite Runner',
      variant: 'Size: 42 | Crimson',
      sku: 'VER-42-CRIM',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80',
      price: 189,
      qty: 1
    },
    {
      id: 2,
      name: 'Urban Stealth Hoodie',
      variant: 'Size: L | Charcoal',
      sku: 'USH-L-CHA',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=100&q=80',
      price: 95,
      qty: 2
    },
    {
      id: 3,
      name: 'Minimal Leather Watch',
      variant: 'Black Dial | Brown Strap',
      sku: 'MLW-BK-BR',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80',
      price: 340,
      qty: 1
    }
  ] as any[],
  notes: '',
  status: 'NEW',
  paymentStatus: 'UNPAID'
})

const saveOrder = () => {
  console.log('Saving order...', form)
  setTimeout(() => {
    navigateTo('/dashboard/orders')
  }, 1000);
}
</script>