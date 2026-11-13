/** Shared formatters for the operations screens (mock data is in EGP). */
export const useOpsFormat = () => {
  const money = (n: number) => `${n.toLocaleString('en-US')} EGP`
  return { money }
}
