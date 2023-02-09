import type { StylableElement } from '@contextmenu/shared'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import type { UseContextMenuOptions, UseContextMenuReturn } from '../hook'
import { useContextMenu } from '../hook'

interface ContextMenuCustomProps extends UseContextMenuOptions {
  // custom props to be added
}

// Enable native props like `className` / `style` or any native event
export type ContextMenuProps = React.ComponentProps<'div'> & ContextMenuCustomProps

const ContextMenu = forwardRef<UseContextMenuReturn, ContextMenuProps>((props, ref) => {
  // fix unknown prop warning: https://reactjs.org/warnings/unknown-prop.html
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, onBeforePopup, onVisibleChange, hideOnClick, target, ...wrapperProps } = props
  const menu = useRef<StylableElement>(null)
  const ctx = useContextMenu(menu, props)

  // Will can't directly mutate the forwarded `ref`
  // use `useImperativeHandle` to forward the `ctx` value
  useImperativeHandle<UseContextMenuReturn | null, UseContextMenuReturn | null>(
    ref,
    () => ctx,
    [ctx],
  )

  const _wrapperProps = {
    ...wrapperProps,
    style: {
      ...wrapperProps.style,
      // avoid the menu to be displayed when the page is loaded (flickering)
      display: 'none',
    },
    ref: menu,
  }

  return React.createElement(
    'div',
    _wrapperProps,
    children,
  )
})

ContextMenu.displayName = 'ContextMenu'

export { ContextMenu }
