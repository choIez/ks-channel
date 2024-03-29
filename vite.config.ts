import { fileURLToPath, URL } from "node:url"
import path from "node:path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
    extensions: [".js", ".ts", ".css", ".sass", ".scss"]
  },
  server: {
    host: "127.0.0.1"
  },
  build: {
    outDir: path.resolve(__dirname, "build")
  }
})
