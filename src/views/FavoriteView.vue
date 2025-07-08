<script setup>
import { useCatalogStore } from '@/stores/catalogStore';
import AppCard from '@/components/AppCard.vue';
import { useRouter } from 'vue-router';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

const catalogStore = useCatalogStore();
const router = useRouter();
</script>

<template>
  <section v-if="catalogStore.favorite.length > 0" class="favorite">
    <div class="favorite__header">
      <button class="btn btn__square btn__square_grey" @click="router.push({ name: 'home' })">
        <div class="arrow-sign-left"></div>
      </button>
      <div class="favorite__title">Мои закладки</div>
    </div>
    <div v-if="catalogStore.loading" class="loader"></div>
    <div v-else class="favorite__main">
      <AppCard
        v-for="item in catalogStore.favorite"
        :key="item.id"
        :item="item"
        class="catalog__card"
      />
    </div>
  </section>

  <section v-else class="page-empty">
    <img src="/src/assets/png/emoji-2.png" alt="emoji-2" />
    <div class="page-empty__title">Закладок нет :(</div>
    <div class="page-empty__text">Вы ничего не добавляли в закладки</div>
    <button class="btn btn__rect cart-empty__btn" @click="router.push({ name: 'home' })">
      Вернуться назад
      <ArrowLeftIcon />
    </button>
  </section>
</template>

<style scoped lang="scss"></style>
