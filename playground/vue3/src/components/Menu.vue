<script setup lang="ts">
const menus = [
  ['prest', 'i-carbon-sun'],
  ['copy', 'i-carbon-moon'],
  ['paste', 'i-carbon-bike'],
  ['back', 'i-carbon-back'],
]
</script>

<template>
  <div
    class="menu"
    b="~ stone-500/15"
    rounded-md
    shadow-md
    overflow-hidden
    flex
    flex-col
  >
    <!-- title -->
    <div
      px-3
      py="2px"
      text-gray
      lowercase
      hover="bg-stone-500/10 cursor-pointer text-stone-500"
    >
      <slot />
    </div>

    <div
      v-for="([value], key) in menus"
      :key="key"
      px-3
      py="2px"
      text-gray
      lowercase
      hover="bg-stone-500/10 cursor-pointer text-stone-500"
    >
      {{ value }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>
