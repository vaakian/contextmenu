# Vue usage

:TODO

### Installation

```shell
# npm
npm i @contextmenu/vue
# pnpm
pnpm i @contextmenu/vue
# yarn
yarn add @contextmenu/vue
```

### Component usage
It's easier to create using `ContextMenu` component if you don't need extra control of it.
```Vue{6-8}
<script setup lang="ts">
import { ContextMenu } from '@contextmenu/vue'
</script>

<template>
  <ContextMenu>
      Place your contextmenu here.
  </ContextMenu>
</template>


```

### Hook usage

Use `useContextMenu` hook to programmatically create a menu.

```Vue{5,6,10-12}
<script setup lang="ts">
import { ref } from 'vue'
import { useContextMenu } from '@contextmenu/vue'

const menuRef = ref<HTMLElement>()
const ctxMenu = useContextMenu(menuRef)
</script>

<template>
  <div ref="menuRef">
    Place your contextmenu here.
  </div>
</template>
```
