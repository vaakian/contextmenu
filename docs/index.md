# @contextmenu

## Getting started
The get start, you have to get the idea of how a `contextmenu` works, there are two <u>elements</u> involved when creating a `contextmenu`:

1. An <u>element</u> as the `contextmenu`
2. An <u>element</u> that the `contextmenu` applies to, you would mostly **<u>right click</u>** on it.

```typescript
import { createContextMenu } from '@contextmenu/core'

// the element as the `contextmenu`
const menu = document.getElementById("menu")

// the above `contextmenu` applies to
const target = document.getElementById("target")

// now you're all set,
// right click on the `target`
// then you'll see the `menu` pops up.
const contextMenu = createContextMenu(menu, {
  target,
})
```

## Framework support
the description introduces the basic idea and it's used in native javascript, we also provides high-level framework support.


### Vue

:TODO

### React

:TODO