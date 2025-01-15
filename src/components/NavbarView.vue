<script setup>
import { RouterLink } from 'vue-router'
import { userStore } from '@/stores/userStore'
import { ref, onMounted, onUnmounted } from 'vue'

const user = userStore()
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (!e.target.closest('.dropdown')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const logOut = async () => {
  user.signOut()
}
</script>

<template>
  <nav class="navbar">
    <div class="nabar-left"></div>
    <div class="navbar-center">
      <RouterLink to="/" class="router-link">
        <h1 class="title-navbar">SPORTIVE</h1>
      </RouterLink>
    </div>

    <div class="navbar-right">
      <div v-if="!user.email">
        <RouterLink class="router-link" to="/login" @click="toggleDropdown">Login</RouterLink>
        <RouterLink class="router-link" to="/register" @click="toggleDropdown">Register</RouterLink>
      </div>
      <div class="dropdown" v-if="user.email">
        <button @click="toggleDropdown" class="dropdown-button">Menú</button>
        <ul v-if="isDropdownOpen" class="dropdown-menu">
          <li>
            <RouterLink to="/perfil" @click="toggleDropdown">Perfil</RouterLink>
          </li>
          <li>
            <RouterLink to="/carrito" @click="toggleDropdown">Carrito</RouterLink>
          </li>
          <li>
            <RouterLink to="/favoritos" @click="toggleDropdown">Favoritos</RouterLink>
          </li>
          <li>
            <RouterLink to="/login" @click="logOut">Cerrar sesión</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link {
  text-decoration: none;
  color: #333;
  margin-right: 1rem;
}

.title-navbar {
  font-size: 2rem;
  font-family: 'Adlam Display', sans-serif;
  font-weight: bold;
  color: #333;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left,
.navbar-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  list-style-type: none;
  z-index: 1000;
  min-width: 120px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
}

.dropdown-menu a {
  color: #333;
  text-decoration: none;
  display: block;
}

.dropdown-menu a:hover {
  background-color: #e9ecef;
}
</style>
