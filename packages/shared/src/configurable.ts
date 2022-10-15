/**
 * @file configurable global objects
 * @author Anthony Fu
 * @see https://github.com/vueuse/vueuse/blob/main/packages/core/_configurable.ts
 */

export const isClient = typeof window !== 'undefined'

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}

export interface ConfigurableDocument {
  /*
   * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
   */
  document?: Document
}

export interface ConfigurableNavigator {
  /*
   * Specify a custom `navigator` instance, e.g. working with iframes or in testing environments.
   */
  navigator?: Navigator
}

export interface ConfigurableLocation {
  /*
   * Specify a custom `location` instance, e.g. working with iframes or in testing environments.
   */
  location?: Location
}

export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined
export const defaultDocument = /* #__PURE__ */ isClient ? window.document : undefined
export const defaultNavigator = /* #__PURE__ */ isClient ? window.navigator : undefined
export const defaultLocation = /* #__PURE__ */ isClient ? window.location : undefined

export const schedular = /* #__PURE__ */ isClient
  ? defaultWindow!.queueMicrotask || defaultWindow!.setTimeout
  : () => {}
