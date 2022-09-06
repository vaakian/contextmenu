import type { Position, Size } from '@contextmenu/shared'
import type { Offset, OffsetType } from './contextMenu'

/**
 * Calculate the `position: fixed/absolute` position offset of {@link menuSize}
 * relative to the given {@link containerSize} for the given {@link mousePosition}.
 * @param mousePosition where mouse clicked on
 * @param menuSize menu size
 * @param containerSize container size that contains the menu
 * @returns
 */
export function calculateOffset(mousePosition: Position, menuSize: Size, containerSize: Size): Offset {
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
