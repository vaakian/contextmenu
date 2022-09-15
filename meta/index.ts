import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const subPackageNames = ['core', 'vue', 'angular', 'shared', 'react', 'web-component'] as const
export const pendingPackages = ['angular', 'web-component']
export const iifePackages = ['core', 'vue', 'react', 'shared']

export const availablePackages = subPackageNames.filter(p => !pendingPackages.includes(p))

const generateSubAlias = () => {
  const entries = subPackageNames.map(key => [
    `@contextmenu/${key}`,
    path.resolve(__dirname, `../packages/${key}/src/index.ts`),
  ])
  return Object.fromEntries(entries)
}

export const subPackageAlias = generateSubAlias()
export const subPackagesFolder = availablePackages.map(sub => `packages/${sub}`)

