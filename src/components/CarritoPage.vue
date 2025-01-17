<template>
  <div class="carrito-container">
    <h1>Mi Carrito de Compras</h1>
    <div v-if="productosEnCarrito.length === 0" class="carrito-vacio">
      <p>Tu carrito está vacío.</p>
      <button @click="irATienda" class="btn-tienda">Ir a la tienda</button>
    </div>
    <div v-else>
      <ul class="lista-productos">
        <li v-for="producto in productosEnCarrito" :key="producto.id" class="producto-item">
          <img :src="producto.imagen" :alt="producto.nombre" class="producto-imagen" />
          <div class="producto-info">
            <h2>{{ producto.nombre }}</h2>
            <p class="producto-descripcion">{{ producto.descripcion }}</p>
            <p class="producto-precio">{{ formatPrecio(producto.precio) }}</p>
          </div>
          <div class="producto-cantidad">
            <button
              @click="decrementarCantidad(producto)"
              class="btn-cantidad"
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span>{{ producto.cantidad }}</span>
            <button
              @click="incrementarCantidad(producto)"
              class="btn-cantidad"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
          <button
            @click="eliminarProducto(producto.id)"
            class="btn-eliminar"
            aria-label="Eliminar producto"
          >
            ×
          </button>
        </li>
      </ul>
      <div class="resumen-carrito">
        <p class="total">Total: {{ formatPrecio(totalCarrito) }}</p>
        <button @click="comprarCarrito" class="btn-comprar">Comprar Carrito</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  actualizarCantidad,
  eliminarArticuloDelCarrito,
  obtenerCarrito,
  comprarCarrito
} from '@/repository/carrito'
import router from '@/router'
import { userStore } from '@/stores/userStore'
import { Pedido } from '@/repository/pedido';
import { mandarPararelaPago } from '@/repository/articulos';
export default {
  name: 'CarritoCompras',
  data() {
    return {
      productosEnCarrito: [],
    }
  },
  computed: {
    totalCarrito() {
      return this.productosEnCarrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad
      }, 0)
    },
  },
  async created() {
    const user = userStore()
    this.productosEnCarrito = await obtenerCarrito(user.uid)
  },
  methods: {
    formatPrecio(precio) {
      return `$${precio.toFixed(2)}`
    },
    async incrementarCantidad(producto) {
      producto.cantidad++
      const user = userStore()
      await actualizarCantidad(user.uid, producto.id, producto.cantidad)
    },
    async decrementarCantidad(producto) {
      const user = userStore()
      if (producto.cantidad > 1) {
        producto.cantidad--
        await actualizarCantidad(user.uid, producto.id, producto.cantidad)
      } else {
        this.eliminarProducto(producto.id)
      }
    },
    async eliminarProducto(id) {
      const user = userStore()
      this.productosEnCarrito = this.productosEnCarrito.filter((producto) => producto.id !== id)
      await eliminarArticuloDelCarrito(user.uid, id)
      alert('Producto eliminado del carrito')
    },
    async comprarCarrito() {
      try{
        alert(`Compra realizada por un total de ${this.formatPrecio(this.totalCarrito)}`)
        const user = userStore()
        const pedido = new Pedido(0,
                                Date.now(),
                                this.totalCarrito,
                                'entrega',
                                1,
                                'pendiente',
                                user.uid,
                                1);
        comprarCarrito(pedido)
        console.log('Compra realizada')
        const url_red = await mandarPararelaPago(this.totalCarrito, 'Carrito', Date.now());
        console.log(url_red.url)
        // redirecciona a la pasarela de pago
        window
          .open(url_red.url, '_blank')
          .focus();


        this.productosEnCarrito = []
        //Falta quitar los productos del carrito
      }catch(error){
        console.log(error)
      }
    },
    irATienda() {
      // Aquí iría la lógica para navegar a la página de la tienda
      router.push('/')
    },
  },
}
</script>

<style scoped>
.carrito-container {
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

.carrito-vacio {
  text-align: center;
  color: #666;
}

.btn-tienda {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

.lista-productos {
  list-style-type: none;
  padding: 0;
}

.producto-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
  position: relative;
}

.producto-imagen {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.producto-info {
  flex-grow: 1;
}

.producto-info h2 {
  font-size: 18px;
  margin: 0 0 5px 0;
  color: #333;
}

.producto-descripcion {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.producto-precio {
  font-weight: bold;
  color: #e53e3e;
}

.producto-cantidad {
  display: flex;
  align-items: center;
  margin: 0 15px;
}

.btn-cantidad {
  background-color: #f0f0f0;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.btn-cantidad:hover {
  background-color: #e0e0e0;
}

.producto-cantidad span {
  margin: 0 10px;
  font-size: 16px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.btn-eliminar:hover {
  background-color: #e53e3e;
}

.resumen-carrito {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
}

.total {
  font-size: 20px;
  font-weight: bold;
}

.btn-comprar {
  background-color: #48bb78;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

.btn-comprar:hover {
  background-color: #38a169;
}

@media (max-width: 600px) {
  .producto-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .producto-imagen {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .producto-cantidad {
    margin: 10px 0;
  }

  .btn-eliminar {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .resumen-carrito {
    flex-direction: column;
    align-items: stretch;
  }

  .total {
    margin-bottom: 10px;
  }

  .btn-comprar {
    width: 100%;
  }
}
</style>
