<template>
  <div class="favoritos-container">
    <h1>Mis Artículos Favoritos</h1>
    <div v-if="favoritos.length === 0" class="sin-favoritos">
      <p>No tienes artículos favoritos aún.</p>
    </div>
    <ul v-else class="lista-favoritos">
      <li v-for="articulo in favoritos" :key="articulo.id" class="articulo-favorito">
        <img :src="articulo.imagen" :alt="articulo.nombre" class="imagen-articulo" />
        <div class="info-articulo">
          <h2>{{ articulo.nombre }}</h2>
          <p class="descripcion">{{ articulo.descripcion }}</p>
          <p class="precio">{{ formatPrecio(articulo.precio) }}</p>
        </div>
        <button
          @click="eliminarFavorito(articulo.id)"
          class="btn-eliminar"
          aria-label="Eliminar de favoritos"
        >
          ×
        </button>
        <button @click="irDetalles(articulo.id)">Detalles</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { eliminarListaDeDeseos, obtenerListaDeseos } from '@/repository/favoritos'
import router from '@/router'
import { userStore } from '@/stores/userStore'

export default {
  name: 'ArticulosFavoritos',
  setup() {},
  data() {
    return {
      favoritos: [],
    }
  },
  async created() {
    const user = userStore()
    this.favoritos = await obtenerListaDeseos(user.uid)
  },
  methods: {
    formatPrecio(precio) {
      return `$${precio.toFixed(2)}`
    },
    async eliminarFavorito(id) {
      // Eliminar el artículo de la lista de favoritos
      const user = userStore()
      await eliminarListaDeDeseos(user.uid, id)
      this.favoritos = this.favoritos.filter((articulo) => articulo.id !== id)
      // Aquí se podría agregar lógica adicional, como actualizar el estado en un store o enviar una petición al servidor
      alert(`Artículo con ID ${id} eliminado de favoritos`)
    },
    irDetalles(id) {
      router.push(`/detalles/${id}`)
    },
  },
}
</script>

<style scoped>
.favoritos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.sin-favoritos {
  text-align: center;
  color: #666;
  font-style: italic;
}

.lista-favoritos {
  list-style-type: none;
  padding: 0;
}

.articulo-favorito {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
  position: relative;
}

.imagen-articulo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.info-articulo {
  flex-grow: 1;
}

h2 {
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #333;
}

.descripcion {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.precio {
  font-weight: bold;
  color: #e53e3e;
}

.btn-eliminar {
  background-color: #f56565;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.btn-eliminar:hover {
  background-color: #e53e3e;
}

@media (max-width: 600px) {
  .articulo-favorito {
    flex-direction: column;
    align-items: flex-start;
  }

  .imagen-articulo {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .btn-eliminar {
    top: 10px;
    right: 10px;
  }
}
</style>
