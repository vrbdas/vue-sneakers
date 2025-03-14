<script setup>
import AppSlider from '@/components/AppSlider.vue';
import { ref, computed } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import AppCard from '@/components/AppCard.vue';
import SearchIcon from '@/icons/SearchIcon.vue';
import slide1 from '@/assets/png/slide-1.png';
import slide2 from '@/assets/png/slide-2.png';

const search = ref('');
const placeholder = ref(true);
const catalogStore = useCatalogStore();
const catalogSection = ref();
const preloadedImgSrcs = [
  '/src/assets/png/package-icon.png',
  '/src/assets/png/order-success-icon.png',
  '/src/assets/png/emoji-1.png',
  '/src/assets/png/emoji-2.png',
]; // загружаю картинки в скрытом виде, чтобы при открытии компонента корзины они уже были в кэше. вставил их в конце шаблона
const sliderConfig = {
  height: 400,
};

const sliderSlides = ref([
  {
    id: 1,
    imageSrc: slide1, // импортировал картинки вверху чтобы vite их собирал в build
    imageAlt: 'kermit',
    titleHtml: '<span style="color: #8bb43c">Stan Smith</span>,<br />Forever!',
    btnStyle: '',
    btnLink: '',
  },
  {
    id: 2,
    imageSrc: slide2,
    imageAlt: 'gazelle',
    titleHtml: '<span style="color: #ffffff">GAZELLE</span>',
    btnStyle: 'background-color: #3c4041',
    btnLink: '',
  },
]);

const catalogFiltered = computed(() => {
  if (!search.value) return catalogStore.catalog; // не фильтровать если в поиске пусто, для оптимизации. без этой строки тоже будет работать
  const regex = new RegExp(search.value, 'i'); // поиск фразы без учета регистра
  return catalogStore.catalog.filter((item) => regex.test(item.title));
});

const catalogTitle = computed(() => !search.value ? 'Все товары' : `Результаты поиска (${catalogFiltered.value.length} из ${catalogStore.catalog.length})`);

function slideBtnClick(id) {
  // клик по кнопке на любом слайде переходит в каталог. можно добавить по id слайда подсвечивать этот товар
  catalogSection.value.scrollIntoView({
    behavior: 'smooth',
  });
}
</script>

<template>
  <AppSlider :config="sliderConfig" :slides="sliderSlides" @slideBtnClick="slideBtnClick" />
  <section ref="catalogSection" class="catalog">
    <div class="catalog__header">
      <div class="catalog__title">{{ catalogTitle }}</div>
      
      <label class="catalog__search">
        <input
          v-model.trim="search"
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
    <TransitionGroup appear tag="div" name="fade" class="catalog__main" v-if="!catalogStore.loading && catalogFiltered.length > 0">
      <AppCard v-for="item in catalogFiltered" :key="item.id" :item="item" class="catalog__card" />
    </TransitionGroup>
    <div class="catalog__main" v-if="!catalogStore.loading && catalogFiltered.length == 0">
      <span class="catalog__search-notfound">Нет товаров</span>
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
