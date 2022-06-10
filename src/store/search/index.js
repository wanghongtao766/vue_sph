// search模块的小仓库
import { reqGetSearchInfo } from '@/api'
export default {
  state: {
    SearchList: {}
   },
  mutations: {
    GETSEARCHLIST(state, data) {
      state.SearchList = data
    }
  },
  actions: {
    async getSearchList({ commit }, params) {
      let result = await reqGetSearchInfo(params)
      if (result.code === 200) {
        commit('GETSEARCHLIST', result.data)
      }
    }
  },
  getters:{
    // 当前形参是 state，是本仓库的state，不是大仓库的state
    // 若网络请求可以请求得到 state.SearchList.goodsList数据，则goodsList可以返回
    // 但若未请求得到数据，会返回undefined，则goodsList无法遍历会报错
    // 解决办法：state.SearchList.goodsList || []
    goodsList(state) {
      return state.SearchList.goodsList || []
    },
    trademarkList(state) {
      return state.SearchList.trademarkList || []
    },
    attrsList(state) {
      return state.SearchList.attrsList || []
    }
  }
}