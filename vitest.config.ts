import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import { subPackageAlias } from './meta'

export default defineConfig({
  plugins: [
    react() as PluginOption,
    vue(),
  ],
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
