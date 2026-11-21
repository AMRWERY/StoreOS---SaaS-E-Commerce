/** Builder UI orchestration – extend with selection sync, preview postMessage, etc. */
export const useBuilder = () => {
  const builderStore = useBuilderStore()
  return { builderStore }
}
