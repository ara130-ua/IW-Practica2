<script setup>
import ImgHomePage from '@/components/ImgHomePage.vue'
import ArticuloSlider from '@/components/ArticuloSlider.vue'
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
