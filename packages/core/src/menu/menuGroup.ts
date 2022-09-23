import type { MenuItem } from './MenuItem'

export class MenuGroup {
  /**
   * the root wrapper Element
   */
  element: HTMLDivElement = document.createElement('div')
  constructor(
    public readonly menuItems: MenuItem[] = [],
  ) {
    // make a copy
    this.menuItems = [...menuItems]
  }

  /**
   * Add MenuItem(s)
   * @param menuItems
   */
  add(...menuItems: MenuItem[]) {
    if (!Array.isArray(menuItems))
      menuItems = [menuItems]

    // store
    this.menuItems.push(...menuItems)
    // append to DOM
    this.element.append(...menuItems.map(({ element }) => element))
    // tag
    menuItems.forEach(item => item.parentMenu = this)
  }
}
