<script setup>
import { inject, computed } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import { useRouter } from 'vue-router';
import CartIcon from '@/icons/CartIcon.vue';
import HeartIcon from '@/icons/HeartIcon.vue';
import ProfileIcon from '@/icons/ProfileIcon.vue';

const cartOpen = inject('cartOpen');
const catalogStore = useCatalogStore();
const router = useRouter();

const cartIconColor = computed(() => catalogStore.cartPrice > 0 ? '#000000' : '#9B9B9B');
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div @click="router.push({name: 'home'})" class="header__logo">
          <img class="header__logo-img" src="/src/assets/png/logo.png" alt="logo" />
          <div>
            <h1 class="header__logo-title">VUE SNEAKERS</h1>
            <p class="header__logo-text">Магазин лучших кроссовок</p>
          </div>
        </div>
        <div class="header__nav">
          <a @click="cartOpen = true" class="header__nav-link header__nav-link-cart">
            <CartIcon :color="cartIconColor" />
            <span v-if="catalogStore.cartPrice > 0" class="header__nav-link-cart-full">{{ catalogStore.cartPrice }} ₽</span>
            <span v-else :class="cartOpen ? 'header__nav-link-cart-empty' : ''">Корзина</span>
          </a>
          <RouterLink class="header__nav-link" :to="{name: 'favorite'}">
            <HeartIcon width="20" height="20" fill="none" stroke="#9B9B9B"/>
            Закладки
          </RouterLink>
          <RouterLink class="header__nav-link" :to="{name: 'profile'}">
            <ProfileIcon />
            Заказы
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
