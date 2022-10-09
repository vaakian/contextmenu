import { unref } from 'vue-demi'
import type { ComputedRef, InjectionKey, Ref } from 'vue-demi'
import type { StylableElement } from '@contextmenu/shared'
import type { MenuGroupInstance, MenuItemInstance } from '@contextmenu/core'
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

export type MayBeElementRef<T extends Element = StylableElement> = MaybeRef<T | undefined>

export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function'
    ? (r as any)()
    : unref(r)
}

export const MenuItemInjectionKey: InjectionKey<MenuItemInstance> = Symbol('MenuItem')
export const MenuGroupInjectionKey: InjectionKey<MenuGroupInstance> = Symbol('MenuGroup')
