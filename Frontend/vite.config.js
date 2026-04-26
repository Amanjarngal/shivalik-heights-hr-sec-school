import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // In dev, proxy to localhost backend. In prod, VITE_API_TARGET is used.
  const backendTarget = env.VITE_API_TARGET;

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          // Increase timeouts for file uploads (Cloudinary can be slow)
          timeout: 120000,          // 2 minutes socket timeout
          proxyTimeout: 120000,     // 2 minutes proxy timeout
          configure: (proxy) => {
            proxy.on('error', (err, req, res) => {
              console.error('[Vite Proxy Error]', err.message);
              if (!res.headersSent) {
                res.writeHead(502, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Proxy error: ' + err.message }));
              }
            });
          },
        },
      },
    },
  }
})
