import type { ContextMenu } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import type { Directive, Ref, ShallowRef } from 'vue-demi'
import { ref } from 'vue-demi'
import type { UseContextMenuOptions } from './hook'
import { useContextMenu } from './hook'

/** @description element => ContextMenu */
const ctxMap = new WeakMap<StylableElement, ShallowRef<ContextMenu | undefined>>()

/** @description element => ref<element> */
const targetMap = new WeakMap<StylableElement, Ref>()

export interface DirectiveOptions extends Omit<UseContextMenuOptions, 'target'> {
  /**
   * The `target` that the menu applies to
   */
  target: StylableElement | undefined | null
}

export const vContextMenu: Directive<StylableElement, DirectiveOptions | undefined> = {
  mounted(el, { value }) {
    const hookOptions: UseContextMenuOptions = { ...value }
    if (typeof value?.target !== 'undefined') {
      // store the target as a `ref`
      // to update it in `update` hook
      hookOptions.target = ref(value?.target as unknown as undefined)
      targetMap.set(el, hookOptions.target)
    }

    const ctx = useContextMenu(el, hookOptions)

    ctxMap.set(el, ctx.instance)
  },
  updated(el, { value }) {
    const targetRef = targetMap.get(el)
    if (!targetRef)
      return
    // update element ref
    targetRef.value = value?.target
  },
  beforeUnmount(el) {
    ctxMap.get(el)?.value?.cleanup()
  },
}
