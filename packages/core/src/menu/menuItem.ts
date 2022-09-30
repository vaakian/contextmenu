import type { Fn } from '@contextmenu/shared'
import { defaultWindow, hideStylableElement, noop, showStylableElement } from '@contextmenu/shared'
import { _addEventListener } from '../eventListener'
import { checkPosition } from '../utils'
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

    const subMenuElement = this.subMenu.element

    hideStylableElement(subMenuElement)

    // initialize style
    subMenuElement.style.position = 'absolute'

    const cleanups = [
      _addEventListener(
        this.element,
        'mouseenter',
        () => {
          // 1. determine the position.
          const position = checkPosition(
            this.element.getBoundingClientRect(),
            // TODO: display none doesn't work properly.
            subMenuElement.getBoundingClientRect(),
            {
              width: defaultWindow!.innerWidth,
              height: defaultWindow!.innerHeight,
            },
          )
          // 2. set it.
          for (const [key, value] of Object.entries(position)) {
            subMenuElement.style.setProperty(key, typeof value === 'number' ? `${value}px` : value)
            if (value === 0 && ['left', 'right'].includes(key)) {
              const directions = {
                left: 'translateX(-100%)',
                right: 'translateX(100%)',
                bottom: '',
                top: '',
              } as const
              subMenuElement.style.setProperty('transform', directions[key as 'left'])
            }
          }

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
}
