<template>
  <div class="articulos-container">
    <h2>Gestión de Artículos</h2>

    <div class="actions">
      <button @click="showModal = true" class="btn-primary">Nuevo Artículo</button>
      <div class="filters">
        <input type="text" v-model="search" placeholder="Buscar artículo..." />
        <select v-model="categoryFilter">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categorias" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="articulo in filteredArticulos" :key="articulo.id">
          <td>#{{ articulo.id }}</td>
          <td>{{ articulo.nombre }}</td>
          <td>{{ articulo.categoria }}</td>
          <td>{{ formatPrice(articulo.price) }}</td>
          <td>
            <button @click="editarArticulo(articulo)" class="btn-action">Editar</button>
            <button @click="eliminarArticulo(articulo.id)" class="btn-action delete">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para nuevo/editar artículo -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingArticulo ? 'Editar' : 'Nuevo' }} Artículo</h3>
        <form @submit.prevent="guardarArticulo">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" v-model="formArticulo.nombre" required />
          </div>
          <div class="form-group">
            <label>Categoría</label>
            <select v-model="formArticulo.categoria" required>
              <option v-for="cat in categorias" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Precio</label>
            <input type="number" v-model="formArticulo.price" step="0.01" required />
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn-primary">Guardar</button>
            <button type="button" @click="showModal = false" class="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  obtenerArticulosCategoria,
  actualizarArticulo,
  eliminarArticulo,
  addArticulo,
} from '@/repository/articulos'
import { getCategorias } from '@/repository/categorias'

export default {
  name: 'GestionArticulos',
  data() {
    return {
      search: '',
      categoryFilter: '',
      showModal: false,
      editingArticulo: null,
      formArticulo: {
        nombre: '',
        categoria: '',
        price: 0,
      },
      articulos: [],
      categorias: [],
    }
  },
  computed: {
    filteredArticulos() {
      return this.articulos.filter((articulo) => {
        const matchSearch = articulo.nombre.toLowerCase().includes(this.search.toLowerCase())
        const matchCategory = !this.categoryFilter || articulo.categoria === this.categoryFilter
        return matchSearch && matchCategory
      })
    },
  },
  async created() {
    const categoriasAux = await getCategorias()
    for (let categoria of categoriasAux) {
      this.categorias.push(categoria.nombre)
    }
    this.articulos = await obtenerArticulosCategoria()
  },
  methods: {
    formatPrice(price) {
      return `$${price.toFixed(2)}`
    },
    editarArticulo(articulo) {
      this.editingArticulo = articulo
      this.formArticulo = { ...articulo }
      this.showModal = true
    },
    async eliminarArticulo(id) {
      if (confirm('¿Está seguro de eliminar este artículo?')) {
        this.articulos = this.articulos.filter((a) => a.id !== id)
        await eliminarArticulo(id)
      }
    },
    guardarArticulo() {
      if (this.editingArticulo) {
        const id = this.articulos.findIndex((a) => a.id === this.editingArticulo.id)
        //this.articulos[index] = { ...this.formArticulo }
        actualizarArticulo(id + 1, this.formArticulo)
      } else {
        /*this.articulos.push({
          ...this.formArticulo,
          id: (this.articulos.length + 1).toString(),
        })*/
        addArticulo(this.formArticulo)
      }
      this.showModal = false
      this.editingArticulo = null
      this.formArticulo = {
        nombre: '',
        categoria: '',
        precio: 0,
      }
    },
  },
}
</script>

<style scoped>
.articulos-container {
  padding: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
}

.stock-low {
  color: #dc3545;
  font-weight: bold;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-action.delete {
  background-color: #dc3545;
}

.modal {
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

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

/* Estilos heredados de la tabla del componente anterior */
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
</style>
