import { defaultWindow } from '@contextmenu/shared'

// import css from './default.css'
const css = `
/* auto injected by @contextmenu/core */
*[data-is-menu-item=""] > *[data-is-menu-group=""] {
  position: fixed !important;
  /* hidden by default */
  visibility: hidden;
}
`

// make singleton styleTag to avoid duplicate appending.
const styleTag = document.createElement('style')
styleTag.textContent = css
styleTag.setAttribute('type', 'text-css')

export const injectDefaultStyle = () => {
  if (defaultWindow)
    defaultWindow.document.head.append(styleTag)
}
