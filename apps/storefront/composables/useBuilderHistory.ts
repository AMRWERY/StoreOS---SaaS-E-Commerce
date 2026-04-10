import { useBuilderStore } from '~/stores/builder'

export function useBuilderHistory() {
  const store = useBuilderStore()
  return {
    undo: () => store.undo(),
    redo: () => store.redo(),
    canUndo: computed(() => store.canUndo),
    canRedo: computed(() => store.canRedo),
  }
}
