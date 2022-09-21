export interface Size {
  width: number
  height: number
}

export interface Position {
  x: number
  y: number
}

export type StylableElement = HTMLElement | SVGAElement

export const isStylableElement = (el: Element): el is StylableElement => {
  return el instanceof HTMLElement || el instanceof SVGAElement
}

export const hideStylableElement = (el: StylableElement) => {
  el.style.display = 'none'
}
export const showStylableElement = (el: StylableElement) => {
  el.style.display = 'block'
}
