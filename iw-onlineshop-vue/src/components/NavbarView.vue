<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <RouterLink class="router-link"> Shop </RouterLink>
      <RouterLink class="router-link"> Collections </RouterLink>
      <RouterLink class="router-link"> About </RouterLink>
    </div>
    <div class="navbar-center">
      <RouterLink to="/" class="router-link">
        <h1 class="title-navbar">SPORTIVE</h1>
      </RouterLink>
    </div>
    <div class="navbar-right">
      <RouterLink class="router-link">Login</RouterLink>
      <RouterLink class="router-link">Register</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.router-link {
  text-decoration: none;
  color: #333;
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
}
</style>
