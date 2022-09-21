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
  parentMenu!: MenuGroup

  /**
   * Unregister mouse event listener
   */
  cleanup: Fn = noop

  /**
   * MenuItem
   * @param subMenu
   */
  constructor(
    public subMenu?: MenuGroup,
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
    const cleanups = [
      _addEventListener(
        subMenuElement,
        'mouseenter',
        () => {
        // 1. determine the position.
        // calculateOffset()
        // 2. show it.
          showStylableElement(subMenuElement)
        },
      ),
      _addEventListener(
        subMenuElement,
        'mouseleave',
        () => hideStylableElement(subMenuElement),
      ),
    ]
    this.cleanup = () => {
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
    this.subMenu = undefined
  }
}
