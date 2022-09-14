import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = /* #__PURE__ */ path.dirname(fileURLToPath(import.meta.url))

const subPackages = ['core', 'vue', 'angular', 'shared', 'react', 'web-component']
const pendingPackages = ['angular', 'web-component']

export const availablePackages = /* #__PURE__ */ subPackages.filter(p => !pendingPackages.includes(p))

const generateSubAlias = () => {
  const entries = subPackages.map(key => [
    `@contextmenu/${key}`,
    path.resolve(__dirname, `../packages/${key}/src/index.ts`),
  ])
  return Object.fromEntries(entries)
}

export const subPackageAlias = /* #__PURE__ */ generateSubAlias()
export const subPackagesFolder = /* #__PURE__ */ availablePackages.map(sub => `packages/${sub}`)
