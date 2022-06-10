// shopcart的小仓库

import { reqCartList, reqAddOrUpdateShopCat, deleteCartById, reqUpdateCheckedById } from '@/api'

export default {
  state: {
    shopCartList: []
  },
  mutations: {
    GETSHOPCARTLSIT(state, data) {
      state.shopCartList = data
    }
  },
  actions: {
    // 获取购物车的数据
    async getShopCartList({ commit }) {
      let result = await reqCartList()
      if (result.code == 200) {
        commit('GETSHOPCARTLSIT', result.data)
      }
    },
    // 将商品添加到购物车 || 修改某一个商品的个数
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
      // 前端将一些参数传递给服务器，(服务器存储留着用) 服务器并未返回数据
      // 所以不需要vuex三连环
      // async执行的函数返回值是Promise 要么成功 要么失败
      let result = await reqAddOrUpdateShopCat(skuId, skuNum)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除购物车商品
    async deleteCartById({ commit }, skuId) {
      let result = await deleteCartById(skuId)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 更新购物车中商品的选中状态
    async UpdateCheckedById({commit}, {skuId, isChecked}) {
      let result = await reqUpdateCheckedById(skuId, isChecked)      
      if(result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 删除全部选中的商品
    deleteAllCheckedCart({dispatch, getters}) {
      // console.log(context); context 中有 dispatch getters state commit.....
      // console.log(getters.cartList.cartInfoList); getters.cartList.cartInfoList 是一个数组
      let promiseAll = []
      getters.cartList.cartInfoList.forEach(item => {
        // console.log(item);
        // 若商品被选中，isChecked等于1
        if(item.isChecked == 1) {
          // 派发action 删除商品
          let res = dispatch('deleteCartById', item.skuId)
          // console.log(res); res 返回的是一个 Promise
          // 把每一次返回的Promise添加到数组中
          promiseAll.push(res)
        }
      })
      // Promise.all(数组)  若数组中的Promise有一个失败 则都失败
      return Promise.all(promiseAll)
    },
    // 修改全部商品的选中状态
    updateAllChecked({dispatch, getters}, isChecked) {
      let promiseAll = []
      getters.cartList.cartInfoList.forEach((item) => {
        let promise = dispatch('UpdateCheckedById', {skuId: item.skuId, isChecked})
        promiseAll.push(promise)
      })
      // 最终返回结果
      return Promise.all(promiseAll)
    }
  },
  getters: {
    cartList(state) {
      // 数据兜底
      return state.shopCartList[0] || {}
    }
  }
}