/** Fetch and apply full-page templates – replace with API. */
export const useBuilderTemplates = () => {
  return {
    list: async () => [],
    apply: async (_templateId: string) => {},
  }
}
