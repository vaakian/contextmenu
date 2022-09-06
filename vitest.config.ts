import { defineConfig } from 'vitest/config'
import { subPackageAlias } from './meta'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      // tell vite how to resolve packages like `@contextmenu/core`
      ...subPackageAlias,
    },
  },
})
