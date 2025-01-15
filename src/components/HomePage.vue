<script setup>
import ImgHomePage from '@/components/ImgHomePage.vue'
import ArticuloSlider from '@/components/ArticuloSlider.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
</script>

<template>
  <div>
    <ImgHomePage />
    <Suspense>
      <ArticuloSlider />
    </Suspense>
  </div>
</template>

<style scoped></style>
