import { useEffect, useRef } from 'react'
import type { Ref, RefObject } from 'react'
import { createContextMenu } from '@contextmenu/core'
import type { ContextMenu, ContextMenuOptions } from '@contextmenu/core'
interface UseContextMenuOptions extends Omit<ContextMenuOptions, 'hideOnClick' | 'target'> {
  hideOnClick?: Ref<boolean>
  target?: RefObject<HTMLElement | null >
}
export function useContextMenu(
  menu: RefObject<HTMLElement | null>,
  options: UseContextMenuOptions = {},
) {
  const instance = useRef<ContextMenu>()

  useEffect(() => {
    if (menu.current) {
      instance.current = createContextMenu(menu.current, {
        hideOnClick: undefined,
        target: options.target?.current,
      })
    }
  }, [menu.current])

  return {
    instance,
  }
}

