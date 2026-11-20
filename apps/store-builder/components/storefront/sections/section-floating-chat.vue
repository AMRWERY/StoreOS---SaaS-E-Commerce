<template>
  <div class="relative min-h-[120px] px-8 py-6" :class="variant === 'card' && 'min-h-[180px]'">
    <p v-if="!bool('fixed') && str('preview_caption')" class="text-center text-[11px] text-neutral-400">
      {{ str("preview_caption") }}
    </p>

    <div class="bottom-5 z-40" :class="[bool('fixed') ? 'fixed' : 'absolute', str('position') === 'start' ? 'start-5' : 'end-5']">
      <!-- card -->
      <div v-if="variant === 'card'" class="w-56 rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg">
        <div class="flex items-center gap-2.5">
          <span class="flex size-9 items-center justify-center rounded-full text-white" :style="{ backgroundColor: str('color') }">
            <Icon :name="icon" class="text-lg" />
          </span>
          <p class="text-sm font-bold text-neutral-900">{{ str("label") }}</p>
        </div>
        <a
          :href="href"
          class="mt-3 block rounded-xl px-3 py-2 text-center text-xs font-semibold text-white"
          :style="{ backgroundColor: str('color') }"
          @click.prevent
        >
          {{ contact }}
        </a>
      </div>

      <!-- pill / circle -->
      <a
        v-else
        :href="href"
        class="flex items-center gap-2 text-sm font-semibold text-white shadow-lg"
        :class="variant === 'circle' ? 'size-14 justify-center rounded-full' : 'rounded-full px-4 py-3'"
        :style="{ backgroundColor: str('color') }"
        :aria-label="str('label')"
        @click.prevent
      >
        <Icon :name="icon" :class="variant === 'circle' ? 'text-2xl' : 'text-xl'" />
        <span v-if="variant === 'pill' && str('label')">{{ str("label") }}</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "pill"));
const channel = computed(() => str("channel", "whatsapp"));
const contact = computed(() => str("contact").trim());

const icon = computed(
  () =>
    ({
      whatsapp: "ph:whatsapp-logo-bold",
      messenger: "ph:messenger-logo-bold",
      phone: "ph:phone-bold",
      email: "ph:envelope-simple-bold",
    })[channel.value] ?? "ph:chat-circle-dots-bold",
);

const href = computed(() => {
  const c = contact.value;
  switch (channel.value) {
    case "whatsapp":
      return `https://wa.me/${c.replace(/\D/g, "")}`;
    case "messenger":
      return `https://m.me/${encodeURIComponent(c)}`;
    case "phone":
      return `tel:${c}`;
    default:
      return `mailto:${c}`;
  }
});
</script>
