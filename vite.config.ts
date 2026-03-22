import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  // TODO: Change '/kingdom-place/' to your actual GitHub repository name if different
  base: command === "build" ? "/kingdom-place/" : "/",
  plugins: [react(), tailwindcss()],
}));
