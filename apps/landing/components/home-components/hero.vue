<template>
  <div>
    <section class="pt-32 pb-20 px-6 text-center">
      <div class="max-w-4xl mx-auto">
        <div class="relative isolate mb-9">
          <!-- Soft glow behind the headline -->
          <div
            class="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[90px]"
            aria-hidden="true"
          ></div>

          <!-- Sparkles -->
          <Icon
            name="ph:sparkle-fill"
            class="wr-twinkle absolute -top-4 end-[6%] text-2xl text-brand-hover"
            aria-hidden="true"
          />
          <Icon
            name="ph:sparkle-fill"
            class="wr-twinkle absolute bottom-6 start-[3%] text-lg text-accent"
            style="animation-delay: 1.1s"
            aria-hidden="true"
          />

          <h1
            data-word-reveal
            class="text-5xl md:text-7xl font-bold tracking-tight"
            v-html="
              wordReveal([
                t('home.hero.title'),
                {
                  text: t('home.hero.titleBrand'),
                  class: 'text-brand wr-shine wr-underline',
                },
              ])
            "
          />
        </div>
        <p
          data-word-reveal
          class="text-tx-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          v-html="
            wordReveal(t('home.hero.subtitle'), { delay: 600, stagger: 40 })
          "
        />

        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a
            href="https://storeos-store-builder.vercel.app/en/builder/home"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-brand hover:bg-brand-hover px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-brand/20 transition text-center"
          >
            {{ t("home.hero.startFreeTrial") }}
          </a>

          <LazyVButton
            variant="none"
            @click="openDemo"
            className="bg-bg-elevated hover:bg-white/10 border border-border-subtle px-8 py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2"
          >
            {{ t("home.hero.watchDemo") }}
          </LazyVButton>
        </div>

        <!-- Trust Badges -->
        <div
          class="flex flex-wrap justify-center gap-8 text-xs font-bold text-tx-muted tracking-widest"
        >
          <span>{{ t("home.hero.storesRunning") }}</span>
          <div class="flex gap-6">
            <span>{{ t("home.hero.fashion") }}</span>
            <span>{{ t("home.hero.food") }}</span>
            <span>{{ t("home.hero.tech") }}</span>
            <span>{{ t("home.hero.beauty") }}</span>
          </div>
        </div>

        <!-- Dashboard Mockup -->
        <div class="mt-20 relative mx-auto max-w-5xl">
          <!-- Subtle Outer Glow to match the dark aesthetic -->
          <div
            class="absolute -inset-1 bg-brand/10 rounded-[2rem] blur-3xl"
          ></div>

          <div
            class="relative rounded-2xl border border-border-subtle bg-bg-base shadow-2xl overflow-hidden"
          >
            <!-- Top Window Bar -->
            <div
              class="h-12 border-b border-border-subtle flex items-center justify-between px-6 bg-white/[0.02]"
            >
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
              <div
                class="w-64 border-e border-border-subtle p-8 flex flex-col gap-6 bg-bg-base"
              >
                <div class="h-2 w-3/4 bg-white/10 rounded-full"></div>
                <div class="h-2 w-1/2 bg-white/5 rounded-full"></div>
                <div class="h-2 w-2/3 bg-white/5 rounded-full"></div>
                <div class="mt-auto h-2 w-1/4 bg-white/5 rounded-full"></div>
              </div>

              <!-- 2. Dashboard Body (Center + Right) -->
              <div class="flex-1 p-6 flex gap-6">
                <!-- Center Primary Card -->
                <div
                  class="flex-[2] bg-bg-primary border border-border-subtle rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden"
                >
                  <!-- Blue Progress Bars matching the image -->
                  <div class="space-y-3 relative z-10">
                    <!-- Background track (dimmed blue) -->
                    <div
                      class="h-2 w-full bg-brand/5 rounded-full overflow-hidden"
                    >
                      <div class="h-full w-[85%] bg-brand/10"></div>
                    </div>
                    <!-- Foreground active bar (bright indigo with glow) -->
                    <div
                      class="h-2 w-[55%] bg-brand rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    ></div>
                  </div>
                </div>

                <!-- 3. Right Panel (Inventory Alert) -->
                <div
                  class="flex-1 bg-bg-primary border border-accent/10 rounded-2xl p-6 flex flex-col items-center"
                >
                  <!-- Text label in orange -->
                  <span
                    class="text-[9px] font-black text-accent/60 tracking-[0.25em] text-center mt-2"
                  >
                    {{ t("home.hero.inventoryAlert") }}
                  </span>

                  <!-- Bottom Status Bar in orange -->
                  <div
                    class="mt-auto w-full h-4 bg-accent/10 border border-accent/20 rounded-lg shadow-[inset_0_0_10px_rgba(249,115,22,0.1)]"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Demo Dialog -->
    <LazyVDialog v-model="isDemoOpen" maxWidth="5xl" hideHeader flush>
      <!-- Video Player: full dialog width at 16:9; height is capped to the visible viewport
           (dvh = excludes mobile browser bars, minus the dialog's p-4/p-6 gutters) so it is
           letterboxed, never cropped or overflowing, on short/landscape screens. -->
      <div class="bg-black">
        <video
          ref="videoRef"
          class="block w-full aspect-video max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] object-contain"
          controls
          autoplay
          playsinline
          preload="auto"
          poster="/storeos-demo-poster.png"
        >
          <source src="/video/storeos-website-overview.mp4" type="video/mp4" />
        </video>
      </div>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
// Templates do not get Nuxt auto-imports on the client, so import it explicitly.
import { wordReveal } from "#imports";

const { t } = useI18n();

const { isDemoOpen, openDemo, closeDemo } = useDemoModal();

const videoRef = ref<HTMLVideoElement | null>(null);

watch(isDemoOpen, async (open) => {
  if (open) {
    // The dialog body renders on open, so wait for the <video> to mount, then start it.
    // Allowed by browsers because the dialog opens from a user click (Watch demo).
    await nextTick();
    videoRef.value?.play().catch(() => {});
    return;
  }
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.currentTime = 0;
  }
});
</script>
