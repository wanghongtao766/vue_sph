// 此模块是对 axios进行二次封装
import axios from 'axios'

// 引入进度条 在请求拦截器和响应拦截器中使用
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 利用axios对象create方法，创建一个axios实例
const mockRequests = axios.create({
  // 请求基础路径
  baseURL: '/mock',
  // 相应事件超过五秒，返回失败
  timeout: 5000
})

// 请求拦截器   发送请求之前要做的事情
mockRequests.interceptors.request.use((config) => {
  // config 配置对象， 里面有个 headers请求头属性很重要
  // 进度条开始动
  nprogress.start()
  return config
})

// 响应拦截器   服务器数据返回来之后做的事情
mockRequests.interceptors.response.use((res) => {
  // 成功的回调
  // 进度条结束
  nprogress.done()
  return res.data
}, error => {
  // 失败的回调
  return Promise.reject(new Error('faile'))
})

// 对外暴漏
export default mockRequests