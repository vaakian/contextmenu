import type { Fn } from '@contextmenu/shared'

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any
  removeEventListener(event: Events, fn?: any, options?: any): any
}

export interface GeneralEventListener<E = Event> {
  (evt: E): void
}

export function _addEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

export function _addEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions,
): Fn

export function _addEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions,
): Fn {
  target.addEventListener(event, listener, options)
  return () => {
    target.removeEventListener(event, listener, options)
  }
}
