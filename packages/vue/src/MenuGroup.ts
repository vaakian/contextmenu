import type { MenuItem } from '@contextmenu/core'
import { MenuGroup } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import type { InjectionKey } from 'vue-demi'
import { defineComponent, h, inject, onUnmounted, provide, ref, unref, watch } from 'vue-demi'
import { MenuItemInjectionKey } from './MenuItem'

export const MenuGroupInjectionKey: InjectionKey<MenuGroup> = Symbol('MenuGroup')

export default defineComponent<{
  modelValue?: MenuGroup | undefined | null
}>({
  setup(props, { slots, emit }) {
    const instance = new MenuGroup()
    const targetRef = ref<StylableElement>()

    const parentItem: MenuItem | undefined = inject(MenuItemInjectionKey)

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
    // get instance using v-model="instance"
    emit('update:modelValue', instance)
    // get instance using inject()
    provide(MenuGroupInjectionKey, instance)

    // cleanup
    onUnmounted(() => {
      instance.dispose()
    })

    return () => {
      return h('div', { ...props, ref: targetRef }, slots.default?.())
    }
  },
})
