import { useBuilderStore } from '~/stores/builder'

/** Builder UI orchestration – extend with selection sync, preview postMessage, etc. */
export function useBuilder() {
  const builderStore = useBuilderStore()
  return { builderStore }
}
