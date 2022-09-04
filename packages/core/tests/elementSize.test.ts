import { ElementSizeObserver } from '../src'

describe('elementSizeObserver', () => {
  const cb = vi.fn(() => {

  })
  const el = document.createElement('div')
  const ob = new ElementSizeObserver(el, cb)
  it('should trigger', () => {
    expect(cb).toBeCalledTimes(1)
    el.dispatchEvent(new UIEvent('resize'))
    expect(cb).toBeCalledTimes(2)
  })

  it('should trigger new sub', () => {
    const sub = vi.fn()
    ob.subscribe(sub)
    expect(sub).toBeCalledTimes(1)
    el.dispatchEvent(new UIEvent('resize'))
    expect(sub).toBeCalledTimes(2)
  })

  it('should be called with size', () => {
    const sub = vi.fn()
    ob.subscribe(sub)
    expect(sub).toBeCalledWith({
      width: el.clientWidth,
      height: el.clientHeight,
    })
  })
})
