/**
 * Arab League market → currency registry.
 * Decimal places are NOT stored here: Intl follows ISO 4217 (KWD/BHD/OMR/JOD/LYD/TND/IQD = 3,
 * LBP/SYP/YER/… = 0 or 2 depending on ICU data), so vue-i18n `numberFormats` get them for free.
 * `rate` is units of the currency per 1 EGP — PLACEHOLDER mock data until a rates API is wired up.
 */
export const ARAB_MARKETS = [
  { country: 'EG', currency: 'EGP', rate: 1, language: 'ar' },
  { country: 'SA', currency: 'SAR', rate: 0.076, language: 'ar' },
  { country: 'AE', currency: 'AED', rate: 0.074, language: 'en' },
  { country: 'KW', currency: 'KWD', rate: 0.0062, language: 'ar' },
  { country: 'QA', currency: 'QAR', rate: 0.073, language: 'ar' },
  { country: 'BH', currency: 'BHD', rate: 0.0076, language: 'ar' },
  { country: 'OM', currency: 'OMR', rate: 0.0078, language: 'ar' },
  { country: 'JO', currency: 'JOD', rate: 0.0143, language: 'ar' },
  { country: 'LB', currency: 'LBP', rate: 1800, language: 'ar' },
  { country: 'SY', currency: 'SYP', rate: 260, language: 'ar' },
  { country: 'IQ', currency: 'IQD', rate: 26, language: 'ar' },
  { country: 'YE', currency: 'YER', rate: 5, language: 'ar' },
  { country: 'PS', currency: 'ILS', rate: 0.072, language: 'ar' },
  { country: 'LY', currency: 'LYD', rate: 0.098, language: 'ar' },
  { country: 'TN', currency: 'TND', rate: 0.06, language: 'ar' },
  { country: 'DZ', currency: 'DZD', rate: 2.7, language: 'ar' },
  { country: 'MA', currency: 'MAD', rate: 0.19, language: 'ar' },
  { country: 'MR', currency: 'MRU', rate: 0.8, language: 'ar' },
  { country: 'SD', currency: 'SDG', rate: 12, language: 'ar' },
  { country: 'SO', currency: 'SOS', rate: 11.4, language: 'ar' },
  { country: 'DJ', currency: 'DJF', rate: 3.55, language: 'ar' },
  { country: 'KM', currency: 'KMF', rate: 8.4, language: 'ar' },
] as const

export type ArabCountryCode = (typeof ARAB_MARKETS)[number]['country']
export type ArabCurrencyCode = (typeof ARAB_MARKETS)[number]['currency']

export const ARAB_CURRENCY_CODES: ArabCurrencyCode[] = ARAB_MARKETS.map((m) => m.currency)

export const currencyForCountry = (country: string): ArabCurrencyCode | undefined =>
  ARAB_MARKETS.find((m) => m.country === country)?.currency
