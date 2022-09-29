import type { Fn } from '@contextmenu/shared'
import { hideStylableElement, noop, showStylableElement } from '@contextmenu/shared'
import { _addEventListener } from '../eventListener'
import type { MenuGroup } from './MenuGroup'

export class MenuItem {
  /**
   * The root wrapper Element
   */
  readonly element: HTMLDivElement = document.createElement('div')

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
  constructor(
    public subMenu: MenuGroup | null = null,
  ) {
    this.registerSubMenu()
  }

  /**
   * Initialize trigger events
   * @returns unregister fn
   */
  registerSubMenu() {
    // cleanup first
    this.cleanup()

    // do nothing if there's no subMenu
    if (!this.subMenu)
      return noop

    const subMenuElement = this.subMenu.element

    hideStylableElement(subMenuElement)

    const cleanups = [
      _addEventListener(
        this.element,
        'mouseenter',
        () => {
        // 1. determine the position.
        // calculateOffset()
        // 2. show it.
          showStylableElement(subMenuElement)
        },
      ),
      _addEventListener(
        this.element,
        'mouseleave',
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
    // TODO
  }

  /**
   * Set a new sub menu
   * @param subMenu
   */
  setSubMenu(subMenu: MenuGroup) {
    this.subMenu = subMenu
    this.registerSubMenu()
  }

  /**
   * Remove existing sub menu
   */
  removeSubMenu() {
    this.cleanup()
    this.subMenu = null
  }
}
