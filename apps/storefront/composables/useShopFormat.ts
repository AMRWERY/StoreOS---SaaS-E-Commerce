/** Money and number formatting for the storefront. Prices are EGP integers. */
export function useShopFormat() {
  const { t, locale } = useI18n()

  // Western digits in both locales: numbers are always shown in the mono font.
  const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n)
  const formatMoney = (n: number) => `${formatNumber(n)} ${t('shop.currency')}`
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale.value === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso))

  /** Normalises an Egyptian mobile number to +20 E.164. Returns null when invalid. */
  const normalizePhone = (raw: string): string | null => {
    const digits = raw.replace(/[^\d]/g, '')
    let local = digits
    if (local.startsWith('0020')) local = local.slice(4)
    else if (local.startsWith('20') && local.length === 12) local = local.slice(2)
    else if (local.startsWith('0')) local = local.slice(1)
    return /^1[0125]\d{8}$/.test(local) ? `+20${local}` : null
  }

  return { formatNumber, formatMoney, formatDate, normalizePhone }
}
