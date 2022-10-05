<script setup lang="ts">
import { ref } from 'vue'
import { ContextMenu, MenuGroup, MenuItem, useContextMenu } from '@contextmenu/vue'
import Menu from './components/Menu.vue'
import NestedMenu from './components/NestedMenu.vue'
const menuRef = ref<HTMLElement>()
const targetRef = ref<HTMLElement>()

const hideOnClick = ref(true)

const ctx = useContextMenu(menuRef, {
  target: targetRef,
  hideOnClick,
})

// eslint-disable-next-line no-console
const log = console.log
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
  <!-- <ContextMenu
    :hide-on-click="true"
    @context-menu="log($event.target)"
  >
    <Menu>
      [✈️]
    </Menu>
  </ContextMenu> -->
  <NestedMenu />
</template>

<style scoped lang="postcss">
</style>
