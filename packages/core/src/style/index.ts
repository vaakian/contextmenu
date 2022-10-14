import { defaultWindow, isClient } from '@contextmenu/shared'

// import css from './default.css'
const css = `
/* auto injected by @contextmenu/core */
*[data-is-menu-item=""] > *[data-is-menu-group=""] {
  position: fixed !important;
  /* hidden by default */
  visibility: hidden;
}
`

function createStyleTag() {
  let tag: HTMLStyleElement = null as unknown as HTMLStyleElement
  if (isClient) {
    tag = document.createElement('style')
    tag.textContent = css
    tag.setAttribute('type', 'text-css')
  }
  return tag
}

// make singleton styleTag to avoid duplicate appending.
const styleTag = /* #__PURE__ */ createStyleTag()

export const injectDefaultStyle = () => {
  if (isClient)
    defaultWindow!.document.head.append(styleTag)
}
