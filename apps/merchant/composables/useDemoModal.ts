const isDemoOpen = ref(false)

export function useDemoModal() {
  function openDemo() {
    isDemoOpen.value = true
  }

  function closeDemo() {
    isDemoOpen.value = false
  }

  return { isDemoOpen, openDemo, closeDemo }
}
