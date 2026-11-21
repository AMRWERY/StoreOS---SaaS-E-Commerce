/**
 * Turn a chosen image file into a compact data URL (resized, JPEG/PNG/WebP kept small)
 * so uploads stay light enough to store with the design.
 */
export const useImageUpload = () => {
  const error = ref('')
  const busy = ref(false)

  const toDataUrl = async (file: File, maxSide = 1600, quality = 0.84): Promise<string | null> => {
    error.value = ''
    if (!file.type.startsWith('image/')) {
      error.value = 'Please choose an image file.'
      return null
    }
    if (file.size > 8 * 1024 * 1024) {
      error.value = 'Image is larger than 8 MB.'
      return null
    }
    busy.value = true
    try {
      // SVG/GIF stay untouched (resizing would flatten them) — but must be small.
      if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
        if (file.size > 400 * 1024) {
          error.value = 'SVG/GIF files must be under 400 KB.'
          return null
        }
        return await new Promise<string>((resolve, reject) => {
          const r = new FileReader()
          r.onload = () => resolve(String(r.result))
          r.onerror = () => reject(r.error)
          r.readAsDataURL(file)
        })
      }
      const bitmap = await createImageBitmap(file)
      const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(bitmap.width * scale)
      canvas.height = Math.round(bitmap.height * scale)
      canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
      // Keep transparency for PNG/WebP sources, otherwise JPEG is much smaller.
      const keepAlpha = file.type === 'image/png' || file.type === 'image/webp'
      return canvas.toDataURL(keepAlpha ? 'image/webp' : 'image/jpeg', quality)
    } catch {
      error.value = 'Could not read that image.'
      return null
    } finally {
      busy.value = false
    }
  }

  return { toDataUrl, error, busy }
}
