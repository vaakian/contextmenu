import type { Fn, Position, StylableElement } from '@contextmenu/shared'
import { defaultDocument, defaultWindow, isClient, isStylableElement } from '@contextmenu/shared'
import { _addEventListener } from './eventListener'
import { calculateOffset } from './utils'

export type OffsetType = number | string | null

export interface Offset {
  left: OffsetType
  right: OffsetType
  top: OffsetType
  bottom: OffsetType
}

export interface ContextMenuOptions {
  /**
   * Could be useful to detect the exact element the client is clicking on.
   *
   * @param e the MouseEvent of 'contextmenu' event
   * @returns `true` to cancel the menu from showing up
   */
  onContextMenu?(e: MouseEvent): boolean | void

  /**
   * Fires when visibility of the menu changes.
   * @param visible
   */
  onVisibleChange?(visible: boolean): void

  /**
   * Indicates whether to hide it when clicking on itself.
   *
   * @default true
   */

  hideOnClick?: boolean

  /**
   *
   */
  target?: EventTarget | null
}

export class ContextMenu {
  cleanup!: Fn

  /**
   * Set to enable/disable the current contextMenu
   */
  enabled = true

  public readonly menuElement!: StylableElement
  public readonly targetElement!: EventTarget
  constructor(
    menu: StylableElement | string,
    public readonly options: ContextMenuOptions = {},
  ) {
    // ssr
    if (!isClient)
      return

    const { target = defaultWindow } = options

    const targetElement = typeof target === 'string' ? document.querySelector(target) : target
    this.targetElement = targetElement!

    const menuElement = typeof menu === 'string' ? document.querySelector(menu) : menu
    if (menuElement && isStylableElement(menuElement))
      this.menuElement = menuElement

    options.hideOnClick = options.hideOnClick ?? true

    this.initMenuElement()
  }

  private initMenuElement() {
    this.menuElement.style.setProperty('position', 'fixed')
    this.menuElement.style.setProperty('visibility', 'hidden')

    if (!defaultDocument!.contains(this.menuElement))
      defaultDocument!.body.appendChild(this.menuElement)

    this.register()
  }

  setVisibility(v: 'visible' | 'hidden') {
    const previousVisibility = this.menuElement.style.getPropertyValue('visibility')
    if (previousVisibility !== v) {
      this.options.onVisibleChange?.(v === 'visible')
      this.menuElement.style.setProperty('visibility', v)
    }
  }

  /**
   * @internal
   *
   * Patches only given property and keep the rest
   *
   * @param offset
   */
  patchOffset(offset: Partial<Offset>) {
    for (const [key, value] of Object.entries(offset))
      this.menuElement.style.setProperty(key, value === null ? null : `${value}px`)
  }

  /**
   * Hide the menu
   */
  hide() {
    this.setVisibility('hidden')
  }

  /**
   * Show the menu
   */
  show() {
    this.setVisibility('visible')
  }

  /**
   * Register event listeners
   * @returns
   */
  private register() {
    if (!(defaultWindow && this.menuElement))
      return

    const hide = () => this.hide()

    const updateOffset = (mousePosition: Position) => {
      const menuSize = {
        width: this.menuElement.clientWidth,
        height: this.menuElement.clientHeight,
      }
      const windowSize = {
        width: defaultDocument!.documentElement.clientWidth,
        height: defaultDocument!.documentElement.clientHeight,
      }
      const offset = calculateOffset(
        mousePosition,
        menuSize,
        windowSize,
      )
      this.patchOffset(offset)
    }

    const menuClickHandler = (e: Event) => {
      // hide on click
      if (!this.options.hideOnClick)
        e.stopPropagation()
    }

    const contextMenuHandler = (e: MouseEvent) => {
      if (!this.enabled)
        return

      if (this.options?.onContextMenu?.(e))
        return

      e.preventDefault()
      updateOffset({
        x: e.clientX,
        y: e.clientY,
      })
      this.show()
      e.stopPropagation()
    }

    const cleanups = [
      _addEventListener(this.targetElement, 'contextmenu', contextMenuHandler),
      _addEventListener(defaultWindow!, 'contextmenu', hide, { capture: true }),
      _addEventListener(defaultWindow!, 'click', hide),
      _addEventListener(defaultWindow!, 'scroll', hide),
      _addEventListener(defaultWindow!, 'blur', hide),
      _addEventListener(defaultWindow!, 'resize', hide),
      _addEventListener(this.menuElement, 'click', menuClickHandler),
      _addEventListener(this.menuElement, 'contextmenu', (e) => {
        // no action on right clicking on itself.
        e.preventDefault()
        e.stopPropagation()
      }),
    ]

    const cleanup = () => cleanups.forEach(fn => fn())
    return this.cleanup = cleanup
  }
}

/**
 * create {@link ContextMenu} instance
 */
export const createContextMenu = (
  ...args: ConstructorParameters<typeof ContextMenu>
) => {
  return new ContextMenu(...args)
}

