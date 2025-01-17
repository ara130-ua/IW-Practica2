<template>
  <div class="historial-container">
    <h1>Historial de Pedidos</h1>
    <div class="table-container">
      <table class="pedidos-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidos" :key="pedido.id">
            <td>{{ formatDate(pedido.fecha) }}</td>
            <td>{{ pedido.importe.toFixed(2) }}€</td>
            <td>
              <span class="estado-badge" :class="getEstadoClass(pedido.estado)">
                {{ pedido.estado }}
              </span>
            </td>
            <td>
              <button @click="verDetallesPedido(pedido.id)" class="btn-detalles">
                Ver artículos
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de detalles -->
    <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Detalles del Pedido</h2>
          <button class="btn-cerrar" @click="cerrarModal">&times;</button>
        </div>
        <div class="modal-body">
          <div v-if="articulosPedido.length > 0">
            <div class="articulo-card" v-for="articulo in articulosPedido" :key="articulo.id">
              <div class="articulo-info">
                <h3>{{ articulo.nombre }}</h3>
                <p>Cantidad: {{ articulo.cantidad }}</p>
                <p>Precio unitario: {{ articulo.precio.toFixed(2) }}€</p>
                <p>Subtotal: {{ (articulo.precio * articulo.cantidad).toFixed(2) }}€</p>
              </div>
            </div>
          </div>
          <div v-else class="sin-articulos">Cargando artículos...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { obtenerDetallesPedido, obtenerPedidosPorCliente } from '@/repository/pedido'
import { userStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'

var pedidos = ref([])

const mostrarModal = ref(false)
const articulosPedido = ref([])
const pedidoSeleccionado = ref(null)

onMounted(async () => {
  const user = userStore()
  pedidos.value = await obtenerPedidosPorCliente(user.uid)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES')
}

const getEstadoClass = (estado) => {
  return {
    'estado-entregado': estado === 'entregado',
    'estado-enviado': estado === 'enviado',
    'estado-procesando': estado === 'procesando',
  }
}

const verDetallesPedido = async (pedidoId) => {
  pedidoSeleccionado.value = pedidoId
  mostrarModal.value = true
  // Simulación de carga de artículos
  // Aquí deberías hacer la llamada a tu API real
  setTimeout(async () => {
    articulosPedido.value = await obtenerDetallesPedido(pedidoId)
  }, 500)
}

const cerrarModal = () => {
  mostrarModal.value = false
  articulosPedido.value = []
  pedidoSeleccionado.value = null
}
</script>

<style scoped>
.historial-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.table-container {
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.pedidos-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.pedidos-table th,
.pedidos-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.pedidos-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.pedidos-table tr:hover {
  background-color: #f8f9fa;
}

.estado-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.estado-entregado {
  background-color: #d1e7dd;
  color: #0f5132;
}

.estado-enviado {
  background-color: #cfe2ff;
  color: #084298;
}

.estado-procesando {
  background-color: #e2e3e5;
  color: #41464b;
}

.btn-detalles {
  padding: 6px 12px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-detalles:hover {
  background-color: #5c636a;
}

/* Estilos del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
}

.btn-cerrar {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 16px;
}

.articulo-card {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 12px;
}

.articulo-card:last-child {
  margin-bottom: 0;
}

.articulo-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.articulo-info p {
  margin: 4px 0;
  color: #666;
}

.sin-articulos {
  text-align: center;
  padding: 20px;
  color: #666;
}

@media (max-width: 768px) {
  .historial-container {
    padding: 10px;
  }

  .pedidos-table th,
  .pedidos-table td {
    padding: 8px;
  }

  .estado-badge {
    padding: 2px 6px;
    font-size: 12px;
  }

  .modal-content {
    width: 95%;
    margin: 10px;
  }
}

@media (max-width: 480px) {
  .pedidos-table {
    font-size: 14px;
  }

  .btn-detalles {
    padding: 4px 8px;
    font-size: 12px;
  }
}
</style>
