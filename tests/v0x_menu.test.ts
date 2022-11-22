import type { MenuItemDescriptor } from '@contextmenu/core'
import { MenuGroup } from '@contextmenu/core'
import { expectToBeHidden, expectToBeVisible, mouseEnter, mouseLeave } from './utils'

describe('MenuGroup & MenuItem', () => {
  let items: MenuItemDescriptor[]
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

  describe('MenuGroup', () => {
    it('should add item', () => {
      expect(group.menuItems.size).toBe(3)

      items.forEach(item => expect(group.menuItems.has(item)).toBeTruthy())
    })
  })

  describe('MenuItem', () => {
    it('should attach', () => {
      const item = new MenuItem()
      // group.add(item)
      item.attach(group)

      expect(group.menuItems.has(item)).toBeTruthy()
    })

    it('should set/remove sub menu afterwards', () => {
      const item = new MenuItem()

      item.setSubMenu(group)

      expect(item.subMenu).toBe(group)

      item.removeSubMenu()

      expect(item.subMenu).toBeNull()
    })

    it('should show sub menu', () => {
      const item = new MenuItem(group)

      expectToBeHidden(item.subMenu!.element)

      mouseEnter(item.element)
      expectToBeVisible(item.subMenu!.element)

      mouseLeave(item.element)
      expectToBeHidden(item.subMenu!.element)

      // after cleanup
      item.cleanup()

      mouseEnter(item.element)
      expectToBeHidden(item.subMenu!.element)
    })
  })
})
