// TODO: Add test cases
import type { StylableElement } from '@contextmenu/shared'
import type { ContextMenuOptions } from '../contextMenu'
import { createContextMenu } from '../contextMenu'
import { resolveElement } from '../utils'
import { MenuGroup } from './menuGroup'
import { MenuItem } from './menuItem'
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
  const groupInstance = new MenuGroup()
  if (!el)
    return groupInstance

  groupInstance.element = el

  items.forEach(({ el: elOrSelector, subMenu }) => {
    const el = resolveElement<StylableElement>(elOrSelector)
    if (!el)
      return

    const itemInstance = new MenuItem()
    itemInstance.element = el

    if (subMenu)
      itemInstance.setSubMenu(createNestedMenuGroup(subMenu))

    groupInstance.add(itemInstance)
  })

  return groupInstance
}

/**
 * create nested menu that wrapped within ContextMenu.
 * @param descriptor
 * @param options
 * @returns
 */
export function createNestedMenu(descriptor: NestedMenu, options?: ContextMenuOptions) {
  const group = createNestedMenuGroup(descriptor)
  const ctx = createContextMenu(group.element, options)
  ctx.menuGroup = group
  return ctx
}
