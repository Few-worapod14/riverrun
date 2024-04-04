import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_URL
  console.log('x[=xx', base)
  return defineConfig({
    base: base,
    plugins: [react()],
    server: {
      port: 3000
    },
    preview: {
      port: 8080
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    },
    esbuild: {
      target: 'esnext',
      platform: 'node'
    }
  })
}
