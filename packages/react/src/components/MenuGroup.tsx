import { configureMenuGroup } from '@contextmenu/core'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
export interface MenuGroupProps extends
  React.PropsWithChildren,
  React.ComponentProps<'div'> {
}

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
