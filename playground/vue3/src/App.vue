<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useContextMenu, vContextMenu } from '@contextmenu/vue'
import type { StylableElement } from '@contextmenu/shared'
import Menu from './components/Menu.vue'
import NestedMenu from './components/NestedMenu.vue'

const menuRef = ref<StylableElement | null>(null)
const targetRef = ref<StylableElement | null>(null)

const hideOnClick = ref(true)

const ctx = useContextMenu(menuRef, {
  target: targetRef,
  hideOnClick,
})

const directiveRef = ref<HTMLElement | null>(null)
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

  <div
    ref="directiveRef"
    class="w-20 h-20 bg-red"
  >
    TARGET2-Directive
  </div>
  <!-- the volar problem -->
  <Menu v-contextMenu="{ target: directiveRef }" />
  <NestedMenu />
</template>

<style scoped lang="postcss">
</style>
