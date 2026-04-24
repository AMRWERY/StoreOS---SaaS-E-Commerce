  <template>
    <div class="text-tx-primary selection:bg-brand/30 pb-32">
      <!-- VAULT HEADER -->
      <header class="pt-12 pb-16 px-6 lg:px-12 border-b border-border-subtle">
        <div class="max-w-[1400px] mx-auto">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div class="space-y-6">
              <div class="flex items-center gap-5">
                <div
                  class="w-16 h-16 rounded-2xl bg-bg-elevated border border-border-default flex items-center justify-center shadow-2xl">
                  <Icon name="solar:archive-minimalistic-bold-duotone" class="w-8 h-8 text-brand" />
                </div>
                <div>
                  <h1 class="text-5xl lg:text-6xl font-bold tracking-tighter">Archive Vault</h1>
                  <p class="text-[12px] text-tx-muted mt-2 tracking-widest">
                    Secure Storage Cluster / Node: 8829-VAULT
                  </p>
                </div>
              </div>
              <p class="text-[16px] text-tx-secondary max-w-2xl leading-relaxed">
                Historical directory of all legacy units and end-of-life production cycles.
                Items in this archive are no longer in active manufacturing but remain in the StoreOS registry for
                identity verification.
              </p>
            </div>

            <!-- Chrono Toggle -->
            <div class="bg-bg-primary border border-border-subtle p-1 rounded-xl flex gap-1">
              <button v-for="year in years" :key="year" @click="selectedYear = year"
                class="px-5 py-2 text-[11px] font-black tracking-widest rounded-lg transition-all"
                :class="selectedYear === year ? 'bg-brand text-white shadow-lg shadow-[#6366F1]/20' : 'text-tx-muted hover:text-tx-secondary'">
                {{ year }}
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- ========= VAULT STATS PANEL ========= -->
      <section class="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="stat in archiveStats" :key="stat.label"
            class="bg-bg-primary border border-border-subtle rounded-2xl p-8 flex items-center justify-between group hover:border-brand/30 transition-all">
            <div class="space-y-4">
              <p class="text-[10px] font-black text-tx-muted tracking-[0.25em]">{{ stat.label }}</p>
              <p class="text-4xl font-bold text-white tracking-tighter">{{ stat.value }}</p>
            </div>
            <div
              class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
              <Icon :name="stat.icon" class="w-6 h-6 text-tx-muted group-hover:text-brand transition-colors" />
            </div>
          </div>
        </div>
      </section>

      <!-- ========= DIRECTORY LIST (Operational Table) ========= -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        <div class="bg-bg-primary border border-border-subtle rounded-[24px] overflow-hidden shadow-2xl">
          <!-- Table Header Control -->
          <div
            class="p-6 px-8 border-b border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.01]">
            <h3 class="text-[11px] font-black text-tx-secondary tracking-[0.3em]">Registry Table Index</h3>
            <div class="relative w-full md:w-80 group">
              <Icon name="solar:magnifer-linear"
                class="absolute start-4 top-1/2 -translate-y-1/2 text-tx-muted group-focus-within:text-brand transition-colors" />
              <input v-model="searchQuery" type="text" placeholder="SEARCH_BY_SKU_OR_NAME..."
                class="w-full bg-black/40 border border-border-subtle rounded-lg ps-11 pe-4 py-2.5 text-[11px] text-white focus:border-brand outline-none transition-all placeholder:text-[#262640]" />
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-start">
              <thead class="text-[10px] font-black text-tx-muted tracking-widest border-b border-border-subtle">
                <tr>
                  <th class="px-8 py-5">Visual / Asset</th>
                  <th class="px-8 py-5">System ID (SKU)</th>
                  <th class="px-8 py-5">Collection Node</th>
                  <th class="px-8 py-5">Release Date</th>
                  <th class="px-8 py-5 text-end">Operational Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-subtle">
                <tr v-for="item in archiveItems" :key="item.sku" class="group hover:bg-white/[0.01] transition-colors">
                  <!-- Thumbnail -->
                  <td class="px-8 py-6">
                    <div class="flex items-center gap-6">
                      <div
                        class="w-14 h-14 rounded-lg overflow-hidden border border-border-default bg-black shrink-0 relative">
                        <img :src="item.img"
                          class="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                      </div>
                      <span class="text-sm font-bold text-tx-primary group-hover:text-white transition-colors">{{
                        item.name }}</span>
                    </div>
                  </td>
                  <!-- SKU -->
                  <td class="px-8 py-6">
                    <span class="text-[11px] font-bold text-tx-muted group-hover:text-brand transition-colors">
                      {{ item.sku }}
                    </span>
                  </td>
                  <!-- Collection -->
                  <td class="px-8 py-6">
                    <span class="text-[11px] font-bold text-tx-secondary tracking-widest">{{ item.collection
                      }}</span>
                  </td>
                  <!-- Date -->
                  <td class="px-8 py-6">
                    <span class="text-[11px] text-tx-muted">{{ item.release }}</span>
                  </td>
                  <!-- Status -->
                  <td class="px-8 py-6 text-end">
                    <span
                      class="text-[9px] font-black px-3 py-1 bg-bg-elevated border border-border-default rounded tracking-tighter"
                      :class="[
                        item.status === 'ARCHIVED' ? 'text-brand border-brand/30' :
                          item.status === 'DECOMMISSIONED' ? 'text-[#F97316] border-[#F97316]/30' :
                            'text-gray-600'
                      ]">
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-8 border-t border-border-subtle flex justify-between items-center bg-white/[0.01]">
            <p class="text-[10px] font-bold text-tx-muted tracking-widest">Displaying Sector Index 01-05</p>
            <div class="flex gap-4">
              <button
                class="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest text-tx-muted hover:text-white transition-all">Previous
                Block</button>
              <button
                class="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest text-tx-muted hover:text-white transition-all">Next
                Block</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script lang="ts" setup>
// --- State ---
const selectedYear = ref('2023');
const searchQuery = ref('');

// --- Mock Data ---
const archiveStats = [
  { label: 'Archived Units', value: '4,821', icon: 'solar:box-bold-duotone' },
  { label: 'Legacy Collections', value: '12', icon: 'solar:folder-favourite-star-bold-duotone' },
  { label: 'Storage Status', value: '92%', icon: 'solar:database-bold-duotone' },
];

const archiveItems = [
  {
    sku: 'SKU-00-882',
    name: 'Vanguard Trench v1',
    collection: 'Winter Archive',
    year: '2026',
    release: '11.02.2023',
    status: 'DECOMMISSIONED',
    img: '/img/product-01.avif'
  },
  {
    sku: 'SKU-09-114',
    name: 'Onyx Modular Workdesk',
    collection: 'Tactical Hardware',
    year: '2026',
    release: '08.15.2023',
    status: 'END_OF_LIFE',
    img: '/img/product-02.avif'
  },
  {
    sku: 'SKU-04-201',
    name: 'Prime Focus Lens 35mm',
    collection: 'Optics & Precision',
    year: '2026',
    release: '03.20.2022',
    status: 'ARCHIVED',
    img: '/img/product-03.avif'
  },
  {
    sku: 'SKU-02-771',
    name: 'Kinetic Runner v0.9',
    collection: 'Beta Footwear',
    year: '2026',
    release: '01.10.2022',
    status: 'DEPRECATED',
    img: '/img/product-04.avif'
  },
  {
    sku: 'SKU-11-900',
    name: 'Industrial Glass Set',
    collection: 'Aesthetic Objects',
    year: '2026',
    release: '12.24.2023',
    status: 'DECOMMISSIONED',
    img: '/img/product-05.avif'
  }
];

const years = ['2026', '2025', '2024', '2023', '2022', '2021'];
</script>