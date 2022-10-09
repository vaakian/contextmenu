import type { ContextMenu } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import { isStylableElement } from '@contextmenu/shared'
import type { Directive } from 'vue-demi'
import { watch } from 'vue-demi'
import type { UseContextMenuOptions } from './hook'
import { useContextMenu } from './hook'
import type { MayBeElementRef } from './types'

/** @description element => ContextMenu */
const ctxMap = new WeakMap<StylableElement, ContextMenu>()

export interface DirectiveOptions extends Omit<UseContextMenuOptions, 'target'> {
  /**
   * The `target` that the menu applies to
   * because the limitation of Vue directives,
   * you have to provide a function that returns the `target`.
   */
  target: () => MayBeElementRef
}

export const vContextMenu: Directive<StylableElement, DirectiveOptions | undefined> = {
  mounted(el, { value: options }) {
    if (!isStylableElement(el)) {
      console.warn('unable to apply context menu on an un-stylable element')
      return
    }

    const hookOptions = options
      ? {
          ...options,
          target: options.target(),
        }
      : undefined

    const { instance } = useContextMenu(el, hookOptions)
    watch(
      () => instance.value,
      (ctx) => {
        if (ctx)
          ctxMap.set(el, ctx)
      },
    )
  },
  unmounted(el) {
    ctxMap.get(el)?.cleanup()
  },
}
