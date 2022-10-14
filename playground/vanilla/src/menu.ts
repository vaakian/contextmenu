import { /* createContextMenu, */ createNestedMenu } from '@contextmenu/core'
import { initNestedMenuElement, initTargetMenuElement } from './initElement'

export function setupTargetMenu() {
  initTargetMenuElement()

  const menu = document.getElementById('menu')!
  const target = document.getElementById('target')!

  return createNestedMenu({
    el: menu,
  }, {
    target,
  })
  // return createContextMenu(menu, {
  //   target,
  // })
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
