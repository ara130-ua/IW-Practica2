<template>
  <div class="pedidos-container">
    <h2>Gestión de Pedidos</h2>

    <div class="filters">
      <input type="text" v-model="search" placeholder="Buscar por ID o cliente..." />
      <select v-model="statusFilter">
        <option value="">Todos los estados</option>
        <option value="procesando">Procesando</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID Pedido</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in filteredPedidos" :key="pedido.id">
          <td>#{{ pedido.id }}</td>
          <td>{{ pedido.cliente_id }}</td>
          <td>{{ formatDate(pedido.fecha) }}</td>
          <td>{{ formatPrice(pedido.importe) }}</td>
          <td>
            <span class="status" :class="pedido.estado">
              {{ pedido.estado }}
            </span>
          </td>
          <td>
            <button @click="verDetalles(pedido)" class="btn-action">Ver detalles</button>
            <button
              @click="actualizarEstado(pedido)"
              class="btn-action"
              :disabled="pedido.estado === 'cancelado'"
            >
              Actualizar estado
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="mostrarPopup" class="popup-overlay">
    <div class="popup-content">
      <h3>Detalles del Pedido #{{ pedidoSeleccionado.id }}</h3>
      <p><strong>Cliente:</strong> {{ pedidoSeleccionado.cliente_id }}</p>
      <p><strong>Fecha:</strong> {{ formatDate(pedidoSeleccionado.fecha) }}</p>
      <p><strong>Total:</strong> {{ formatPrice(pedidoSeleccionado.importe) }}</p>
      <p><strong>Estado:</strong> {{ pedidoSeleccionado.estado }}</p>
      <!-- 
      <p><strong>Productos:</strong></p>
      <ul>
        <li v-for="articulo in articulosPedido" :key="articulo.id">
          {{ articulo.articulo_nombre }} - {{ articulo.cantidad }}
        </li>
      </ul>
    -->
      <button @click="cerrarPopup" class="btn-action">Cerrar</button>
    </div>
  </div>
</template>

<script>
import { fetchArticuloNombreYCantidad, getPedidos, updateEstadoPedido } from '@/repository/pedido'
export default {
  name: 'GestionPedidos',
  data() {
    return {
      search: '',
      statusFilter: '',
      pedidos: [],
      pedidoSeleccionado: null,
      articulosPedido: [],
      mostrarPopup: false,
    }
  },
  computed: {
    filteredPedidos() {
      return this.pedidos.filter((pedido) => {
        // Convertir id y cliente a cadenas para la comparación
        const idStr = String(pedido.id)

        // Comparar usando includes (asegurando que search también sea una cadena)
        const matchSearch =
          idStr.includes(String(this.search)) || pedido.cliente_id.includes(String(this.search))

        // Comparar el estado del filtro
        const matchStatus = !this.statusFilter || pedido.estado === this.statusFilter

        // Retornar solo los pedidos que cumplan ambas condiciones
        return matchSearch && matchStatus
      })
    },
  },
  async created() {
    this.pedidos = await getPedidos()
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    formatPrice(price) {
      return `${price.toFixed(2)}€`
    },
    verDetalles(pedido) {
      this.pedidoSeleccionado = pedido
      //this.articulosPedido = fetchArticuloNombreYCantidad(pedido.id)
      this.mostrarPopup = true
    },
    async actualizarEstado(pedido) {
      const estados = ['procesando', 'enviado', 'entregado']
      const currentIndex = estados.indexOf(pedido.estado)
      pedido.estado = estados[(currentIndex + 1) % estados.length]
      await updateEstadoPedido(pedido.id, pedido.estado)
    },
    cerrarPopup() {
      this.mostrarPopup = false
      this.pedidoSeleccionado = null
    },
  },
}
</script>

<style scoped>
.pedidos-container {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

input,
select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.status.pendiente {
  background-color: #ffeeba;
  color: #856404;
}

.status.enviado {
  background-color: #b8daff;
  color: #004085;
}

.status.entregado {
  background-color: #c3e6cb;
  color: #155724;
}

.status.cancelado {
  background-color: #f5c6cb;
  color: #721c24;
}

.status.procesando {
  background-color: #e6f2ff;
  color: #0056b3;
}

.btn-action {
  margin-right: 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.btn-action:hover {
  background-color: #2980b9;
}

.btn-action:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
