import type { Fn, StylableElement } from '@contextmenu/shared'
import { defaultWindow, isClient, noop } from '@contextmenu/shared'
import { _addEventListener } from '../eventListener'
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
  private _element: StylableElement = document.createElement('div')
  /**
   * The root wrapper Element
   */
  get element() {
    return this._element
  }

  set element(el) {
    this._element = el
    this.register()
  }

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

  /**
   * Unregister all event listeners
   */
  cleanup: Fn = noop

  /**
   * Menu group
   * @param initialItems
   * @param options
   */
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

    this.cleanup()
  }

  /**
   * @internal
   * @returns
   */
  register() {
    if (!isClient)
      return

    const hide = () => {
      // only hide it when it's a sub menu
      if (this.parentMenuItem)
        this.element.style.visibility = 'hidden'
    }
    const unregister = _addEventListener(defaultWindow!, 'scroll', hide)
    this.cleanup = () => {
      unregister()
      this.cleanup = noop
    }
    return unregister
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
