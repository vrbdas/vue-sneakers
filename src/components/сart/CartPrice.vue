<script setup>
import { useCatalogStore } from '@/stores/catalogStore';

const catalogStore = useCatalogStore();
</script>

<template>
  <div class="cart__price">
    <div class="cart__price-total">
      <div class="cart__price-text">
        Сумма:
        <span class="cart__price-dots"></span>
        <span span class="cart__price-bold">{{ catalogStore.cartPrice }} ₽</span>
      </div>
      <div class="cart__price-text">
        Доставка:
        <span class="cart__price-dots"></span>
        <span span class="cart__price-bold">Бесплатно</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
