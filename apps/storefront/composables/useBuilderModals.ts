/** Shared modal visibility for builder chrome (Nuxt useState = shared across layout + shell). */
export function useBuilderModals() {
  const addSectionOpen = useState('builder-modal-add-section', () => false)
  const publishOpen = useState('builder-modal-publish', () => false)
  const createPageOpen = useState('builder-modal-create-page', () => false)
  const deletePageOpen = useState('builder-modal-delete-page', () => false)
  const templatePickerOpen = useState('builder-modal-template-picker', () => false)
  const planGateOpen = useState('builder-plan-gate', () => false)

  return {
    addSectionOpen,
    publishOpen,
    createPageOpen,
    deletePageOpen,
    templatePickerOpen,
    planGateOpen,
  }
}
