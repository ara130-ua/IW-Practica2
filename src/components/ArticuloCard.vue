<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  nombre: String,
  descripcion_corta: String,
  modelo: String,
  talla: String,
  price: Number,
})
</script>

<template>
  <div class="product-card">
    <div class="product-info">
      <h2 class="product-name">{{ props.nombre || 'Sin nombre' }}</h2>
      <p class="product-description">{{ props.descripcion_corta || 'Sin descripción' }}</p>
      <div class="product-details">
        <p class="product-model">Modelo: {{ props.modelo || 'N/A' }}</p>
        <p class="product-size">Talla: {{ props.talla || 'N/A' }}</p>
      </div>
      <p class="product-price">{{ props.price }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: rgba(224, 221, 221, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  max-width: 300px;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #444;
  margin-bottom: 12px;
}

.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e53e3e;
}
</style>
