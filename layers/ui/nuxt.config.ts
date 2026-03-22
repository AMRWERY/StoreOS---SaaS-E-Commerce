import { fileURLToPath } from "node:url";

const currentDir = fileURLToPath(new URL(".", import.meta.url));

export default defineNuxtConfig({
  css: [`${currentDir}/assets/css/main.css`],
  tailwindcss: {
    cssPath: `${currentDir}/assets/css/tailwind.css`,
  },
  components: [
    {
      path: `${currentDir}/components`,
      pathPrefix: false,
    },
  ],
});
