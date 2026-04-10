import { defineStore } from 'pinia'
import type { DeviceMode, PanelMode } from '~/types/builder'
import type { PageSection, StorePage } from '~/types/sections'

export const useBuilderStore = defineStore('builder', () => {
  const currentPage = ref<StorePage | null>(null)
  const sections = ref<PageSection[]>([])
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)
  const device = ref<DeviceMode>('desktop')
  const panelMode = ref<PanelMode>('empty')
  const isDirty = ref(false)
  const isSaving = ref(false)
  const history = ref<PageSection[][]>([])
  const historyIndex = ref(-1)

  const selectedSection = computed(
    () => sections.value.find(s => s.id === selectedId.value) ?? null,
  )
  const canUndo = computed(() => historyIndex.value > 0)
  const canRedo = computed(() => historyIndex.value < history.value.length - 1)

  function reorderSortOrder() {
    sections.value.forEach((s, i) => {
      s.sort_order = i
    })
  }

  function selectSection(id: string | null) {
    selectedId.value = id
    panelMode.value = id ? 'section-settings' : 'empty'
  }

  function updateSectionSettings(id: string, patch: Record<string, unknown>) {
    const section = sections.value.find(s => s.id === id)
    if (section) {
      section.settings = { ...section.settings, ...patch }
      isDirty.value = true
      pushHistory()
    }
  }

  function moveSection(id: string, direction: 'up' | 'down') {
    const idx = sections.value.findIndex(s => s.id === id)
    if (direction === 'up' && idx > 0) {
      ;[sections.value[idx - 1], sections.value[idx]] = [
        sections.value[idx],
        sections.value[idx - 1],
      ]
    }
    if (direction === 'down' && idx >= 0 && idx < sections.value.length - 1) {
      ;[sections.value[idx], sections.value[idx + 1]] = [
        sections.value[idx + 1],
        sections.value[idx],
      ]
    }
    reorderSortOrder()
    isDirty.value = true
    pushHistory()
  }

  function pushHistory() {
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push(JSON.parse(JSON.stringify(sections.value)) as PageSection[])
    historyIndex.value = history.value.length - 1
  }

  function undo() {
    if (!canUndo.value) return
    historyIndex.value--
    sections.value = JSON.parse(
      JSON.stringify(history.value[historyIndex.value]),
    ) as PageSection[]
    isDirty.value = true
  }

  function redo() {
    if (!canRedo.value) return
    historyIndex.value++
    sections.value = JSON.parse(
      JSON.stringify(history.value[historyIndex.value]),
    ) as PageSection[]
    isDirty.value = true
  }

  return {
    currentPage,
    sections,
    selectedId,
    hoveredId,
    device,
    panelMode,
    isDirty,
    isSaving,
    selectedSection,
    canUndo,
    canRedo,
    selectSection,
    updateSectionSettings,
    moveSection,
    undo,
    redo,
    pushHistory,
    reorderSortOrder,
  }
})
