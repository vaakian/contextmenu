# Usage

## How it works
Firstly, you need to get the idea of how a `context menu` works, there are two <u>elements</u> involved when creating a `context menu`:

1. An **menu** <u>element</u> as the `context menu`
2. An **target** <u>element</u> that the `context menu` applies to, you would mostly **right click** on it.

## example

```typescript
import { createContextMenu } from '@contextmenu/core'

// the element as the `contextmenu`
const menu = document.getElementById('menu')

// the above `contextmenu` applies to
const target = document.getElementById('target')

// now you're all set,
// right click on the `target`
// then you'll see the `menu` pops up.
const ctxMenu = createContextMenu(menu, { target })
```
The default `target` element is `window` if not specified.

```typescript{6}
import { createContextMenu } from '@contextmenu/core'

const menu = document.getElementById('menu')

// the default `target` is the global `window`.
const ctxMenu = createContextMenu(menu)
```


### Demo
<script setup>
import { ref } from 'vue'
import { useContextMenu } from '@contextmenu/vue'
// TODO: using unplugin-import
import Menu from '../components/Menu.vue'
import Area from '../components/Area.vue'

const targetRef = ref(null)
const menuRef = ref(null)

const ctx = useContextMenu(menuRef, { target: targetRef })
console.log(ctx)
</script>

<Area ref="targetRef">
right click on me
</Area>
<Menu ref="menuRef" />

## Nested Menu

The `ContextMenu` caries an <u>element</u> as the menu that pops up while triggering `contextmenu` event (mostly by right clicking), the <u>element</u> could be your custom DOM, or, the built-in nested menu `MenuGroup`.

The structure may look like:
```shell
ContextMenu => A custom DOM element
# or
ContextMenu => MenuGroup{ rootElement, MenuItems }
```

You can use `createNestedMenu` function to do that, just provide a valid `descriptor` that describes what your menu looks like.

### DEMO
```ts
const subMenu1 = document.createElement('div')
subMenu1.innerHTML = '<li>Nested1</li>'
+ '<li>Nested2</li>'
+ '<li>Nested3</li>'

const ctx = createNestedMenu({
  // `el` could be a CSS selector or a real DOM.
  // You must ensure the DOM of the selector exists if providing a selector.
  el: '#group',
  items: [
    { el: '#item1' },
    { el: '#item2', subMenu: { el: subMenu1 } },
    { el: '#item3', subMenu: { el: '#subMenu2' } },
  ],
})
```

### Type Definition
```ts
export function createNestedMenu(
  descriptor: NestedMenu,
  options?: ContextMenuOptions
): ContextMenu

export type NestedMenuElement = string | StylableElement

export interface NestedMenu {
  el: NestedMenuElement
  items?: {
    el: NestedMenuElement
    subMenu?: NestedMenu
  }[]
}

```

## Framework support
The description introduces the basic idea and it's used in native javascript, we also provide high level framework preset:
- [Vue](/vue/)
- [React](/react/)
