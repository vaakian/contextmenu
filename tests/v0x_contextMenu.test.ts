import type { ContextMenu } from '@contextmenu/core'
import { createContextMenu } from '@contextmenu/core'

// const nextTick = () => {
//   return new Promise(resolve => setTimeout(resolve))
// }

describe('contextMenu', () => {
  let menuElement: HTMLElement
  let ctx: ContextMenu
  const rightClick = () => dispatchEvent(new MouseEvent('contextmenu'))
  const expectToBeHidden = (e: HTMLElement) => expect(e.style!.visibility).toBe('hidden')
  const expectToBeVisible = (e: HTMLElement) => expect(e.style!.visibility).toBe('visible')

  beforeEach(() => {
    menuElement = document.createElement('div')
    // document.body.appendChild(menuElement)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('create contextMenu bhy element', () => {
    beforeEach(() => {
      ctx = createContextMenu(menuElement)
    })
    it('should be initialized', async () => {
      expect(ctx.element).toBe(menuElement)
      expectToBeHidden(menuElement)
      expect(menuElement.style!.position).toBe('fixed')
      expect(document.body.contains(menuElement)).toBeTruthy()
    })

    it('should register offset', async () => {
      const [x, y] = [100, 200]
      dispatchEvent(new MouseEvent('contextmenu', { clientX: x, clientY: y }))

      // documentElement width/height are both 0 in test environment
      expect(menuElement.style.right).toBe(`${-x}px`)
      expect(menuElement.style.bottom).toBe(`${-y}px`)
    })

    it('should effect visibility', async () => {
      ctx.hide()

      expectToBeHidden(menuElement)

      ctx.show()

      expectToBeVisible(menuElement)
    })

    it('should enable/disable', () => {
      ctx.enabled = false

      expectToBeHidden(menuElement)

      rightClick()

      expectToBeHidden(menuElement)

      ctx.enabled = true

      rightClick()

      expectToBeVisible(menuElement)
    })

    it('should trigger onContextMenu', () => {
      const onContextMenu = vitest.fn()
      const event = new MouseEvent('contextmenu')
      ctx.options.onContextMenu = onContextMenu

      dispatchEvent(event)

      expect(onContextMenu).toBeCalledWith(event)
    })
  })

  describe('create contextMenu by selector', () => {
    it('should select the element', () => {
      const element = document.createElement('div')
      document.body.append(element)
      element.id = 'menu'
      const ctx = createContextMenu('#menu')

      expect(ctx.element).toBe(element)
    })
  })
})
