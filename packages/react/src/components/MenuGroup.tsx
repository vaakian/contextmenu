import { configureMenuGroup } from '@contextmenu/core'
import React, { useEffect, useRef } from 'react'
export interface MenuGroupProps extends
  React.PropsWithChildren,
  React.ComponentProps<'div'> {
}

export const MenuGroup = (
  { children, ...otherProps }: MenuGroupProps,
) => {
  const groupRef = useRef<HTMLDivElement>(null)

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
}
