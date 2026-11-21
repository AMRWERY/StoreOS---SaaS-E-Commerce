/**
 * Keyboard shortcuts for the builder:
 *  Ctrl/⌘+C copy section · Ctrl/⌘+V paste (works across pages)
 *  Ctrl/⌘+Z undo · Ctrl/⌘+Shift+Z or Ctrl+Y redo · Ctrl/⌘+S save · Ctrl/⌘+D duplicate section
 *  Delete remove section · Alt+↑/↓ move section · Esc deselect
 * Ignored while typing in a field.
 */
export const useBuilderShortcuts = () => {
  const store = useBuilderStore()
  const { addSectionOpen, publishOpen, createPageOpen, deletePageOpen, templatePickerOpen, localeSettingsOpen, versionsOpen } = useBuilderModals()
  const { open: mediaOpen } = useMediaLibrary()
  const tourActive = useState<boolean>('builder-tour-active', () => false)

  const anyModalOpen = () =>
    addSectionOpen.value || publishOpen.value || createPageOpen.value
    || deletePageOpen.value || templatePickerOpen.value || localeSettingsOpen.value
    || versionsOpen.value || mediaOpen.value || tourActive.value

  const isTyping = (target: EventTarget | null) => {
    const el = target as HTMLElement | null
    if (!el) return false
    return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)
  }

  const onKeydown = (e: KeyboardEvent) => {
    const mod = e.ctrlKey || e.metaKey
    const key = e.key.toLowerCase()

    // Save works everywhere (even in fields), but never while a dialog is open.
    if (mod && key === 's') {
      e.preventDefault()
      if (!anyModalOpen()) void store.saveSettings()
      return
    }
    if (isTyping(e.target) || anyModalOpen()) return

    if (mod && key === 'z') {
      e.preventDefault()
      if (e.shiftKey) store.redo()
      else store.undo()
    }
    else if (mod && key === 'y') {
      e.preventDefault()
      store.redo()
    }
    else if (mod && key === 'c' && store.selectedId) {
      // Don't hijack a text selection the user made on the page.
      if (window.getSelection()?.toString()) return
      e.preventDefault()
      store.copySection(store.selectedId)
    }
    else if (mod && key === 'v' && store.clipboard.length) {
      e.preventDefault()
      store.pasteSection()
    }
    else if (mod && key === 'd' && store.selectedId) {
      e.preventDefault()
      store.duplicateSection(store.selectedId)
    }
    else if ((key === 'delete' || key === 'backspace') && store.selectedId && store.panelMode === 'section-settings') {
      e.preventDefault()
      store.removeSection(store.selectedId)
    }
    else if (e.altKey && (key === 'arrowup' || key === 'arrowdown') && store.selectedId) {
      e.preventDefault()
      store.moveSection(store.selectedId, key === 'arrowup' ? 'up' : 'down')
    }
    else if (key === 'escape' && store.selectedId) {
      store.selectSection(null)
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}
