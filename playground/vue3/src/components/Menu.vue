<script setup lang="ts">
</script>

<template>
  <div class="menu" border="~ base #eee" bg-blue-50 rounded-lg shadow-md>
    <div v-for="i in 6" :key="i" px-5 text-gray hover="bg-blue-100 cursor-pointer text-green">
      menu - {{ i }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>
