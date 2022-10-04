<script setup lang="ts">
const menus = [
  ['copy', 'i-carbon-moon'],
  ['paste', 'i-carbon-bike'],
  ['back', 'i-carbon-back'],
]
</script>

<template>
  <div
    class="menu"
    b="~ stone-500/15"
    bg-white
    rounded-md
    shadow-md
    overflow-hidden
    flex
    flex-col
    bg="$vp-c-bg-soft"
    select-none
    z-20
  >
    <!-- title -->
    <div
      px-3
      py="2px"
      lowercase
      hover="bg-stone-500/10 cursor-pointer text-$vp-c-brand"
    >
      <slot />
    </div>

    <div
      v-for="([value], key) in menus"
      :key="key"
      px-3
      py="2px"
      lowercase
      text="$vp-c-text-code"
      hover="bg-stone-500/10 cursor-pointer text-$vp-c-brand"
    >
      {{ value }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>
