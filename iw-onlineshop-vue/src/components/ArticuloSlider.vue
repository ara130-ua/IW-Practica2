<script>
import ArticuloCard from '@/components/ArticuloCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
  props: {
    articulos: {
      type: Array,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    ArticuloCard,
  },
  data() {
    return {
      swiperRef: null,
    }
  },
  methods: {
    mostrarDatos() {
      this.articulos.forEach((element) => {
        console.log(element)
      })
    },
    setSwiperRef(swiper) {
      this.swiperRef = swiper
    },
  },
}
</script>

<template>
  <div>
    <button @click="mostrarDatos">datos</button>
  </div>
  <div>
    <swiper
      @swiper="setSwiperRef"
      :slidesPerView="5"
      :spaceBetween="30"
      :centeredSlides="true"
      :pagination="{
        type: 'fraction',
      }"
      :navigation="true"
      class="virtual-slider"
    >
      <swiper-slide v-for="(articulo, index) in articulos" :key="index">
        <ArticuloCard :articulo="articulo" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.swiper.virtual-slider {
  height: 300px;
}
.virtual-slider .swiper-slide {
  text-align: center;
  font-size: 18px;
  width: 300px !important;
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
