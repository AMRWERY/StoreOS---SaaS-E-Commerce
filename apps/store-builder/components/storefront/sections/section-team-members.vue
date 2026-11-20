<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
      </div>

      <div class="mt-10 grid gap-6" :class="gridClass">
        <component
          :is="member.link ? 'a' : 'div'"
          v-for="(member, i) in list('items')"
          :key="i"
          :href="member.link || undefined"
          class="block text-center transition-colors"
          :class="[cardClass, member.link && variant === 'cards' ? 'hover:border-indigo-600' : '']"
        >
          <!-- Overlay: tall photo, text over a gradient -->
          <template v-if="variant === 'overlay'">
            <div class="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-indigo-50">
              <img v-if="member.photo" :src="member.photo" :alt="member.name" class="size-full object-cover" />
              <div v-else class="flex size-full items-center justify-center text-5xl font-bold text-indigo-600">
                {{ initials(member.name) }}
              </div>
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-start text-white">
                <h3 class="text-sm font-bold">{{ member.name }}</h3>
                <p v-if="member.role" class="text-xs opacity-80">{{ member.role }}</p>
                <p v-if="member.bio" class="mt-1 line-clamp-2 text-xs opacity-80">{{ member.bio }}</p>
              </div>
            </div>
          </template>

          <!-- Cards / minimal circles share the same body -->
          <template v-else>
            <img
              v-if="member.photo"
              :src="member.photo"
              :alt="member.name"
              class="mx-auto object-cover"
              :class="[photoSize, photoClass]"
            />
            <div
              v-else
              class="mx-auto flex items-center justify-center bg-indigo-50 text-2xl font-bold text-indigo-600"
              :class="[photoSize, photoClass]"
            >
              {{ initials(member.name) }}
            </div>
            <h3 class="mt-4 text-sm font-bold text-neutral-900">{{ member.name }}</h3>
            <p v-if="member.role" class="mt-0.5 text-xs font-medium text-indigo-600">{{ member.role }}</p>
            <p v-if="member.bio" class="mt-2 text-sm leading-relaxed text-neutral-500">{{ member.bio }}</p>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "cards"));
const cardClass = computed(() =>
  variant.value === "cards" ? "rounded-2xl border border-neutral-200 bg-white p-6" : "",
);
const photoSize = computed(() => (variant.value === "minimal-circles" ? "size-32" : "size-24"));
const photoClass = computed(() => {
  if (variant.value === "minimal-circles") return "rounded-full";
  return str("photoStyle", "circle") === "circle" ? "rounded-full" : "rounded-2xl";
});
const gridClass = computed(
  () =>
    ({
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    })[num("columns", 3)] ?? "grid-cols-1 sm:grid-cols-3",
);

function initials(name: unknown): string {
  return (
    String(name ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join("") || "?"
  );
}
</script>
