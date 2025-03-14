import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import FavoriteView from '@/views/FavoriteView.vue';
import ProfileView from '@/views/ProfileView.vue';
import { useCatalogStore } from '@/stores/catalogStore';

const router = createRouter({
  history: createWebHistory('/sneakers/'), // чтобы маршруты искались не в корне, а в /sneakers/
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/:pathMatch(.*)*', // несуществующий маршрут
      redirect: '/',
    },
  ],
});

router.beforeEach((to) => {
  const catalogStore = useCatalogStore();
  catalogStore.loadCatalog();
  catalogStore.cart = JSON.parse(localStorage.getItem('cart')) ?? [];
  catalogStore.favoriteIds = JSON.parse(localStorage.getItem('favoriteIds')) ?? [];
  catalogStore.orders = JSON.parse(localStorage.getItem('orders')) ?? [];
});

export default router;
