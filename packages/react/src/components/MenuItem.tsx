import { configureMenuItem } from '@contextmenu/core'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

export interface MenuItemProps extends
  React.PropsWithChildren,
  // Enable native props like `className` / `style` or any native event
  React.ComponentProps<'div'> {
  // custom props to be added
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((
  { children, ...otherProps },
  ref,
) => {
  const itemRef = useRef<HTMLDivElement>(null)

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => itemRef.current,
    [itemRef.current],
  )

  useEffect(() => {
    const itemElement = itemRef.current

    if (itemElement) {
      const { unregisterMouseEvent } = configureMenuItem(itemElement)
      return unregisterMouseEvent
    }
  }, [itemRef.current])

  return (
    <div {...otherProps} ref={itemRef}>
      {children}
    </div>
  )
})

MenuItem.displayName = 'MenuItem'
