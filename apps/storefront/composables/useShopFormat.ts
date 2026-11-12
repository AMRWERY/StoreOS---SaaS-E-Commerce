/** Money and number formatting for the storefront. Catalog prices are EGP; pass `currency` for another market. */
export function useShopFormat() {
  const { locale } = useI18n()
  const { formatMoney: money } = useCurrency('EGP')

  // Western digits in both locales: numbers are always shown in the mono font.
  const formatNumber = (n: number) => new Intl.NumberFormat('en-US').format(n)
  const formatMoney = (n: number, currency = 'EGP') =>
    // Whole pounds for EGP (existing storefront look); other currencies keep their ISO precision.
    money(n, currency, currency === 'EGP' ? { minimumFractionDigits: 0, maximumFractionDigits: 0 } : {})
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
