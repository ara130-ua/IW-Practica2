<template>
  <div class="categorias-container">
    <h2>Gestión de Categorías</h2>

    <div class="actions">
      <button @click="showModal = true" class="btn-primary">Nueva Categoría</button>
    </div>

    <div class="categorias-grid">
      <div v-for="categoria in categorias" :key="categoria.id" class="categoria-card">
        <div class="categoria-header">
          <h3>{{ categoria.nombre }}</h3>
          <div class="categoria-actions">
            <button @click="editarCategoria(categoria)" class="btn-icon">✏️</button>
            <button @click="eliminarCategoria(categoria.id)" class="btn-icon delete">🗑️</button>
          </div>
        </div>
        <p class="categoria-desc">{{ categoria.descripcion }}</p>
        <div class="categoria-stats">
          <span>{{ categoria.articulos }} artículos</span>
          <span>Creada: {{ formatDate(categoria.fechaCreacion) }}</span>
        </div>
      </div>
    </div>

    <!-- Modal para nueva/editar categoría -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingCategoria ? 'Editar' : 'Nueva' }} Categoría</h3>
        <form @submit.prevent="guardarCategoria">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" v-model="formCategoria.nombre" required />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="formCategoria.descripcion" required></textarea>
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
export default {
  name: 'GestionCategorias',
  data() {
    return {
      showModal: false,
      editingCategoria: null,
      formCategoria: {
        nombre: '',
        descripcion: '',
      },
      categorias: [
        {
          id: '1',
          nombre: 'Ropa Deportiva',
          descripcion: 'Todo tipo de ropa para práctica deportiva',
          articulos: 45,
          fechaCreacion: new Date('2024-01-01'),
        },
        {
          id: '2',
          nombre: 'Calzado',
          descripcion: 'Zapatillas y calzado deportivo',
          articulos: 30,
          fechaCreacion: new Date('2024-01-01'),
        },
        // Más categorías...
      ],
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    editarCategoria(categoria) {
      this.editingCategoria = categoria
      this.formCategoria = { ...categoria }
      this.showModal = true
    },
    eliminarCategoria(id) {
      if (confirm('¿Está seguro de eliminar esta categoría?')) {
        this.categorias = this.categorias.filter((c) => c.id !== id)
      }
    },
    guardarCategoria() {
      if (this.editingCategoria) {
        const index = this.categorias.findIndex((c) => c.id === this.editingCategoria.id)
        this.categorias[index] = {
          ...this.editingCategoria,
          ...this.formCategoria,
        }
      } else {
        this.categorias.push({
          ...this.formCategoria,
          id: (this.categorias.length + 1).toString(),
          articulos: 0,
          fechaCreacion: new Date(),
        })
      }
      this.showModal = false
      this.editingCategoria = null
      this.formCategoria = {
        nombre: '',
        descripcion: '',
      }
    },
  },
}
</script>

<style scoped>
.categorias-container {
  padding: 20px;
}

.actions {
  margin-bottom: 20px;
}

.categorias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.categoria-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.categoria-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.categoria-header h3 {
  margin: 0;
  color: #2c3e50;
}

.categoria-actions {
  display: flex;
  gap: 5px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
}

.btn-icon:hover {
  background-color: #f8f9fa;
}

.btn-icon.delete:hover {
  background-color: #fee2e2;
}

.categoria-desc {
  color: #666;
  margin-bottom: 15px;
}

.categoria-stats {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
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
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
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
</style>
