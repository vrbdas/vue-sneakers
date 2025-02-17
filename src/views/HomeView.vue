<script setup>
import AppSlider from '@/components/AppSlider.vue';
import { ref } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import AppCard from '@/components/AppCard.vue';
import SearchIcon from '@/icons/SearchIcon.vue';

const search = ref('');
const placeholder = ref(true);
const catalogStore = useCatalogStore();
const catalogSection = ref();
const preloadedImgSrcs = ['/src/assets/png/package-icon.png', '/src/assets/png/order-success-icon.png', '/src/assets/png/emoji-1.png', '/src/assets/png/emoji-2.png']; // загружаю картинки в скрытом виде, чтобы при открытии компонента корзины они уже были в кэше. вставил их в конце шаблона
const sliderConfig = {
  height: 400,
};

const sliderSlides = ref([
  {
    id: 1,
    imageSrc: '/src/assets/png/slide-1.png',
    imageAlt: 'kermit',
    titleHtml: '<span style="color: #8bb43c">Stan Smith</span>,<br />Forever!',
    btnStyle: '',
    btnLink: '',
  },
  {
    id: 2,
    imageSrc: '/src/assets/png/slide-2.png',
    imageAlt: 'gazelle',
    titleHtml: '<span style="color: #ffffff">GAZELLE</span>',
    btnStyle: 'background-color: #3c4041',
    btnLink: '',
  },
]);

function slideBtnClick(id) { // клик по кнопке на любом слайде переходит в каталог. можно  добавить по id слайда переходить в конкретное место каталога
  catalogSection.value.scrollIntoView({
    behavior: 'smooth',
  });
}

</script>

<template>
  <AppSlider :config="sliderConfig" :slides="sliderSlides" @slideBtnClick="slideBtnClick" />
  <section ref="catalogSection" class="catalog">
    <div class="catalog__header">
      <div class="catalog__title">Все кроссовки</div>
      <label class="catalog__search">
        <input
          v-model="search"
          @focus="placeholder = false"
          @blur="placeholder = true"
          type="text"
          class="catalog__search-input"
        />
        <span v-if="placeholder && !search" class="catalog__search-placeholder">
          <SearchIcon />
          Поиск
        </span>
      </label>
    </div>
    <div v-if="catalogStore.loading" class="loader"></div>
    <div v-else class="catalog__main">
      <AppCard
        v-for="item in catalogStore.catalog"
        :key="item.id"
        :item="item"
        class="catalog__card"
      />
    </div>
  </section>

  <div style="display: none">
    <img v-for="img in preloadedImgSrcs" :key="img" :src="img" />
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
