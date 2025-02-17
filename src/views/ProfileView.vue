<script setup>
import { useRouter } from 'vue-router';
import { useCatalogStore } from '@/stores/catalogStore';
import AppCard from '@/components/AppCard.vue';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';

const router = useRouter();
const catalogStore = useCatalogStore();

// id заказа это date.now()
function dateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}
</script>

<template>
  <section v-if="catalogStore.orders.length > 0" class="profile">
    <div class="profile__header">
      <button @click="router.push({ name: 'home' })" class="btn btn__square btn__square_grey">
        <div class="arrow-sign-left"></div>
      </button>
      <div class="profile__title">Мои заказы</div>
    </div>
    <div class="profile__orders">
      <div
        v-for="order in catalogStore.orders"
        :key="order.id"
        :item="order"
        class="profile__order"
      >
        <div class="profile__order-title">
          <div>
            Заказ номер <span>{{ order.orderId }}</span> от {{ dateFromTimestamp(order.orderId) }}
          </div>
          <div>
            Сумма: <span>{{ order.orderPrice }}</span> ₽
          </div>
        </div>
        <div class="profile__order-list">
          <div appear tag="div" name="fade" v-for="item in order.orderItems" :key="item.id">
            <AppCard :item="item" :preview="true" />
            <div class="profile__order-item-info">
              <div><span class="profile__order-item-title">Размер: </span>EU {{ item.size }}</div>
              <div>
                <span class="profile__order-item-title">Количество: </span> {{ item.quantity }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="page-empty">
    <img src="/src/assets/png/emoji-1.png" alt="emoji-1" />
    <div class="page-empty__title">У вас нет заказов</div>
    <div class="page-empty__text">Оформите хотя бы один заказ</div>
    <button @click="router.push({ name: 'home' })" class="btn btn__rect cart-empty__btn">
      Вернуться назад
      <ArrowLeftIcon />
    </button>
  </section>
</template>

<style scoped lang="scss">
.profile {
  &__orders {
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-rows: auto;
  }

  &__order {
    padding: 20px;
    border-radius: 40px;
    background: #ffffff;
    border: 1px solid rgb(243, 243, 243);
    display: grid;
    grid-template-rows: auto;
    gap: 20px;
    &-title {
      display: flex;
      justify-content: space-between;
      span {
        font-weight: 700;
      }
    }
    &-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }
    &-item {
      &-title {
        color: #9b9b9b;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
      }
      &-info {
        font-size: 14px;
      }
    }
  }
}
</style>
