import { configureMenuItem } from '@contextmenu/core'
import React, { useEffect, useRef } from 'react'

export interface MenuItemProps extends
  React.PropsWithChildren,
  // Enable native props like `className` / `style` or any native event
  React.ComponentProps<'div'> {
  // custom props to be added
}

export const MenuItem = (
  { children, ...otherProps }: MenuItemProps,
) => {
  const itemRef = useRef<HTMLDivElement>(null)

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
}
