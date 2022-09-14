import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import { subPackagesFolder } from '../meta'
const { version: oldVersion } = fs.readJSONSync('package.json')

const __dirname = /* #__PURE__ */ path.dirname(fileURLToPath(import.meta.url))

execSync('bumpp --no-commit --no-tag --no-push', { stdio: 'inherit' })

const { version } = fs.readJSONSync('package.json')

if (oldVersion === version) {
  console.log('canceled')
  process.exit()
}

async function bumpSubPackages() {
  for (const folder of subPackagesFolder) {
    const packageRoot = path.resolve(__dirname, '..', folder)
    // const packageDist = path.resolve(packageRoot, 'dist')

    const packageJSON = await fs.readJSON(path.join(packageRoot, 'package.json'))

    // for (const key of Object.keys(packageJSON.dependencies || {})) {
    //   if (key.startsWith('@contextmenu/'))
    //     packageJSON.dependencies[key] = version
    // }
    packageJSON.version = version
    await fs.writeJSON(path.join(packageRoot, 'package.json'), packageJSON, { spaces: 2 })
  }
}

async function bump() {
  await bumpSubPackages()
  execSync('git add .', { stdio: 'inherit' })

  execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
  execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
}

bump()

