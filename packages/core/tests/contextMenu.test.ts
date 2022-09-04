import { createContextMenu, key } from '../src'

const nextTick = () => {
  return new Promise(resolve => setTimeout(resolve))
}

describe('contextMenu', () => {
  let menuElement: HTMLElement
  beforeEach(() => {
    menuElement = document.createElement('div')
    // document.body.appendChild(menuElement)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('contextMenu test 1', () => {
    it('should be initialized', async () => {
      const ctx = createContextMenu(menuElement)
      expect(ctx.menuElement).toBe(menuElement)
      expect(menuElement.dataset[key]).toBe('0')
      expect(menuElement.style!.visibility).toBe('hidden')
      expect(menuElement.style!.position).toBe('fixed')
      expect(document.body.contains(menuElement)).toBeTruthy()
    })

    it('should register offset', async () => {
      const [x, y] = [100, 200]
      createContextMenu(menuElement)
      dispatchEvent(new MouseEvent('contextmenu', { clientX: x, clientY: y }))
      await nextTick()

      // documentElement width/height are both 0 in test environment
      expect(menuElement.style.right).toBe(`${-x}px`)
      expect(menuElement.style.bottom).toBe(`${-y}px`)
    })

    it('should effect dataset', async () => {
      const ctx = createContextMenu(menuElement)
      ctx.hideOnClick = true
      expect(menuElement.dataset[key]).toBe('1')
      ctx.hideOnClick = false
      expect(menuElement.dataset[key]).toBe('0')
    })
  })
})
