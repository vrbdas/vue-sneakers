<script setup>
import { ref } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';
import { computed } from 'vue';
import HeartIcon from '@/icons/HeartIcon.vue';
import CartIcon from '@/icons/CartIcon.vue';

const catalogStore = useCatalogStore();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  preview: {
    type: Boolean,
    required: false,
  },
});
const ispreview = computed(() => (props.preview ? 'preview' : ''));
const select = ref(null);
const isHighlighted = ref(false);
const isHighlightedClass = computed(() => (isHighlighted.value ? 'highlighted' : ''));
const selectOpen = ref(false);
const itemSize = ref(null);
const sizesList = computed(() => props.item.sizes.filter((size) => size != itemSize.value));

function cartBtnClick() {
  if (itemSize.value) {
    catalogStore.addToCart(props.item.id, itemSize.value);
    itemSize.value = null;
  } else {
    for (let i = 1; i < 5; i++) {
      // мигалка - setTimeout с разной задержкой
      setTimeout(() => (isHighlighted.value = !isHighlighted.value), i * 100);
    }
  }
}

const priceOld = computed(() => Math.floor(props.item.price * 1.1 / 100) * 100);
</script>

<template>
  <div :class="`card ${ispreview}`" @mouseleave="selectOpen = false">
    <button
      v-if="!preview"
      @click="catalogStore.switchFavorite(item.id)"
      class="btn btn__square card__like"
    >
      <HeartIcon
        width="24"
        height="24"
        :fillColor="catalogStore.favoriteIds.includes(item.id) ? '#FF8585' : 'none'"
        :strokeColor="catalogStore.favoriteIds.includes(item.id) ? '#FF8585' : '#9B9B9B'"
      />
    </button>
    <img
      :class="`card__img ${ispreview}`"
      :src="item.imageUrl"
      :alt="`sneakers-${item.id}`"
    />
    <p class="card__title">{{ item.title }}</p>
    <div v-if="!preview" class="card__size">
      <span class="card__size-title">Размер:</span>
      <div
        @click.stop="selectOpen = !selectOpen"
        class="card__size-wrapper"
        :class="isHighlightedClass"
      >
        <span>{{ itemSize ? `EU ${itemSize}` : '' }}</span>
        <Transition name="fade">
          <div ref="select" v-if="selectOpen" class="card__size-select">
            <div
              v-for="size in sizesList"
              :key="size"
              @click="itemSize = size"
              class="card__size-select-item"
            >
              EU {{ size }}
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div class="card__footer">
      <div class="card__price">
        <span v-if="!ispreview" class="card__price_old">{{ priceOld }} ₽</span>
        <span class="card__price_current">{{ item.price }} ₽</span>
      </div>
      <button v-if="!preview" @click="cartBtnClick" class="btn btn__square btn__square_green">
        <CartIcon color="#ffffff" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 40px;
  background: rgb(255, 255, 255);
  padding: 20px;
  position: relative;
  display: grid;
  grid-template-rows: auto;
  gap: 14px;
  &.preview {
    grid-template: repeat(2, 1fr) / repeat(2, auto);
    align-items: center;
    column-gap: 20px;
    row-gap: 0;
  }

  &__like {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  &__img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    &.preview {
      grid-row: span 2;
      max-height: 70px;
      max-width: 90px;
    }
  }
  &__title {
    font-size: 14px;
    font-weight: 400;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__price {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 16px;
    font-weight: 700;
    &_old {
      color: #9b9b9b;
      font-size: 14px;
      font-weight: 500;
      text-decoration: line-through;
    }
  }
  &__size {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    text-align: center;
    &-title {
      color: #9b9b9b;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }
    &-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      background-color: #fff;
      color: #000;
      border: 2px solid #f0f1f2;
      border-radius: 8px;
      padding: 4px 20px;
      height: 32px;
      position: relative;
      cursor: pointer;
    }
    &-select {
      width: 100%;
      position: absolute;
      top: 30px;
      left: 50%;
      display: flex;
      flex-direction: column;
      gap: 2px;
      transform: translate(-50%, 0);
      z-index: 10;
      padding: 2px 0;
      &-item {
        height: 32px;
        background-color: #fff;
        border: 2px solid #f0f1f2;
        border-radius: 8px;
        padding: 4px 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: #beda8a;
        }
      }
    }
  }
}

.highlighted {
  outline: 2px solid red;
}
</style>
