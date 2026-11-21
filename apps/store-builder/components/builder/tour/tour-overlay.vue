<script setup lang="ts">
import { TOUR_UI, type TourPlacement, type TourText } from '@/data/tour-steps'

type Side = 'top' | 'bottom' | 'left' | 'right'

interface Box {
  top: number
  left: number
  width: number
  height: number
}

const CARD_W = 340
// Room between the dialog and the highlighted element — the pointer arrow lives in this gap.
const GAP = 56
const MARGIN = 12
const PAD = 6

const { active, index, current, isFirst, isLast, total, steps, next, prev, skip, finish, goTo } = useTour()
const { locale } = useI18n()

const isAr = computed(() => locale.value === 'ar')
const dir = computed(() => (isAr.value ? 'rtl' : 'ltr'))
const t = (text: TourText): string => (isAr.value ? text.ar : text.en)

const mounted = ref(false)
const cardRef = ref<HTMLElement | null>(null)
const primaryRef = ref<HTMLButtonElement | null>(null)
const targetBox = ref<Box | null>(null)
const vw = ref(0)
const vh = ref(0)
const cardH = ref(230)
const side = ref<Side | null>(null)
const cardPos = ref({ top: 0, left: 0 })
/** Pointer arrow: centre point (viewport px) and rotation (0° = points up). */
const arrow = ref({ left: 0, top: 0, rot: 0 })

let previousFocus: HTMLElement | null = null
let pollId = 0
let pollUntil = 0

const reducedMotion = ref(false)

const stepLabel = computed(() =>
  t(TOUR_UI.stepOf).replace('{n}', String(index.value + 1)).replace('{total}', String(total.value)),
)

const findTarget = (): HTMLElement | null => {
  const sel = current.value?.target
  if (!sel) return null
  try {
    const el = document.querySelector<HTMLElement>(sel)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0 ? el : null
  } catch {
    return null
  }
}

const physicalSide = (p: TourPlacement | undefined): Side | null => {
  if (!p || p === 'center') return null
  if (p === 'start') return isAr.value ? 'right' : 'left'
  if (p === 'end') return isAr.value ? 'left' : 'right'
  return p
}

const space = (s: Side, b: Box): number => {
  switch (s) {
    case 'top': return b.top - MARGIN
    case 'bottom': return vh.value - (b.top + b.height) - MARGIN
    case 'left': return b.left - MARGIN
    default: return vw.value - (b.left + b.width) - MARGIN
  }
}

const needed = (s: Side): number => {
  return (s === 'left' || s === 'right' ? CARD_W : cardH.value) + GAP
}

const OPPOSITE: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

const clamp = (v: number, min: number, max: number): number => {
  return Math.max(min, Math.min(v, Math.max(min, max)))
}

const compute = (): void => {
  vw.value = window.innerWidth
  vh.value = window.innerHeight
  cardH.value = cardRef.value?.offsetHeight || cardH.value
  const cw = Math.min(CARD_W, vw.value - MARGIN * 2)

  const el = findTarget()
  if (!el) {
    targetBox.value = null
    side.value = null
    cardPos.value = {
      top: Math.max(MARGIN, (vh.value - cardH.value) / 2),
      left: Math.max(MARGIN, (vw.value - cw) / 2),
    }
    return
  }

  const r = el.getBoundingClientRect()
  const b: Box = { top: r.top - PAD, left: r.left - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 }
  targetBox.value = b

  const preferred = physicalSide(current.value?.placement) ?? 'bottom'
  const order: Side[] = [preferred, OPPOSITE[preferred]]
  for (const s of ['bottom', 'top', 'right', 'left'] as Side[]) if (!order.includes(s)) order.push(s)
  const chosen = order.find((s) => space(s, b) >= needed(s)) ?? order.reduce((a, c) => (space(c, b) > space(a, b) ? c : a))
  side.value = chosen

  const cx = b.left + b.width / 2
  const cy = b.top + b.height / 2
  let top: number
  let left: number
  if (chosen === 'top' || chosen === 'bottom') {
    left = clamp(cx - cw / 2, MARGIN, vw.value - cw - MARGIN)
    top = chosen === 'bottom' ? b.top + b.height + GAP : b.top - GAP - cardH.value
  } else {
    top = clamp(cy - cardH.value / 2, MARGIN, vh.value - cardH.value - MARGIN)
    left = chosen === 'right' ? b.left + b.width + GAP : b.left - GAP - cw
  }
  top = clamp(top, MARGIN, vh.value - cardH.value - MARGIN)
  left = clamp(left, MARGIN, vw.value - cw - MARGIN)
  cardPos.value = { top, left }

  // Pointer arrow: sits in the gap between the dialog and the target, aimed at the target.
  // Local "up" is the pointing direction, so rotate: bottom → 0°, top → 180°, right → -90°, left → 90°.
  const mid = GAP / 2
  if (chosen === 'bottom') arrow.value = { left: clamp(cx, left + 28, left + cw - 28), top: b.top + b.height + mid, rot: 0 }
  else if (chosen === 'top') arrow.value = { left: clamp(cx, left + 28, left + cw - 28), top: b.top - mid, rot: 180 }
  else if (chosen === 'right') arrow.value = { left: b.left + b.width + mid, top: clamp(cy, top + 28, top + cardH.value - 28), rot: -90 }
  else arrow.value = { left: b.left - mid, top: clamp(cy, top + 28, top + cardH.value - 28), rot: 90 }
}

const stopPoll = (): void => {
  if (pollId) cancelAnimationFrame(pollId)
  pollId = 0
}

const startPoll = (): void => {
  stopPoll()
  pollUntil = performance.now() + 600
  const tick = (): void => {
    compute()
    if (performance.now() < pollUntil) pollId = requestAnimationFrame(tick)
    else pollId = 0
  }
  pollId = requestAnimationFrame(tick)
}

const onStepChange = async (): Promise<void> => {
  await nextTick()
  const el = findTarget()
  if (el) {
    try {
      el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' })
    } catch {
      /* ignore */
    }
  }
  compute()
  startPoll()
  await nextTick()
  compute()
  primaryRef.value?.focus({ preventScroll: true })
}

const onKeydown = (e: KeyboardEvent): void => {
  if (!active.value) return
  // The tour can only be left with "Skip tour" or by finishing it — Esc is deliberately ignored.
  if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  const forward = isAr.value ? 'ArrowLeft' : 'ArrowRight'
  const backward = isAr.value ? 'ArrowRight' : 'ArrowLeft'
  if (e.key === forward) {
    e.preventDefault()
    void next()
  } else if (e.key === backward) {
    e.preventDefault()
    void prev()
  } else if (e.key === 'Tab') {
    const root = cardRef.value
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'))
    if (!items.length) return
    const first = items[0]!
    const last = items[items.length - 1]!
    const cur = document.activeElement
    if (!root.contains(cur)) {
      e.preventDefault()
      first.focus()
    } else if (e.shiftKey && cur === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && cur === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

const onResize = (): void => {
  compute()
}

const attach = (): void => {
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  window.addEventListener('keydown', onKeydown, true)
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onResize, true)
}

const detach = (): void => {
  window.removeEventListener('keydown', onKeydown, true)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onResize, true)
  stopPoll()
  previousFocus?.focus?.({ preventScroll: true })
  previousFocus = null
}

onMounted(() => {
  mounted.value = true
  reducedMotion.value = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})

watch(
  active,
  async (on) => {
    if (!import.meta.client) return
    if (on) {
      attach()
      await onStepChange()
    } else {
      detach()
    }
  },
  { immediate: true, flush: 'post' },
)

watch(index, () => {
  if (active.value) void onStepChange()
})

onBeforeUnmount(() => {
  if (import.meta.client) detach()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="mounted && active && current"
      class="fixed inset-0 z-[10000]"
      :dir="dir"
      @click.stop.prevent
      @mousedown.stop.prevent
      @pointerdown.stop
    >
      <!-- Dimmed backdrop with spotlight hole -->
      <svg class="absolute inset-0 h-full w-full" :width="vw" :height="vh" aria-hidden="true">
        <defs>
          <mask id="tour-spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              v-if="targetBox"
              :x="targetBox.left"
              :y="targetBox.top"
              :width="targetBox.width"
              :height="targetBox.height"
              rx="10"
              fill="black"
              :class="reducedMotion ? '' : 'tour-rect'"
            />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="rgb(0 0 0 / 0.62)" mask="url(#tour-spotlight-mask)" />
      </svg>

      <!-- Pulsing ring -->
      <div
        v-if="targetBox"
        class="pointer-events-none absolute rounded-[10px] border-2 border-brand"
        :class="reducedMotion ? '' : 'tour-pulse'"
        :style="{ top: targetBox.top + 'px', left: targetBox.left + 'px', width: targetBox.width + 'px', height: targetBox.height + 'px' }"
        aria-hidden="true"
      />

      <!-- Pointer arrow: aims from the dialog at the highlighted element -->
      <div
        v-if="targetBox && side"
        class="pointer-events-none absolute z-10 flex h-11 w-11 items-center justify-center text-brand"
        :style="{ top: arrow.top - 22 + 'px', left: arrow.left - 22 + 'px', transform: 'rotate(' + arrow.rot + 'deg)' }"
        aria-hidden="true"
      >
        <svg
          width="28"
          height="44"
          viewBox="0 0 28 44"
          fill="none"
          class="overflow-visible drop-shadow-[0_0_6px_rgb(0_0_0/0.55)]"
          :class="reducedMotion ? '' : 'tour-arrow-nudge'"
        >
          <path d="M14 42V12" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
          <path d="M3 17L14 3l11 14" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- Popover card -->
      <div
        ref="cardRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
        aria-describedby="tour-body"
        :dir="dir"
        class="absolute rounded-xl border border-border-subtle bg-bg-primary p-4 text-start"
        :class="reducedMotion ? '' : 'tour-card'"
        :style="{ top: cardPos.top + 'px', left: cardPos.left + 'px', width: Math.min(CARD_W, vw - MARGIN * 2) + 'px' }"
      >

        <div class="mb-2 flex items-center justify-between gap-2">
          <span class="font-mono text-[11px] font-semibold text-tx-muted">{{ stepLabel }}</span>
        </div>

        <h2 id="tour-title" class="mb-1 text-[15px] font-semibold text-tx-primary">{{ t(current.title) }}</h2>
        <p id="tour-body" class="text-[13px] leading-relaxed text-tx-secondary">{{ t(current.body) }}</p>

        <div class="mt-3 flex items-center justify-center gap-1.5" role="tablist">
          <button
            v-for="(s, i) in steps"
            :key="s.id"
            type="button"
            role="tab"
            :aria-selected="i === index"
            :aria-label="`${i + 1}`"
            class="h-1.5 rounded-full"
            :class="[i === index ? 'w-4 bg-brand' : 'w-1.5 bg-border-default hover:bg-tx-muted', reducedMotion ? '' : 'transition-all duration-200']"
            @click="goTo(i)"
          />
        </div>

        <div class="mt-4 flex items-center justify-between gap-2">
          <button
            v-if="!isLast"
            type="button"
            class="text-[12px] text-tx-muted underline-offset-2 hover:text-tx-primary hover:underline"
            @click="skip"
          >
            {{ t(TOUR_UI.skip) }}
          </button>
          <span v-else />
          <div class="flex items-center gap-2">
            <button
              v-if="!isFirst"
              type="button"
              class="inline-flex h-8 items-center gap-1 rounded-lg border border-border-subtle px-3 text-[12px] font-medium text-tx-primary hover:bg-bg-elevated"
              @click="prev"
            >
              <Icon :name="isAr ? 'ph:arrow-right-bold' : 'ph:arrow-left-bold'" class="h-3 w-3" />
              {{ t(TOUR_UI.back) }}
            </button>
            <button
              ref="primaryRef"
              type="button"
              class="inline-flex h-8 items-center gap-1 rounded-lg bg-brand px-3 text-[12px] font-semibold text-white hover:bg-brand-hover"
              @click="isLast ? finish() : next()"
            >
              {{ isLast ? t(TOUR_UI.done) : t(TOUR_UI.next) }}
              <Icon v-if="!isLast" :name="isAr ? 'ph:arrow-left-bold' : 'ph:arrow-right-bold'" class="h-3 w-3" />
              <Icon v-else name="ph:check-bold" class="h-3 w-3" />
            </button>
          </div>
        </div>

        <p v-if="isLast" class="mt-3 text-center text-[11px] text-tx-muted">{{ t(TOUR_UI.dontShow) }}</p>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.tour-card {
  transition:
    top 0.25s ease,
    left 0.25s ease;
}
.tour-rect {
  transition: all 0.25s ease;
}
.tour-arrow-nudge {
  animation: tour-arrow-nudge 0.9s ease-in-out infinite;
}
@keyframes tour-arrow-nudge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
.tour-pulse {
  animation: tour-pulse 1.6s ease-out infinite;
}
@keyframes tour-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tour-arrow-nudge,
  .tour-card,
  .tour-rect,
  .tour-pulse {
    transition: none;
    animation: none;
  }
}
</style>
