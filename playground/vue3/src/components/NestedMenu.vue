<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { MenuGroupInstance, MenuItemInstance } from '@contextmenu/core'
import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/vue'
import { ref, watchEffect } from 'vue'

const groupInstance = ref<MenuGroupInstance>()
const itemInstance = ref<MenuItemInstance>()

watchEffect(() => {
  console.log(groupInstance.value)
  console.log(itemInstance.value)
})

const showSub = ref(true)
</script>

<template>
  <div>
    <button @click="showSub = !showSub">
      toggle Show Sub [{{ showSub }}]
    </button>
  </div>
  <ContextMenu>
    <MenuGroup v-model="groupInstance" class="menu">
      <MenuItem class="item">
        Item 1
      </MenuItem>
      <MenuItem class="item">
        Item 2
      </MenuItem>
      <MenuItem v-model="itemInstance" class="item">
        SubMenu1
        <!-- sub menu content -->
        <MenuGroup v-if="showSub" class="menu">
          <MenuItem class="item">
            Nested1
          </MenuItem>
          <MenuItem class="item">
            SubMenu2
            <!-- deep sub menu content -->
            <MenuGroup class="menu">
              <MenuItem class="item">
                Apple
              </MenuItem>
              <MenuItem class="item">
                Orange
              </MenuItem>
              <MenuItem class="item">
                Banana
              </MenuItem>
            </MenuGroup>
          </MenuItem>
        </MenuGroup>
      </MenuItem>
    </MenuGroup>
  </ContextMenu>
</template>

<style lang="postcss" scoped>
.menu {
  @apply bg-blue-50 overflow-hidden shadow-xl rounded-md b-1 b-color-gray-400/30;
}
.item {
    @apply hover-bg-cyan-500/20 hover-color-indigo-500 cursor-pointer px-2 py-1 capitalize;
}
.item > * {
  color: initial;
}
</style>
