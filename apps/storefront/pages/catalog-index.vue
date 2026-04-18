  <template>
    <div class="text-[#F0F0FF] selection:bg-[#6366F1]/30 pb-20">
      <!-- ============ TERMINAL HEADER ======= -->
      <header class="pt-12 pb-16 px-6 lg:px-12 border-b border-[#1C1C30]">
        <div class="max-w-[1400px] mx-auto">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div
                  class="h-12 w-12 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center">
                  <Icon name="solar:folder-with-files-bold-duotone" class="w-7 h-7 text-[#6366F1]" />
                </div>
                <h1 class="text-5xl lg:text-6xl font-bold tracking-tighter">Catalog Index</h1>
              </div>
              <p class="text-[15px] text-[#8888AA] max-w-xl leading-relaxed tracking-tight font-medium">
                System-wide directory of curated assets and category nodes.
                Search the registry to locate specific inventory sectors.
              </p>
            </div>

            <!-- Registry Search -->
            <VSearchInput
              v-model="searchRegistry"
              placeholder="SEARCH_REGISTRY_INDEX..."
              wrapper-class="w-full lg:w-[380px]"
              input-class="!bg-[#0D0D18] !border-[#1C1C30] !rounded-xl !ps-11 !pe-5 !py-4 !text-[12px] !font-bold !tracking-widest focus:!border-[#6366F1] placeholder:!text-[#262640]"
            />
          </div>
        </div>
      </header>

      <!-- ========== DIRECTORY STATS ========= -->
      <section class="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <VStatCard
            v-for="stat in systemStats"
            :key="stat.label"
            :label="stat.label"
            :value="stat.value"
            :trend="stat.trend"
            :icon-name="stat.icon"
            class="!bg-[#0D0D18] !border-[#1C1C30] hover:!border-[#6366F1]/30"
            value-class="!text-3xl !font-bold !text-white !tracking-tighter"
            label-class="!text-[10px] !font-black !text-[#50506A] !tracking-[0.25em]"
          />
        </div>
      </section>

      <!-- ========== CATEGORY MATRIX ========== -->
      <div class="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="cat in categories" :key="cat.id"
            class="group relative bg-[#0D0D18] border border-[#1C1C30] rounded-[24px] overflow-hidden transition-all hover:border-[#6366F1]/40 flex flex-col">

            <!-- Visual Node -->
            <div class="relative aspect-[16/9] overflow-hidden bg-black border-b border-[#1C1C30]">
              <img :src="cat.img"
                class="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000" />

              <div class="absolute inset-0 bg-gradient-to-t from-[#0D0D18] to-transparent"></div>

              <div
                class="absolute top-6 start-6 text-[10px] font-bold text-[#6366F1] bg-[#6366F1]/10 px-2 py-1 rounded border border-[#6366F1]/20">
                {{ cat.id }}
              </div>

              <div class="absolute bottom-6 start-8">
                <h3 class="text-2xl font-bold tracking-tight text-white group-hover:text-[#6366F1] transition-colors">
                  {{ cat.name }}
                </h3>
              </div>
            </div>

            <!-- Links Node -->
            <div class="p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div class="space-y-4">
                <p class="text-[10px] font-black text-[#50506A] tracking-widest">Active Sectors</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="sub in cat.sub" :key="sub"
                    class="bg-white/5 border border-white/5 px-3 py-1 rounded-md text-[11px] font-medium text-[#8888AA] hover:text-[#F0F0FF] hover:border-[#6366F1]/50 cursor-pointer transition-all">
                    {{ sub }}
                  </span>
                </div>
              </div>

              <div class="pt-6 border-t border-[#1C1C30] flex items-center justify-between">
                <div class="space-y-1">
                  <p class="text-[18px] font-bold text-[#F0F0FF]">{{ cat.count }}</p>
                  <p class="text-[9px] font-black text-[#50506A] tracking-widest">Units Logged</p>
                </div>
                <button
                  class="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[#50506A] group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                  <Icon name="solar:arrow-right-up-linear" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script lang="ts" setup>
// --- State ---
const searchRegistry = ref('');

// --- Mock Data ---
const systemStats = [
  { label: 'Total SKU Count', value: '1,420', trend: 'Live', icon: 'ph:barcode-bold' },
  { label: 'Active Categories', value: '08', trend: 'Mapped', icon: 'ph:folders-bold' },
  { label: 'Global Availability', value: '99.9%', trend: 'Stable', icon: 'ph:globe-stand-bold' },
];

const categories = [
  {
    id: 'CAT-01',
    name: 'Apparel & Textiles',
    sub: ['Outerwear', 'Base Layers', 'Technical Wear'],
    count: 420,
    img: '/img/category-01.avif'
  },
  {
    id: 'CAT-02',
    name: 'Hardware & Tools',
    sub: ['Modular Racks', 'Components', 'Workstations'],
    count: 128,
    img: '/img/category-02.avif'
  },
  {
    id: 'CAT-03',
    name: 'Optics & Precision',
    sub: ['Lenses', 'Sensors', 'Visual Gear'],
    count: 85,
    img: '/img/category-03.avif'
  },
  {
    id: 'CAT-04',
    name: 'Aesthetic Objects',
    sub: ['Vases', 'Sculptures', 'Decor'],
    count: 210,
    img: '/img/category-04.avif'
  },
  {
    id: 'CAT-05',
    name: 'Digital Essentials',
    sub: ['Peripherals', 'Storage', 'Input Units'],
    count: 342,
    img: '/img/category-05.avif'
  },
  {
    id: 'CAT-06',
    name: 'Personal Care',
    sub: ['Serums', 'Hydration', 'Kits'],
    count: 115,
    img: '/img/category-06.avif'
  },
];
</script>