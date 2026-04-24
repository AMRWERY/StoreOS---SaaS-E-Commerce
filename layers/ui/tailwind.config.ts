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
          base: "rgb(var(--bg-base-rgb) / <alpha-value>)",
          primary: "rgb(var(--bg-primary-rgb) / <alpha-value>)",
          elevated: "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
          overlay: "rgb(var(--bg-overlay-rgb) / <alpha-value>)",
        },
        border: {
          subtle: "rgb(var(--border-subtle-rgb) / <alpha-value>)",
          default: "rgb(var(--border-default-rgb) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--brand-rgb) / <alpha-value>)",
          hover: "rgb(var(--brand-hover-rgb) / <alpha-value>)",
          dim: "var(--color-brand-dim)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          hover: "rgb(var(--accent-hover-rgb) / <alpha-value>)",
          dim: "var(--color-accent-dim)",
        },
        success: {
          DEFAULT: "rgb(var(--success-rgb) / <alpha-value>)",
          dim: "var(--color-success-dim)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning-rgb) / <alpha-value>)",
          dim: "var(--color-warning-dim)",
        },
        danger: {
          DEFAULT: "rgb(var(--danger-rgb) / <alpha-value>)",
          dim: "var(--color-danger-dim)",
        },
        info: {
          DEFAULT: "rgb(var(--info-rgb) / <alpha-value>)",
          dim: "var(--color-info-dim)",
        },
        status: {
          purple: "rgb(var(--status-purple-rgb) / <alpha-value>)",
          "purple-dim": "var(--color-status-purple-dim)",
          yellow: "rgb(var(--status-yellow-rgb) / <alpha-value>)",
          "yellow-dim": "var(--color-status-yellow-dim)",
        },
        tx: {
          primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary-rgb) / <alpha-value>)",
          muted: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        },
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
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
