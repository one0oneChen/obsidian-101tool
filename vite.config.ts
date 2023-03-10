import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env': {} },
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "main",
      formats: ["cjs"],
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        dir: undefined,
        file: resolve(__dirname, "main.js"),
        sourcemap: "inline",
        sourcemapExcludeSources: true,
        format: "cjs",
        exports: "default",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") return "styles.css";
        },
      },
      external: ["obsidian"],
      plugins: [typescript(), nodeResolve({ browser: true }), commonjs()],
    },
  },
});