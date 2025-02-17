<script setup>
import { ref, provide } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheCart from './components/TheCart.vue';
import TheFooter from './components/TheFooter.vue';

const cartOpen = ref(false);
provide('cartOpen', cartOpen);

function overlayClick() {
  if (event.target.className == 'cart-overlay') {
    cartOpen.value = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cartOpen" class="cart-overlay" @click="overlayClick"></div>
    </Transition>
    <Transition name="slide">
      <TheCart v-if="cartOpen"></TheCart>
    </Transition>
  </Teleport>
  <TheHeader></TheHeader>
  <div class="container">
    <main>
      <RouterView></RouterView>
    </main>
  </div>
  <TheFooter></TheFooter>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.cart-overlay {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
