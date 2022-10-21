import type { Ref } from 'vue-demi'
import { defineComponent, h, reactive, ref, toRef } from 'vue-demi'
import type { StylableElement } from '@contextmenu/shared'
import type { ContextMenuInstance } from '@contextmenu/core'
import type { RenderableComponent } from '../types'
import type { UseContextMenuOptions } from '../hook'
import { useContextMenu } from '../hook'

export interface ContextMenuProps extends UseContextMenuOptions, RenderableComponent {
  modelValue?: ContextMenuInstance | null | undefined
}

export default defineComponent<ContextMenuProps>({
  name: 'ContextMenu',
  props: ['hideOnClick', 'onBeforePopup', 'as', 'target'] as unknown as undefined,
  setup(props, { slots }) {
    const menuRef = ref<StylableElement>()

    // Avoid losing reactive when destructuring in `useContextMenu` hook:
    // because a ref will be a plain value of `props` when passing it to a vue `component`,
    // we should keep it as a `ref` to keep track of it's changes.
    // TODO: fix still ref when not provided
    const options = propsToRefs(props, ['target', 'hideOnClick'])

    const data = reactive(useContextMenu(
      menuRef,
      options,
    ))

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: menuRef }, slots.default(data))
    }
  },
})

// type RefKeys<T extends object> = keyof {
//   [K in keyof T as T[K] extends MaybeRef<any> ? K : never]: T[K]
// }

/**
 * Partially make data in props as a ref
 * @param props
 * @param keys
 * @returns
 */
function propsToRefs<T extends object>(props: T, keys: (keyof T)[]) {
  // return props
  const refs: {
    [K in keyof T]: Ref<T[K]>
  } = {} as unknown as any

  for (const key of keys) {
    if (typeof props[key] !== 'undefined')
      refs[key] = toRef(props, key)
  }

  return {
    ...props,
    ...refs,
  }
}
