<template>
  <div>
    <section class="max-w-7xl mx-auto space-y-8">
      <h2 class="text-center text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] mb-12">Role Permissions
        Matrix</h2>

      <VAccordion :items="matrixSections" v-model="expandedSection">
        <template #header="{ item }">
          <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
            <icon :name="item.icon" class="text-gray-500 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div class="flex-1 text-start">
            <h3 class="text-sm font-bold">{{ item.id }}</h3>
            <p class="text-xs text-gray-500 mt-1 font-medium">{{ item.desc }}</p>
          </div>
        </template>

        <template #header-suffix>
          <div class="flex -space-s-2">
            <div v-for="i in 3" :key="i"
              class="w-7 h-7 rounded-full border-2 border-[#0c0c0e] bg-indigo-500/20 text-[8px] flex items-center justify-center font-bold">
              {{ ['O', 'M', 'S'][i - 1] }}
            </div>
          </div>
        </template>

        <template #content="{ item }">
          <!-- Contextual Search -->
          <div class="bg-black/40 border border-white/5 rounded-xl p-3 flex items-center gap-4 max-w-md">
            <icon name="ph:magnifying-glass-bold" class="text-gray-600" />
            <input type="text" placeholder="Quick search staff..." class="bg-transparent outline-none text-xs flex-1" />
            <div class="flex items-center gap-3 text-[9px] font-black text-gray-700 uppercase">
              <span class="flex items-center gap-1">
                <icon name="ph:file-text-bold" />
                Report
              </span>
              <span class="flex items-center gap-1">
                <icon name="ph:clock-counter-clockwise-bold" />
                Logs
              </span>
            </div>
          </div>

          <!-- Permission Columns -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="col in ['OWNER', 'MANAGER', 'STAFF']" :key="col"
              class="bg-black/20 border border-white/5 rounded-2xl p-6 group/col">
              <div class="flex items-center justify-between mb-6">
                <h4
                  class="text-[10px] font-black text-gray-600 uppercase tracking-widest group-hover/col:text-indigo-400 transition-colors">
                  {{ col }}</h4>
                <div class="w-1.5 h-1.5 rounded-full bg-white/10" :class="col === 'OWNER' ? 'bg-indigo-500' : ''">
                </div>
              </div>

              <div v-if="col === 'STAFF'" class="text-[10px] text-gray-700 italic">No access granted to this module.
              </div>
              <ul v-else class="space-y-4">
                <li
                  v-for="perm in (col === 'OWNER' ? ['Full System Access', 'API Key Management', 'Delete Logs'] : ['View Logs Only', 'API Access'])"
                  :key="perm" class="flex items-center gap-3 text-xs text-gray-500">
                  <div class="w-1 h-1 rounded-full bg-indigo-500/40"></div>
                  {{ perm }}
                </li>
              </ul>
            </div>
          </div>
        </template>
      </VAccordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
const expandedSection = ref('Security & System Logs')

const matrixSections = [
  { id: 'Inventory Management', desc: 'Control over SKUs, stock levels, and supplier data.', icon: 'ph:package-bold' },
  { id: 'Financial Records & Payroll', desc: 'Access to revenue reports, tax documents, and staff salary data.', icon: 'ph:bank-bold' },
  { id: 'Operational Analytics', desc: 'View-only access to customer performance dashboards and KPIs.', icon: 'ph:chart-line-up-bold' },
  { id: 'Security & System Logs', desc: 'Advanced logs, audit trails, and security settings for the platform.', icon: 'ph:shield-check-bold' }
]
</script>