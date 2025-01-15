<script setup>
// No se requieren cambios en la sección de script
</script>

<template>
  <div class="home-page">
    <div class="image-container">
      <img
        src="@/assets/img-homepage.avif"
        alt="Imagen principal homepage"
        class="home-page-image"
      />
      <div class="text-overlay">
        <div class="text-content">
          <h1 class="home-page-title">Welcome to SPORTIVE</h1>
          <p class="home-page-subtitle">The best place to find sportswear</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.image-container {
  position: relative;
  width: 60%;
  aspect-ratio: 16 / 9; /* Ajusta esto según la proporción de tu imagen */
  overflow: hidden;
  box-shadow:
    inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}

.home-page-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4); /* Fondo semitransparente */
}

.text-content {
  text-align: center;
  color: white;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0.5rem;
}

.home-page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.home-page-subtitle {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .image-container {
    width: 90%;
  }

  .home-page-title {
    font-size: 2rem;
  }

  .home-page-subtitle {
    font-size: 1rem;
  }
}
</style>
