<script setup lang="ts">
import { ref } from 'vue'
import { useContextMenu } from '@contextmenu/vue'
import Menu from './components/Menu.vue'
import NestedMenu from './components/NestedMenu.vue'


const menuRef = ref<HTMLElement>()
const targetRef = ref<HTMLElement>()

const hideOnClick = ref(true)

const ctx = useContextMenu(menuRef, {
  target: targetRef,
  hideOnClick,
})
</script>

<template>
  <Menu ref="menuRef">
    [🚀]
  </Menu>
  <div
    ref="targetRef"
    class="w-20 h-20 bg-green"
  >
    TARGET
  </div>


  <NestedMenu />
</template>

<style scoped lang="postcss">
</style>
