// 登录和注册小仓库

import { reqGetCode, reqRegisterUser, reqUserLogin, reqUserInfo, reqLogOut } from '@/api'

export default {
  state: {
    code: '',
    // 用户登录令牌 token
    token: localStorage.getItem('TOKEN'),
    // 用户信息
    userInfo: {}
  },
  mutations: {
    GETCODE(state, data) {
      state.code = data
    },
    USERLOGIN(state, token) {
      state.token = token
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 退出登录后做的一些事情
    USERLOGOUT(state) {
      // 清除本地数据
      state.token = ''
      state.userInfo = {}
      // 清除本地存储TOKEN
      localStorage.removeItem('TOKEN')
    }
  },
  actions: {
    // 获取验证码的action
    async getCode({commit}, phone) {
      let result = await reqGetCode(phone)
      if (result.code == 200) {
        commit('GETCODE', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 注册用户 action
    async registerUser({commit}, data) {
      let result = await reqRegisterUser(data)
      // console.log(result);
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 用户登录 返回 token
    async userLogin({commit}, data) {
      let result = await reqUserLogin(data)
      // console.log(result);
      if (result.code == 200) {
        commit('USERLOGIN', result.data.token)
        // 将token信息持久化存储
        localStorage.setItem('TOKEN', result.data.token)
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
      let result = await reqUserInfo()
      // console.log(result);
      if (result.code == 200) {
        commit('GETUSERINFO', result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    // 退出登录
    async userLogOut({commit}) {
      let result = await reqLogOut()
      if (result.code == 200) {
        commit('USERLOGOUT')
      } else {
        return Promise.reject(new Error('faile'))
      }
    }
  },
  getters: {}
}