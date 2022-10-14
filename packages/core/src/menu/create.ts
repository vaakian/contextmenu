// TODO: Add test cases
import type { StylableElement } from '@contextmenu/shared'
import type { ContextMenuOptions } from '../contextMenu'
import { createContextMenu } from '../contextMenu'
import { resolveElement } from '../utils'
import { configureMenuGroup } from './menuGroup'
import { configureMenuItem } from './menuItem'
export type NestedMenuElement = string | StylableElement

export interface NestedMenu {
  el: NestedMenuElement
  items?: {
    el: NestedMenuElement
    subMenu?: NestedMenu
  }[]
}

/**
 * create nested menu using {@link descriptor}, should be wrapped within {@link ContextMenu}.
 *
 * @internal
 * @param descriptor
 * @returns
 */
export function createNestedMenuGroup(descriptor: NestedMenu) {
  const { el: elOrSelector, items = [] } = descriptor
  const el = resolveElement<StylableElement>(elOrSelector)

  configureMenuGroup(el)

  // run at next render,
  // so that `configureMenuItem` can access the configured `MenuGroup` correctly.
  queueMicrotask(() => {
    items.forEach((item) => {
      const itemElement = resolveElement<StylableElement>(item.el)
      configureMenuItem(itemElement)

      if (item.subMenu) {
        const subMenuElement = createNestedMenuGroup(item.subMenu)
        // append if not inside it
        itemElement.append(subMenuElement)
      }
    })
  })

  return el
}

/**
 * create nested menu that wrapped within ContextMenu.
 * @param descriptor
 * @param options
 * @returns
 */
export function createNestedMenu(descriptor: NestedMenu, options?: ContextMenuOptions) {
  const rootGroupElement = createNestedMenuGroup(descriptor)
  return createContextMenu(rootGroupElement, options)
}
