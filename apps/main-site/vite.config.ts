import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Plugin to handle .topojson files as JSON
function topojsonPlugin(): Plugin {
  return {
    name: "topojson",
    transform(code, id) {
      if (id.endsWith(".topojson")) {
        return {
          code: `export default ${code}`,
          map: null,
        };
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    topojsonPlugin(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
