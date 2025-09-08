import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/openweathermap_api/", // <-- your GitHub repo name
  plugins: [react()],
});
