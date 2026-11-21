/** Theme read/write + CSS variables – replace with API calls + injection. */
export const useStoreTheme = () => {
  const theme = ref<unknown>(null)
  return { theme }
}
