
<script setup>
  import { ref } from 'vue'
  import { ContextMenu, useContextMenu } from '@contextmenu/vue'
  import Area from '../components/Area.vue'
  import NestedMenu from '../components/NestedMenu.vue'
  const targetRef = ref(null)

  const nestedTargetRef = ref(null)
  
</script>
# Component: `ContextMenu`

## Global menu
It's easier using `ContextMenu` component if you don't need extra control of it.
```Vue{6-8}
<script setup>
import { ContextMenu } from '@contextmenu/vue'
</script>

<template>
  <ContextMenu>
    Place your context menu here.
  </ContextMenu>
</template>
```

## Apply to specific `target`
Additionally, you can specify the target element as well as [hook usage](/vue/hook) by passing `options` to the props.
```vue{4,8,11}
<script setup>
import { ContextMenu } from '@contextmenu/vue'
import { ref } from 'vue'
const target = ref(null)
</script>

<template>
  <div ref="target">
    right click on me
  </div>
  <ContextMenu :target="target">
    Place your context menu here.
  </ContextMenu>
</template>
```

## DEMO

<!-- DEMO -->
<Area ref="targetRef">
  right click on me
</Area>

<ContextMenu :target="targetRef">
  <div class="bg-$vp-c-bg overflow-hidden shadow-xl rounded-md b-1 b-color-gray-400/30 p-2">You got me!</div>
</ContextMenu>
