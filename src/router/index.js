import DetallesArticulo from '@/components/DetallesArticulo.vue'
import FavoritosPage from '@/components/FavoritosPage.vue'
import HomePage from '@/components/HomePage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CarritoPage from '@/components/CarritoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
    },
    {
      path: '/detalles/:id',
      name: 'detalles',
      component: DetallesArticulo,
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: FavoritosPage,
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: CarritoPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
  ],
})

export default router
