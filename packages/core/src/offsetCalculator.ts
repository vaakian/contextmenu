import type { Size, position } from '@contextmenu/shared'
import type { Offset, OffsetType } from './contextMenu'

export function calculateOffset(mousePosition: position, menuSize: Size, containerSize: Size): Offset {
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
