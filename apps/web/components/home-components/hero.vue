<template>
  <div>
    <section class="pt-32 pb-20 px-6 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Your entire store. <br />
          <span class="text-brand">One operating system.</span>
        </h1>
        <p class="text-tx-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Replace messy WhatsApp threads and fragile Excel sheets with an operational powerhouse designed for
          high-growth commerce.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <VButton variant="none"
            className="bg-brand hover:bg-brand-hover px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-brand/20 transition">
            Start Free Trial
          </VButton>

          <VButton variant="none" @click="showDemo = true"
            className="bg-bg-elevated hover:bg-white/10 border border-border-subtle px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2">
            Watch Demo
          </VButton>
        </div>

        <!-- Trust Badges -->
        <div class="flex flex-wrap justify-center gap-8 text-xs font-bold text-tx-muted tracking-widest uppercase">
          <span>500+ STORES ALREADY RUNNING ON STOREOS</span>
          <div class="flex gap-6">
            <span>Fashion</span> <span>Food</span> <span>Tech</span> <span>Beauty</span>
          </div>
        </div>

        <!-- Dashboard Mockup -->
        <div class="mt-20 relative mx-auto max-w-5xl">
          <!-- Subtle Outer Glow to match the dark aesthetic -->
          <div class="absolute -inset-1 bg-brand/10 rounded-[2rem] blur-3xl"></div>

          <div class="relative rounded-2xl border border-border-subtle bg-bg-base shadow-2xl overflow-hidden">
            <!-- Top Window Bar -->
            <div class="h-12 border-b border-border-subtle flex items-center justify-between px-6 bg-white/[0.02]">
              <div class="flex gap-2">
                <div class="h-2 w-24 bg-white/5 rounded-full"></div>
              </div>
              <div class="flex gap-3">
                <div class="w-3 h-3 rounded-full bg-white/10"></div>
                <div class="w-3 h-3 rounded-full bg-white/10"></div>
              </div>
            </div>

            <!-- Main Content Area (Fixed Height) -->
            <div class="flex h-[420px]">

              <!-- 1. Left Sidebar -->
              <div class="w-64 border-e border-border-subtle p-8 flex flex-col gap-6 bg-bg-base">
                <div class="h-2 w-3/4 bg-white/10 rounded-full"></div>
                <div class="h-2 w-1/2 bg-white/5 rounded-full"></div>
                <div class="h-2 w-2/3 bg-white/5 rounded-full"></div>
                <div class="mt-auto h-2 w-1/4 bg-white/5 rounded-full"></div>
              </div>

              <!-- 2. Dashboard Body (Center + Right) -->
              <div class="flex-1 p-6 flex gap-6">
                <!-- Center Primary Card -->
                <div
                  class="flex-[2] bg-bg-primary border border-border-subtle rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden">
                  <!-- Blue Progress Bars matching the image -->
                  <div class="space-y-3 relative z-10">
                    <!-- Background track (dimmed blue) -->
                    <div class="h-2 w-full bg-brand/5 rounded-full overflow-hidden">
                      <div class="h-full w-[85%] bg-brand/10"></div>
                    </div>
                    <!-- Foreground active bar (bright indigo with glow) -->
                    <div class="h-2 w-[55%] bg-brand rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]"></div>
                  </div>
                </div>

                <!-- 3. Right Panel (Inventory Alert) -->
                <div class="flex-1 bg-bg-primary border border-accent/10 rounded-2xl p-6 flex flex-col items-center">
                  <!-- Text label in orange -->
                  <span class="text-[9px] font-black text-accent/60 tracking-[0.25em] text-center mt-2 uppercase">
                    Inventory Alert
                  </span>

                  <!-- Bottom Status Bar in orange -->
                  <div
                    class="mt-auto w-full h-4 bg-accent/10 border border-accent/20 rounded-lg shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Demo Dialog -->
    <VDialog v-model="showDemo" maxWidth="5xl">
      <template #title>
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
          StoreOS — Platform Overview
        </div>
      </template>

      <!-- Video Player -->
      <div class="relative group rounded-xl overflow-hidden bg-bg-base border border-border-subtle shadow-2xl">
        <video ref="videoRef" class="w-full aspect-video object-cover" controls preload="metadata"
          poster="/storeos-demo-poster.jpg">
          <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video>
      </div>

      <!-- Description -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2 space-y-3">
          <h2 class="text-base font-bold text-tx-primary">
            The operating system for high-growth commerce
          </h2>
          <p class="text-[13px] text-tx-secondary leading-relaxed">
            StoreOS replaces fragmented WhatsApp threads, broken Excel sheets, and siloed tools with a
            single unified command center. Watch how leading brands process thousands of orders, sync
            inventory in real time, and make data-driven decisions — all from one screen.
          </p>
          <div class="flex gap-3 pt-2">
            <VButton variant="none" to="/auth/register"
              className="bg-brand hover:bg-brand-hover text-white px-5 py-2 rounded-md text-xs font-bold transition-all shadow-lg shadow-brand/20">
              Start Free Trial
            </VButton>
            <VButton variant="none" @click="showDemo = false"
              className="bg-bg-elevated hover:bg-bg-overlay border border-border-subtle text-tx-secondary hover:text-tx-primary px-5 py-2 rounded-md text-xs font-bold transition-all">
              Close
            </VButton>
          </div>
        </div>

        <!-- Feature Highlights -->
        <div class="space-y-2">
          <p class="text-[10px] font-semibold text-tx-muted uppercase tracking-[0.6px] mb-3">What you'll see</p>
          <div v-for="feature in demoFeatures" :key="feature.label"
            class="flex items-start gap-3 p-3 rounded-lg bg-bg-elevated border border-border-subtle">
            <div class="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5" :class="feature.bg">
              <icon :name="feature.icon" class="text-sm" :class="feature.color" />
            </div>
            <div>
              <p class="text-[11px] font-semibold text-tx-primary">{{ feature.label }}</p>
              <p class="text-[10px] text-tx-muted mt-0.5">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </VDialog>
  </div>
</template>

<script lang="ts" setup>
const showDemo = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

// Pause and reset video when dialog is closed
watch(showDemo, (open) => {
  if (!open && videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
})

const demoFeatures = [
  {
    icon: 'ph:shopping-cart-fill',
    label: 'Order Management',
    desc: 'Live order stream, statuses & fulfilment',
    bg: 'bg-brand-dim',
    color: 'text-brand',
  },
  {
    icon: 'ph:chart-bar-fill',
    label: 'Analytics Dashboard',
    desc: 'Revenue, AOV, and velocity insights',
    bg: 'bg-success-dim',
    color: 'text-success',
  },
  {
    icon: 'ph:stack-fill',
    label: 'Inventory Sync',
    desc: 'Real-time stock levels & low-stock alerts',
    bg: 'bg-warning-dim',
    color: 'text-warning',
  },
  {
    icon: 'ph:gear-six-fill',
    label: 'Store Settings',
    desc: 'Payments, shipping, staff & more',
    bg: 'bg-brand-dim',
    color: 'text-brand',
  },
]
</script>