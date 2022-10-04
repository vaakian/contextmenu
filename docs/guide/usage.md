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


## Demo
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

## Framework support
The description introduces the basic idea and it's used in native javascript, we also provide high level framework preset:
- [Vue](/vue/)
- [React](/react/)
