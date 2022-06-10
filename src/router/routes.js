// 此文件时路由配置项的 routes 配置文件
// 引入路由组件
// 引入一级路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由组件
// import myOrder from '@/pages/Center/myOrder'
// import teamOrder from '@/pages/Center/teamOrder'

// 路由懒加载
const Home = () => import('@/pages/Home')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Search = () => import('@/pages/Search')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')
const myOrder = () => import('@/pages/Center/myOrder')
const teamOrder = () => import('@/pages/Center/teamOrder')


export default [
  {
    path: '/home',
    component: Home,
    meta: { footerShow: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { footerShow: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { footerShow: false }
  },
  {
    path: '/search/:keyword?', // ? 指定params参数可传可不传
    component: Search,
    meta: { footerShow: true },
    name: 'search',
  },
  {
    path: '/detail/:skuId',
    component: Detail,
    meta: { footerShow: true }
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { footerShow: true },
    name: 'AddCartSuccess'
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { footerShow: true },
    name: 'ShopCart'
  },
  {
    path: '/trade',
    component: Trade,
    meta: { footerShow: true },
    name: 'Trade',
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        // 去往交易页 必须是从购物车而来
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { footerShow: true },
    name: 'Pay',
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { footerShow: true },
    name: 'PaySuccess',
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center',
    component: Center,
    meta: { footerShow: true },
    children: [
      {
        path: 'myorder',
        component: myOrder,
        name:'myOrder'
      },
      {
        path: 'teamorder',
        component: teamOrder,
        name: 'teamOrder'
      },
      {
        path: '/',
        redirect: 'myorder'
      },
    ]
    
  },
  // 重定向
  {
    path: '/',
    redirect: '/home'
  }
]