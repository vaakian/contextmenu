import type { StylableElement } from '@contextmenu/shared'
import type { MenuItem } from '.'

export interface SubMenuOffset {
  left: number
  top: number
}
export interface MenuGroupOptions {
  /**
   * Offset(left, top) to the parentMenu
   */
  offset?: Partial<SubMenuOffset>
}

export class MenuGroup {
  /**
   * The root wrapper Element
   */
  element: StylableElement = document.createElement('div')

  /**
   * Current menuItems
   */
  readonly menuItems: Set<MenuItem>

  /**
   * The Offset(left, top) to the parentMenu
   */
  readonly offset: SubMenuOffset

  /**
   * Parent menu item
   */
  parentMenuItem?: MenuItem
  constructor(
    initialItems: MenuItem[] = [],
    options: MenuGroupOptions = {},
  ) {
    this.offset = mergeDefaultOffset(options.offset)
    // dedupe
    this.menuItems = new Set(initialItems)
  }

  /**
   * Add MenuItem(s)
   *
   * @param menuItems
   */
  add(...menuItems: MenuItem[]) {
    if (!Array.isArray(menuItems))
      menuItems = [menuItems]

    menuItems.forEach((item) => {
      // 1. store
      this.menuItems.add(item)
      // 2. append to the DOM
      this.element.append(item.element)
      // 3. tag
      item.parentMenu = this
    })
  }

  /**
   * Remove menuItem(s)
   *
   * @param menuItems
   */
  remove(...menuItems: MenuItem[]) {
    menuItems.forEach((item) => {
      // 1. delete
      if (!this.menuItems.delete(item))
        return

      // 2. remove item from the DOM
      item.element.remove()
      // 3. clean tag
      item.parentMenu = null
    })
  }

  dispose() {
    this.menuItems.forEach(item => item.dispose())
    this.menuItems.clear()
    this.element.remove()
    // same as `detach` in menuItem
    this.parentMenuItem?.removeSubMenu()
  }
}

function mergeDefaultOffset(offset: Partial<SubMenuOffset> = {}) {
  const {
    left = 0,
    top = 0,
  } = offset

  return {
    left,
    top,
  }
}
export type MenuGroupInstance = InstanceType<typeof MenuGroup>
