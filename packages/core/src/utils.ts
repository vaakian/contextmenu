import type { Position, Size } from '@contextmenu/shared'
import type { Offset, OffsetType } from './contextMenu'
// import type { MenuGroup, MenuItem } from './menu'

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
  specifiedOverflow?: {
    overflowX: boolean
    overflowY: boolean
  },
): Offset & {
    overflowX: boolean
    overflowY: boolean
  } {
  let [left, top, right, bottom]: OffsetType[] = [mousePosition.x, mousePosition.y, null, null]

  const { overflowX, overflowY } = specifiedOverflow ?? checkOverflow(mousePosition, menuSize, containerSize)

  if (overflowX)
    [left, right] = [null, containerSize.width - mousePosition.x]

  if (overflowY)
    [top, bottom] = [null, containerSize.height - mousePosition.y]

  return {
    left,
    right,
    top,
    bottom,
    overflowX,
    overflowY,
  }
}

function checkOverflow(mousePosition: Position, menuSize: Size, containerSize: Size) {
  const overflowX = mousePosition.x + menuSize.width > containerSize.width
  const overflowY = mousePosition.y + menuSize.height > containerSize.height
  return { overflowX, overflowY }
}

interface ContainElement {
  element: Element
}

/**
 * Determine the position of a sub menu
 * @param menuItem
 * @param subMenu
 * @param containerSize
 */
export function calculateSubMenuOffset(
  menuItem: ContainElement,
  subMenu: ContainElement,
  containerSize: Size,
) {
  const itemRect = menuItem.element.getBoundingClientRect()
  const subMenuRect = subMenu.element.getBoundingClientRect()

  const mousePosition: Position = {
    y: itemRect.top,
    x: itemRect.right,
  }

  const { overflowX, overflowY } = checkOverflow(
    mousePosition,
    subMenuRect,
    containerSize,
  )

  // mousePosition `x` should be `left` if horizontally overflows.
  if (overflowX)
    mousePosition.x = itemRect.left

  // mousePosition `y` should be at the bottom
  // of the container if vertically overflows.
  if (overflowY)
    mousePosition.y = containerSize.height

  return calculateOffset(
    mousePosition,
    subMenuRect,
    containerSize,
    // change of the mousePosition may cause it recover from overflow
    // so specify it manually
    { overflowX, overflowY },
  )
}

export function resolveElement<T extends Element>(el: string | T) {
  if (typeof el === 'string')
    return document.querySelector(el) as T
  return el
}
