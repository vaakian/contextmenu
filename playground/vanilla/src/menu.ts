import { MenuGroup, MenuItem, createContextMenu, createNestedMenu } from '@contextmenu/core'

// function initGlobalMenuElement() {
//   document.querySelector<HTMLDivElement>('#app')!.append(createElement(`
//   <div
//       id="globalMenu"
//       style="display: inline-block; border: 1px solid; color: white; background: blue"
//   >
//       Menu
//   </div>
// `))
// }

export function setupGlobalMenu() {
  // initGlobalMenuElement()
  // const menu = document.getElementById('globalMenu')!

  const nestedMenu = _createNestedMenu()
  nestedMenu.element.classList.add('nested-menu')
  const subMenu = _createNestedMenu('nested')
  subMenu.element.classList.add('nested-menu')
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

function _createNestedMenu(prefix = 'item') {
  const menu = new MenuGroup(undefined, {
    offset: {
      left: 20,
      top: 20,
    },
  })

  const items = Array.from({ length: 3 }, (_, i) => {
    const item = new MenuItem()
    item.element.append(createElement(`<p>${prefix}-${i}</p>`))
    return item
  })

  menu.add(...items)

  return menu
}

function initNestedMenuElement() {
  document.querySelector<HTMLDivElement>('#app')!.append(createElement(`
    <div>
      <div id="group">
        <div id="item1">item1</div>
        <div id="item2">item2</div>
        <div id="item3">
          item3
          <div id="group_1">
          Hello
          </div>
        </div>
      </div>
    </div>
`))
}

export function setupNestedMenu() {
  initNestedMenuElement()

  const subMenu1 = document.createElement('div')
  subMenu1.innerHTML = '<li>OK!</li><li>OK!</li><li>OK!</li>'
  subMenu1.id = 'group_2'

  return createNestedMenu({
    el: '#group',
    items: [
      { el: '#item1' },
      { el: '#item2', subMenu: { el: subMenu1 } },
      { el: '#item3', subMenu: { el: '#group_1' } },
    ],
  })
}
