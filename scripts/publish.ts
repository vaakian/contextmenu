import { execSync } from 'child_process'
import path from 'path'
import consola from 'consola'
import { version } from '../package.json'
import { availablePackages } from '../meta'

// bump => commit => build => publish
execSync('pnpm run bump', { stdio: 'inherit' })
execSync('pnpm run build', { stdio: 'inherit' })

let command = 'pnpm publish'
+ ' --access public'
+ ' --no-git-checks'
+ ' --registry https://registry.npmjs.org/'

if (version.includes('beta'))
  command += ' --tag beta'

for (const name of availablePackages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name/* , 'dist' */) })
  consola.success(`Published @contextmenu/${name}`)
}
