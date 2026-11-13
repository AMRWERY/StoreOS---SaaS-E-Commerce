/**
 * Details collected at registration and carried through the first-product onboarding,
 * so the merchant never has to type their store name twice.
 * In-memory only (like `useAuth`) until a real backend exists.
 */
export const useOnboarding = () => {
  const storeName = useState<string>('onboarding.storeName', () => '')
  const fullName = useState<string>('onboarding.fullName', () => '')
  const email = useState<string>('onboarding.email', () => '')
  const industry = useState<string>('onboarding.industry', () => '')

  /** URL-safe store handle derived from the store name. */
  const slug = computed(
    () =>
      storeName.value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'my-store',
  )
  const storeUrl = computed(() => `https://storeos.app/${slug.value}`)

  const setRegistration = (data: { storeName: string; fullName: string; email: string; industry: string }) => {
    storeName.value = data.storeName.trim()
    fullName.value = data.fullName.trim()
    email.value = data.email.trim()
    industry.value = data.industry
  }

  return { storeName, fullName, email, industry, slug, storeUrl, setRegistration }
}
