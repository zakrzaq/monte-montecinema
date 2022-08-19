import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
	  @import "src/assets/styles/_typography.scss";
	  @import "src/assets/styles/_mixins.scss";
	  @import "src/assets/styles/_variables.scss";
	  @import "src/assets/styles/_responsive.scss";
	`,
      },
    },
  },
});
