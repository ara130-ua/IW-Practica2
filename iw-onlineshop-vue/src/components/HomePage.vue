<script setup>
import ImgHomePage from '@/components/ImgHomePage.vue'
import ArticuloSlider from '@/components/ArticuloSlider.vue'
import articulosData from '@/resources/data/articulos.json'
import { ref } from 'vue'
import { onMounted } from 'vue'

const articulos = ref(articulosData)
var articulosArray = ref([])

onMounted(() => {
  //console.log(articulos.value)
  // quiero guardar los articulos en un array
  articulosArray.value = Object.values(articulos.value)
  console.log(articulosArray.value)
})
</script>

<template>
  <div>
    <ImgHomePage />
    <ArticuloSlider :articulos="articulosArray" />
  </div>
</template>

<style scoped></style>
