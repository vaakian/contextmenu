import './style.css'
import { setupMenu } from './menu'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div id="menu" style="display: inline-block; border: 1px solid; background: blue">Menu</div>
`

const ctx = setupMenu(document.getElementById('menu')!)

ctx.hideOnClick = true

// debug
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.ctx = ctx
