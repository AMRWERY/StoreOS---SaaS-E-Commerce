<template>
  <div class="px-4 py-14 sm:px-8">
    <div
      :class="
        variant === 'two_column'
          ? 'mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_2fr]'
          : ''
      "
    >
      <h2
        v-if="heading"
        class="text-xl font-bold text-neutral-900"
        :class="variant === 'two_column' ? 'text-start' : 'mb-8 text-center'"
      >
        {{ heading }}
      </h2>

      <div
        class="mx-auto w-full max-w-2xl"
        :class="[
          variant === 'two_column' ? 'lg:max-w-none' : '',
          variant === 'cards' ? 'space-y-3' : 'divide-y divide-neutral-200 border-t border-neutral-200',
        ]"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          :class="
            variant === 'cards'
              ? 'rounded-xl border border-neutral-200 bg-white px-4'
              : ''
          "
        >
          <h3>
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 py-4 text-start text-sm font-medium text-neutral-900"
              :aria-expanded="isOpen(i)"
              :aria-controls="`${uid}-panel-${i}`"
              :id="`${uid}-btn-${i}`"
              @click="toggle(i)"
            >
              <span>{{ item.question }}</span>
              <Icon
                name="ph:plus-bold"
                class="shrink-0 text-sm text-neutral-500 transition-transform duration-200"
                :class="isOpen(i) ? 'rotate-45' : ''"
              />
            </button>
          </h3>
          <div
            v-show="isOpen(i)"
            :id="`${uid}-panel-${i}`"
            role="region"
            :aria-labelledby="`${uid}-btn-${i}`"
          >
            <p
              v-if="item.answer"
              class="pb-4 text-sm leading-relaxed text-neutral-600"
            >
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool, list } = useSectionData(() => props.section);

const uid = useId();
const variant = computed(() => str("variant", "classic"));
const heading = computed(() =>
  str("heading", str("title", "Frequently asked questions")),
);
const accordion = computed(() => bool("accordion", true));

const SAMPLE = [
  {
    question: "How long does shipping take?",
    answer: "Orders usually arrive within 3-5 business days.",
  },
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days for a full refund.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide.",
  },
  {
    question: "How can I contact support?",
    answer: "Reach us any time through the contact form.",
  },
];

// The form stores { q, a }; older data uses { question, answer }.
const items = computed(() => {
  const rows = list("items");
  if (!rows.length) return SAMPLE;
  return rows.map((r, i) => ({
    question: String(r.question ?? r.q ?? `Question ${i + 1}`),
    answer: String(r.answer ?? r.a ?? ""),
  }));
});

const open = ref<Set<number>>(new Set([0]));

const isOpen = (i: number) => open.value.has(i);

const toggle = (i: number) => {
  const next = new Set(accordion.value ? [] : open.value);
  if (!open.value.has(i)) next.add(i);
  else if (!accordion.value) next.delete(i);
  open.value = next;
}

// Switching to accordion mode collapses to a single open item.
watch(accordion, (on) => {
  if (on && open.value.size > 1) open.value = new Set([[...open.value][0]!]);
});
</script>
