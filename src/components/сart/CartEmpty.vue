<script setup>
import { inject } from 'vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

const cartOpen = inject('cartOpen');
</script>

<template>
  <h2 class="cart__title">Корзина</h2>
  <div class="cart-empty__body">
    <img class="cart-empty__img" src="/src/assets/png/package-icon.png" alt="package-icon" />
    <div class="cart-empty__subtitle">Корзина пустая</div>
    <p class="cart-empty__text">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
    <button @click="cartOpen = false" class="btn btn__rect cart-empty__btn">
      Вернуться назад
      <ArrowLeftIcon />
    </button>
  </div>
</template>

<style scoped lang="scss"></style>
