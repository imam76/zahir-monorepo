import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/@tanstack/")) {
            return "router";
          }

          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/")
          ) {
            return "react";
          }

          if (
            id.includes("/node_modules/@repo/ui/") ||
            id.includes("/packages/ui/")
          ) {
            return "ui";
          }
        },
      },
    },
    target: "es2022",
  },
  plugins: [react()],
});
