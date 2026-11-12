import { ARAB_CURRENCY_CODES } from '../utils/currencies'

/**
 * vue-i18n number formats: one named format per Arab currency, per locale.
 * Use via `n(1234.5, 'KWD')` / `$n(...)` or the `useCurrency()` composable.
 *
 * `numberingSystem: 'latn'` keeps Western digits in Arabic (design rule: numbers render in the mono font).
 * Fraction digits are left to Intl so each currency gets its ISO 4217 precision (KWD → 3, EGP → 2, …).
 */
const currencyFormats = (numberingSystem: 'latn') =>
  Object.fromEntries(
    ARAB_CURRENCY_CODES.map((currency) => [
      currency,
      { style: 'currency', currency, currencyDisplay: 'symbol', numberingSystem },
    ]),
  )

const sharedFormats = {
  decimal: { style: 'decimal', numberingSystem: 'latn' },
  percent: { style: 'percent', numberingSystem: 'latn' },
  compact: { style: 'decimal', notation: 'compact', numberingSystem: 'latn' },
} as const

export default defineI18nConfig(() => ({
  legacy: false,
  numberFormats: {
    en: { ...sharedFormats, ...currencyFormats('latn') },
    ar: { ...sharedFormats, ...currencyFormats('latn') },
  },
}))
