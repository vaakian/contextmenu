# API


## Type Definition


```typescript
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
```