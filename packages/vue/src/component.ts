import { defineComponent, h, reactive, ref, toRefs } from 'vue-demi'
import type { StylableElement } from '@contextmenu/shared'
import type { RenderableComponent } from './types'
import type { UseContextMenuOptions } from './hook'
import { useContextMenu } from './hook'

export interface ContextMenuProps extends UseContextMenuOptions, RenderableComponent {

}

export const ContextMenu = defineComponent<ContextMenuProps>({
  name: 'ContextMenu',
  props: ['hideOnClick', 'onContextMenu', 'as', 'target'] as unknown as undefined,
  setup(props, { slots }) {
    const menuRef = ref<StylableElement>()

    // Avoid losing reactive when destructuring in `useContextMenu` hook:
    // because a ref will be a plain value of `props` when passing it to a vue `component`,
    // we should keep it as a `ref` to keep track of it's changes.
    const { target, hideOnClick } = toRefs(props)
    const options = {
      ...props,
      target,
      hideOnClick,
    }

    const data = reactive(useContextMenu(
      menuRef,
      // TODO: type it
      options as unknown as any,
    ))

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: menuRef }, slots.default(data))
    }
  },
})
