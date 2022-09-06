<script setup lang="ts">
import { ref } from 'vue'
import { useContextMenu } from '@contextmenu/vue'
import Menu from '@/components/Menu.vue'
const menuRef = ref<HTMLElement>()

const ctx = useContextMenu(menuRef)
</script>

<template>
  <Menu ref="menuRef" />
</template>

<style scoped>
</style>
