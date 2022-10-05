import type { MenuGroup } from '@contextmenu/core'
import { MenuItem } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import { defineComponent, h, inject, provide, ref, unref, watch } from 'vue-demi'

export default defineComponent({
  setup(props, { slots }) {
    const instance = new MenuItem()
    const itemRef = ref<StylableElement>()

    const parentMenuGroup: MenuGroup = inject('parentMenuGroup')!

    watch(
      () => unref(itemRef),
      (el) => {
        if (el) {
          instance.element = el
          instance.attach(parentMenuGroup)
        }
      },
    )

    provide('parentMenuItem', instance)

    return () => {
      return h('div', { ...props, ref: itemRef }, slots.default?.())
    }
  },
})
