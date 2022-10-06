import { MenuItem } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import { defineComponent, h, inject, onUnmounted, provide, ref, unref, watch } from 'vue-demi'
import { MenuGroupInjectionKey, MenuItemInjectionKey } from './types'

export default defineComponent<{
  modelValue?: MenuItem | undefined | null
}>({
  setup(props, { slots, emit }) {
    const instance = new MenuItem()
    const itemRef = ref<StylableElement>()

    const parentMenuGroup = inject(MenuGroupInjectionKey)

    watch(
      () => unref(itemRef),
      (el) => {
        if (el) {
          instance.element = el
          if (parentMenuGroup)
            instance.attach(parentMenuGroup)
        }
      },
    )

    // get instance using v-model="instance"
    emit('update:modelValue', instance)
    provide(MenuItemInjectionKey, instance)

    // cleanup
    onUnmounted(() => {
      instance.dispose()
    })

    return () => {
      return h('div', { ...props, ref: itemRef }, slots.default?.())
    }
  },
})
