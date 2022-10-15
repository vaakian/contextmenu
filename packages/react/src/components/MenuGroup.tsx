import { configureMenuGroup } from '@contextmenu/core'
import React, { useEffect, useRef } from 'react'

export const MenuGroup = (
  { children, ...otherProps }: React.PropsWithChildren,
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
