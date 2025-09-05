import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/HomeComponent.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/LoginComponent.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/SignupComponent.vue'),
    },
    {
      path: '/social/callback',
      name: 'SocialCallback',
      component: () => import('@/views/SocialCallback.vue'),
    }

  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

