<script setup>
import { useCatalogStore } from '@/stores/catalogStore';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
import CartPrice from './CartPrice.vue';
import AppCard from '../AppCard.vue';
import { inject, ref, watch } from 'vue';

const catalogStore = useCatalogStore();
const cartPage = inject('cartPage');
</script>

<template>
  <h2 class="cart__title">Корзина</h2>
  <div class="cart__list">
    <div v-for="item in catalogStore.cart" :key="item.id">
      <AppCard :item="item" :preview="true" />
      <div class="cart__options">
        <div class="cart__size"><span class="cart__size-title">Размер: </span>EU {{ item.size }}</div>
        <div class="cart__quantity">
          <button @click="catalogStore.quantityDecrease(item.id, item.size)" class="btn btn__square btn__square_grey">-</button>
          <div class="cart__quantity-input">{{ item.quantity }}</div>
          <button @click="catalogStore.quantityIncrease(item.id, item.size)" class="btn btn__square btn__square_grey">+</button>
        </div>
      </div>
    </div>
  </div>
  <CartPrice />
  <button @click="cartPage = 2" class="btn btn__rect cart__price-btn">
    Оформить заказ
    <ArrowRightIcon />
  </button>
</template>

<style scoped lang="scss"></style>
