<template>
  <div class="registration-container">
    <h1>CREA TU CUENTA</h1>

    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <Field name="email" type="email" id="email" />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="password-input">
            <Field :type="showPassword ? 'text' : 'password'" name="password" id="password" />
            <button type="button" class="toggle-password" @click="togglePassword">
              <EyeIcon v-if="showPassword" />
              <EyeOffIcon v-else />
            </button>
          </div>
          <span class="error" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label for="repeatPassword">Confirmar contraseña</label>
          <div class="password-input">
            <Field :type="showRepeatPassword ? 'text' : 'password'" name="repeatPassword" id="repeatPassword" />
            <button type="button" class="toggle-password" @click="toggleRepeatPassword">
              <EyeIcon v-if="showRepeatPassword" />
              <EyeOffIcon v-else />
            </button>
          </div>
          <span class="error" v-if="errors.repeatPassword">{{ errors.repeatPassword }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="dni">DNI / NIE</label>
        <Field name="dni" id="dni" />
        <span class="error" v-if="errors.dni">{{ errors.dni }}</span>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="firstName">Nombre</label>
          <Field name="firstName" id="firstName" />
          <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
        </div>

        <div class="form-group">
          <label for="lastName">Apellidos</label>
          <Field name="lastName" id="lastName" />
          <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="gender">Género</label>
          <Field name="gender" as="select" id="gender">
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </Field>
          <span class="error" v-if="errors.gender">{{ errors.gender }}</span>
        </div>

        <div class="form-group">
          <label for="birthDate">Fecha de nacimiento</label>
          <Field name="birthDate" type="date" id="birthDate" />
          <span class="error" v-if="errors.birthDate">{{ errors.birthDate }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="city">Localidad</label>
        <Field name="city" id="city" />
        <span class="error" v-if="errors.city">{{ errors.city }}</span>
      </div>

      <div class="form-group">
        <label for="address">Dirección</label>
        <Field name="address" id="address" />
        <span class="error" v-if="errors.address">{{ errors.address }}</span>
      </div>

      <div class="form-group">
        <label for="phone">Número de teléfono</label>
        <Field name="phone" id="phone" />
        <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
      </div>

      <div class="checkbox-group">
        <label>
          <Field name="terms" type="checkbox" />
          Confirmo que he leído y acepto los términos y condiciones de servicio y la política de privacidad
        </label>
        <span class="error" v-if="errors.terms">{{ errors.terms }}</span>
      </div>

      <button type="submit" class="submit-btn">Crear cuenta</button>
      <p class="link">
        ¿Ya tienes una cuenta?
        <RouterLink class="login-link-router" to="/login">Inicia sesión aquí</RouterLink>
      </p>
    </Form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { Form, Field } from 'vee-validate';
  import { RouterLink } from 'vue-router';
  import * as yup from 'yup';
  import { EyeIcon, EyeOffIcon } from 'lucide-vue-next';
  import { userStore } from '@/stores/userStore';

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Correo electrónico inválido')
      .required('El correo electrónico es obligatorio'),
    password: yup
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('La contraseña es obligatoria'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Repite la contraseña'),
    dni: yup
      .string()
      .required('El DNI es obligatorio')
      .matches(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, 'DNI inválido')
      .matches(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i, 'NIE inválido'),
    gender: yup.string().required('El género es obligatorio'),
    firstName: yup.string().required('El nombre es obligatorio'),
    lastName: yup.string().required('Los apellidos son obligatorios'),
    birthDate: yup.date().required('La fecha de nacimiento es obligatoria'),
    city: yup.string().required('La localidad es obligatoria'),
    address: yup.string().required('La dirección es obligatoria'),
    phone: yup
      .string()
      .required('El teléfono es obligatorio')
      .matches(/^[0-9]{9}$/, 'Teléfono inválido'),
    terms: yup
      .boolean()
      .oneOf([true], 'Debes aceptar los términos y condiciones')
  });

  const showPassword = ref(false);
  const showRepeatPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  const toggleRepeatPassword = () => {
    showRepeatPassword.value = !showRepeatPassword.value;
  };

  const onSubmit = async (values) => {
    console.log(values);
  };
</script>

<style scoped>
  .registration-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .google-btn {
    width: 100%;
    padding: 10px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .link {
    text-align: center;
    text-decoration: none;
    font-weight: 500;
  }

  .divider {
    text-align: center;
    margin: 20px 0;
    color: #666;
    position: relative;
  }
  
  .divider::before,
  .divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #ddd;
  }
  
  .divider::before { left: 0; }
  .divider::after { right: 0; }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
  }
  
  .form-row .form-group {
    flex: 1;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #666;
    font-size: 14px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #666;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .checkbox-group {
    margin: 15px 0;
  }
  
  .checkbox-group label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
  }
  
  .checkbox-group input[type="checkbox"] {
    width: auto;
    margin-top: 3px;
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
  
  .submit-btn:hover {
    background: #444;
  }
  
  .password-input {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    right: 0px;
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
    .form-row {
      flex-direction: column;
      gap: 0;
    }
  }
</style>