import { configureMenuItem } from '@contextmenu/core'
import React, { useEffect, useRef } from 'react'

export const MenuItem = (props: React.PropsWithChildren) => {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const itemElement = itemRef.current

    if (itemElement) {
      const { unregisterMouseEvent } = configureMenuItem(itemElement)
      return unregisterMouseEvent
    }
  }, [itemRef.current])

  return (
    <div {...props} ref={itemRef}>
      {props.children}
    </div>
  )
}
