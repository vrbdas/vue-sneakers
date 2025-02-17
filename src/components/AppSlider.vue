<script setup>
import { ref } from 'vue';
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';

const emit = defineEmits(['slideBtnClick']);
const props = defineProps(['slides', 'config']);
const carouselRef = ref();
const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();

function btnClickHaldle(id) {
  emit('slideBtnClick', id);
}
</script>

<template>
  <div class="carousel__wrapper">
    <Carousel ref="carouselRef" v-bind="config">
      <Slide v-for="slide in slides" :key="slide.id">
        <img :src="slide.imageSrc" :alt="slide.imageAlt" />
        <div class="carousel__slide-title">
          <div v-html="slide.titleHtml" class="carousel__slide-title-html"></div>
          <button @click="btnClickHaldle(slide.id)" class="carousel__slide-btn" :style="slide.btnStyle" :href="slide.btnLink">
            Купить
          </button>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
    <button
      v-if="carouselRef?.data?.currentSlide > carouselRef?.data?.minSlide"
      class="carousel__prev-btn"
      @click="prev"
    >
    <div class="arrow-sign-left"></div>
    </button>
    <button
      v-if="carouselRef?.data?.currentSlide < carouselRef?.data?.maxSlide"
      class="carousel__next-btn"
      @click="next"
    >
      <div class="arrow-sign-right"></div>
    </button>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  &__wrapper {
    position: relative;
  }
  &__viewport {
    border-radius: 20px;
  }
  &__slide {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &-title {
      position: absolute;
      top: 50%;
      left: 86px;
      transform: translate(0, -50%);
      display: flex;
      flex-direction: column;
      gap: 15px;
      &-html {
        font-size: 38px;
        font-weight: 700;
      }
    }
    &-btn {
      border: none;
      border-radius: 110px;
      padding: 15px 50px;
      background-color: #8bb43c;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      cursor: pointer;
      width: fit-content;
      min-width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      word-break: break-all;
      text-transform: uppercase;
      transition: all 0.3s ease;
      opacity: 0.9;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__prev-btn,
  &__next-btn {
    width: 35px;
    height: 35px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
    position: absolute;
    top: 50%;
    z-index: 1;
    border-radius: 100%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }

  &__prev-btn {
    transform: translate(-50%, -50%);
  }

  &__next-btn {
    right: 0;
    transform: translate(50%, -50%);
  }
}
</style>
