<template>
  <div class="registration-container">
    <h1>INICIA SESIÓN</h1>

    <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
      <div class="form-group">
        <label>Correo electrónico</label>
        <Field id="email" name="email" type="email" v-slot="{ field, errorMessage }">
          <input v-bind="field" type="email" />
          <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
        </Field>
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <div class="password-input">
          <Field
            id="password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            v-slot="{ field, errorMessage }"
          >
            <input v-bind="field" :type="showPassword ? 'text' : 'password'" />
          </Field>
          <button type="button" class="toggle-password" @click="togglePassword">
            <EyeIcon v-if="!showPassword" />
            <EyeOffIcon v-else />
          </button>
        </div>
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <button type="submit" class="submit-btn">Iniciar Sesión</button>
      <p class="link">
        ¿No tienes una cuenta?
        <RouterLink class="login-link-router" to="/register">Creala aquí</RouterLink>
      </p>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { RouterLink } from 'vue-router'
import * as yup from 'yup'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { userStore } from '@/stores/userStore'
import router from '@/router'
import { Usuario, loginUsuario, obtenerUsuario } from '@/repository/cliente'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  password: yup
    .string()
    .required('La contraseña es obligatoria'),
})

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const onSubmit = async (values) => {
    try{
        console.log(values)
        const user = userStore()
        
        const uid = await loginUsuario(values.email, values.password)

        if (uid) {

            const userData = await obtenerUsuario(uid)

            user.setUid(uid)
            user.setEmail(userData.email)
            user.setRol(userData.rol)
            user.setName(userData.name)
            router.push('/')
        }

    } catch (error) {
        console.log(error)
    }

}
</script>

<style scoped>
.registration-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
}

input,
.submit-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #666;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.submit-btn {
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.submit-btn:hover {
  background: #444;
}

.link {
  text-align: center;
  text-decoration: none;
  font-weight: 500;
  margin-top: 15px;
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:focus {
  outline: none;
}

@media (max-width: 600px) {
  .registration-container {
    padding: 10px;
  }
}
</style>
