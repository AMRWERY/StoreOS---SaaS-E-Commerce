<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] -mt-5">
      <VBreadcrumb :items="[
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Catalog' },
        { label: 'Products', to: '/dashboard/products' },
        { label: isEdit ? 'Edit Product' : 'Create Product', active: true }
      ]" class="mb-6" />
      <div class="flex items-center gap-6">
        <VBackButton to="/dashboard/products" label="Products" />
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ isEdit ? 'Edit Product' : 'Create New Product' }}</h1>
          <p class="text-xs text-gray-500 mt-1 font-medium">
            {{ isEdit ? "Modify existing Product details and status." : "Fill in the details to create a new manual Product." }}
          </p>
        </div>
      </div>

      <div class="max-w-[1400px] mx-auto p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-5">
        <!-- Left Column: Main Editor -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Basic Information -->
          <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xs font-black tracking-[0.2em] text-gray-500">Basic Information</h3>
              <span class="text-[9px] font-bold text-indigo-500/50">DRAFT-ID: 8823-AQ</span>
            </div>

            <div class="space-y-6">
              <VInput v-model="product.name" label="Product Name" placeholder="e.g. Kinetic Series: Modular Rack v2"
                inputClass="!w-full !bg-black !border-white/10 !rounded-xl !px-5 !py-4 !text-lg !font-bold focus:!outline-none focus:!border-indigo-500/50 !transition-colors" />

              <div class="space-y-2">
                <label class="text-[10px] font-bold text-gray-600">Description</label>
                <textarea v-model="product.description" placeholder="Enter product description..."
                  class="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm min-h-[160px] focus:outline-none focus:border-indigo-500/50 resize-y transition-colors"></textarea>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-[10px] font-bold text-gray-600">Category</label>
                  <div class="relative">
                    <select v-model="product.category"
                      class="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-sm appearance-none focus:outline-none focus:border-indigo-500/50 outline-none transition-colors">
                      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                    <icon name="ph:caret-down-bold"
                      class="absolute end-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                  </div>
                </div>
                <div class="flex items-end pb-3">
                  <button @click="showCategoryModal = true" type="button"
                    class="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors hover:underline">+
                    Create new category</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Media Assets -->
          <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xs font-black tracking-[0.2em] text-gray-500">Media Assets</h3>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <VFileUpload class="aspect-square [&>div]:h-full [&>div>div:first-child]:h-full"
                wrapperClass="h-full w-full bg-black border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:bg-white/[0.02] transition-all"
                icon="" title="" subtitle="">
                <icon name="ph:upload-simple-bold" class="text-2xl text-gray-700 group-hover:text-indigo-500 mb-2" />
                <p class="text-[10px] font-bold text-gray-600">Drag & drop asset</p>
              </VFileUpload>
              <div
                class="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer">
                <img src="/img/product-01.png"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60" />
              </div>
              <div
                class="aspect-square bg-gray-900 rounded-2xl overflow-hidden border border-white/5 relative group cursor-pointer">
                <img src="/img/product-02.png"
                  class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-60" />
                <div
                  class="absolute top-2 end-2 w-5 h-5 bg-black/60 rounded-md flex items-center justify-center text-[10px]">
                  2</div>
              </div>
            </div>
          </section>

          <!-- Financials -->
          <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
            <h3 class="text-xs font-black tracking-[0.2em] text-gray-500 mb-8">Financials</h3>
            <div class="grid grid-cols-3 gap-6 mb-8">
              <VInput v-model="product.price" type="number" label="Price"
                inputClass="!bg-black !border-white/10 !rounded-xl !ps-9 !pe-5 !py-4 !text-sm focus:!border-indigo-500/50 !outline-none">
                <template #prefix>
                  <span
                    class="absolute start-5 top-1/2 -translate-y-1/2 text-gray-600 text-sm z-10 pointer-events-none">$</span>
                </template>
              </VInput>

              <VInput v-model="product.comparePrice" type="number" label="Compare At"
                inputClass="!bg-black !border-white/10 !rounded-xl !ps-9 !pe-5 !py-4 !text-sm focus:!border-indigo-500/50 !outline-none">
                <template #prefix>
                  <span
                    class="absolute start-5 top-1/2 -translate-y-1/2 text-gray-600 text-sm z-10 pointer-events-none">$</span>
                </template>
              </VInput>

              <VInput v-model="product.cost" type="number" label="Cost per item"
                inputClass="!bg-black !border-white/10 !rounded-xl !ps-9 !pe-5 !py-4 !text-sm focus:!border-indigo-500/50 !outline-none">
                <template #prefix>
                  <span
                    class="absolute start-5 top-1/2 -translate-y-1/2 text-gray-600 text-sm z-10 pointer-events-none">$</span>
                </template>
              </VInput>
            </div>
            <div class="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div class="flex items-center gap-4">
                <span class="text-xs text-gray-500 font-medium">Projected Margin:</span>
                <span
                  class="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full tracking-widest">Margin
                  : {{ margin }}%</span>
              </div>
              <div class="text-end">
                <span class="text-xs text-gray-500 font-medium me-2">Profit:</span>
                <span class="text-lg font-bold text-white">${{ profit }}</span>
              </div>
            </div>
          </section>
        </div>

        <!-- Right Column: Sidebar Widgets -->
        <aside class="lg:col-span-4 space-y-8 lg:sticky lg:top-8 self-start">
          <!-- Status Card -->
          <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-[10px] font-black text-gray-600 tracking-widest">Status</h3>
              <div class="flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 rounded-full"
                  :class="product.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-600'">
                </div>
                <span class="text-[10px] font-bold tracking-tighter">{{ product.status }}</span>
              </div>
            </div>

            <!-- Segmented Control -->
            <div class="bg-black p-1 rounded-xl flex border border-white/5 mb-6">
              <button @click="toggleStatus('Draft')"
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all"
                :class="product.status === 'Draft' ? 'bg-white/5 text-white shadow-sm' : 'text-gray-600'">Draft</button>
              <button @click="toggleStatus('Active')"
                class="flex-1 py-2 text-[10px] font-black tracking-widest rounded-lg transition-all"
                :class="product.status === 'Active' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-600'">Active</button>
            </div>

            <div class="space-y-4 pt-4 border-t border-white/5">
              <label class="flex items-center justify-between group cursor-pointer">
                <span class="text-xs font-bold text-gray-500 group-hover:text-gray-300">All sales channels</span>
                <input type="checkbox" checked class="accent-indigo-500 w-4 h-4 bg-black rounded border-white/10" />
              </label>
              <label class="flex items-center justify-between group cursor-pointer">
                <span class="text-xs font-bold text-gray-500 group-hover:text-gray-300">Shopify/Inventory</span>
                <input type="checkbox" class="accent-indigo-500 w-4 h-4 bg-black rounded border-white/10" />
              </label>
            </div>

            <div class="flex gap-3 mt-8">
              <VButton variant="none"
                className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-xl text-[10px] font-black tracking-widest transition-colors">
                Save Draft</VButton>
              <VButton variant="none"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-[10px] font-black tracking-widest shadow-lg shadow-indigo-600/20 transition-all">
                Publish</VButton>
            </div>
          </section>

          <!-- Organization -->
          <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-6">
            <h3 class="text-[10px] font-black text-gray-600 tracking-widest mb-6">Organization</h3>
            <div class="space-y-6">
              <div class="space-y-3">
                <label class="text-[9px] font-bold text-gray-700">Tags</label>
                <div class="bg-black border border-white/10 rounded-xl p-3 flex flex-wrap gap-2">
                  <span v-for="tag in product.tags" :key="tag"
                    class="bg-indigo-500/10 text-indigo-400 text-[9px] font-black px-2 py-1 rounded flex items-center gap-1.5">
                    {{ tag }}
                    <icon name="ph:x-bold" class="cursor-pointer hover:text-white" />
                  </span>
                  <input type="text" placeholder="+ Add"
                    class="bg-transparent text-[9px] font-bold outline-none w-12" />
                </div>
              </div>

              <div class="space-y-3">
                <label class="text-[9px] font-bold text-gray-700">Collections</label>
                <div class="space-y-3">
                  <label v-for="c in ['Winter Collection 2024', 'Tools Essentials', 'Staff Picks']" :key="c"
                    class="flex items-center justify-between group cursor-pointer">
                    <span class="text-xs font-medium text-gray-500 group-hover:text-gray-300">{{ c }}</span>
                    <input type="checkbox" :checked="c.includes('Winter')"
                      class="accent-indigo-500 w-3.5 h-3.5 bg-black border-white/10 rounded" />
                  </label>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>

    <!-- Dilaog -->
    <VDialog v-model="showCategoryModal" title="Create Category" maxWidth="md">
      <div class="space-y-6">
        <VInput v-model="newCategoryName" label="Category Name" placeholder="e.g. Peripherals"
          inputClass="!bg-black !border-white/10 !rounded-xl !px-5 !py-4 !text-sm focus:!border-indigo-500/50" />
      </div>
      <template #footer>
        <VButton variant="none"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all"
          @click="handleCreateCategory">
          Create Category
        </VButton>
      </template>
    </VDialog>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const isEdit = computed(() => !!route.query.id)

const showCategoryModal = ref(false)
const newCategoryName = ref('')
const categories = ref(['Hardware Components', 'Accessories'])

const handleCreateCategory = () => {
  if (newCategoryName.value.trim()) {
    categories.value.push(newCategoryName.value.trim())
    product.value.category = newCategoryName.value.trim()
    showCategoryModal.value = false
    newCategoryName.value = ''
  }
}

const product = ref({
  name: 'Kinetic Series: Modular Rack v2',
  description: 'Provides detailed specifications and operational features...',
  category: 'Hardware Components',
  price: 249.00,
  comparePrice: 0.00,
  cost: 116.55,
  sku: 'KNT-MOD-2-BLK',
  barcode: '8123456789',
  quantity: 124,
  status: 'Draft', // Draft or Active
  tags: ['MODULAR', 'KINETIC'],
  trackInventory: true,
  hasVariants: true
})


// --- Logic ---
const margin = computed(() => {
  if (!product.value.price) return 0
  return (((product.value.price - product.value.cost) / product.value.price) * 100).toFixed(0)
})

const profit = computed(() => (product.value.price - product.value.cost).toFixed(2))

const toggleStatus = (status: string) => product.value.status = status

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Product Form',
});
</script>