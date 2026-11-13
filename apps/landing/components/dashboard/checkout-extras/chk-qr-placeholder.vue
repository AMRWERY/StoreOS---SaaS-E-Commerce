<template>
  <div
    class="inline-grid bg-bg-elevated border border-border-default rounded-md p-3 gap-px"
    :style="{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))`, width: '11rem', height: '11rem' }"
    dir="ltr"
    role="img"
    :aria-label="t('dashboard.ops.paymentLinks.qrAlt')"
  >
    <span
      v-for="(on, i) in cells"
      :key="i"
      :class="on ? 'bg-tx-primary' : 'bg-transparent'"
    ></span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ seed: string }>()

const { t } = useI18n()
const SIZE = 21

function inFinder(r: number, c: number) {
  const corners: [number, number][] = [[0, 0], [0, SIZE - 7], [SIZE - 7, 0]]
  return corners.some(([cr, cc]) => {
    const rr = r - cr
    const c2 = c - cc
    if (rr < 0 || rr > 6 || c2 < 0 || c2 > 6) return false
    const ring = rr === 0 || rr === 6 || c2 === 0 || c2 === 6
    const core = rr >= 2 && rr <= 4 && c2 >= 2 && c2 <= 4
    return ring || core
  })
}
function inFinderZone(r: number, c: number) {
  return (r < 8 && c < 8) || (r < 8 && c > SIZE - 9) || (r > SIZE - 9 && c < 8)
}

// Decorative only (not a scannable QR): deterministic pseudo-random modules from the seed.
const cells = computed(() => {
  let h = 0
  for (const ch of props.seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const out: boolean[] = []
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (inFinderZone(r, c)) {
        out.push(inFinder(r, c))
        continue
      }
      h = (h * 1103515245 + 12345) >>> 0
      out.push(((h >>> 16) & 3) !== 0 ? ((h >>> 8) & 1) === 1 : false)
    }
  }
  return out
})
</script>
