// TODO: Add test cases
import type { StylableElement } from '@contextmenu/shared'
import { schedular } from '@contextmenu/shared'
import type { ContextMenuOptions } from '../contextMenu'
import { createContextMenu } from '../contextMenu'
import { resolveElement } from '../utils'
import { configureMenuGroup } from './menuGroup'
import { configureMenuItem } from './menuItem'
export type NestedMenuElement = string | StylableElement

export interface MenuItemDescriptor {
  el: NestedMenuElement
  subMenu?: NestedMenuDescriptor
}
export interface NestedMenuDescriptor {
  el: NestedMenuElement
  items?: MenuItemDescriptor[]
}

/**
 * create nested menu using {@link descriptor}, should be wrapped within {@link ContextMenu}.
 *
 * @internal
 * @param descriptor
 * @returns
 */
export function createNestedMenuGroup(descriptor: NestedMenuDescriptor) {
  const { el: elOrSelector, items = [] } = descriptor
  const groupElement = resolveElement<StylableElement>(elOrSelector)

  if (!groupElement) {
    // TODO: give a warning in dev mode
    return groupElement
  }

  configureMenuGroup(groupElement)

  // run at next render,
  // so that `configureMenuItem` can access the configured `MenuGroup` correctly.
  schedular(() => {
    items.forEach((item) => {
      const itemElement = resolveElement<StylableElement>(item.el)
      if (!itemElement) {
        // TODO: give a warning in dev mode
        return
      }

      configureMenuItem(itemElement)

      if (item.subMenu) {
        const subMenuElement = createNestedMenuGroup(item.subMenu)
        // append if not inside it
        if (!subMenuElement) {
        // TODO: give a warning in dev mode
          return
        }

        itemElement.append(subMenuElement)
      }
    })
  })

  return groupElement
}

/**
 * create nested menu that wrapped within ContextMenu.
 * @param descriptor
 * @param options
 * @returns
 */
export function createNestedMenu(descriptor: NestedMenuDescriptor, options?: ContextMenuOptions) {
  let rootGroupElement = createNestedMenuGroup(descriptor)

  if (!rootGroupElement) {
    // fallback empty element
    rootGroupElement = document.createElement('div')
  }

  return createContextMenu(rootGroupElement, options)
}
