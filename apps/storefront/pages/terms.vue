  <template>
    <div class="text-tx-primary selection:bg-brand/30">
      <!-- ======== HERO HEADER ======== -->
      <header class="relative pt-12 pb-16 px-6 lg:px-12 border-b border-border-subtle">
        <div class="max-w-[1400px] mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div
                  class="h-10 w-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <Icon name="solar:document-text-bold-duotone" class="w-6 h-6 text-brand" />
                </div>
                <h1 class="text-5xl lg:text-6xl font-bold tracking-tighter">Terms of Service</h1>
              </div>
              <p class="text-[15px] text-tx-secondary max-w-xl leading-relaxed">
                These terms govern the operational use of the StoreOS commerce platform.
                By accessing our terminal, you agree to comply with the following protocols.
              </p>
            </div>

            <!-- Meta Info Box -->
            <div class="bg-bg-primary border border-border-subtle rounded-xl p-6 flex flex-col gap-4 min-w-[240px]">
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-black text-tx-muted tracking-widest">Protocol Version</span>
                <span class="text-[11px] font-bold text-brand">{{ version }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-black text-tx-muted tracking-widest">Last Modified</span>
                <span class="text-[11px] font-bold text-tx-primary">{{ lastUpdated }}</span>
              </div>
              <VButton
                to="/archive/protocol.pdf"
                label="Download Archive (PDF)"
                icon="solar:download-bold"
                variant="secondary"
                class="!mt-2 !w-full !py-2 !bg-white/5 hover:!bg-white/10 !border-white/10 !text-[10px] !font-black !tracking-widest"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- ======== MAIN CONTENT LAYOUT ======== -->
      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <!-- Sticky Sidebar Navigation -->
        <aside class="lg:col-span-3">
          <div class="sticky top-10 space-y-1">
            <p class="text-[10px] font-black text-tx-muted tracking-[0.3em] mb-6 px-4">Index Sections</p>
            <button v-for="section in sections" :key="section.id" @click="scrollTo(section.id)"
              class="w-full text-start px-4 py-3 rounded-md text-[12px] font-bold tracking-widest transition-all border-s-2"
              :class="activeSection === section.id
                ? 'bg-bg-elevated border-brand text-white shadow-lg shadow-black/40'
                : 'border-transparent text-tx-muted hover:text-tx-secondary hover:bg-white/[0.02]'">
              {{ section.title }}
            </button>
          </div>
        </aside>

        <!-- Document Body -->
        <div class="lg:col-span-9 space-y-20 pb-40">

          <!-- Section: Introduction -->
          <article id="introduction" class="scroll-mt-10 space-y-6">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <span class="text-brand text-lg">01.</span> Introduction
            </h2>
            <div class="h-px w-12 bg-brand"></div>
            <div class="space-y-4 text-[15px] leading-relaxed text-tx-secondary">
              <p>Welcome to <span class="text-white font-semibold">StoreOS</span>. These terms and conditions outline
                the rules and regulations for the use of our infrastructure and services. By accessing this storefront,
                we assume you accept these terms and conditions in full.</p>
              <p>Do not continue to use StoreOS if you do not accept all of the terms and conditions stated on this
                page. The terminology applied to these Terms, Privacy Statement, and Disclaimer Notice refers to
                "Client", "You" and "Your" referring to you, the person accessing this terminal.</p>
            </div>
          </article>

          <!-- Section: Use License -->
          <article id="use-license" class="scroll-mt-10 space-y-6">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <span class="text-brand text-lg">02.</span> Use License
            </h2>
            <div class="h-px w-12 bg-brand"></div>
            <div class="space-y-6 text-[15px] leading-relaxed text-tx-secondary">
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on
                StoreOS's website for personal, non-commercial transitory viewing only.</p>
              <ul class="space-y-4 ps-6 border-s border-border-subtle">
                <li class="flex gap-4">
                  <span class="text-tx-muted text-[12px] mt-1">2.1</span>
                  <span>Modify or copy the proprietary code or assets within the terminal.</span>
                </li>
                <li class="flex gap-4">
                  <span class="text-tx-muted text-[12px] mt-1">2.2</span>
                  <span>Use the materials for any commercial purpose, or for any public display (commercial or
                    non-commercial).</span>
                </li>
                <li class="flex gap-4">
                  <span class="text-tx-muted text-[12px] mt-1">2.3</span>
                  <span>Attempt to decompile or reverse engineer any software contained in the StoreOS OS layer.</span>
                </li>
              </ul>
            </div>
          </article>

          <!-- Section: Disclaimer -->
          <article id="disclaimer" class="scroll-mt-10 space-y-6">
            <div class="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-8 space-y-6">
              <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                <span class="text-[#F97316] text-lg">03.</span> Disclaimer
              </h2>
              <p class="text-[15px] leading-relaxed text-tx-secondary">
                The materials on StoreOS's website are provided on an 'as is' basis. StoreOS makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </div>
          </article>

          <!-- Section: Limitations -->
          <article id="limitations" class="scroll-mt-10 space-y-6">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <span class="text-brand text-lg">04.</span> Limitations
            </h2>
            <div class="h-px w-12 bg-brand"></div>
            <p class="text-[15px] leading-relaxed text-tx-secondary">
              In no event shall StoreOS or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on StoreOS's website, even if StoreOS or a StoreOS authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>
          </article>

          <!-- Section: Governing Law -->
          <article id="governing-law" class="scroll-mt-10 space-y-6">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <span class="text-brand text-lg">05.</span> Governing Law
            </h2>
            <div class="h-px w-12 bg-brand"></div>
            <div class="space-y-4 text-[15px] leading-relaxed text-tx-secondary">
              <p>These terms and conditions are governed by and construed in accordance with the laws applicable to the
                jurisdiction in which StoreOS operates, and you irrevocably submit to the exclusive jurisdiction of the
                courts in that location.</p>
              <p>Any disputes arising under or in connection with these terms shall be subject to the exclusive
                jurisdiction of those courts. StoreOS reserves the right to bring proceedings in the courts of the
                country of your residence or the country where the breach occurred.</p>
            </div>
          </article>

          <!-- Section: Modifications -->
          <article id="modifications" class="scroll-mt-10 space-y-6">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <span class="text-brand text-lg">06.</span> Modifications
            </h2>
            <div class="h-px w-12 bg-brand"></div>
            <div class="space-y-4 text-[15px] leading-relaxed text-tx-secondary">
              <p>StoreOS may revise these terms of service at any time without notice. By using this platform you are
                agreeing to be bound by the then-current version of these terms of service. We recommend reviewing this
                document periodically to stay informed of any updates.</p>
              <p>Continued use of the StoreOS platform following the posting of changes to these terms constitutes your
                acceptance of those changes. The "Last Modified" version identifier in the header of this document
                reflects the most recent revision cycle.</p>
            </div>
          </article>

          <!-- Compliance Note -->
          <VAlertBanner
            variant="success"
            icon="solar:shield-check-bold"
            :dismissible="false"
            class="!bg-bg-primary !border-border-subtle"
          >
            <div class="space-y-1">
              <h4 class="text-[12px] font-black tracking-widest text-tx-primary">Data Protection Compliance</h4>
              <p class="text-[13px] text-tx-muted">This protocol is strictly governed by GDPR and CCPA standards for the 2024 fiscal cycle.</p>
            </div>
          </VAlertBanner>
        </div>
      </div>
    </div>
  </template>

<script lang="ts" setup>
const { t } = useI18n()

const lastUpdated = "2024.05.20";
const version = "v4.2.0-LEGAL";

const sections = [
  { id: 'introduction', title: '01. Introduction' },
  { id: 'use-license', title: '02. Use License' },
  { id: 'disclaimer', title: '03. Disclaimer' },
  { id: 'limitations', title: '04. Limitations' },
  { id: 'governing-law', title: '05. Governing Law' },
  { id: 'modifications', title: '06. Modifications' },
];

const activeSection = ref('introduction');
let observer: IntersectionObserver | null = null;

const scrollTo = (id: string) => {
  activeSection.value = id;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) activeSection.value = visible[0].target.id;
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );
  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer!.observe(el);
  });
});

onUnmounted(() => observer?.disconnect());

useSeoMeta({
  title: 'Terms of Service',
  description: 'Terms of Service for StoreOS commerce platform.',
})
</script>