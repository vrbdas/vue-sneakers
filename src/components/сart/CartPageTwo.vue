<script setup>
import { inject } from 'vue';
import CartPrice from '@/components/сart/CartPrice.vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { citiesRu, citiesKz } from '@/data/cities';
import { useCatalogStore } from '@/stores/catalogStore';

const catalogStore = useCatalogStore();
const cartPage = inject('cartPage');
const phoneRegExp = /^\+([1-9]\d{1,14})$/;

yup.setLocale({
  mixed: {
    required: 'Поле обязательно для заполнения',
  },
  string: {
    min: 'Минимальная длина ${min} символов',
    max: 'Максимальная длина ${max} символов',
  },
});

const schema = yup.object({
  name: yup.string().trim().required().min(2).max(50),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Введите номер в международном формате, пример: +79991234567'),
  city: yup.string().required('Выберите город'),
  address: yup.string().trim().required().min(5).max(100),
});

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    city: '',
  },
});

const [name] = defineField('name');
const [phone, phoneAttrs] = defineField('phone', {});
const [city, cittyAttrs] = defineField('city', {});
const [address, addressAttrs] = defineField('address', {});

const onSubmit = handleSubmit((formData) => {
  catalogStore.orders.push({
    orderId: Date.now(),
    orderData: formData,
    orderItems: catalogStore.cart,
    orderPrice: catalogStore.cartPrice,
  });
  resetForm();
  cartPage.value = 2;
  catalogStore.cart = [];
});
</script>

<template>
  <div class="cart__wrapper">
    <h2 class="cart__title">
      <button class="btn btn__square btn__square_grey" @click="cartPage = 0">
        <div class="arrow-sign-left"></div>
      </button>
      Корзина
    </h2>
    <form class="cart__form" @submit.prevent>
      <label>
        Ваше имя
        <input v-model="name" type="text" placeholder="Введите имя" />
        <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
      </label>
      <label>
        Ваш телефон
        <input
          v-model="phone"
          v-bind="phoneAttrs"
          type="text"
          placeholder="Введите номер телефона"
        />
        <span v-if="errors.phone" class="form-error">{{ errors.phone }}</span>
      </label>
      <label>
        Ваш город
        <select v-model="city" v-bind="cittyAttrs">
          <option disabled value="Выберите город">Выберите город</option>
          <optgroup label="Россия">
            <option v-for="city in citiesRu" :key="city.id" :value="city.name">
              {{ city.name }}
            </option>
          </optgroup>
          <optgroup label="Казахстан">
            <option v-for="city in citiesKz" :key="city.id" :value="city.name">
              {{ city.name }}
            </option>
          </optgroup>
        </select>
        <span v-if="errors.city" class="form-error">{{ errors.city }}</span>
      </label>
      <label>
        Адрес доставки
        <textarea
          v-model="address"
          v-bind="addressAttrs"
          rows="4"
          placeholder="Введите адрес"
        ></textarea>
        <span v-if="errors.address" class="form-error">{{ errors.address }}</span>
      </label>
    </form>
    <CartPrice />
    <button class="btn btn__rect" @click="onSubmit">Завершить оформление</button>
  </div>
</template>

<style scoped lang="scss"></style>
