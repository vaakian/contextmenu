import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { subPackageAlias } from '../../meta'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...subPackageAlias,
    },
  },
  optimizeDeps: {
    exclude: [
      ...Object.keys(subPackageAlias),
    ],
  },
})
