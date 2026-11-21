const isDemoOpen = ref(false)

export const useDemoModal = () => {
  const openDemo = () => {
    isDemoOpen.value = true
  }

  const closeDemo = () => {
    isDemoOpen.value = false
  }

  return { isDemoOpen, openDemo, closeDemo }
}
