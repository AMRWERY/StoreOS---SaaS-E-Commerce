export type AppColorScheme = "light" | "dark";

/**
 * App-wide light/dark theme. Always starts dark on every page load.
 * State lives only in memory — closing/refreshing the browser resets to dark.
 */
export function useAppTheme() {
  const colorScheme = useState<AppColorScheme>("app-theme", () => "dark");

  const isDark = computed(() => colorScheme.value === "dark");

  function setTheme(mode: AppColorScheme) {
    colorScheme.value = mode;
  }

  function toggleTheme() {
    colorScheme.value = colorScheme.value === "dark" ? "light" : "dark";
  }

  return {
    colorScheme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
