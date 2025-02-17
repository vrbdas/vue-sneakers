<script setup>
import { inject, computed } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import CartPrice from './CartPrice.vue';
import AppCard from '../AppCard.vue';

const catalogStore = useCatalogStore();
const cartPage = inject('cartPage');
const cartOpen = inject('cartOpen');
const cartIsEmpty = computed(() => catalogStore.cart.length == 0);
</script>

<template>
  <div v-if="!cartIsEmpty" class="cart__wrapper">
    <h2 class="cart__title">Корзина</h2>
    <div class="cart__list">
      <div v-for="item in catalogStore.cart" :key="item.id">
        <AppCard :item="item" :preview="true" />
        <div class="cart__options">
          <div class="cart__size">
            <span class="cart__size-title">Размер: </span>EU {{ item.size }}
          </div>
          <div class="cart__quantity">
            <button
              @click="catalogStore.quantityDecrease(item.id, item.size)"
              class="btn btn__square btn__square_grey"
            >
              -
            </button>
            <div class="cart__quantity-input">{{ item.quantity }}</div>
            <button
              @click="catalogStore.quantityIncrease(item.id, item.size)"
              class="btn btn__square btn__square_grey"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <CartPrice />
    <button @click="cartPage = 1" class="btn btn__rect cart__price-btn">
      Оформить заказ
      <ArrowRightIcon />
    </button>
  </div>
  <div v-else class="cart__wrapper">
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
  </div>
</template>

<style scoped lang="scss"></style>
