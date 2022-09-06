import { type Ref, onUnmounted, shallowRef, watch } from 'vue-demi'
import type { ContextMenu } from '@contextmenu/core'
import { createContextMenu } from '@contextmenu/core'

interface UseContextMenuOptions {
/**
 * Whether to hide it when clicking on itself.
 *
 * @default true
 */
  hideOnClick?: boolean
}

interface useContextMenuReturn {
  /**
   * Hide the menu
   */
  hide: () => void

  /**
   * Show the menu
   */
  show: () => void
  instance: Ref<ContextMenu | undefined>
}

export const useContextMenu = (
  menuRef: Ref<HTMLElement | undefined>,
  options: UseContextMenuOptions = {},
): useContextMenuReturn => {
  const instance = shallowRef<ContextMenu>()
  const { hideOnClick = true } = options
  watch(() => unrefElement(menuRef), (el) => {
    if (!el)
      return

    instance.value = createContextMenu(el)
    instance.value.hideOnClick = hideOnClick
  })

  onUnmounted(() => {
    instance.value?.cleanup()
  })

  return {
    hide: () => instance.value?.hide?.(),
    show: () => instance.value?.show?.(),
    instance,
  }
}

function unrefElement(menuRef: Ref<HTMLElement | undefined>) {
  return ((menuRef?.value as any)?.$el ?? menuRef.value) as HTMLElement | undefined
}
