/** Theme read/write + CSS variables – replace with API calls + injection. */
export function useStoreTheme() {
  const theme = ref<unknown>(null)
  return { theme }
}
