let resolver: ((url: string | null) => void) | null = null

/**
 * Shared control for the media library dialog.
 * `pick()` opens it in "choose an image" mode and resolves with the chosen URL (or null if dismissed).
 */
export const useMediaLibrary = () => {
  const open = useState('builder-media-open', () => false)
  const picking = useState('builder-media-picking', () => false)

  const browse = () => {
    picking.value = false
    open.value = true
  }

  const pick = (): Promise<string | null> => {
    resolver?.(null)
    picking.value = true
    open.value = true
    return new Promise((resolve) => {
      resolver = resolve
    })
  }

  /** Called by the dialog when it closes (with the chosen URL, or null). */
  const finish = (url: string | null) => {
    open.value = false
    picking.value = false
    resolver?.(url)
    resolver = null
  }

  return { open, picking, browse, pick, finish }
}
