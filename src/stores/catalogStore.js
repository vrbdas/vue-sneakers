import { ref, computed, watch } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useCatalogStore = defineStore('catalogStore', () => {
  const catalog = ref([]);
  const loading = ref(false);
  const favoriteIds = ref([]);
  const orders = ref([]);
  const cart = ref([]);

  const favorite = computed(() => {
    const res = [];
    favoriteIds.value.forEach((favoriteId) => {
      const item = catalog.value.find((item) => item.id === favoriteId);
      if (item) res.push(item);
    });
    return res;
  });

  const cartPrice = computed(() => {
    let summ = 0;
    cart.value.forEach(item => {
      summ += item.price * item.quantity;
    })
    return summ;
  });

  const url = 'https://vue-sneakers-ff7ec-default-rtdb.asia-southeast1.firebasedatabase.app/.json';

  async function loadCatalog() {
    loading.value = true;
    try {
      const response = await axios.get(url);
      catalog.value = response.data;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }

  function cartItemIdx(id, size) {
    return cart.value.findIndex((item) => item.id == id && item.size == size);
  }

  function addToCart(id, size) {
    const idx = cartItemIdx(id, size);
    if (idx == -1) {
      const res = catalog.value.find((item) => item.id == id);
      const { sizes, ...filteredRes } = res; // убираю sizes
      cart.value.push({
        ...filteredRes,
        size: size,
        quantity: 1, // добавляю количество, 1 по умолчанию
      });
    }
  }

  function deleteFromCart(id, size) {
    const idx = cartItemIdx(id, size);
    if (idx > -1) {
      cart.value.splice(idx, 1);
    }
  }

  function quantityDecrease(id, size) {
    const idx = cartItemIdx(id, size);
    cart.value[idx].quantity--;
    if(cart.value[idx].quantity < 1) {
      deleteFromCart(id, size);
    }
  }

  function quantityIncrease(id, size) {
    const idx = cartItemIdx(id, size);
    cart.value[idx].quantity++;
  }

  function switchFavorite(id) {
    const index = favoriteIds.value.indexOf(id);
    if (index == -1) {
      favoriteIds.value.push(id);
    } else {
      favoriteIds.value.splice(index, 1);
    }
  }

  watch(
    () => cart.value,
    (newValue) => {
      if (cart.value.length > 0) {
        localStorage.setItem('cart', JSON.stringify(newValue));
      } else {
        localStorage.removeItem('cart');
      }
    },
    { deep: true }
  );

  watch(
    () => favoriteIds.value,
    (newValue) => {
      if (favoriteIds.value.length > 0) {
        localStorage.setItem('favoriteIds', JSON.stringify(newValue));
      } else {
        localStorage.removeItem('favoriteIds');
      }
    },
    { deep: true }
  );

  watch(
    () => orders.value,
    (newValue) => {
      if (orders.value.length > 0) {
        localStorage.setItem('orders', JSON.stringify(newValue));
      } else {
        localStorage.removeItem('orders');
      }
    },
    { deep: true }
  );

  return {
    catalog,
    loadCatalog,
    loading,
    cart,
    cartPrice,
    addToCart,
    deleteFromCart,
    favoriteIds,
    favorite,
    switchFavorite,
    orders,
    quantityDecrease,
    quantityIncrease,
  };
});
