import { MenuGroup, MenuItem } from '@contextmenu/core'

describe('MenuGroup & MenuItem', () => {
  let items: MenuItem[]
  let group: MenuGroup

  it('should export', () => {
    expect(MenuGroup).toBeDefined()
    expect(MenuItem).toBeDefined()
  })

  beforeEach(() => {
    items = [
      new MenuItem(),
      new MenuItem(),
      new MenuItem(),
    ]

    group = new MenuGroup(
      items,
    )
  })

  it('should add item', () => {
    expect(group.menuItems.length).toBe(3)

    items.forEach(item => expect(group.menuItems.includes(item)).toBeTruthy())
  })

  it('should attach', () => {
    const item = new MenuItem()
    group.add(item)

    expect(group.menuItems.includes(item)).toBeTruthy()
  })
  it('should show sub menu', async () => {
    const item = new MenuItem(group)
    // const addSpy = vitest.spyOn(item.element, 'addEventListener')

    expect(group.element.style!.display).toBe('none')
    item.element.dispatchEvent(new MouseEvent('mouseenter'))
    await Promise.resolve()
    expect(group.element.style!.display).toBe('block')
  })
})
