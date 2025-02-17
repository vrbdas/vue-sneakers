<script setup>
import { useCatalogStore } from '@/stores/catalogStore';
import { inject, onMounted, onUnmounted, provide, ref, computed } from 'vue';
import CartEmpty from './сart/CartEmpty.vue';
import CartPageOne from './сart/CartPageOne.vue';
import CartPageTwo from './сart/CartPageTwo.vue';
import CartPageThree from './сart/CartPageThree.vue';

const catalogStore = useCatalogStore();
const cartOpen = inject('cartOpen');
const cartPage = ref(1);
const cartIsEmpty = computed(() => catalogStore.cart.length == 0);

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
    <div class="cart__wrapper">
      <CartEmpty v-if="cartIsEmpty" />
      <CartPageOne v-if="!cartIsEmpty && cartPage == 1" />
      <CartPageTwo v-if="!cartIsEmpty && cartPage == 2" />
      <CartPageThree v-if="!cartIsEmpty && cartPage == 3" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
