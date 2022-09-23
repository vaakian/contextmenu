import type { StylableElement } from '@contextmenu/shared'

export const mouseEnter = (el: EventTarget) => {
  el.dispatchEvent(new MouseEvent('mouseenter'))
}
export const mouseLeave = (el: EventTarget) => {
  el.dispatchEvent(new MouseEvent('mouseleave'))
}

export const expectToBeVisible = (el: StylableElement) => {
  expect(el.style.display).toBe('block')
}

export const expectToBeHidden = (el: StylableElement) => {
  expect(el.style.display).toBe('none')
}
