import { _addEventListener } from '@contextmenu/core'

describe('_addEventListener', () => {
  const item = document.createElement('div')
  const addSpy = vitest.spyOn(item, 'addEventListener')
  const removeSpy = vitest.spyOn(item, 'removeEventListener')
  const listener = vitest.fn()

  it('should export', () => {
    expect(_addEventListener).toBeDefined()
  })

  it('should add/stop event listener', () => {
    const stop = _addEventListener(
      item,
      'click',
      listener,
    )

    expect(addSpy).toBeCalledWith('click', listener)

    stop()
    expect(removeSpy).toBeCalledWith('click', listener)
  })
})
