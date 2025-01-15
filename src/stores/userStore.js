import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => ({
    uid: sessionStorage.getItem('uid') || null, // Restaura el UID si está almacenado
    email: sessionStorage.getItem('email') || null, // Restaura el email si está almacenado
    rol: sessionStorage.getItem('rol') || null, // Restaura el rol si está almacenado
    name: sessionStorage.getItem('name') || null, // Restaura el nombre si está almacenado
  }),
  getters: {
    isLoggedIn: (state) => !!state.uid, // Getter para verificar si el usuario está logueado
  },
  actions: {
    setUid(newUid) {
      this.uid = newUid; // Actualiza el UID en el estado
      sessionStorage.setItem('uid', newUid); // Guarda el UID en sessionStorage
    },
    clearUid() {
      this.uid = null; // Limpia el UID en el estado
      sessionStorage.removeItem('uid'); // Elimina el UID de sessionStorage
    },
    setRol(newRol) {
      this.rol = newRol; // Actualiza el UID en el estado
      sessionStorage.setItem('rol', newRol); // Guarda el UID en sessionStorage
    },
    clearRol() {
      this.rol = null; // Limpia el rol en el estado
      sessionStorage.removeItem('rol'); // Elimina el rol de sessionStorage
    },
    setName(newName) {
      this.name = newName; // Actualiza el nombre en el estado
      sessionStorage.setItem('name', newName); // Guarda el nombre en sessionStorage
    },
    clearName() {
      this.name = null; // Limpia el nombre en el estado
      sessionStorage.removeItem('name'); // Elimina el nombre de sessionStorage
    },  
    setEmail(newEmail) {
        this.email = newEmail; // Actualiza el email en el estado
        sessionStorage.setItem('email', newEmail); // Guarda el email en sessionStorage
    },
    clearEmail() {
        this.email = null; // Limpia el email en el estado
        sessionStorage.removeItem('email'); // Elimina el email de sessionStorage
    },
    signOut() {
      this.clearUid(); // Llama al método para limpiar el UID
      this.clearEmail(); // Llama al método para limpiar el email
      this.clearRol(); // Llama al método para limpiar el rol
      this.clearName(); // Llama al método para limpiar el nomobre
    },
  },
});
