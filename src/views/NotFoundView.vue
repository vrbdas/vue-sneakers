<script setup>
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
</script>

<template>
  <section class="not-found">
    <div class="page-empty">
      <img src="/src/assets/png/emoji-2.png" alt="emoji-2" />
      <div class="page-empty__title">Закладок нет :(</div>
      <div class="page-empty__text">Вы ничего не добавляли в закладки</div>
      <button @click="router.push({ name: 'home' })" class="btn btn__rect cart-empty__btn">
        Вернуться назад
        <ArrowLeftIcon />
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
