import { defineConfig } from 'vitest/config'
import { subPackageAlias } from './meta'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [
      // default
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      // newly added
      '**/v0x_*.{test,spec}.{js,ts}',
    ],
  },
  resolve: {
    alias: {
      // tell vite how to resolve packages like `@contextmenu/core`
      ...subPackageAlias,
    },
  },
})
