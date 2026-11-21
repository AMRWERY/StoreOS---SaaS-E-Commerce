# Code style: arrow functions only

**Rule (mandatory for humans and AI agents):** never use the `function` keyword to declare functions in
`.vue`, `.ts`, `.js` or `.mjs` files. Use arrow functions.

```ts
// ✅
const submit = async (id: string): Promise<void> => { … }
export const useThing = () => { … }
const pick = <T,>(items: T[]) => items[0]      // generics: `<T,>` keeps .tsx/.vue parsers happy
items.map((item) => item.id)                    // callbacks too

// ❌
function submit(id: string) { … }
export function useThing() { … }
arr.map(function (item) { return item.id })
```

## Notes

- **Declare before use.** Arrow functions are `const`s and are not hoisted. Define a function above any
  *synchronous* top-level use (e.g. `onMounted(init)`, `watch(src, handler, { immediate: true })`). Calls from
  inside other functions, event handlers or the template are fine regardless of order. `pnpm lint` reports
  violations as TS2448/TS2454.
- **Return types** go before the arrow: `const f = (a: number): string => { … }`.
- **Object-literal return types** are fine: `(): { a: string }[] => { … }`.
- **Exceptions** (only when an arrow genuinely cannot work): generator functions (`function*`), code that
  relies on its own `this`/`arguments`, TypeScript overloads/assertion-function signatures that require a
  declaration, and `function` text inside string literals (e.g. injected analytics snippets in
  `apps/store-builder/composables/useTracking.ts`). Add a one-line comment saying why.
- Object/class **methods** (`foo() {}` shorthand) are not function declarations and are allowed.
