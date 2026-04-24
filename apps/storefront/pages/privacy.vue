  <template>
    <div class="text-tx-primary selection:bg-brand/30">
      <!-- ======== TERMINAL HEADER ====== -->
      <header class="relative pt-12 pb-16 px-6 lg:px-12 border-b border-border-subtle overflow-hidden">
        <!-- Background Ambient Glow -->
        <div class="absolute -top-24 -start-24 w-96 h-96 bg-brand/5 rounded-full blur-[120px]"></div>
        <div class="max-w-[1400px] mx-auto relative z-10">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div
                  class="h-12 w-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <Icon name="solar:shield-keyhole-bold-duotone" class="w-7 h-7 text-brand" />
                </div>
                <h1 class="text-5xl lg:text-6xl font-bold tracking-tighter">Privacy Protocol</h1>
              </div>
              <p class="text-[15px] text-tx-secondary max-w-xl leading-relaxed">
                Transparent documentation regarding the collection, processing, and protection
                of data within the StoreOS kinetic environment.
              </p>
            </div>

            <!-- Protocol Metadata -->
            <div class="flex flex-col gap-2">
              <div class="bg-bg-primary border border-border-subtle rounded-lg p-4 px-6 flex items-center gap-8">
                <div class="space-y-1">
                  <p class="text-[9px] font-black text-tx-muted tracking-widest">Protocol ID</p>
                  <p class="text-[12px] font-bold text-brand">{{ protocolID }}</p>
                </div>
                <div class="h-8 w-px bg-border-subtle"></div>
                <div class="space-y-1">
                  <p class="text-[9px] font-black text-tx-muted tracking-widest">Last Modified</p>
                  <p class="text-[12px] font-bold text-tx-primary">{{ lastModified }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- ========== MAIN CONTENT GRID =========== -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Sticky Navigation Sidebar -->
        <aside class="lg:col-span-3">
          <div class="sticky top-10 space-y-1">
            <p class="text-[10px] font-black text-tx-muted tracking-[0.3em] mb-6 px-4">Jump To Segment</p>
            <button v-for="section in policySections" :key="section.id" @click="scrollTo(section.id)"
              class="w-full text-start px-4 py-4 rounded-xl border-s-2 transition-all flex flex-col gap-1" :class="activeTab === section.id
                ? 'bg-bg-elevated border-brand text-white'
                : 'border-transparent text-tx-muted hover:bg-white/[0.02] hover:text-tx-secondary'">
              <span class="text-[11px] font-bold tracking-widest">{{ section.title }}</span>
              <span class="text-[10px] opacity-60 font-medium">{{ section.desc }}</span>
            </button>
          </div>
        </aside>

        <!-- Document Body -->
        <div class="lg:col-span-9 space-y-24 pb-40">
          <!-- Section 01: Data Ingress -->
          <article id="collection" class="scroll-mt-20 space-y-8">
            <div class="flex items-center gap-4">
              <h2 class="text-3xl font-bold">Data Ingress</h2>
              <div class="h-px flex-1 bg-gradient-to-r from-[#1C1C30] to-transparent"></div>
            </div>

            <div class="space-y-6 text-[15px] leading-relaxed text-tx-secondary">
              <p>We log operational data required to maintain the stability of your terminal sessions. This data
                includes, but is not limited to:</p>
              <div class="grid md:grid-cols-2 gap-4">
                <div
                  v-for="item in ['Identity Metadata (Email, Name)', 'Transaction Logs', 'Network Vectors (IP, Browser)', 'Operational Metrics']"
                  class="bg-bg-primary border border-border-subtle p-4 rounded-lg flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-brand"></div>
                  <span class="text-[13px] font-medium text-white">{{ item }}</span>
                </div>
              </div>
            </div>
          </article>

          <!-- Section 02: Processing Logic -->
          <article id="utilization" class="scroll-mt-20 space-y-8">
            <div class="flex items-center gap-4">
              <h2 class="text-3xl font-bold">Processing Logic</h2>
              <div class="h-px flex-1 bg-gradient-to-r from-[#1C1C30] to-transparent"></div>
            </div>

            <div class="space-y-6 text-[15px] leading-relaxed text-tx-secondary">
              <p>Processed data is strictly used for service optimization and transaction fulfillment. We do not engage
                in the sale of identity archives to third-party marketing networks.</p>
              <blockquote
                class="border-s-2 border-brand bg-brand/5 p-6 rounded-e-2xl italic font-medium text-tx-primary">
                "Kinetic-Core privacy logic ensures that individual user behavior is anonymized before reaching our
                analytics cluster."
              </blockquote>
            </div>
          </article>

          <!-- Section 03: Security Layer -->
          <article id="encryption" class="scroll-mt-20 space-y-8">
            <div class="flex items-center gap-4">
              <h2 class="text-3xl font-bold">Security Layer</h2>
              <div class="h-px flex-1 bg-gradient-to-r from-[#1C1C30] to-transparent"></div>
            </div>

            <div class="bg-bg-primary border border-border-subtle rounded-2xl p-8 overflow-hidden relative group">
              <!-- Visual Grid Overlay -->
              <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
                style="background-image: radial-gradient(#FFF 1px, transparent 0); background-size: 24px 24px;"></div>

              <div class="relative z-10 flex flex-col md:flex-row gap-10">
                <div class="shrink-0 space-y-4">
                  <div
                    class="w-16 h-16 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
                    <Icon name="solar:shield-network-bold" class="w-8 h-8" />
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                    <span class="text-[10px] font-black text-[#10B981] tracking-widest">Active Guard</span>
                  </div>
                </div>
                <div class="space-y-4">
                  <h4 class="text-xl font-bold">AES-256 Bit Encryption</h4>
                  <p class="text-[14px] text-tx-secondary leading-relaxed">
                    All data packets traversing the StoreOS network are wrapped in industry-standard AES-256 encryption.
                    Our private keys are rotated every 24 hours within a hardware-secured vault (HSM).
                  </p>
                  <div class="flex gap-4">
                    <span class="text-[11px] text-tx-muted bg-black/40 px-2 py-1 rounded">SSL_V3_ENFORCED</span>
                    <span class="text-[11px] text-tx-muted bg-black/40 px-2 py-1 rounded">TLS_1.3</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Section 04: Data Archival -->
          <article id="retention" class="scroll-mt-20 space-y-8">
            <div class="flex items-center gap-4">
              <h2 class="text-3xl font-bold">Data Archival</h2>
              <div class="h-px flex-1 bg-gradient-to-r from-[#1C1C30] to-transparent"></div>
            </div>

            <div class="space-y-6 text-[15px] leading-relaxed text-tx-secondary">
              <p>We retain your data only as long as necessary to fulfill the purposes outlined in this protocol, or as
                required by applicable law. The following retention windows govern each data class:</p>

              <div class="bg-bg-primary border border-border-subtle rounded-2x overflow-hidden">
                <VTable :headers="retentionHeaders" :items="retentionItems" table-class="!bg-transparent">
                  <template #cell(duration)="{ item }">
                    <span
                      class="text-[11px] font-black px-3 py-1 bg-brand/10 text-brand rounded tracking-tighter border border-brand/20">
                      {{ item.duration }}
                    </span>
                  </template>
                  <template #cell(note)="{ item }">
                    <span class="text-[12px] text-tx-muted italic">{{ item.note }}</span>
                  </template>
                </VTable>
              </div>

              <p>Upon expiration of the applicable retention period, data is cryptographically wiped from all active
                nodes and backup clusters within a 30-day purge cycle.</p>
            </div>
          </article>

          <!-- Section 05: User Rights -->
          <article id="rights" class="scroll-mt-20 space-y-8">
            <div class="flex items-center gap-4">
              <h2 class="text-3xl font-bold">Terminal Rights</h2>
              <div class="h-px flex-1 bg-gradient-to-r from-[#1C1C30] to-transparent"></div>
            </div>

            <div class="space-y-6">
              <p class="text-[15px] text-tx-secondary">Under current digital sovereignty laws (GDPR/CCPA), you retain full
                control over your data nodes:</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="right in ['Right to Access', 'Right to Erase', 'Right to Port']"
                  class="border border-border-subtle p-6 rounded-xl hover:border-brand/50 transition-all group">
                  <Icon name="solar:key-minimalistic-linear"
                    class="w-5 h-5 text-tx-muted group-hover:text-brand mb-4 transition-colors" />
                  <h5 class="text-sm font-bold">{{ right }}</h5>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </template>

<script lang="ts" setup>
// --- State ---
const lastModified = "2024.08.12";
const protocolID = "PRV-ALPHA-29";

const retentionHeaders = [
  { label: 'Data Class', key: 'label', class: 'text-[13px] font-bold text-tx-primary' },
  { label: 'Retention Period', key: 'duration' },
  { label: 'Operational Note', key: 'note' }
];

const retentionItems = [
  { label: 'Account & Identity Records', duration: '5 Years', note: 'Post account termination' },
  { label: 'Transaction Logs', duration: '7 Years', note: 'Legal & audit compliance' },
  { label: 'Session & Network Vectors', duration: '90 Days', note: 'Rolling window purge' },
  { label: 'Operational Metrics', duration: '12 Months', note: 'Anonymized after 30 days' },
];

const policySections = [
  { id: 'collection', title: '01. Data Ingress', desc: 'What data we capture' },
  { id: 'utilization', title: '02. Processing Logic', desc: 'How data is utilized' },
  { id: 'encryption', title: '03. Security Layer', desc: 'Encryption standards' },
  { id: 'retention', title: '04. Data Archival', desc: 'Storage durations' },
  { id: 'rights', title: '05. Terminal Rights', desc: 'User data control' },
];

const activeTab = ref('collection');

const scrollTo = (id: string) => {
  activeTab.value = id;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>