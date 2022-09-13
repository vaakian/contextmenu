import path from 'path'
import { defineConfig } from 'vite'
import { subPackageAlias } from '../../meta'
// https://vitejs.dev/config/
export default defineConfig({

  resolve: {

    alias: {
      ...subPackageAlias,
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: [
      ...Object.keys(subPackageAlias),
    ],
  },
})
