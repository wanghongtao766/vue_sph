// 交易模块的小仓库

import { reqUserAddress, reqOrderInfo } from '@/api'

export default {
  state: {
    // 用户地址信息
    address: [],
    orderInfo: {}  
  },
  mutations: {
    GETUSERADDRESS(state, address) {
      state.address = address
    },
    GETORDERINFO(state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },
  actions: {
    // 获取用户的地址信息
    async getUserAddress({commit}) {
      let result = await reqUserAddress()
      if (result.code == 200) {
        commit('GETUSERADDRESS', result.data)
      }
    },
    // 获取订单交易信息
    async getOrderInfo({commit}) {
      let result = await reqOrderInfo()
      if (result.code == 200) {
        commit('GETORDERINFO', result.data)
      }
    }
  },
  getters:{}
}