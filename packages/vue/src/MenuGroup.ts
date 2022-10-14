import { configureMenuGroup } from '@contextmenu/core'
import type { StylableElement } from '@contextmenu/shared'
import { noop } from '@contextmenu/shared'
import { defineComponent, h, onUnmounted, ref, watch } from 'vue-demi'
import { unrefElement } from './utils'

export default defineComponent<{
  // modelValue?: MenuGroup | undefined | null
}>({
  setup(props, { slots }) {
    const targetRef = ref<StylableElement>()

    let cleanup = noop
    watch(
      () => unrefElement(targetRef),
      (el) => {
        cleanup()

        if (el)
          cleanup = configureMenuGroup(el)
      },
    )
    // emit('update:modelValue', instance)

    // // cleanup
    onUnmounted(() => {
      cleanup()
    })

    return () => {
      return h('div', { ...props, ref: targetRef }, slots.default?.())
    }
  },
})
