import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const currentDir = fileURLToPath(new URL(".", import.meta.url));

export default defineNuxtConfig({
  css: [
    `${currentDir}/assets/css/tailwind.css`,
    `${currentDir}/node_modules/@vuepic/vue-datepicker/dist/main.css`,
    `${currentDir}/assets/css/main.css`,
    `${currentDir}/assets/css/transitions.css`,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  components: [
    {
      path: `${currentDir}/components`,
      pathPrefix: false,
    },
  ],
});
