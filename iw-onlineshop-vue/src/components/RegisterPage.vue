<template>
    <div class="registration-container">
      <h1>CREA TU CUENTA</h1>
  
      <Form @submit="onSubmit" v-slot="{ errors }">
        <div class="form-group">
          <label>Dirección de correo electrónico</label>
          <Field name="email" type="email" rules="required|email" />
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label>Contraseña</label>
            <Field name="password" type="password" rules="required|min:8" />
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
          </div>
  
          <div class="form-group">
            <label>Confirmar contraseña</label>
            <Field name="confirmPassword" type="password" rules="required|confirmed:@password" />
            <span class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
          </div>
        </div>
  
        <div class="form-group">
          <label>DNI / NIE</label>
          <Field name="dni" rules="required" />
          <span class="error" v-if="errors.dni">{{ errors.dni }}</span>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label>Nombre</label>
            <Field name="firstName" rules="required" />
            <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
          </div>
  
          <div class="form-group">
            <label>Apellidos</label>
            <Field name="lastName" rules="required" />
            <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label>Género</label>
            <Field name="gender" as="select" rules="required">
              <option value="">Seleccionar</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </Field>
            <span class="error" v-if="errors.gender">{{ errors.gender }}</span>
          </div>
  
          <div class="form-group">
            <label>Fecha de nacimiento</label>
            <Field name="birthDate" type="date" rules="required" />
            <span class="error" v-if="errors.birthDate">{{ errors.birthDate }}</span>
          </div>
        </div>
  
        <div class="form-group">
          <label>País</label>
          <Field name="country" as="select" rules="required">
            <option value="españa">España</option>
          </Field>
          <span class="error" v-if="errors.country">{{ errors.country }}</span>
        </div>
  
        <div class="form-group">
          <label>Localidad</label>
          <Field name="city" rules="required" />
          <span class="error" v-if="errors.city">{{ errors.city }}</span>
        </div>
  
        <div class="form-group">
          <label>Dirección</label>
          <Field name="address" rules="required" />
          <span class="error" v-if="errors.address">{{ errors.address }}</span>
        </div>
  
        <div class="form-group">
          <label>Número de teléfono</label>
          <Field name="phone" rules="required" />
          <span class="error" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
  
        <div class="checkbox-group">
          <label>
            <Field name="terms" type="checkbox" rules="required" />
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
  import { Form, Field } from 'vee-validate';
  import { RouterLink } from 'vue-router'
  const onSubmit = (values) => {
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
  
  @media (max-width: 600px) {
    .form-row {
      flex-direction: column;
      gap: 0;
    }
  }
  </style>