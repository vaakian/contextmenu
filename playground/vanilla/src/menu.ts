import { MenuGroup, MenuItem, createContextMenu } from '@contextmenu/core'

function initGlobalMenuElement() {
  document.querySelector<HTMLDivElement>('#app')!.append(createElement(`
  <div 
      id="globalMenu" 
      style="display: inline-block; border: 1px solid; color: white; background: blue"
  >
      Menu
  </div>
`))
}

export function setupGlobalMenu() {
  initGlobalMenuElement()
  // const menu = document.getElementById('globalMenu')!

  const nestedMenu = createNestedMenu()
  nestedMenu.element.classList.add('nested-menu')
  const subMenu = createNestedMenu('nested')
  const items = [...nestedMenu.menuItems.values()]

  items[1].setSubMenu(subMenu)

  return createContextMenu(nestedMenu.element)
}

function initTargetMenuElement() {
  document.querySelector<HTMLDivElement>('#app')!.append(createElement(`
    <div>
      <div 
          id="menu" 
          style="display: inline-block; border: 1px solid; color: blue; background: yellow"
      >
          Menu Target
      </div>
      <div id="target" style="width: 100px; height: 100px; background: red;">
      Right Click.
      </div>
    </div>
`))
}

export function setupTargetMenu() {
  initTargetMenuElement()
  const menu = document.getElementById('menu')!
  const target = document.getElementById('target')!
  return createContextMenu(menu, {
    target,
  })
}

const container = /* #__PURE__ */ document.createElement('div')
export function createElement(template: string) {
  container.innerHTML = template
  return container.firstElementChild!
}

function createNestedMenu(prefix = 'item') {
  const menu = new MenuGroup()

  const items = Array.from({ length: 3 }, (_, i) => {
    const item = new MenuItem()
    item.element.append(createElement(`<p>${prefix}-${i}</p>`))
    return item
  })

  menu.add(...items)

  return menu
}
