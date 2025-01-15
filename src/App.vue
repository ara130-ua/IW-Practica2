<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarView from '@/components/NavbarView.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="wrapper-nav">
        <NavbarView />
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
