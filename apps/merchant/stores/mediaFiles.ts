import type { MediaFile, MediaFileType } from '@/types/storeContent'

export const useMediaFilesStore = defineStore('mediaFiles', () => {
  const files = ref<MediaFile[]>([
    { id: 'm1', name: 'hero-banner.jpg', type: 'image', sizeKb: 1840, usage: 3, createdAt: '2026-11-10' },
    { id: 'm2', name: 'cotton-tshirt-front.png', type: 'image', sizeKb: 640, usage: 2, createdAt: '2026-11-09' },
    { id: 'm3', name: 'cotton-tshirt-back.png', type: 'image', sizeKb: 590, usage: 1, createdAt: '2026-11-09' },
    { id: 'm4', name: 'brand-story.mp4', type: 'video', sizeKb: 18400, usage: 1, createdAt: '2026-11-05' },
    { id: 'm5', name: 'size-guide.pdf', type: 'document', sizeKb: 320, usage: 4, createdAt: '2026-11-02' },
    { id: 'm6', name: 'logo-dark.png', type: 'image', sizeKb: 48, usage: 6, createdAt: '2026-10-28' },
  ])
  const quotaKb = 512000

  const usedKb = computed(() => files.value.reduce((s, f) => s + f.sizeKb, 0))

  function remove(id: string) {
    files.value = files.value.filter((f) => f.id !== id)
  }
  function addFromUpload(file: File | null) {
    if (!file) return
    const type: MediaFileType = file.type.startsWith('image/')
      ? 'image'
      : file.type.startsWith('video/')
        ? 'video'
        : 'document'
    files.value.unshift({
      id: `m${Date.now()}`,
      name: file.name,
      type,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      usage: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    })
  }

  return { files, quotaKb, usedKb, remove, addFromUpload }
})
