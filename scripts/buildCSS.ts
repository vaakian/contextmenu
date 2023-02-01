import { fileURLToPath } from 'url'
import path from 'path'
import sass from 'sass'
import fs from 'fs-extra'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const styleList = ['default'] as const

function buildCSS() {
  for (const style of styleList) {
    const file = path.resolve(__dirname, `../packages/core/src/style/${style}.scss`)
    const targetFile = path.resolve(__dirname, `../packages/core/theme/${style}.css`)
    const result = sass.compile(file)
    fs.ensureFileSync(targetFile)
    fs.writeFileSync(targetFile, result.css.toString())
  }
}

buildCSS()
