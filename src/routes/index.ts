import { createWebHistory, createRouter } from 'vue-router';
import store from '@store';

import LoginView from '@views/LoginView.vue';
import HomeView from '@views/HomeView.vue';

const routes = [
  { name: 'Home', path: '/', component: HomeView },
  { name: 'Login', path: '/login', component: LoginView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = !!store.state.token;
  if (!isAuthenticated && to.name !== 'Login') next('/login');
  else next();
});

export default router;
