// home模块的小仓库

// 引入封装好的请求接口
import { reqCategoryList } from '@/api'
import { reqBannerList } from '@/api'
import { reqFloorList } from '@/api'

export default {
  state: {
    // 三级分类数据
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // floor组件的数据
    floorList: []
  },
  mutations: {
    CATEGORYLIST(state, data) {
      state.categoryList = data
    },
    BANNERLIST(state, data) {
      state.bannerList = data
    },
    FLOORLIST(state, data) {
      state.floorList = data
    }
  },
  actions: {
    // 请求三级商品分类数据
    async categoryList({ commit }) {
      // 请求数据
      let result = await reqCategoryList()
      // console.log(result)
      if (result.code === 200) {
        commit('CATEGORYLIST', result.data)
      }
    },

    // 请求banner数据
    async getBannerList({ commit }) {
      let result = await reqBannerList()
      if (result.code === 200) {
        commit('BANNERLIST', result.data)
      }
    },

    // 请求floor数据
    async getFlootList({ commit }) {
      let result = await reqFloorList()
      if (result.code === 200) {
        commit('FLOORLIST', result.data)
      }
    }
  },
  getters: {}
}