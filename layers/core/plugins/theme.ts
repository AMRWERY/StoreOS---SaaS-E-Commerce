export default defineNuxtPlugin({
  name: "storeos-theme",
  enforce: "pre",
  setup() {
    const colorScheme = useState<"light" | "dark">("app-theme", () => "dark");

    useHead(
      computed(() => ({
        htmlAttrs: {
          "data-theme": colorScheme.value,
        },
      })),
    );
  },
});
