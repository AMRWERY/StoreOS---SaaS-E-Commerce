import { ARAB_CURRENCY_CODES } from '../utils/currencies'

/**
 * Locale-aware money formatting for all Arab currencies, built on vue-i18n `n()`.
 * Named formats live in `i18n/i18n.config.ts`; any other ISO code falls back to an inline currency format.
 */
export function useCurrency(defaultCurrency = 'EGP') {
  const { n } = useI18n()

  const isKnown = (code: string) => (ARAB_CURRENCY_CODES as string[]).includes(code)

  /** 1234.5 + 'KWD' → "KWD 1,234.500" (en) / "1,234.500 د.ك." (ar) */
  const formatMoney = (amount: number, currency: string = defaultCurrency, options: Intl.NumberFormatOptions = {}) => {
    const code = currency.toUpperCase()
    return isKnown(code)
      ? n(amount, { key: code, ...options })
      : n(amount, { style: 'currency', currency: code, numberingSystem: 'latn', ...options })
  }

  /** Compact money: 1.2M EGP — for stat cards and dense tables. */
  const formatMoneyCompact = (amount: number, currency: string = defaultCurrency) =>
    formatMoney(amount, currency, { notation: 'compact', maximumFractionDigits: 1 })

  /** Converts from the base (EGP) amount using a units-per-EGP rate. */
  const convert = (amountEgp: number, rate: number) => amountEgp * rate

  return { formatMoney, formatMoneyCompact, convert }
}
