import type { AppColorScheme } from "@/types/useAppTheme";

/**
 * App-wide light/dark theme. Always starts dark on every page load.
 * State lives only in memory — closing/refreshing the browser resets to dark.
 */
export const useAppTheme = () => {
  const colorScheme = useState<AppColorScheme>("app-theme", () => "dark");

  const isDark = computed(() => colorScheme.value === "dark");

  const setTheme = (mode: AppColorScheme) => {
    colorScheme.value = mode;
  }

  const toggleTheme = () => {
    colorScheme.value = colorScheme.value === "dark" ? "light" : "dark";
  }

  return {
    colorScheme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
