import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import packageJson from './package.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log('env', env);

  return {
    define: {
      __APP_VERSION__: JSON.stringify(packageJson.version),
    },

    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      allowedHosts: ['62f298b8b8e5.ngrok-free.app'],
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_TARGET_SERVER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
