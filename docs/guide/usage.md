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
import Menu from './Menu.vue'

const targetRef = ref(null)
const menuRef = ref(null)

const ctx = useContextMenu(menuRef, { target: targetRef })
console.log(ctx)
</script>

<div 
  ref="targetRef"
  class="w-20 h-20 bg-red-500/20 flex rounded-lg items-center justify-center text-center box-content select-none"
  p="x-10 y-10"
  mx-auto
>
  right click on me
</div>

<Menu ref="menuRef" />

## Framework support
The description introduces the basic idea and it's used in native javascript, we also provide high level framework preset:
- [Vue](/vue/)
- [React](/react/)
