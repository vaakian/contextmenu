# ContextMenu(WIP)

[![NPM version](https://img.shields.io/npm/v/@contextmenu/core?color=a1b858&label=)](https://www.npmjs.com/package/@contextmenu/core)

> Add custom `contextMenu` to you application the simplest way.

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
# npm
npm i @contexmenu/core

# pnpm
pnpm add @contexmenu/core

# yarn
yarn add @contexmenu/core
```

## License

[MIT](./LICENSE) License © 2022 [vaakian](https://github.com/vaakian)
