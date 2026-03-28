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
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        bg: {
          base:     "#08080E",
          primary:  "#0D0D18",
          elevated: "#141422",
          overlay:  "#1A1A2E",
        },
        border: {
          subtle:  "#1C1C30",
          default: "#262640",
        },
        brand: {
          DEFAULT: "#6366F1",
          hover:   "#818CF8",
          dim:     "rgba(99,102,241,0.12)",
        },
        accent: {
          DEFAULT: "#F97316",
          hover:   "#FB923C",
          dim:     "rgba(249,115,22,0.12)",
        },
        success: {
          DEFAULT: "#10B981",
          dim:     "rgba(16,185,129,0.12)",
        },
        warning: {
          DEFAULT: "#F59E0B",
          dim:     "rgba(245,158,11,0.12)",
        },
        danger: {
          DEFAULT: "#EF4444",
          dim:     "rgba(239,68,68,0.12)",
        },
        info: {
          DEFAULT: "#3B82F6",
          dim:     "rgba(59,130,246,0.12)",
        },
        status: {
          purple: "#A78BFA",
          "purple-dim": "rgba(167,139,250,0.12)",
          yellow: "#EAB308",
          "yellow-dim": "rgba(234,179,8,0.12)",
        },
        tx: {
          primary:   "#F0F0FF",
          secondary: "#8888AA",
          muted:     "#50506A",
        },
      },
      borderRadius: {
        xs:  "4px",
        sm:  "6px",
        md:  "8px",
        lg:  "10px",
        xl:  "12px",
        "2xl": "14px",
      },
      spacing: {
        "4.5": "18px",
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
