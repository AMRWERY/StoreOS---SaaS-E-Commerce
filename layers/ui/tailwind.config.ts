import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    // App-level files
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    // Shared layer files
    "@/layers/ui/components/**/*.{js,vue,ts}",
    "@/layers/core/composables/**/*.{js,ts}",
    "@/layers/core/utils/**/*.{js,ts}",
    "@/layers/core/types/**/*.ts",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Iosevka Charon"', 'ui-monospace', 'monospace'],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-rtl"),
  ],
} satisfies Config;
