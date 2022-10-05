import type { Fn, StylableElement } from '@contextmenu/shared'
import { defaultWindow, hideStylableElement, noop, showStylableElement } from '@contextmenu/shared'
import { _addEventListener } from '../eventListener'
import { calculateSubMenuOffset } from '../utils'
import type { MenuGroup } from '.'

export class MenuItem {
  /**
   * The root wrapper Element
   */
  element: StylableElement = document.createElement('div')

  /**
   * The parent menu group
   */
  parentMenu: MenuGroup | null = null

  /**
   * Unregister mouse event listener
   */
  cleanup: Fn = noop

  /**
   * MenuItem
   * @param subMenu
   */
  subMenu: MenuGroup | null = null
  constructor(
    initialSubMenu?: MenuGroup | null,
  ) {
    this.element.style.position = 'relative'

    if (initialSubMenu)
      this.setSubMenu(initialSubMenu)
  }

  /**
   * @internal
   * Initialize trigger events
   *
   * @returns unregister fn
   */
  private registerSubMenu() {
    // cleanup first
    this.cleanup()

    // do nothing if there's no subMenu
    if (!this.subMenu)
      return noop

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const menuItem = this
    const subMenu = this.subMenu
    const subMenuElement = this.subMenu.element

    hideStylableElement(subMenuElement)

    // initialize style
    subMenuElement.style.position = 'fixed'
    // subMenuElement.style.transform = `translateX(${subMenu.offset.left}px, ${subMenu.offset.top}px)`

    const cleanups = [
      _addEventListener(
        this.element,
        'mouseenter',
        () => {
          // 1. determine the position.
          const position = calculateSubMenuOffset(
            menuItem,
            subMenu,
            {
              width: defaultWindow!.innerWidth,
              height: defaultWindow!.innerHeight,
            },
          )
          // 2. set it.
          for (const [key, value] of Object.entries(position))
            subMenuElement.style.setProperty(key, typeof value === 'number' ? `${value}px` : value)

          // 3. show it.
          showStylableElement(subMenuElement)
        },
      ),
      _addEventListener(
        this.element,
        'mouseleave',
        () => hideStylableElement(subMenuElement),
      ),
      _addEventListener(
        this.element,
        'click',
        () => hideStylableElement(subMenuElement),
      ),
    ]
    this.cleanup = () => {
      hideStylableElement(subMenuElement)
      cleanups.forEach(f => f())
      // reset
      this.cleanup = noop
    }
  }

  /**
   * Attach to a MenuGroup
   */
  attach(menu: MenuGroup) {
    menu.add(this)
  }

  /**
   * Detach from current MenuGroup
   */
  detach() {
    this.parentMenu?.remove(this)
  }

  /**
   * Set a new sub menu
   * @param subMenu
   */
  setSubMenu(subMenu: MenuGroup) {
    this.subMenu = subMenu

    // append it to the DOM
    this.element.append(subMenu.element)

    this.registerSubMenu()
  }

  /**
   * Remove existing sub menu
   */
  removeSubMenu() {
    this.cleanup()

    // remove it from the DOM
    this.subMenu?.element.remove()

    this.subMenu = null
  }

  dispose() {
    // dispose sub menu,
    // so that we could cause a chained dispose.
    this.subMenu?.dispose()

    this.removeSubMenu() // remove sub menu
    this.detach() // remove from parent menu
    this.element.remove() // remove from the DOM
  }
}
