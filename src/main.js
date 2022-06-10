import Vue from 'vue'
import App from './App.vue'

// 引入路由器
import router from '@/router'
// 引入仓库进行注册
import store from '@/store'

// 注册TypeNav为全局组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)
// 注册Carousel为全局组件
import Carousel from '@/components/Carousel'
Vue.component('Carousel', Carousel)
// 注册Pagination为全局组件
import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination)

// 引入mockServe.js  mock虚拟的数据
import '@/mock/mockServer.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一引入api文件夹中的所有请求函数，并将其挂载到Vue的原型对象上，使每一个组件都可以使用任意的请求函数
import * as API from '@/api'

// 引入ele ui相关
import { Button,MessageBox } from 'element-ui'
Vue.component(Button.name, Button)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入懒加载的图片
import atm from '@/assets/atm.gif'
Vue.use(VueLazyload, {
  loading: atm
})

// 引入表单校验插件
import '@/plugins/validate.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  },
}).$mount('#app')
