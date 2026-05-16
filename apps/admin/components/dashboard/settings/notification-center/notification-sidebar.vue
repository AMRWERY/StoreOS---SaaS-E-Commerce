<template>
  <div>
    <Teleport to="body">
      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-if="modelValue"
          class="fixed inset-0 bg-bg-overlay backdrop-blur-sm z-[100]"
          @click="$emit('update:modelValue', false)"
        />
      </Transition>

      <!-- Slide-over Drawer -->
      <Transition name="slide">
        <aside
          v-if="modelValue"
          class="fixed end-0 top-0 h-full w-full max-w-[420px] bg-bg-primary border-s border-border-subtle shadow-2xl flex flex-col z-[101] overflow-y-auto hide-scrollbar"
        >
          <!-- Header -->
          <div
            class="px-4 py-3.5 border-b border-border-subtle bg-bg-elevated sticky top-0 z-10"
          >
            <div class="flex items-center justify-between">
              <div>
                <p
                  class="text-[10px] font-black text-tx-muted tracking-[0.2em] mb-1"
                >
                  {{ t("dashboard.settings.notifications.deliveryStats") }}
                </p>
                <h2 class="text-xl font-bold text-tx-primary tracking-tight">
                  {{ t("dashboard.settings.notifications.nodeOverview") }}
                </h2>
              </div>
              <button
                @click="$emit('update:modelValue', false)"
                class="text-tx-secondary hover:text-tx-primary transition-colors p-2"
              >
                <Icon name="ph:x-bold" class="text-lg" />
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 px-4 py-3.5 space-y-8">
            <!-- Delivery Performance -->
            <section>
              <h4
                class="text-[10px] font-black text-tx-muted tracking-[0.2em] mb-6"
              >
                {{ t("dashboard.settings.notifications.deliveryPerformance") }}
              </h4>
              <div class="space-y-6">
                <div
                  v-for="metric in metrics"
                  :key="metric.label"
                  class="space-y-3"
                >
                  <div class="flex justify-between text-[10px] font-bold">
                    <span class="text-tx-secondary">{{ metric.label }}</span>
                    <span :class="metric.valueClass">{{ metric.value }}</span>
                  </div>
                  <div
                    class="h-1 w-full bg-bg-elevated rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full rounded-full"
                      :class="[metric.barClass, metric.barWidth]"
                      :style="metric.barStyle"
                    />
                  </div>
                </div>
              </div>
            </section>

            <!-- Active Sinks -->
            <section>
              <h4
                class="text-[10px] font-black text-tx-muted tracking-[0.2em] mb-6"
              >
                Active Sinks
              </h4>
              <div class="space-y-5">
                <div
                  v-for="sink in sinks"
                  :key="sink.value"
                  class="flex items-center gap-4 text-xs font-medium text-tx-secondary"
                >
                  <Icon
                    :name="sink.icon"
                    :class="['text-lg', sink.iconClass]"
                  />
                  {{ sink.value }}
                </div>
              </div>
            </section>

            <!-- Node Status -->
            <section
              class="rounded-2xl overflow-hidden relative group border border-border-subtle"
            >
              <img
                src="/img/product-01.avif"
                class="w-full h-40 object-cover grayscale opacity-40 group-hover:opacity-60 transition-opacity"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
              />
              <div class="absolute bottom-5 start-5">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span
                    class="text-[10px] font-black text-brand tracking-widest"
                  >
                    Node_Status: Optimal
                  </span>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const metrics = [
  {
    label: "Email_Latency",
    value: "1.2s",
    valueClass: "text-tx-primary",
    barClass: "bg-brand shadow-[0_0_8px_rgba(129,140,248,0.5)]",
    barWidth: "w-3/4",
    barStyle: {},
  },
  {
    label: "SMS_Uptime",
    value: "99.9%",
    valueClass: "text-accent",
    barClass: "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]",
    barWidth: "",
    barStyle: { width: "99.9%" },
  },
];

const sinks = [
  { icon: "ph:at-bold", iconClass: "text-brand", value: "admin@storeos.com" },
  {
    icon: "ph:phone-fill",
    iconClass: "text-accent",
    value: "+1 (555) 902-1200",
  },
  {
    icon: "ph:hard-drive-fill",
    iconClass: "text-tx-muted",
    value: "kinetic-prod-04",
  },
];
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

[dir="rtl"] .slide-enter-from,
[dir="rtl"] .slide-leave-to {
  transform: translateX(-100%);
}
</style>