import type { StylableElement } from '@contextmenu/shared'

export const mouseEnter = (el: EventTarget) => {
  el.dispatchEvent(new MouseEvent('mouseenter'))
}
export const mouseLeave = (el: EventTarget) => {
  el.dispatchEvent(new MouseEvent('mouseleave'))
}

export const expectToBeVisible = (el: StylableElement) => {
  // expect(el.style.display).toBe('block')
  expect(el.style.visibility).toBe('visible')
}

export const expectToBeHidden = (el: StylableElement) => {
  // expect(el.style.display).toBe('none')
  expect(el.style.visibility).toBe('hidden')
}
