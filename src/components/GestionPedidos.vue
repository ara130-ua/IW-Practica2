<template>
  <div class="pedidos-container">
    <h2>Gestión de Pedidos</h2>

    <div class="filters">
      <input type="text" v-model="search" placeholder="Buscar por ID o cliente..." />
      <select v-model="statusFilter">
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
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
          <td>{{ pedido.cliente }}</td>
          <td>{{ formatDate(pedido.fecha) }}</td>
          <td>{{ formatPrice(pedido.total) }}</td>
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
</template>

<script>
export default {
  name: 'GestionPedidos',
  data() {
    return {
      search: '',
      statusFilter: '',
      pedidos: [
        {
          id: '1001',
          cliente: 'Juan Pérez',
          fecha: new Date('2024-01-10'),
          total: 129.99,
          estado: 'pendiente',
        },
        {
          id: '1002',
          cliente: 'María García',
          fecha: new Date('2024-01-09'),
          total: 89.99,
          estado: 'enviado',
        },
        // Más pedidos...
      ],
    }
  },
  computed: {
    filteredPedidos() {
      return this.pedidos.filter((pedido) => {
        const matchSearch =
          pedido.id.includes(this.search) ||
          pedido.cliente.toLowerCase().includes(this.search.toLowerCase())
        const matchStatus = !this.statusFilter || pedido.estado === this.statusFilter
        return matchSearch && matchStatus
      })
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    formatPrice(price) {
      return `$${price.toFixed(2)}`
    },
    verDetalles(pedido) {
      console.log('Ver detalles del pedido:', pedido)
      // Implementar lógica para mostrar detalles
    },
    actualizarEstado(pedido) {
      // Implementar lógica para actualizar estado
      console.log('Actualizar estado del pedido:', pedido)
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
</style>
