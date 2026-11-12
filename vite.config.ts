import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Vite and TypeScript need telling SEPARATELY. This makes the bundler
      // find the file; tsconfig's `paths` makes the compiler understand it.
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
