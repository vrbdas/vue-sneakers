<script setup>
import { inject, onMounted, onUnmounted, provide, ref } from 'vue';
import CartPageOne from './сart/CartPageOne.vue';
import CartPageTwo from './сart/CartPageTwo.vue';
import CartPageThree from './сart/CartPageThree.vue';

const cartOpen = inject('cartOpen');
const cartPages = ref([CartPageOne, CartPageTwo, CartPageThree]);
const cartPage = ref(0);

provide('cartPage', cartPage);

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
});

function handleEscape() {
  if (event.key == 'Escape') {
    cartOpen.value = false;
  }
}
</script>

<template>
  <div class="cart">
    <transition name="fade">
      <component :is="cartPages[cartPage]"></component>
    </transition>
  </div>
</template>

<style scoped lang="scss"></style>
