import type { Fn } from '@contextmenu/shared'
import { defaultDocument, defaultWindow, isClient } from './configurable'
import { calculateOffset } from './offsetCalculator'

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
  /**
   * `contextmenu` event handler
   * @param
   */
  private handler = (e: MouseEvent) => {
    e.preventDefault()
    this.patchOffset(calculateOffset(
      { x: e.clientX, y: e.clientY },
      { width: this.menuElement.clientWidth, height: this.menuElement.clientHeight },
      { width: defaultDocument!.documentElement.clientWidth, height: defaultDocument!.documentElement.clientHeight },
    ))

    this.show()
  }

  stop!: Fn

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
    this.stop = this.register()
  }

  private initMenuElement() {
    this.menuElement.dataset[key] = '0'
    this.menuElement.style.setProperty('position', 'fixed')
    this.menuElement.style.setProperty('visibility', 'hidden')

    if (!defaultDocument!.contains(this.menuElement))
      defaultDocument!.body.appendChild(this.menuElement)
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

  private register() {
    const hide = this.hide.bind(this)
    const menuClickHandler = (e: Event) => {
      // hide on click
      if ((e.target as HTMLElement).dataset[key] === '0')
        e.stopPropagation()
    }
    defaultWindow!.addEventListener('contextmenu', this.handler)
    defaultWindow!.addEventListener('click', hide)
    defaultWindow!.addEventListener('scroll', hide)
    this.menuElement.addEventListener('click', menuClickHandler)

    const stop = () => {
      defaultWindow!.removeEventListener('contextmenu', this.handler)
      defaultWindow!.removeEventListener('click', hide)
      defaultWindow!.removeEventListener('scroll', hide)
      this.menuElement.removeEventListener('click', menuClickHandler)
    }
    return stop
  }

  unregister() {
    defaultWindow!.removeEventListener('contextmenu', this.handler)
  }
}

/**
 * create {@link ContextMenu} instance
 * @param el the menu element
 * @returns
 */
export const createContextMenu = (el: HTMLElement) => new ContextMenu(el)

