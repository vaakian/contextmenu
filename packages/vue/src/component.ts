import { defineComponent, h, reactive, ref } from 'vue-demi'
import type { RenderableComponent } from './types'
import type { UseContextMenuOptions } from '.'
import { useContextMenu } from '.'

export interface ContextMenuProps extends UseContextMenuOptions, RenderableComponent {

}

export const ContextMenu = defineComponent<ContextMenuProps>({
  name: 'ContextMenu',
  props: ['hideOnClick', 'onContextMenu', 'as'] as unknown as undefined,
  setup(props, { slots }) {
    const menuRef = ref<HTMLElement>()

    const data = reactive(useContextMenu(
      menuRef,
      props,
    ))

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: menuRef }, slots.default(data))
    }
  },
})
