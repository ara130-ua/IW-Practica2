import { ref } from 'vue'
import { defineStore } from 'pinia'
import { articulos } from '@/resources/data/articulosData'

export const useArticuloStore = defineStore('articulo', () => {
  const articulosID = ref(0)

  function setArticuloID(id) {
    articulosID.value = id
  }

  function getArticuloID() {
    return articulosID.value
  }

  function getArticulo(id) {
    return articulos.Articulos[id]
  }

  return { articulosID, setArticuloID, getArticuloID, getArticulo }
})
