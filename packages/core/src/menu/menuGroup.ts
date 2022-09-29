import type { MenuItem } from './MenuItem'

export class MenuGroup {
  /**
   * the root wrapper Element
   */
  readonly element: HTMLDivElement = document.createElement('div')
  readonly menuItems: Set<MenuItem>
  constructor(
    initialItems: MenuItem[] = [],
  ) {
    // dedupe
    this.menuItems = new Set(initialItems)
  }

  /**
   * Add MenuItem(s)
   * @param menuItems
   */
  add(...menuItems: MenuItem[]) {
    if (!Array.isArray(menuItems))
      menuItems = [menuItems]
    // store
    menuItems.forEach(item => this.menuItems.add(item))
    // append to the DOM
    this.element.append(...menuItems.map(({ element }) => element))
    // tag
    menuItems.forEach(item => item.parentMenu = this)
  }

  remove(...menuItems: MenuItem[]) {
    menuItems.forEach((item) => {
      if (!this.menuItems.delete(item))
        return

      // remove item from the DOM
      item.element.remove()
      // clean tag
      item.parentMenu = null
    })
  }
}
