/** Fetch and apply full-page templates – replace with API. */
export function useBuilderTemplates() {
  return {
    list: async () => [],
    apply: async (_templateId: string) => {},
  }
}
