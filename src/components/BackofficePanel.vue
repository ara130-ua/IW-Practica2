<template>
  <div class="backoffice-container">
    <nav class="sidebar">
      <div class="logo">
        <h1>SPORTIVE</h1>
      </div>
      <ul class="nav-links">
        <li>
          <button
            @click="activeComponent = 'pedidos'"
            :class="{ active: activeComponent === 'pedidos' }"
          >
            Gestión de Pedidos
          </button>
        </li>
        <li>
          <button
            @click="activeComponent = 'articulos'"
            :class="{ active: activeComponent === 'articulos' }"
          >
            Gestión de Artículos
          </button>
        </li>
        <li>
          <button
            @click="activeComponent = 'categorias'"
            :class="{ active: activeComponent === 'categorias' }"
          >
            Gestión de Categorías
          </button>
        </li>
      </ul>
    </nav>

    <main class="main-content">
      <component :is="activeComponent"></component>
    </main>
  </div>
</template>

<script>
import GestionPedidos from '@/components/GestionPedidos.vue'
import GestionArticulos from '@/components/GestionArticulos.vue'
import GestionCategorias from '@/components/GestionCategorias.vue'
import { userStore } from '@/stores/userStore'
import router from '@/router'

export default {
  name: 'BackofficePanel',
  components: {
    pedidos: GestionPedidos,
    articulos: GestionArticulos,
    categorias: GestionCategorias,
  },
  created() {
    const user = userStore()
    if (!user.isLoggedIn || !user.isAdmin) {
      router.push('/')
    }
  },
  data() {
    return {
      activeComponent: 'pedidos',
    }
  },
}
</script>

<style scoped>
.backoffice-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.logo {
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid #34495e;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.nav-links button {
  width: 100%;
  padding: 12px 20px;
  text-align: left;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.nav-links button:hover {
  background-color: #34495e;
}

.nav-links button.active {
  background-color: #3498db;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
