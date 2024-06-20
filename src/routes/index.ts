import { createWebHistory, createRouter } from 'vue-router';
import store from '@/store';

import LoginView from '@/User/views/LoginView.vue';
import HomeView from '@/Home/views/HomeView.vue';

const routes = [
  { name: 'Home', path: '/', component: HomeView },
  { name: 'Login', path: '/login', component: LoginView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = !!store.getters.getToken;
  if (!isAuthenticated && to.name !== 'Login') next('/login');
  else next();
});

export default router;
