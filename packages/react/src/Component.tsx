import React, { useRef } from 'react'
import type { UseContextMenuOptions } from '.'
import { useContextMenu } from '.'

interface IContextMenuProps extends UseContextMenuOptions {
  /**
   * The root element tag as a warper.
   */
  as?: string

  /**
   * The menu element.
   */
  children: React.ReactNode
}

const ContextMenu = (props: IContextMenuProps) => {
  const { as, children } = props
  const menu = useRef<HTMLElement>(null)
  const ctx = useContextMenu(menu, props)
  return React.createElement(as || 'div', { ref: menu }, children)
}

export { ContextMenu }
