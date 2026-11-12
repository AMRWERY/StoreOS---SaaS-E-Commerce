const nf = new Intl.NumberFormat('en-US')

export const usePlatformFormat = () => {
  const num = (n: number): string => nf.format(n)

  /** Compact EGP: 1.2M, 340K, 950. Currency label is added by the caller via i18n. */
  const compact = (n: number): string => {
    if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (Math.abs(n) >= 1_000) return `${(n / 1_000).toFixed(1)}K`
    return nf.format(n)
  }

  const percent = (used: number, limit: number | null): number =>
    limit === null || limit === 0 ? 0 : Math.min(100, Math.round((used / limit) * 100))

  return { num, compact, percent }
}
