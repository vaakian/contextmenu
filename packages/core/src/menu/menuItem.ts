import type { StylableElement } from '@contextmenu/shared'
import { defaultWindow, hideStylableElement, isStylableElement, showStylableElement } from '@contextmenu/shared'
import { _addEventListener } from '../eventListener'
import { calculateSubMenuOffset } from '../utils'

export const configureMenuItem = (element: StylableElement) => {
  // just tag it, no value needed.
  element.dataset.isMenuItem = ''

  const unregisterMouseEvent = registerMouseEvent(element)

  queueMicrotask(() => {
    hideSubMenu(element)
    setSubMenuPositioning(element)
  })

  return {
    unregisterMouseEvent,
  }
}

/**
 * Register mouse event
 * @param element
 * @returns
 */
function registerMouseEvent(element: StylableElement) {
  const show = () => showSubMenu(element)
  const hide = () => hideSubMenu(element)

  const cleanups = [
    _addEventListener(element, 'mouseenter', show),
    _addEventListener(element, 'mouseleave', hide),
    _addEventListener(element, 'click', hide),
    _addEventListener(defaultWindow!, 'scroll', hide),
  ]

  return () => cleanups.forEach(cleanup => cleanup())
}

function getSubMenu(element: StylableElement) {
  return element.querySelector('*[data-is-menu-group=""]')
}

function hideSubMenu(element: StylableElement) {
  const subMenu = getSubMenu(element)
  if (!subMenu || !isStylableElement(subMenu))
    return

  hideStylableElement(subMenu)
}

function showSubMenu(element: StylableElement) {
  const subMenu = getSubMenu(element)
  if (!subMenu || !isStylableElement(subMenu))
    return
  // TODO: determine the position

  // 1. determine the position.
  const position = calculateSubMenuOffset(
    { element },
    { element: subMenu },
    {
      width: defaultWindow!.document.documentElement.clientWidth,
      height: defaultWindow!.document.documentElement.clientHeight,
    },
  )

  // 2. set it.
  for (const [key, value] of Object.entries(position))
    subMenu.style.setProperty(key, typeof value === 'number' ? `${value}px` : value)

  // 3. tag overflow state
  subMenu.dataset.overflowX = position.overflowX ? 'true' : 'false'
  subMenu.dataset.overflowY = position.overflowY ? 'true' : 'false'

  // 3. show it.
  showStylableElement(subMenu)
}

function setSubMenuPositioning(element: StylableElement) {
  const subMenu = getSubMenu(element)
  if (subMenu && isStylableElement(subMenu))
    subMenu.style.position = 'fixed'
}
