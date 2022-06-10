import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// 引入仓库文件
import store from '@/store'

// 使用 VueRouter
Vue.use(VueRouter)

// 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误
// 解决办法: 对VueRouter对象原型的push和replace方法进行重写（相当于简单的加工一下，并不是完全重写，本质上还是依赖原本的push和replace）
// 先把 push和 replace保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写 push和 replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

// 向外暴漏的 router
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // y = 0 代表滚动条在最上方
    return { y: 0 }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  let token = localStorage.getItem('TOKEN')
  if (token) {
    // 用户登录了
    if (to.path == '/login') {
      next('/home')
    } else {
      try {
        // 派发获取用户信息的 action
        await store.dispatch('getUserInfo')
        // 然后再路由放行
        next()
      } catch (error) {
        // token失效 获取用户信息失败 重新登录
        store.dispatch('userLogOut')
        next('/login')
      }
    }
  } else {
    // 用户未登录的情况
    // 不能去交易相关(trade) 支付相关（pay paysuccess） 个人中心(center)，若想要去这些路由时，跳转到登录页
    let toPath = to.path
    // console.log(toPath);
    if (toPath.indexOf('trade') !== -1 || toPath.indexOf('pay') !== -1 || toPath.indexOf('center') !== -1) {
      alert('请登录')
      next('/login?redirect='+toPath)
    } else {
      next()
    }

  }

})

// 向外暴漏
export default router