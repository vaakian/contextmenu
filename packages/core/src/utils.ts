import type { Position, Size } from '@contextmenu/shared'
import type { Offset, OffsetType } from './contextMenu'
import type { MenuGroup } from './menu/menuGroup'
import type { MenuItem } from './menu/MenuItem'

/**
 * Calculate the `position: fixed/absolute` position offset of {@link menuSize}
 * relative to the given {@link containerSize} for the given {@link mousePosition}.
 * @param mousePosition where mouse clicked on
 * @param menuSize menu size
 * @param containerSize container size that contains the menu
 * @returns
 */
export function calculateOffset(
  mousePosition: Position,
  menuSize: Size,
  containerSize: Size,
): Offset {
  let [left, top, right, bottom]: OffsetType[] = [mousePosition.x, mousePosition.y, null, null]

  const overflowX = mousePosition.x + menuSize.width > containerSize.width
  const overflowY = mousePosition.y + menuSize.height > containerSize.height

  if (overflowX)
    [left, right] = [null, containerSize.width - mousePosition.x]

  if (overflowY)
    [top, bottom] = [null, containerSize.height - mousePosition.y]

  return {
    left,
    right,
    top,
    bottom,
  }
}

/**
 * Check position of a sub menu
 * @param itemSize
 * @param menuSize
 * @param containerSize
 */
export function checkPosition(
  menuItem: MenuItem,
  subMenu: MenuGroup,
  containerSize: Size,
) {
  const offset = subMenu.offset
  const itemRect = menuItem.element.getBoundingClientRect()
  const subMenuRect = subMenu.element.getBoundingClientRect()

  const subMenuWidth = subMenuRect.width + offset.left
  const subMenuHeight = subMenuRect.height + offset.top

  // TODO: able to give an custom offset(left, right, top, bottom)
  // if zero(left, right), make a 100% translate for that direction
  let [left, top, right, bottom] = [null, 0, 0, null] as Array<number | null>
  const overflowX = itemRect.right + subMenuWidth > containerSize.width

  const overflowY = itemRect.top + subMenuHeight > containerSize.height

  if (overflowX)
    [left, right] = [0, null]

  if (overflowY)
    // TODO: implement MacOS like vertical positioning
    [top, bottom] = [null, 0]

  return {
    left,
    top,
    right,
    bottom,
  }
}
