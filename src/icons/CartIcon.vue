<script setup>
const props = defineProps(['color']);
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7.545 18.182a.818.818 0 1 0 0-1.637.818.818 0 0 0 0 1.637ZM16.546 18.182a.818.818 0 1 0 0-1.637.818.818 0 0 0 0 1.637ZM1 1h3.273l2.192 10.956a1.636 1.636 0 0 0 1.637 1.317h7.953a1.636 1.636 0 0 0 1.636-1.317L19 5.09H5.09"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
