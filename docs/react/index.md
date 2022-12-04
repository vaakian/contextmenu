# React usage

:TODO

### Installation
::: tip NOTICE
The core package `@contextmenu/core` is a \`peerDependency\` of `@contextmenu/react`.
:::

Make sure you have `@contextmenu/core` installed along with `@contextmenu/react` so as to import built-in themes presets from it.

```shell
# npm
npm i @contextmenu/core @contextmenu/react
# pnpm
pnpm i @contextmenu/core @contextmenu/react
# yarn
yarn add @contextmenu/core @contextmenu/react
```


### Component usage
It's easier using `ContextMenu` component if you don't need extra control of it.
```tsx{6-8}
import { ContextMenu } from '@contextmenu/react'

function App() {
  return (
    <div>
      <ContextMenu>
        Place your context menu here.
      </ContextMenu>
      ...
    </div>
  )
}
```


### Hook usage

Use `useContextMenu` hook to programmatically create a menu.

```tsx{5-6,9-11}
import { useContextMenu } from '@contextmenu/react'
import { useRef } from 'react'

function App() {
  const menu = useRef<HTMLDivElement>(null)
  const ctx = useContextMenu(menu)
  return (
    <div>
      <div ref={menu}>
        place your context menu here.
      </div>
    </div>
  )
}
```