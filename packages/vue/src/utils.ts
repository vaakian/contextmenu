import { isRef } from 'vue-demi'
import type { MayBeElementRef } from './types'

export function unrefElement(menuRef: MayBeElementRef) {
  if (isRef(menuRef))
    return ((menuRef?.value as any)?.$el ?? menuRef.value) as HTMLElement | undefined
  return menuRef
}

