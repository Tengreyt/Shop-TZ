import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Product from '../pages/Product.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: Product }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
