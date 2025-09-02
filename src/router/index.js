import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/HomeComponent.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

