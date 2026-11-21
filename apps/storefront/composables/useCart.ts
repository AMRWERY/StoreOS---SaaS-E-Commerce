/** Thin, SSR-safe facade over the cart store (state lives in a cookie). */
export const useCart = () => {
  const cart = useCartStore()
  const { formatMoney } = useShopFormat()
  return { cart, formatMoney }
}
