import type { StylableElement } from '@contextmenu/shared'
import { isRef } from 'vue-demi'
import type { MayBeElementRef } from './types'

export function unrefElement(menuRef: MayBeElementRef) {
  if (isRef(menuRef))
    return ((menuRef?.value as any)?.$el ?? menuRef.value) as StylableElement | undefined
  return menuRef
}

