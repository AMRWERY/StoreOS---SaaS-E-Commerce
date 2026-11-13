<template>
  <div>
    <div class="text-tx-primary flex flex-col items-center py-12 px-6 mt-12">
      <!-- Main Success Card -->
      <div
        class="w-full max-w-3xl bg-bg-primary border border-border-subtle rounded-2xl p-5 text-center mb-8"
      >
        <!-- Progress Bar -->
        <div class="mb-10 text-start">
          <LazyVProgressBar
            :progress="100"
            :height="8"
            color="blue"
            trackVariant="slate"
            :showHeader="true"
            headerLeft="Setup Complete"
            headerRight="100%"
            :showLabel="false"
            :shadow="false"
          />
        </div>

        <!-- Success Icon -->
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/20 border border-brand/30 mb-8"
        >
          <div
            class="w-10 h-10 rounded-full bg-brand flex items-center justify-center shadow-lg shadow-brand/40"
          >
            <Icon name="ph:check-bold" class="text-white w-6 h-6" />
          </div>
        </div>

        <h1 class="text-3xl md:text-4xl font-bold mb-4">Your store is live!</h1>
        <p
          class="text-tx-secondary text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto"
        >
          Congratulations! Your shop is now open for business
        </p>

        <!-- URL Copy Field -->
        <div class="max-w-md mx-auto text-center mb-10">
          <label
            class="block text-[10px] font-bold text-tx-secondary tracking-widest mb-3"
            >Store URL</label
          >
          <div class="flex items-stretch gap-2">
            <div
              class="flex-1 flex items-center justify-center bg-bg-elevated border border-border-default rounded-md px-3 py-2 text-[12px] text-tx-primary font-medium"
            >
              <span class="truncate">{{ storeUrl }}</span>
            </div>
            <LazyVButton
              @click="copyToClipboard"
              variant="none"
              className="bg-bg-elevated hover:bg-bg-elevated border border-border-default p-2 rounded-md transition-colors group"
            >
              <Icon
                :name="
                  copying
                    ? 'ph:spinner-bold'
                    : copied
                      ? 'ph:check-bold'
                      : 'ph:copy-simple'
                "
                :class="[
                  'w-5 h-5 transition-colors flex items-center justify-center',
                  copying ? 'animate-spin text-tx-secondary' : '',
                  copied
                    ? 'text-success'
                    : 'text-tx-secondary group-hover:text-tx-primary',
                ]"
              />
            </LazyVButton>
          </div>
        </div>

        <!-- Main CTA -->
        <LazyVButton
          variant="none"
          to="/dashboard"
          className="w-full max-w-md mx-auto bg-brand hover:bg-brand-hover py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
        >
          Go to Dashboard
          <Icon
            name="ph:arrow-right-bold"
            class="w-4 h-4 icon-nudge-end rtl:rotate-180"
          />
        </LazyVButton>
      </div>

      <!-- Quick Action Grid -->
      <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <nuxt-link-locale
          :to="action.route || '/auth/add-first-product'"
          v-for="action in quickActions"
          :key="action.title"
          class="bg-bg-primary border border-border-subtle px-4 py-3.5 rounded-xl hover:border-brand/30 hover:bg-bg-elevated hover:shadow-lg hover:shadow-brand/5 hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
        >
          <div
            class="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors"
          >
            <Icon :name="action.icon" class="w-5 h-5 text-brand" />
          </div>
          <h3 class="font-bold text-sm mb-2">{{ action.title }}</h3>
          <p class="text-xs text-tx-secondary leading-relaxed">
            {{ action.desc }}
          </p>
        </nuxt-link-locale>
      </div>

      <!-- Footer Help Link -->
      <div class="text-center">
        <p class="text-xs text-tx-muted mb-2">Need help setting up?</p>
        <nuxt-link-locale
          to="/"
          class="text-brand text-xs font-bold flex items-center justify-center gap-1.5 hover:underline group"
        >
          Visit our Help Center
          <Icon
            name="ph:arrow-square-out"
            class="w-3.5 h-3.5 icon-nudge-diagonal"
          />
        </nuxt-link-locale>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { storeUrl } = useOnboarding();

const copied = ref(false);
let copiedTimer: ReturnType<typeof setTimeout> | undefined;

const copying = ref(false);

const copyToClipboard = async () => {
  if (copying.value) return;
  copying.value = true;
  clearTimeout(copiedTimer);
  copied.value = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(storeUrl.value);
    } else {
      // Fallback for insecure contexts where the Clipboard API is unavailable.
      const input = document.createElement("textarea");
      input.value = storeUrl.value;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    // The copy is near-instant, so keep the spinner visible briefly.
    await new Promise((resolve) => setTimeout(resolve, 600));
    copied.value = true;
    copiedTimer = setTimeout(() => (copied.value = false), 2000);
  } catch {
    copied.value = false;
  } finally {
    copying.value = false;
  }
};

onBeforeUnmount(() => clearTimeout(copiedTimer));

const quickActions = [
  {
    title: "Add products",
    desc: "Expand your catalog with more items.",
    icon: "ph:plus-square-duotone",
    route: "/auth/add-first-product",
  },
  {
    title: "Share store",
    desc: "Tell the world about your new shop.",
    icon: "ph:share-network-duotone",
  },
  {
    title: "View store",
    desc: "See how customers view your page.",
    icon: "ph:eye-duotone",
  },
];
</script>
