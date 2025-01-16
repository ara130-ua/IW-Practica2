<script setup>
import { getArticuloById } from '@/repository/articulos'
import { articuloEnCarrito, agregarArticuloAlCarrito } from '@/repository/carrito'
import {
  addListaDeDeseos,
  eliminarListaDeDeseos,
  estaEnListaDeDeseos,
} from '@/repository/favoritos'
import { userStore } from '@/stores/userStore'
import { onMounted } from 'vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Referencias y estados reactivos
var articulo = ref({
  id: 0,
  nombre: '',
  descripcion: '',
  modelo: '',
  talla: '',
  precio: 0,
  descuento: 0,
  imagen: '/placeholder.svg?height=300&width=300',
})

var esFavorito = ref(false)
const router = useRouter()
const user = userStore()

// Computed para el precio final
const precioFinal = computed(() =>
  articulo.value.descuento > 0
    ? articulo.value.precio - articulo.value.descuento
    : articulo.value.precio,
)

// Cargar detalles del artículo al montar el componente
onMounted(async () => {
  articulo.value = await getArticuloById(router.currentRoute.value.params.id)
})

// Métodos
const formatPrecio = (precio) => `$${precio.toFixed(2)}`

const comprar = () => {
  const user = userStore()
  if (user.isLoggedIn) {
    alert('Procesando compra...')
    // Lógica para procesar la compra
  } else {
    alert('Debes iniciar sesión para comprar')
    router.push('/login')
    // Lógica para redirigir al usuario a la página de login
  }
}

const agregarAlCarrito = async () => {
  if (await articuloEnCarrito(user.uid, articulo.value.id)) {
    alert('El artículo ya está en el carrito')
    return
  } else {
    await agregarArticuloAlCarrito(user.uid, articulo.value.id)
    alert('Artículo añadido al carrito')
  }
}

const toggleFavorito = async () => {
  //Revisar si el artículo es favorito o no
  esFavorito.value = await estaEnListaDeDeseos(user.uid, articulo.value.id)
  if (!esFavorito.value) {
    alert('Añadido a favoritos')
    await addListaDeDeseos(user.uid, articulo.value.id)
  } else {
    alert('Quitado de favoritos')
    await eliminarListaDeDeseos(user.uid, articulo.value.id)
  }
}
</script>

<template>
  <div class="detalles-articulo">
    <div class="imagen-producto">
      <!-- <img :src="articulo.imagen" :alt="articulo.nombre" /> -->
    </div>
    <div class="info-producto">
      <h1>{{ articulo.nombre }}</h1>
      <p class="descripcion">{{ articulo.descripcion }}</p>
      <p class="modelo">Modelo: {{ articulo.modelo }}</p>
      <p class="talla">Talla: {{ articulo.talla }}</p>
      <div class="precio">
        <span v-if="articulo.descuento" class="precio-original">{{
          formatPrecio(articulo.precio)
        }}</span>
        <span class="precio-actual">{{ formatPrecio(precioFinal) }}</span>
      </div>
      <div class="acciones">
        <button @click="comprar" class="btn-comprar">Comprar ahora</button>
        <button @click="agregarAlCarrito" class="btn-carrito">Añadir al carrito</button>
        <button @click="toggleFavorito" class="btn-favorito" :class="{ 'es-favorito': esFavorito }">
          <span class="sr-only">{{
            esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'
          }}</span>
          ♥
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detalles-articulo {
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.imagen-producto {
  flex: 1;
  margin-right: 20px;
}

.imagen-producto img {
  max-width: 100%;
  height: auto;
}

.info-producto {
  flex: 1;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.descripcion {
  margin-bottom: 15px;
  line-height: 1.5;
}

.modelo,
.talla {
  margin-bottom: 10px;
}

.precio {
  font-size: 20px;
  margin-bottom: 20px;
}

.precio-original {
  text-decoration: line-through;
  color: #888;
  margin-right: 10px;
}

.precio-actual {
  font-weight: bold;
  color: #e53e3e;
}

.acciones {
  display: flex;
  gap: 10px;
}

.btn-comprar,
.btn-carrito,
.btn-favorito {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-comprar {
  background-color: #48bb78;
  color: white;
}

.btn-comprar:hover {
  background-color: #38a169;
}

.btn-carrito {
  background-color: #4299e1;
  color: white;
}

.btn-carrito:hover {
  background-color: #3182ce;
}

.btn-favorito {
  background-color: #f56565;
  color: white;
}

.btn-favorito:hover,
.btn-favorito.es-favorito {
  background-color: #33c2df;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (max-width: 768px) {
  .detalles-articulo {
    flex-direction: column;
  }

  .imagen-producto {
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>
