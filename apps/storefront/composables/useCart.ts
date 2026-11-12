/** Thin, SSR-safe facade over the cart store (state lives in a cookie). */
export function useCart() {
  const cart = useCartStore()
  const { formatMoney } = useShopFormat()
  return { cart, formatMoney }
}
