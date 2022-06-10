<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
// 引入组件
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知vuex发请求 获取商品分类的三级列表数据，将数据放在vuex中管理
    this.$store.dispatch('categoryList')
  },

}
</script>

<style>

</style>