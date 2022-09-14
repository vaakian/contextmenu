import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import fs from 'fs-extra'
import { availablePackages } from '../meta'

// bump => commit => build => publish
execSync('pnpm run bump', { stdio: 'inherit' })
execSync('pnpm run build', { stdio: 'inherit' })

let command = 'pnpm publish'
+ ' --access public'
+ ' --no-git-checks'
+ ' --registry https://registry.npmjs.org/'

const { version } = fs.readJSONSync('package.json')
if (version.includes('beta'))
  command += ' --tag beta'

for (const name of availablePackages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name/* , 'dist' */) })
  consola.success(`Published @contextmenu/${name}`)
}
