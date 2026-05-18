import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
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
  plugins: [
    TanStackRouterVite({
      addExtensions: ".js",
      generatedRouteTree: "./src/routeTree.gen.ts",
      quoteStyle: "double",
      routesDirectory: "./src/routes",
      semicolons: true,
      target: "react",
    }),
    react(),
  ],
});
