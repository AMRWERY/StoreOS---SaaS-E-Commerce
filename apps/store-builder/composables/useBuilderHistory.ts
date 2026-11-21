export const useBuilderHistory = () => {
  const store = useBuilderStore()
  return {
    undo: () => store.undo(),
    redo: () => store.redo(),
    canUndo: computed(() => store.canUndo),
    canRedo: computed(() => store.canRedo),
  }
}
