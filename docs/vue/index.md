<script setup>
  import { ref } from 'vue'
  import { ContextMenu, useContextMenu } from '@contextmenu/vue'
  import Area from '../components/Area.vue'
  const targetRef = ref(null)
</script>

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
It's easier using `ContextMenu` component if you don't need extra control of it.
```Vue{6-8}
<script setup lang="ts">
import { ContextMenu } from '@contextmenu/vue'
</script>

<template>
  <ContextMenu>
    Place your context menu here.
  </ContextMenu>
</template>
```

### DEMO

<!-- DEMO -->
<Area ref="targetRef">
  right click on me
</Area>

<ContextMenu :target="targetRef">
  <div bg="$vp-c-bg-soft" p-2 shadow-lg rounded-lg>You got me!</div>
</ContextMenu>

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
    Place your context menu here.
  </div>
</template>
```
