import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/productsAdnin',
      name: 'productsAdnin',
      component: () => import('../views/ProductsAdminView.vue'),
    },
    {
      path: '/productsCustomer',
      name: 'productsCustomer',
      component: () => import('../views/ProductsCustomerView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue'),
    },
  ],
});

export default router;
