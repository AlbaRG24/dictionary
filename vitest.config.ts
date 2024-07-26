import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["./setupTests.ts"],
    coverage: {
      reporter: ["text", "html"],
    },
    mockReset: true,
    environment: "happy-dom",
  },
});
