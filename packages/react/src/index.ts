import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { createContextMenu } from '@contextmenu/core'
import type { ContextMenu, ContextMenuOptions } from '@contextmenu/core'
export type MaybeRef<T> = RefObject<T> | T

function isRef<T>(b: MaybeRef<T>): b is RefObject<T> {
  return typeof b === 'object' && b !== null && 'current' in b
}

function resolveUnref<T>(v: MaybeRef<T>): T | undefined | null {
  if (isRef(v))
    return v.current
  return v
}
export interface UseContextMenuOptions extends Omit<ContextMenuOptions, 'hideOnClick' | 'target'> {
  hideOnClick?: MaybeRef<boolean>
  target?: RefObject<HTMLElement | null >
}

export function useContextMenu(
  menu: RefObject<HTMLElement | null>,
  options: UseContextMenuOptions = {},
) {
  const [enabled, setEnabled] = useState(true)
  const [visible, setVisible] = useState(false)
  const instance = useRef<ContextMenu>()

  // memoized callback
  const hide = useCallback(() => {
    instance.current?.hide()
  }, [instance.current])
  const show = useCallback(() => {
    instance.current?.show()
  }, [instance.current])

  // initialize contextMenu instance
  useEffect(() => {
    // menu haven't initialized yet
    if (!menu.current)
      return

    const hasTarget = !!options.target
    // target haven't initialized yet
    if (hasTarget && !options.target?.current)
      return

    const hideOnClick = resolveUnref(options.hideOnClick) ?? undefined
    const target = options.target?.current

    instance.current = createContextMenu(menu.current, {
      ...options,
      hideOnClick,
      target,
      onVisibleChange(v) {
        // spy
        options.onVisibleChange?.(v)
        setVisible(v)
      },
    })
    // effect was called twice during dev mode,
    // this helped me find forgotten cleanups return!
    return () => instance.current?.cleanup()
  }, [menu.current, options.target?.current])

  // TODO: anything inside options changes, update it into instance.
  // sync enabled state
  useEffect(() => {
    if (instance.current)
      instance.current.enabled = enabled
  }, [enabled])

  // sync visible state
  useEffect(() => {
    (visible ? show : hide)()
  }, [visible])

  // sync hideOnClick state
  useEffect(() => {
    hide()
    if (instance.current)
      instance.current.options.hideOnClick = !!resolveUnref(options.hideOnClick)
  }, [resolveUnref(options.hideOnClick)])

  return {
    visible,
    enabled,
    instance,

    hide,
    show,
    setEnabled,
  }
}

