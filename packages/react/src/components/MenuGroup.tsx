import { configureMenuGroup } from '@contextmenu/core'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface MenuGroupCustomProps {
  // custom props to be added
}

// Enable native props like `className` / `style` or any native event
export type MenuGroupProps = React.ComponentProps<'div'> & MenuGroupCustomProps

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>((
  { children, ...otherProps },
  ref,
) => {
  const groupRef = useRef<HTMLDivElement>(null)

  // forward ref value
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    ref,
    () => groupRef.current,
    [groupRef.current],
  )

  useEffect(() => {
    const groupElement = groupRef.current

    if (groupElement)
      configureMenuGroup(groupElement)
  }, [groupRef.current])

  return (
    <div {...otherProps} ref={groupRef}>
      {children}
    </div>
  )
})

MenuGroup.displayName = 'MenuGroup'
