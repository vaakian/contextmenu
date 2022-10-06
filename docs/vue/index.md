<script setup>
  import { ref } from 'vue'
  import { ContextMenu, useContextMenu } from '@contextmenu/vue'
  import Area from '../components/Area.vue'
  import NestedMenu from '../components/NestedMenu.vue'
  const targetRef = ref(null)

  const nestedTargetRef = ref(null)
  
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
  <div class="bg-$vp-c-bg overflow-hidden shadow-xl rounded-md b-1 b-color-gray-400/30 p-2">You got me!</div>
</ContextMenu>

### Hook usage

Use `useContextMenu` hook to programmatically create a menu.

```Vue{5,6,10-12}
<script setup lang="ts">
import { ref } from 'vue'
import { useContextMenu } from '@contextmenu/vue'

const menuRef = ref<HTMLElement>(null)
const ctxMenu = useContextMenu(menuRef)
</script>

<template>
  <div ref="menuRef">
    Place your context menu here.
  </div>
</template>
```


## Advanced usage

### 1) Nested sub menu

You can easily create nested sub menu by using `MenuGroup` and `MenuItem` component.

```vue
<script setup lang="ts">
import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/vue'
</script>

<template>
  <ContextMenu>
    <MenuGroup>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>
        SubMenu1
        <!-- sub menu content -->
        <MenuGroup>
          <MenuItem>Nested1</MenuItem>
          <MenuItem>Nested2</MenuItem>
          <MenuItem>
            SubMenu2
            <!-- deep sub menu content -->
            <MenuGroup>
              <MenuItem>Apple</MenuItem>
              <MenuItem>Orange</MenuItem>
              <MenuItem>Banana</MenuItem>
            </MenuGroup>
          </MenuItem>
        </MenuGroup>
      </MenuItem>
    </MenuGroup>
  </ContextMenu>
</template>
```

#### DEMO

<Area ref="nestedTargetRef">
  right click any where on the page
</Area>

<NestedMenu z-20/>

### 2) Get access internal native instance
You can easily access **<u>native instance</u>**(which is used internally) by using `v-model` to gain more controllability of it.
```vue{7,10,15,18}
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuGroupInstance } from '@contextmenu/core'
import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/vue'

// `groupInstance.value` is the native instance
const groupInstance = ref<MenuGroupInstance>()

// `itemInstance.value` is the native instance
const itemInstance = ref<MenuItemInstance>()
</script>

<template>
  <ContextMenu>
    <MenuGroup v-model="groupInstance">
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem v-model="itemInstance">Item3</MenuItem>
    </MenuGroup>
  </ContextMenu>
</template>

```