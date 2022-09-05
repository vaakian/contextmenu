import { type Ref, shallowRef, watch } from 'vue-demi'
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

export const useContextMenu = (menuRef: Ref<HTMLElement | undefined>, options: UseContextMenuOptions = {}) => {
  const instance = shallowRef<ContextMenu>()
  const { hideOnClick = true } = options
  watch(() => unrefElement(menuRef), (el) => {
    if (!el)
      return

    instance.value = createContextMenu(el)
    instance.value.hideOnClick = hideOnClick
  })

  return {
    hide: () => instance.value?.hide?.(),
    show: () => instance.value?.show?.(),
  }
}

function unrefElement(menuRef: Ref<HTMLElement | undefined>) {
  return ((menuRef?.value as any)?.$el ?? menuRef.value) as HTMLElement | undefined
}
