<template>
    <div class="text-[#F0F0FF] selection:bg-[#6366F1]/30 pb-32">
      <!-- ================= AUDIT HEADER ================== -->
      <header class="relative pt-12 pb-16 px-6 lg:px-12 border-b border-[#1C1C30]">
        <div class="max-w-[1400px] mx-auto">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center">
                  <Icon name="solar:lock-bold-duotone" class="w-8 h-8 text-[#6366F1]" />
                </div>
                <h1 class="text-5xl lg:text-6xl font-bold tracking-tighter">Compliance</h1>
              </div>
              <p class="text-[16px] text-[#8888AA] max-w-xl leading-relaxed">
                StoreOS operates on a zero-trust infrastructure. Every transaction and data node
                is audited against global security protocols in real-time.
              </p>
            </div>

            <!-- Live System Status -->
            <div
              class="bg-[#0D0D18] border border-[#1C1C30] rounded-2xl p-6 min-w-[320px] relative overflow-hidden group">
              <div class="absolute top-0 end-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon name="solar:globus-bold" class="w-20 h-20" />
              </div>

              <div class="relative z-10 space-y-6">
                <div class="flex justify-between items-center">
                  <span class="text-[10px] font-black text-[#50506A] tracking-widest">Global Status</span>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10B981]"></div>
                    <span class="text-[10px] font-black text-[#10B981] tracking-widest">Operational</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="flex justify-between text-[11px]">
                    <span class="text-[#50506A]">Audit_ID</span>
                    <span class="text-[#F0F0FF]">{{ auditID }}</span>
                  </div>
                  <div class="flex justify-between text-[11px]">
                    <span class="text-[#50506A]">Last_Sync</span>
                    <span class="text-[#F0F0FF]">{{ lastAuditDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- ========== CERTIFICATION GRID ======= -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 space-y-24">

        <!-- Section: Active Certifications -->
        <section class="space-y-12">
          <div class="text-center">
            <h2 class="text-[11px] font-black text-[#6366F1] tracking-[0.4em]">Trust Framework</h2>
            <p class="text-2xl font-bold mt-2">Validated Security Standards</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="cert in certifications" :key="cert.name"
              class="bg-[#0D0D18] border border-[#1C1C30] p-8 rounded-2xl group hover:border-[#6366F1]/30 transition-all flex flex-col items-center text-center">
              <Icon :name="cert.icon"
                :class="[cert.color, 'w-10 h-10 mb-6 group-hover:scale-110 transition-transform']" />
              <h3 class="text-[15px] font-bold text-white mb-2">{{ cert.name }}</h3>
              <span
                class="bg-white/5 border border-white/10 text-[9px] font-black tracking-widest px-3 py-1 rounded-full text-gray-500 group-hover:text-[#6366F1] group-hover:border-[#6366F1]/20 transition-colors">
                {{ cert.status }}
              </span>
            </div>
          </div>
        </section>

        <!-- Section: Technical Protocol Matrix -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div class="lg:col-span-4 min-w-0 space-y-6">
            <h2 class="text-3xl font-bold tracking-tight">Security <br /> Infrastructure</h2>
            <p class="text-[14px] text-[#8888AA] leading-relaxed">
              Our technical stacks are isolated at the hardware level. We maintain absolute separation
              of sensitive merchant data and customer identity archives.
            </p>
            <div class="pt-6">
              <VButton
                to="/whitepaper"
                label="Full Whitepaper"
                icon="solar:shield-warning-bold"
                variant="primary"
                class="!rounded-xl !py-4 !px-8 !text-[11px] !font-black !tracking-widest"
              />
            </div>
          </div>

          <div class="lg:col-span-8 min-w-0 bg-[#0D0D18] border border-[#1C1C30] rounded-3xl overflow-hidden">
            <div class="p-6 border-b border-[#1C1C30] bg-white/[0.01]">
              <h3 class="text-[11px] font-black text-[#50506A] tracking-widest">Protocol Sync Matrix</h3>
            </div>

            <VTable
              :headers="tableHeaders"
              :items="tableItems"
              table-class="!bg-transparent"
            >
              <template #cell(status)="{ item }">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span class="text-[11px] font-bold text-[#F0F0FF]">{{ item.status }}</span>
                </div>
              </template>
              <template #cell(protocol)="{ item }">
                <span class="text-[11px] text-[#6366F1] font-bold">{{ item.protocol }}</span>
              </template>
            </VTable>
          </div>
        </section>

        <!-- Section: Data Sovereignty -->
        <section
          class="bg-gradient-to-r from-[#6366F1]/10 to-transparent border border-[#6366F1]/20 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="space-y-4">
            <h3 class="text-2xl font-bold tracking-tight">Data Sovereignty</h3>
            <p class="text-[14px] text-[#8888AA] max-w-xl">
              All infrastructure resides within EEA / Switzerland regions. 
              Zero-knowledge encryption ensures StoreOS personnel never access raw merchant datasets.
            </p>
          </div>
          <VButton
            to="/privacy"
            label="View Privacy Protocol"
            icon="solar:arrow-right-linear"
            variant="secondary"
            class="!bg-[#1C1C30] !border-[#262640] !text-white !px-6 !py-3 !text-[10px] !font-black !tracking-widest"
          />
        </section>
      </div>
    </div>
</template>

<script lang="ts" setup>
// --- Metadata ---
const auditID = "AUD-2024-X991";
const lastAuditDate = "2024.03.14 09:12 UTC";
const complianceVersion = "v4.0-SECURE";

// --- Data ---
const tableHeaders = [
  { label: 'Operational Sector', key: 'sector', class: 'text-[12px] font-bold text-[#F0F0FF]' },
  { label: 'Status', key: 'status' },
  { label: 'Protocol Layer', key: 'protocol' }
];

const tableItems = [
  { sector: 'Network Layer Architecture', status: 'Encrypted', protocol: 'TLS 1.3 / AES-256' },
  { sector: 'IAM Identity Management', status: 'Active', protocol: 'OAuth 2.1 / SAML' },
  { sector: 'Database Persistence', status: 'Isolated', protocol: 'Point-in-Time Recovery' },
  { sector: 'Asset Delivery (CDN)', status: 'Global', protocol: 'Edge SSL Termination' },
];

const certifications = [
  { name: 'SOC2 Type II', status: 'COMPLIANT', icon: 'solar:shield-check-bold-duotone', color: 'text-indigo-400' },
  { name: 'PCI-DSS v4.0', status: 'CERTIFIED', icon: 'solar:card-2-bold-duotone', color: 'text-indigo-400' },
  { name: 'GDPR / CCPA', status: 'ENFORCED', icon: 'solar:user-block-bold-duotone', color: 'text-indigo-400' },
  { name: 'ISO 27001', status: 'VERIFIED', icon: 'solar:document-bold-duotone', color: 'text-indigo-400' },
];
const securityProtocols = [
  { id: 'SC-101', protocol: 'End-to-End Encryption', value: 'AES-256 GCM', status: 'ACTIVE' },
  { id: 'SC-102', protocol: 'DDoS Mitigation', value: 'Edge Layer 7', status: 'OPTIMAL' },
  { id: 'SC-103', protocol: 'Identity Access', value: 'Multi-Factor Auth', status: 'ENFORCED' },
  { id: 'SC-104', protocol: 'Data Residency', value: 'Regional Isolated', status: 'COMPLIANT' },
];
</script>