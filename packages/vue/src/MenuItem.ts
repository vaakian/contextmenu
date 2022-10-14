import { configureMenuItem } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import { noop } from '@contextmenu/shared'
import { defineComponent, h, onUnmounted, ref, watch } from 'vue-demi'
import { unrefElement } from './utils'

export default defineComponent<{
  // modelValue?: MenuItem | undefined | null
}>({
  setup(props, { slots }) {
    const itemRef = ref<StylableElement>()

    let cleanup = noop
    watch(
      () => unrefElement(itemRef),
      (el) => {
        cleanup()

        if (el)
          cleanup = configureMenuItem(el).unregisterMouseEvent
      },
    )

    // get instance using v-model="instance"
    // emit('update:modelValue', instance)

    // cleanup
    onUnmounted(() => {
      cleanup()
    })

    return () => {
      return h('div', { ...props, ref: itemRef }, slots.default?.())
    }
  },
})
