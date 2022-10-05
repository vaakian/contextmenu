<script setup lang="ts">
import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/vue'
</script>

<template>
  <ContextMenu>
    <MenuGroup class="menu">
      <MenuItem class="item">
        🍎 Item 1
      </MenuItem>
      <MenuItem class="item">
        🍌 Item 2
      </MenuItem>
      <MenuItem class="item">
        🥒 SubMenu1
        <!-- sub menu content -->
        <MenuGroup class="menu">
          <MenuItem class="item">
            Nested1
          </MenuItem>
          <MenuItem class="item">
            Nested2
          </MenuItem>
          <MenuItem class="item">
            SubMenu2
            <!-- deep sub menu content -->
            <MenuGroup class="menu">
              <MenuItem class="item">
                🌍 Apple
              </MenuItem>
              <MenuItem class="item">
                ⛰️ Orange
              </MenuItem>
              <MenuItem class="item">
                ✈️ Banana
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
  @apply bg-$vp-c-bg overflow-hidden shadow-xl rounded-md b-1 b-color-gray-400/30;
}
.item {
    @apply hover-bg-$vp-c-bg-mute hover-color-$vp-c-brand color-$vp-c-text-2 cursor-pointer px-2 py-1 rounded capitalize;
}
.item > * {
  color: initial;
}
</style>
