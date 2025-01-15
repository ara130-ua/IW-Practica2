<template>
  <div class="profile-container">
    <h1>Perfil de Usuario</h1>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors }"
      :initial-values="userData"
    >
      <div class="form-group">
        <label>Correo electrónico</label>
        <Field name="email" type="email" disabled />
      </div>

      <div class="form-group">
        <label>DNI / NIE</label>
        <Field name="dni" type="text" disabled />
      </div>

      <div class="form-group">
        <label>Nombre</label>
        <Field name="nombre" type="text" />
        <span class="error" v-if="errors.nombre">{{ errors.nombre }}</span>
      </div>

      <div class="form-group">
        <label>Apellidos</label>
        <Field name="apellidos" type="text" />
        <span class="error" v-if="errors.apellidos">{{ errors.apellidos }}</span>
      </div>

      <div class="form-group">
        <label>Género</label>
        <Field name="genero" as="select">
          <option value="">Seleccionar género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </Field>
        <span class="error" v-if="errors.genero">{{ errors.genero }}</span>
      </div>

      <div class="form-group">
        <label>Fecha de nacimiento</label>
        <Field name="fechaNacimiento" type="date" />
        <span class="error" v-if="errors.fechaNacimiento">{{ errors.fechaNacimiento }}</span>
      </div>

      <div class="form-group">
        <label>Localidad</label>
        <Field name="localidad" type="text" />
        <span class="error" v-if="errors.localidad">{{ errors.localidad }}</span>
      </div>

      <div class="form-group">
        <label>Dirección</label>
        <Field name="direccion" type="text" />
        <span class="error" v-if="errors.direccion">{{ errors.direccion }}</span>
      </div>

      <div class="form-group">
        <label>Número de teléfono</label>
        <Field name="telefono" type="tel" />
        <span class="error" v-if="errors.telefono">{{ errors.telefono }}</span>
      </div>

      <button type="submit" class="submit-button">Guardar cambios</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { onMounted } from 'vue';
import * as yup from 'yup'
import {obtenerUsuarioEmail} from '@/repository/cliente'

export default {
  name: 'UserProfile',
  components: {
    Form,
    Field,
  },
  data() {
    return {
      userData: {
        email: 'usuario@ejemplo.com',
        dni: '12345678A',
        nombre: 'Juan',
        apellidos: 'García López',
        genero: 'masculino',
        fechaNacimiento: '1990-01-01',
        localidad: 'Madrid',
        direccion: 'Calle Example 123',
        telefono: '612345678',
      },
      schema: yup.object({
        email: yup.string().email('Email inválido').required('Email es requerido'),
        dni: yup.string().required('DNI es requerido'),
        nombre: yup
          .string()
          .required('Nombre es requerido')
          .min(2, 'Nombre debe tener al menos 2 caracteres')
          .max(50, 'Nombre no puede tener más de 50 caracteres'),
        apellidos: yup
          .string()
          .required('Apellidos son requeridos')
          .min(2, 'Apellidos deben tener al menos 2 caracteres')
          .max(100, 'Apellidos no pueden tener más de 100 caracteres'),
        genero: yup
          .string()
          .required('Género es requerido')
          .oneOf(['masculino', 'femenino', 'otro'], 'Seleccione un género válido'),
        fechaNacimiento: yup
          .date()
          .required('Fecha de nacimiento es requerida')
          .max(new Date(), 'La fecha no puede ser futura'),
        localidad: yup
          .string()
          .required('Localidad es requerida')
          .min(2, 'Localidad debe tener al menos 2 caracteres'),
        direccion: yup
          .string()
          .required('Dirección es requerida')
          .min(5, 'Dirección debe tener al menos 5 caracteres'),
        telefono: yup
          .string()
          .required('Teléfono es requerido')
          .matches(/^[0-9]{9}$/, 'Teléfono debe tener 9 dígitos'),
      }),
    }
  },
  methods: {
    async onMounted() {
      // Aquí iría la lógica para obtener los datos del perfil
      // y asignarlos a userData
    },
    async onSubmit(values) {
      try {
        console.log('Datos actualizados:', values)
        // Aquí iría la lógica para actualizar el perfil
        alert('Perfil actualizado correctamente')
      } catch (error) {
        console.error('Error al actualizar el perfil:', error)
        alert('Error al actualizar el perfil')
      }
    },
  },
}
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
}

.error {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #357abd;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .profile-container {
    padding: 10px;
  }

  input,
  select {
    font-size: 14px;
  }
}
</style>
