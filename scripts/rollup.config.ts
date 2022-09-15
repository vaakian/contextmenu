import fs from 'fs'
import type { Plugin, RollupOptions } from 'rollup'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import meta from '../meta/config'

const keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as unknown as (keyof T)[]
}
const VUE_DEMI_IIFE = fs.readFileSync(require.resolve('vue-demi/lib/index.iife.js'), 'utf-8')
const injectVueDemi: Plugin = {
  name: 'inject-vue-demi',
  renderChunk(code) {
    return `${VUE_DEMI_IIFE};\n;${code}`
  },
}
const externals = [
  // '@contextmenu/shared',
  '@contextmenu/core',
  '@contextmenu/vue',
  '@contextmenu/react',
  'vue-demi',
  'react',
  'vue',
]

/*
Core: core + shared
Vue: vue + core + shared, => duplicate `shared`
we should only bundle shared inside core
*/

const esbuildMinifier = (options: ESBuildOptions) => {
  const { renderChunk } = esbuild(options)
  return {
    name: 'esbuild-minifier',
    renderChunk,
  }
}

const pkgNames = keys(meta.subPackages)
  .filter(name => !(['angular', 'web-component'].includes(name)))

// cjs, esm
const buildOptions: RollupOptions[] = pkgNames
  .map((name) => {
    const { folder, globals, externals } = meta.subPackages[name]

    return {
      input: `${folder}/src/index.ts`,
      output: [
        {
          format: 'esm',
          file: `${folder}/dist/index.mjs`,
          globals,
        },
        {
          format: 'cjs',
          file: `${folder}/dist/index.cjs`,
          globals,
        },
      ],
      external: [
        ...externals,
      ],
      plugins: [
        // typescript transpiler
        esbuild(),
      ],
    }
  })

// iife
const iifeOptions: RollupOptions[] = pkgNames
  .filter(n => meta.subPackages[n].iife.enabled)
  .map((name) => {
    const { folder, iife } = meta.subPackages[name]
    const iifePlugins = name === 'vue' ? [injectVueDemi] : []
    return {
      input: `${folder}/src/index.ts`,
      output: [
        {
          format: 'iife',
          file: `${folder}/dist/index.iife.js`,
          name: iife.name,
          // extend the global variable
          extend: true,
          globals: iife.globals,
          plugins: [
            ...iifePlugins,
          ],
        },
        {
          format: 'iife',
          file: `${folder}/dist/index.iife.min.js`,
          name: iife.name,
          // extend the global variable
          extend: true,
          globals: iife.globals,
          plugins: [
            esbuildMinifier({
              minify: true,
            }),
            ...iifePlugins,
          ],
        },
      ],
      external: [
        ...iife.externals,
      ],
      plugins: [
      // enable when I want dependencies be bundled
        resolve(),

        esbuild(),
      ],
    }
  })

// dts
const dtsOptions: RollupOptions[] = pkgNames.map((name) => {
  const { folder, globals } = meta.subPackages[name]
  return {
    input: `${folder}/src/index.ts`,
    output: {
      file: `${folder}/dist/index.d.ts`,
      format: 'es',
      globals,
    },
    plugins: [
      dts({
        compilerOptions: {
          // vue-demi issue
          // see: https://github.com/unjs/unbuild/blob/65f235fcaf095d6e192ab13e0854e66ab8a8a0e9/src/build.ts#L70
          preserveSymlinks: false,

        },
      }),
    ],
    external: [
      ...externals,
    ],
  }
})

export default [
  ...buildOptions,
  ...iifeOptions,
  ...dtsOptions,
]
