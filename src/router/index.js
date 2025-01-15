import DetallesArticulo from '@/components/DetallesArticulo.vue'
import FavoritosPage from '@/components/FavoritosPage.vue'
import HomePage from '@/components/HomePage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CarritoPage from '@/components/CarritoPage.vue'
import UserProfile from '@/components/UserProfile.vue'
import BackofficePanel from '@/components/BackofficePanel.vue'
import GestionPedidos from '@/components/GestionPedidos.vue'
import GestionArticulos from '@/components/GestionArticulos.vue'
import GestionCategorias from '@/components/GestionCategorias.vue'

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
    {
      path: '/perfil',
      name: 'perfil',
      component: UserProfile,
    },
    {
      path: '/office',
      name: 'office',
      component: BackofficePanel,
    },
    {
      path: '/office/pedidos',
      name: 'pedidos',
      component: GestionPedidos,
    },
    {
      path: '/office/articulos',
      name: 'articulos',
      component: GestionArticulos,
    },
    {
      path: '/office/categorias',
      name: 'categorias',
      component: GestionCategorias,
    },
  ],
})

export default router
