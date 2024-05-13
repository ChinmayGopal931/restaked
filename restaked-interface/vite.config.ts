import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const basenameProd = "/";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? basenameProd : "",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      proxy: {
        // Proxying API requests to the backend server
        "/api": {
          target: "https://restaked.app", // Target API server
          changeOrigin: true, // needed for virtual hosted sites
          // rewrite: (path) => path.replace(/^\/api/, ""), // rewrite path
        },
      },
    },

    optimizeDeps: {
      // 👈 optimizedeps
      esbuildOptions: {
        target: "esnext",
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        supported: {
          bigint: true,
        },
      },
    },

    build: {
      target: ["esnext"], // 👈 build.target
    },

    define: {
      global: {
        basename: isProd ? basenameProd : "",
      },
    },
  };
});
