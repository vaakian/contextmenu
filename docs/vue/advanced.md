<script setup>
  import { ref } from 'vue'
  // import { ContextMenu, useContextMenu } from '@contextmenu/vue'
  import Area from '../components/Area.vue'
  import NestedMenu from '../components/NestedMenu.vue'
  const nestedTargetRef = ref(null)
  
</script>
# Advanced usage

## TOC
[[TOC]]


## Nested sub menu
::: warning
The `MenuGroup` and `MenuItem` component **DOES NOT** provide any styles. You need to style them yourself.
:::
You can easily create nested sub menu by using `MenuGroup` and `MenuItem` component. 

> If you didn't get the concept of the nested menu structure yet, please refer to the [native guide](/guide/usage#nested-menu)

```vue
<script setup>
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

### DEMO

<Area ref="nestedTargetRef">
  right click any where on the page
</Area>

<NestedMenu z-20 />

## Access internal native instance
You can easily access **<u>native instance</u>**(which is used internally) by using `v-model` to get more controllability.
```vue{7,10,15,18}
<script setup>
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