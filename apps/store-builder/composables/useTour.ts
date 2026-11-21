import { TOUR_STEPS, type TourAction, type TourStep } from '@/data/tour-steps'

const STORAGE_KEY = 'storeos_builder_tour_done'

const readDone = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const writeDone = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* storage unavailable */
  }
}

export const useTour = () => {
  const active = useState<boolean>('builder-tour-active', () => false)
  const index = useState<number>('builder-tour-index', () => 0)
  const steps = useState<TourStep[]>('builder-tour-steps', () => TOUR_STEPS)
  const leftTab = useState<string>('builder-left-tab', () => 'Sections')

  const total = computed(() => steps.value.length)
  const current = computed<TourStep | null>(() => steps.value[index.value] ?? null)
  const isFirst = computed(() => index.value === 0)
  const isLast = computed(() => index.value === steps.value.length - 1)

  const runAction = async (action?: TourAction): Promise<void> => {
    if (action) {
      if (action.startsWith('tab:')) {
        leftTab.value = action.slice(4)
      } else if (action.startsWith('panel:')) {
        const store = useBuilderStore()
        const mode = action.slice(6)
        if (mode === 'empty') {
          store.selectSection(null)
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          store.setPanelMode(mode as any)
        }
      }
    }
    await nextTick()
    await new Promise<void>((resolve) => setTimeout(resolve, 120))
  }

  const goTo = async (i: number): Promise<void> => {
    const clamped = Math.min(Math.max(i, 0), steps.value.length - 1)
    index.value = clamped
    await runAction(steps.value[clamped]?.action)
  }

  const start = async (): Promise<void> => {
    index.value = 0
    active.value = true
    await runAction(steps.value[0]?.action)
  }

  const next = async (): Promise<void> => {
    if (isLast.value) return finish()
    await goTo(index.value + 1)
  }

  const prev = async (): Promise<void> => {
    if (isFirst.value) return
    await goTo(index.value - 1)
  }

  const skip = (): void => {
    active.value = false
    writeDone()
  }

  const finish = (): void => {
    active.value = false
    writeDone()
  }

  const maybeAutoStart = (): void => {
    if (!import.meta.client || active.value || readDone()) return
    void start()
  }

  return { active, index, steps, current, isFirst, isLast, total, start, next, prev, goTo, skip, finish, maybeAutoStart }
}
