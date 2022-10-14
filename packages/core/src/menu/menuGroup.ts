import type { StylableElement } from '@contextmenu/shared'
import { injectDefaultStyle } from '../style'

/**
 * We need sub menu just allow `menuItem` to identify it
 * @param element
 */
export function configureMenuGroup(element: StylableElement) {
  injectDefaultStyle()
  element.dataset.isMenuGroup = ''
  const menuItems = getMenuItems(element)
  return () => {
    return menuItems
  }
}

function getMenuItems(element: StylableElement) {
  return element.querySelectorAll('*[data-is-menu-item=""]')
}
