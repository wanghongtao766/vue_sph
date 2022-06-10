// 此模块：对 api接口进行统一管理
import requests from './ajax'
import mockRequests from './ajaxMock'


// 三级联动接口数据
// /api/product/getBaseCategoryList   get请求
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

// mock模拟数据  
// banner数据(轮播图数据)
export const reqBannerList = () => mockRequests.get('/banner')
// floor数据
export const reqFloorList = () => mockRequests.get('/floor')


// 搜索商品接口数据
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params
})

// 商品详情接口数据
export const reqDetailInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: "get"
})

// 将商品添加到购物车 || 对已有物品进行数量改动
export const reqAddOrUpdateShopCat = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${ skuId }/${ skuNum }`,
  method: "post"
})

// 获取购物车列表接口数据
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: "get"
})

// 删除购物车商品
export const deleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: "DELETE"
})

// 切换购物车中的商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

// 获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

// 注册用户
export const reqRegisterUser = (data) => requests({
  url: '/user/passport/register',
  method: 'post',
  // kv 一致 post传递参数
  data
})

// 登录   /api/user/passport/login
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: 'post',
  data
})

// 获取用户登录信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})

// 退出登录
export const reqLogOut = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})

// 获取用户地址信息  前提是用户已经登录，否则获取不到
export const reqUserAddress = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})

// 获取订单交易信息
export const reqOrderInfo = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'post'
})

// 获取订单支付信息
export const reqPayOrderInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

// 查询支付订单状态
export const reqPayOrderState = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

// 获取我的订单列表  /order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})