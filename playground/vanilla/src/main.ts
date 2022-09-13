import './style.css'
import { setupGlobalMenu, setupTargetMenu } from './menu'

const ctxGlobal = setupGlobalMenu()
const ctxTarget = setupTargetMenu()

// debug
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.ctx = ctxGlobal
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.ctxTarget = ctxTarget
