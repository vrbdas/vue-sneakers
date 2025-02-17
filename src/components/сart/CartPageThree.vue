<script setup>
import { inject, computed } from 'vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import { useCatalogStore } from '@/stores/catalogStore';

const cartOpen = inject('cartOpen');
const catalogStore = useCatalogStore();

const orderNumber = computed(() => {
  return catalogStore.orders.at(-1).orderId;
})

function btnClick() {
  cartOpen.value = false;
}
</script>

<template>
  <h2 class="cart__title">Корзина</h2>
  <div class="cart-empty__body">
    <img class="cart-empty__img" src="/src/assets/png/order-success-icon.png" alt="order-success-icon" />
    <div class="cart-empty__subtitle">Заказ оформлен!</div>
    <p class="cart-empty__text">Ваш номер заказа {{ orderNumber }}. Пожалуйста, ожидайте звонка от менеджера</p>
    <button @click="btnClick" class="btn btn__rect cart-empty__btn">
      Вернуться назад
      <ArrowLeftIcon />
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
