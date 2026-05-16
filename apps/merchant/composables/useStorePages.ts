/** CRUD for `store_pages` – replace with Supabase/API calls. */
export function useStorePages() {
  return {
    list: async (_storeId: string) => [],
    getBySlug: async (_storeId: string, _slug: string) => null,
    create: async () => null,
    update: async () => null,
    remove: async () => null,
  }
}
