import { execSync as exec } from 'child_process'
import consola from 'consola'
import { subPackagesFolder } from '../meta'

function build() {
  for (const folder of subPackagesFolder) {
    consola.info(`building => ${folder}\n`)
    exec(`npx unbuild ${folder}`, { stdio: 'inherit' })
  }
}

build()
