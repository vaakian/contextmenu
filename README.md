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

> Refer to [Documentations](https://contextmenu.netlify.app/)


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
  - [x] Basic top level menu using custom element
  - [x] Deeply nested menu
  - [ ] Animation

- [x] Vue (both Vue2 & Vue3, empowered by [Vue Demi](https://github.com/vueuse/vue-demi))
  - [ ] `v-directive` usage
  - [x] `useContextMenu` hook
  - [x] `<ContextMenu />` component
  - [x] `<MenuGroup />` and `<MenuItem />` component for creating nested menu

- [x] React
  - [x] `useContextMenu` hook
  - [x] `<ContextMenu />` component

- [ ] Angular(pending)

- [ ] Vanilla JavaScript
  - [ ] Native `Web Component`
  - [x] Plain JavaScript API

- [ ] Docs (coming soon!)
  - [ ] Vitepress
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
Use `ContextMenu` component to create a context menu.

1. in Vue setup
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

2. in React
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

Please refer to [documentations](https://contextmenu.netlify.app/) for more details.

## License

[MIT](./LICENSE) License © 2022 [vaakian](https://github.com/vaakian)
