<template>
  <!-- 轮播图 -->
  <div class="swiper-container" id="floor2Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      immediate: true,
      handler(newVal, oldVal) {
        let mySwiper = new Swiper('.swiper-container', {
          // 循环模式选项
          loop: true,
          // 一秒切换一次
          autoplay: {
            delay: 1000,
          },
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      }
    }
  }

}
</script>

<style>
</style>