import { configureMenuItem } from '@contextmenu/core'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface MenuItemCustomProps {
  // custom props to be added
}

// Enable native props like `className` / `style` or any native event
export type MenuItemProps = React.ComponentProps<'div'> & MenuItemCustomProps

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
