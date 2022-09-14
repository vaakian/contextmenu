import React, { useRef } from 'react'
import type { UseContextMenuOptions } from '.'
import { useContextMenu } from '.'

interface IContextMenuProps extends UseContextMenuOptions {
  as?: string
  children: React.ReactNode
}

const ContextMenu = (props: IContextMenuProps) => {
  const { as, children } = props
  const menu = useRef<HTMLElement>(null)
  const ctx = useContextMenu(menu)
  return React.createElement(as || 'div', { ref: menu }, children)
}

export { ContextMenu }
