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
  const args = [event, listener, options] as const

  if (typeof options === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    args.pop()
  }

  target.addEventListener(...args)
  return () => {
    target.removeEventListener(...args)
  }
}
