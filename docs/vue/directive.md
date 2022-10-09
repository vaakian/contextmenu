# Directive: `v-contextmenu`
Except [Component](/vue/component) and [Hook](/vue/hook) usage, you can also use `v-contextMenu` directive to do the same thing.

## TOC
[[TOC]]

## Used in templates
Just import it, and add `v-contextMenu` to the <u>Element</u> you want.
```vue{2,6}
<script setup>
import { vContextMenu } from '@contextmenu/vue'
</script>

<template>
  <div v-contextMenu>
    place context menu content here.
  </div>
</template>
```

### With options

:::info
Due to the limitation of Vue, you should provide a function returns the `target`.
:::
```vue{4,11}
<script setup>
import { vContextMenu } from '@contextmenu/vue'
import { ref } from 'vue'
const target = ref(null)
</script>

<template>
  <div ref="target">
    right click on me.
  </div>
  <div v-contextMenu="{ target: () => target }">
    place context menu content here.
  </div>
</template>
```

You can also customize the **name** if you think it's too long.
:::tip NOTICE
The directive **name** should alway start with `v`
:::
```vue{2,6}
<script setup>
import { vContextMenu as vCtx } from '@contextmenu/vue'
</script>

<template>
  <div v-ctx>
    place context menu content here.
  </div>
</template>
```



## Used globally

Register the `vContextMenu` directive in your `main.ts` / `main.js` App entry file, then you can use it same as [template usage](/vue/#usage-in-templates).

:::danger Caveat
You will lose TypeScript hints with global usage.
:::
```ts{2,7}
import { createApp } from 'vue'
import { vContextMenu } from '@contextmenu/vue'
import App from './App.vue'

// <div v-contextMenu>menu</div>
createApp(App)
  .directive('contextMenu', vContextMenu)
  .mount('#app')
```

> Please refer to [Vue directive](https://vuejs.org/guide/reusability/custom-directives.html) for more details.
