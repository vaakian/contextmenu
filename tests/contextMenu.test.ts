import type { ContextMenu } from '@contextmenu/core'
import { createContextMenu, key } from '@contextmenu/core'

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

  describe('contextMenu test 1', () => {
    beforeEach(() => {
      ctx = createContextMenu(menuElement)
    })
    it('should be initialized', async () => {
      expect(ctx.menuElement).toBe(menuElement)
      expect(menuElement.dataset[key]).toBe('0')
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

    it('should effect dataset', async () => {
      ctx.hideOnClick = true

      expect(menuElement.dataset[key]).toBe('1')

      ctx.hideOnClick = false

      expect(menuElement.dataset[key]).toBe('0')
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
})
