# React usage

:TODO

### Installation

```shell
# npm
npm i @contextmenu/react
# pnpm
pnpm i @contextmenu/react
# yarn
yarn add @contextmenu/react
```


### Component usage
It's easier to create using `ContextMenu` component if you don't need extra control of it.
```tsx{6-8}
import { ContextMenu } from '@contextmenu/react'

function App() {
  return (
    <div>
      <ContextMenu>
        Place your contextmenu here.
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