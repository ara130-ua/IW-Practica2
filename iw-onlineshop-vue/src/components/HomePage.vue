<script setup></script>

<template>
  <div class="home-page">
    <img src="@/assets/img-homepage.avif" alt="Imagen principal" class="home-page-image" />
    <div class="text-overlay">
      <h1 class="home-page-title">Welcome to SPORTIVE</h1>
      <p class="home-page-subtitle">The best place to find sportswear</p>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
}
</style>
