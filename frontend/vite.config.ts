import { defineConfig, loadEnv } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "");
  
  const apiUrl = env.VITE_API_URL || "http://localhost:8000";

  // Let's debug what's wrong
  console.log("API URL:", apiUrl);

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    server: {
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on("error", (err, req, res) => {
              console.error("[Proxy Error]", err.message);
              if (!res.headersSent) {
                res.writeHead(502, { "Content-Type": "application/json" });
              }
              res.end(JSON.stringify({ error: "Proxy error", message: err.message }));
            });
            proxy.on("proxyRes", (proxyRes, req) => {
              console.log("[Proxy Response]", proxyRes.statusCode, req.method, req.url);
              if (proxyRes.statusCode && proxyRes.statusCode >= 500) {
                console.error("[Upstream Error]", proxyRes.statusCode, req.method, req.url);
              }
            });
          },
        }
      }
    },
  };
});