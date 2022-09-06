import type { Size } from '@contextmenu/shared'

export type Subscriber = (size: Size) => void
export type Subscribers = Subscriber | Subscriber[]
export class ElementSizePublisher {
  /**
   * subscribers to notify
   */
  private subscribers = new Set<Subscriber>()

  /**
   * `resize` event handler
   */
  publish = () => {
    this.subscribers.forEach((fn) => {
      fn({
        width: this.el.clientWidth,
        height: this.el.clientHeight,
      })
    })
  }

  constructor(readonly el: HTMLElement, subscribers: Subscribers = []) {
    this.subscribe(subscribers)
    this.register()
  }

  private register() {
    this.el.addEventListener('resize', this.publish, { passive: true })
  }

  unregister() {
    this.el.removeEventListener('resize', this.publish)
  }

  subscribe(subscribers: Subscribers) {
    if (!Array.isArray(subscribers))
      subscribers = [subscribers]
    subscribers.forEach((sub) => {
      this.subscribers.add(sub)
      // publish on initialization
      sub({
        width: this.el.clientWidth,
        height: this.el.clientHeight,
      })
    })
  }

  unsubscribe(subscribers: Subscribers) {
    if (!Array.isArray(subscribers))
      subscribers = [subscribers]
    subscribers.forEach(sub => this.subscribers.delete(sub))
  }
}
// TODO: make a reusable event listener
