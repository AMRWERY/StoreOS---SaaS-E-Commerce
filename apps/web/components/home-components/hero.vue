<template>
  <div>
    <section class="pt-32 pb-20 px-6 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Your entire store. <br />
          <span class="text-indigo-400">One operating system.</span>
        </h1>
        <p class="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Replace messy WhatsApp threads and fragile Excel sheets with an operational powerhouse designed for
          high-growth commerce.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <VButton
            variant="none"
            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-indigo-500/20 transition">
            Start Free Trial
          </VButton>
          <VButton
            variant="none"
            className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2">
            <span class="w-2 h-2 bg-white rounded-full"></span> Watch Demo
          </VButton>
        </div>

        <!-- Trust Badges -->
        <div class="flex flex-wrap justify-center gap-8 text-xs font-bold text-gray-500 tracking-widest">
          <span>500+ STORES ALREADY RUNNING ON STOREOS</span>
          <div class="flex gap-6">
            <span>Fashion</span> <span>Food</span> <span>Tech</span> <span>Beauty</span>
          </div>
        </div>

        <!-- Dashboard Mockup -->
        <div class="mt-20 relative mx-auto max-w-5xl">
          <!-- Subtle Outer Glow to match the dark aesthetic -->
          <div class="absolute -inset-1 bg-indigo-500/10 rounded-[2rem] blur-3xl"></div>

          <div class="relative rounded-2xl border border-white/10 bg-[#080808] shadow-2xl overflow-hidden">
            <!-- Top Window Bar -->
            <div class="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
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
              <div class="w-64 border-e border-white/5 p-8 flex flex-col gap-6 bg-[#080808]">
                <div class="h-2 w-3/4 bg-white/10 rounded-full"></div>
                <div class="h-2 w-1/2 bg-white/5 rounded-full"></div>
                <div class="h-2 w-2/3 bg-white/5 rounded-full"></div>
                <div class="mt-auto h-2 w-1/4 bg-white/5 rounded-full"></div>
              </div>

              <!-- 2. Dashboard Body (Center + Right) -->
              <div class="flex-1 p-6 flex gap-6">

                <!-- Center Primary Card -->
                <div
                  class="flex-[2] bg-[#0c0c0e] border border-white/5 rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden">
                  <!-- Blue Progress Bars matching the image -->
                  <div class="space-y-3 relative z-10">
                    <!-- Background track (dimmed blue) -->
                    <div class="h-2 w-full bg-indigo-900/20 rounded-full overflow-hidden">
                      <div class="h-full w-[85%] bg-indigo-500/20"></div>
                    </div>
                    <!-- Foreground active bar (bright indigo with glow) -->
                    <div class="h-2 w-[55%] bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]"></div>
                  </div>
                </div>

                <!-- 3. Right Panel (Inventory Alert) -->
                <div class="flex-1 bg-[#0c0c0e] border border-orange-500/10 rounded-2xl p-6 flex flex-col items-center">
                  <!-- Text label in orange -->
                  <span class="text-[9px] font-black text-orange-500/60 tracking-[0.25em] text-center mt-2">
                    Inventory Alert
                  </span>

                  <!-- Bottom Status Bar in orange -->
                  <div
                    class="mt-auto w-full h-4 bg-orange-950/30 border border-orange-500/20 rounded-lg shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>