<script setup lang="ts">
import { ContextMenu, MenuGroup, MenuItem } from '@contextmenu/vue'
</script>

<template>
  <ContextMenu>
    <MenuGroup class="menu">
      <MenuItem class="item">
        🍎 foo
      </MenuItem>
      <MenuItem class="item">
        🍌 bar
      </MenuItem>
      <MenuItem class="item">
        🥒 more
        <!-- sub menu content -->
        <MenuGroup class="menu">
          <MenuItem class="item">
            setting
          </MenuItem>
          <MenuItem class="item">
            general
          </MenuItem>
          <MenuItem class="item">
            subMenu
            <!-- deep sub menu content -->
            <MenuGroup class="menu">
              <MenuItem class="item">
                🌍 earth
              </MenuItem>
              <MenuItem class="item">
                🌕 moon
              </MenuItem>
              <MenuItem class="item">
                🌞 sun
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
    @apply hover-bg-$vp-c-bg-elv-mute hover-color-$vp-c-brand color-$vp-c-text-2 cursor-pointer px-2 py-1;
}
.item > * {
  color: initial;
}
</style>
