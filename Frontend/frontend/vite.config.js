import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para habilitar o deshabilitar HMR según entorno y facilitar pruebas con proxies como ZAP
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const disableHmr = env.DISABLE_HMR === 'true'

  return {
    plugins: [react()],
    server: {
      // Si necesitas evitar conflictos de WebSocket con ZAP u otro proxy, ejecuta con DISABLE_HMR=true
      hmr: disableHmr ? false : undefined,
    },
  }
})
