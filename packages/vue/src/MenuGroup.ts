import type { MenuItem } from '@contextmenu/core'
import { MenuGroup } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import { defineComponent, h, inject, provide, ref, unref, watch } from 'vue-demi'

export default defineComponent({
  setup(props, { slots }) {
    const instance = new MenuGroup()
    const targetRef = ref<StylableElement>()

    const parentItem: MenuItem | undefined = inject('parentMenuItem')

    watch(
      () => unref(targetRef),
      (el) => {
        if (el) {
          instance.element = el

          if (parentItem)
            parentItem.setSubMenu(instance)
        }
      },
    )

    provide('parentMenuGroup', instance)

    return () => {
      return h('div', { ...props, ref: targetRef }, slots.default?.())
    }
  },
})
