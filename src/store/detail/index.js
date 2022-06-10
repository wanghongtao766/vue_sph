// detail 模块的小仓库

// 引入封装好的请求接口
import { reqDetailInfo } from '@/api'


// 封装的游客身份模块 --生成一个随机字符串(不能再变了)
import { getUUID } from '@/utils/uuid_token'

export default {
  state: {
    detailInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
  },
  mutations: {
    GETDETAILINFO(state, data) {
      state.detailInfo = data
    }
  },
  actions: {
    // 获取商品的详情信息
    async getDetailInfo({commit}, skuId) {
      let result = await reqDetailInfo(skuId)
      if (result.code === 200) {
        commit('GETDETAILINFO', result.data)
      }
    },

    
    
  },
  getters: {
    // 路径导航简化的数据
    categoryView(state) {
      // categoryView 的属性值至少是一个对象，网络请求较为慢时，做一个兜底操作
      // 不至于在没请求到数据时 categoryView为 undefined
      return state.detailInfo.categoryView || {}
    },
    // 商品信息相关数据
    skuInfo(state) {
      return state.detailInfo.skuInfo || {}
    },
    // 商品售卖属性数据
    spuSaleAttrList(state) {
      return state.detailInfo.spuSaleAttrList || []
    }
  }
}