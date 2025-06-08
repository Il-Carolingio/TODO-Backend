import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase'
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    // Configuración del servidor de desarrollo
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:4000', // Fallback para desarrollo
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // Exponer variables al cliente
    define: {
      'process.env': env
    }
  };
});