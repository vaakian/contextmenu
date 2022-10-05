import path from 'path'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import transformerDirective from '@unocss/transformer-directives'
import { subPackageAlias } from '../meta'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Unocss({
      transformers: [
        transformerDirective(),
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],
    }),
  ],
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
