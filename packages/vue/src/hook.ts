import { type Ref, effectScope, onUnmounted, ref, shallowRef, watch } from 'vue-demi'
import type { ContextMenu, ContextMenuOptions } from '@contextmenu/core'
import { createContextMenu } from '@contextmenu/core'
import { noop } from '@contextmenu/shared'
import type { MayBeElementRef, MaybeComputedRef } from './types'
import { resolveUnref } from './types'
import { unrefElement } from './utils'

export interface UseContextMenuOptions extends Omit<ContextMenuOptions, 'target' | 'hideOnClick'> {

  /**
   * Whether to hide it on clicking menu itself.
   *
   * @default true
   */
  hideOnClick?: MaybeComputedRef<boolean>

  /**
   * The target element the menu applies to.
   *
   * @default window
   */
  target?: MayBeElementRef
}

export interface useContextMenuReturn {
  /**
   * Hide the menu
   */
  hide: () => void

  /**
   * Show the menu
   */
  show: () => void

  /**
   * The ContextMenu instance, provides low level accessibility.
   */
  instance: Ref<ContextMenu | undefined>

  /**
   * Indicates whether the menu is visible.
   */
  visible: Ref<boolean>

  /**
   * Indicates whether the menu is enabled.
   */
  enabled: Ref<boolean>

  /**
   * permanently dispose all listeners and effects.
   */
  stop: () => void
}

/**
 * Add custom `ContextMenu` to an element.
 * @param menu
 * @param options
 * @returns
 */
export const useContextMenu = (
  menu: MayBeElementRef,
  options: UseContextMenuOptions = {},
): useContextMenuReturn => {
  const instance = shallowRef<ContextMenu>()
  const visible = ref(false)
  const enabled = ref(true)

  const { target } = options
  let cleanup = noop

  const scope = effectScope()
  scope.run(() => {
    watch(() => [
      unrefElement(menu),
      unrefElement(target),
    ], ([_menu, _target]) => {
      if (!_menu)
        return

      // hasTarget if target ref specified
      // maybe a ref<undefined>, so can't identify it by just `_target`
      const hasTarget = !!target

      // target haven't initialized yet
      if (hasTarget && !_target)
        return

      const hideOnClick = resolveUnref(options.hideOnClick)

      instance.value = createContextMenu(_menu, {
        ...options,
        hideOnClick,
        target: hasTarget ? _target : undefined,
        // spy
        onVisibleChange: (v) => {
          options.onVisibleChange?.(v)
          visible.value = v
        },
      })

      cleanup = () => {
        instance.value?.cleanup()
        cleanup = noop
      }
    })

    watch(() => enabled.value, (enabled) => {
      if (instance.value)
        instance.value.enabled = enabled
    })
  })

  const stop = () => {
    instance.value?.hide()
    scope.stop()
    cleanup()
  }

  onUnmounted(stop)

  return {
    hide: () => instance.value?.hide?.(),
    show: () => instance.value?.show?.(),
    instance,
    visible,
    enabled,
    stop,
  }
}

