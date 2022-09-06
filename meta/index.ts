import path from 'path'

const subPackages = ['core', 'vue', 'angular', 'react', 'web-component']

const generateSubAlias = () => {
  const entries = subPackages.map(key => [
    `@contextmenu/${key}`,
    path.resolve(__dirname, `packages/${key}/index.ts`),
  ])
  return Object.fromEntries(entries)
}

export const subPackageAlias = /* #__PURE__ */ generateSubAlias()
