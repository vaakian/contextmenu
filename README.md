# ContextMenu(WIP)

<p align="center">
  <a href="https://contextmenu.netlify.app/"><img width="400" src="https://developer.apple.com/design/human-interface-guidelines/images/intro/components/context-menu-intro.png" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@contextmenu/core">
    <img src="https://img.shields.io/npm/v/@contextmenu/core?color=a1b858&label=npm" alt="NPM version" />
  </a>
  <a href="https://contextmenu.netlify.app/">
    <img src="https://api.netlify.com/api/v1/badges/c6bd4317-b303-4dcf-b87a-69a548b121d8/deploy-status" alt="Netlify Status" />
  </a>
</p>

<p align="center">Add custom <code>contextMenu</code> to you application the simplest way.</p>

> Online [DEMO](https://contextmenu.netlify.app/vue/advanced#demo)\
> Refer to the [Documentations](https://contextmenu.netlify.app/)


## Feature
- 🪆 Support **Deeply nested** sub menu
- 💪 Fully written in **TypeScript**
- 🎄 Fully tree-shakable
- 📦 Fully customizable
- 🖇 SSR ready
- ✨ Animation support
- 🎨 Opted-in UI component
- 🔨 Multi-framework support
  - [React](https://reactjs.org/)
  - [Vue](https://vuejs.org/)
  - [Angular](https://angularjs.org/)
  - Vanilla JavaScript
  - Web Component

### Current Progress
- [x] Core
  - [x] Basic top-level menu using the custom element
  - [x] Deeply nested menu
  - [x] Declarative API
  - [x] UI preset(yet in beta)
  - [ ] Online UI design tool
  - [ ] Animation

- [x] Vue (both Vue2 & Vue3, empowered by [Vue Demi](https://github.com/vueuse/vue-demi))
  - [x] `v-directive` usage
  - [x] `useContextMenu` hook
  - [x] `<ContextMenu />` component
  - [x] `<MenuGroup />` and `<MenuItem />` component for creating nested menu

- [x] React
  - [x] `useContextMenu` hook
  - [x] `<ContextMenu />` component
  - [x] `<MenuGroup />` and `<MenuItem />` component

- [ ] Angular(pending)

- [ ] Vanilla JavaScript
  - [ ] Native `Web Component`
  - [x] JavaScript API

- [ ] Docs
  - [x] Vitepress
  - [ ] Repl Playground

- [x] `IIFE` format for `script` tag

## Installation

```bash
# native JavaScript
npm i @contextmenu/core

# vue
npm i @contextmenu/vue

# react
npm i @contextmenu/react
```

## Quick example
Use the `ContextMenu` component to create a context menu.

1. Vue setup
```html
<script setup lang="ts">
import { ContextMenu } from '@contextmenu/vue'
</script>

<template>
  <ContextMenu>
    Place your context menu here.
  </ContextMenu>
</template>
```

2. React
```jsx
import { ContextMenu } from '@contextmenu/react'

function App() {
  return (
    <ContextMenu>
      Place your context menu here.
    </ContextMenu>
  )
}
```

Please refer to the [documentation](https://contextmenu.netlify.app/) for more details.

## Current NPM Version

| package name | version |
| ----------------- | ---------------- |
| @contextmenu/core | [![@contextmenu-core][v-core]][url-core] |
| @contextmenu/vue | [![@contextmenu-vue][v-vue]][url-vue] |
| @contextmenu/react | [![@contextmenu-react][v-react]][url-react] |
| @contextmenu/shared | [![@contextmenu-shared][v-shared]][url-shared] |
## License

[MIT](./LICENSE) License © 2022 [vaakian](https://github.com/vaakian)


[v-core]: https://img.shields.io/npm/v/@contextmenu/core?color=a1b858&label=%40contextmenu%2Fcore&style=plastic
[v-vue]: https://img.shields.io/npm/v/@contextmenu/vue?color=a1b858&label=%40contextmenu%2Fvue&style=plastic
[v-react]: https://img.shields.io/npm/v/@contextmenu/react?color=a1b858&label=%40contextmenu%2Freact&style=plastic
[v-shared]: https://img.shields.io/npm/v/@contextmenu/shared?color=a1b858&label=%40contextmenu%2Fshared&style=plastic
[url-core]: https://www.npmjs.com/package/@contextmenu/core
[url-vue]: https://www.npmjs.com/package/@contextmenu/vue
[url-react]: https://www.npmjs.com/package/@contextmenu/react
[url-shared]: https://www.npmjs.com/package/@contextmenu/shared
