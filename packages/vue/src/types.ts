import { unref } from 'vue-demi'
import type { ComputedRef, Ref } from 'vue-demi'
export interface RenderableComponent {
  /**
     * The element that the component should be rendered as
     *
     * @default 'div'
     */
  as?: Object | string
}

export type MaybeRef<T> = Ref<T> | T

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>

export type MayBeElementRef<T extends HTMLElement = HTMLElement> = MaybeRef<T | undefined>

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function'
    ? (r as any)()
    : unref(r)
}

