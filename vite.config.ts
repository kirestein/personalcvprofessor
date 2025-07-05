import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Custom plugin to inject "built by St3 T3ch" tag
function injectBuiltBySt3TechPlugin() {
  return {
    name: 'inject-built-by-st3tech',
    transformIndexHtml(html: string) {
      // Inject the st3tech tag script reference
      const scriptTag = '<script defer src="/scout-tag.js"></script>'; // keeping same filename for simplicity
      
      // Inject the script before the closing body tag
      return html.replace('</body>', scriptTag + '\n  </body>');
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), injectBuiltBySt3TechPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
