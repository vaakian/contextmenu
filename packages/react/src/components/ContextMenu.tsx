import type { StylableElement } from '@contextmenu/shared'
import React, { useRef } from 'react'
import type { UseContextMenuOptions } from '../hook'
import { useContextMenu } from '../hook'

interface IContextMenuProps
  extends UseContextMenuOptions,
  React.PropsWithChildren,
  React.ComponentProps<'div'> {
}

const ContextMenu = (props: IContextMenuProps) => {
  const { children } = props
  const menu = useRef<StylableElement>(null)
  /* const ctx =  */useContextMenu(menu, props)
  return React.createElement(
    'div',
    {
      ...props,
      ref: menu,
    },
    children,
  )
}

export { ContextMenu }
