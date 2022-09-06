import type { Fn, Position } from '@contextmenu/shared'
import { defaultDocument, defaultWindow, isClient } from '@contextmenu/shared/configurable'
import { _addEventListener } from './eventlistner'
import { calculateOffset } from './utils'

export const key = 'ctxHideOnClick'

export type Bit = '0' | '1'

export type OffsetType = number | string | null

export interface Offset {
  left: OffsetType
  right: OffsetType
  top: OffsetType
  bottom: OffsetType
}

export class ContextMenu {
  cleanup!: Fn
  get hideOnClick() {
    const el = this.menuElement
    if (key in el.dataset)
      return el.dataset[key] === '1'
    el.dataset[key] = '0'

    return false
  }

  set hideOnClick(val: boolean) {
    this.menuElement.dataset.ctxHideOnClick = val ? '1' : '0'
  }

  constructor(
    public readonly menuElement: HTMLElement,
  ) {
    // ssr
    if (!isClient)
      return

    this.initMenuElement()
  }

  private initMenuElement() {
    this.menuElement.dataset[key] = '0'
    this.menuElement.style.setProperty('position', 'fixed')
    this.menuElement.style.setProperty('visibility', 'hidden')

    if (!defaultDocument!.contains(this.menuElement))
      defaultDocument!.body.appendChild(this.menuElement)

    this.register()
  }

  setVisibility(v: 'visible' | 'hidden') {
    this.menuElement.style.setProperty('visibility', v)
  }

  /**
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

    const hide = this.hide.bind(this)

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
      if ((e.target as HTMLElement).dataset[key] === '0')
        e.stopPropagation()
    }

    const contextMenuHandler = (e: MouseEvent) => {
      e.preventDefault()
      updateOffset({
        x: e.clientX,
        y: e.clientY,
      })
      this.show()
    }
    // TODO: updateOffset on `window.resize` / `menu.resize`
    const cleanups = [
      _addEventListener(defaultWindow!, 'contextmenu', contextMenuHandler),
      _addEventListener(defaultWindow!, 'click', hide),
      _addEventListener(defaultWindow!, 'scroll', hide),
      _addEventListener(defaultWindow!, 'blur', hide),
      _addEventListener(this.menuElement, 'click', menuClickHandler),
    ]

    const cleanup = () => cleanups.forEach(fn => fn())
    return this.cleanup = cleanup
  }
}

/**
 * create {@link ContextMenu} instance
 * @param el the menu element
 * @returns
 */
export const createContextMenu = (el: HTMLElement) => new ContextMenu(el)

