<script>
import { defineComponent } from 'vue'
import ArticuloCard from '@/components/ArticuloCard.vue'
import { obtenerArticulos } from '@/repository/articulos'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { useArticuloStore } from '@/stores/articuloStore'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    ArticuloCard,
  },
  async setup() {
    return {
      articulos: await obtenerArticulos(),
      modules: [Navigation, Pagination],
    }
  },
  data() {
    return {
      swiperRef: null,
    }
  },
  methods: {
    setSwiperRef(swiper) {
      this.swiperRef = swiper
    },
    irDetalles(id) {
      var articuloStore = useArticuloStore()
      articuloStore.setArticuloID(id)
      this.$router.push('detalles/' + id)
      console.log('articulos: ', this.articulos)
    },
  },
})
</script>

<template>
  <div class="articulo-slider-container">
    <swiper
      @swiper="setSwiperRef"
      :modules="modules"
      :slides-per-view="4"
      :space-between="20"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="articulo-slider"
    >
      <swiper-slide v-for="(articulo, index) in articulos" :key="index">
        <ArticuloCard
          @click="irDetalles(articulo.id)"
          :nombre="articulo.nombre"
          :descripcion_corta="articulo.descripcion_corta"
          :modelo="articulo.modelo"
          :talla="articulo.talla"
          :price="articulo.price"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.articulo-slider-container {
  width: 100%;
  padding: 20px 0;
}

.datos-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.articulo-slider {
  height: 400px;
  width: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
