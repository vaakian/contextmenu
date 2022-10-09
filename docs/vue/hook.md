# Hook: `useContextMenu`

Use `useContextMenu` hook to programmatically create a menu.

## Quick example
```Vue{5,6,10-12}
<script setup>
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

