<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑 带有x结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 商品品牌信息的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 商品属性信息的面包屑 -->
            <li class="with-x" v-for="(attrVal, index) in searchParams.props" :key="index">
              {{ attrVal.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-xiangshang': isAsc,'icon-paixu': isDesc,}"></span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-xiangshang': isAsc,'icon-paixu': isDesc,}"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="gdlist in goodsList" :key="gdlist.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${gdlist.id}`"><img v-lazy="gdlist.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ gdlist.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ gdlist.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='goodsTotal' :continues='5' @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'

import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  name: 'Search',
  data() {
    return {
      // 发送网络请求需要的参数
      searchParams: {
        // 一级分类id 二级分类id 三级分类id
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 分类名字
        categoryName: '',
        // 关键字
        keyword: '',
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: '',
        // 排序
        order: '1:desc',
        // 分页器 代表当前是第几页
        pageNo: 1,
        // 每一页展示数据个数
        pageSize: 10
      },
    }
  },
  components: {
    SearchSelector
  },
  beforeMount() {
    // 合并对象，将路由需要的参数补充完毕
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  // 组件挂载完毕执行一次 仅仅执行一次，路由的切换并不会导致其再次执行
  mounted() {
    this.getData()
  },
  computed: {
    // 获得商品列表数据
    ...mapGetters(['goodsList']),
    // 控制'综合' 和 '价格' 的背景色
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    // 控制箭头朝向 上还是下
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    // 获取商品总数量
    ...mapState({
      goodsTotal: state => {
        return state.search.SearchList.total
      }
    })
  },
  methods: {
    // 将发送请求获取search数据模块，封装为一个函数
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 面包屑处理：移除分类的名字
    removeCategoryName() {
      // 将 categoryName置为空，可以删除面包屑
      this.searchParams.categoryName = undefined
      // 重置 1id 2id 3id
      // 将网络请求所需参数置为 undefined，相当不会将参数传递给服务器，性能优化
      // 若将参数置为空字符，参数仍然会传递
      // 所携带的参数少，占用网络宽带少
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 自己跳自己 改变地址栏的信息
      // 本意是删除query参数 不删除params参数。路由的改变伴随着请求的发出，因为watch监听路由
      // 所以无需再调用 getData() 函数
      // this.getData()
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    // 面包屑处理：移除关键字
    removeKeyword() {
      // 将关键字设置为 undefined
      this.searchParams.keyword = undefined
      // 删除params参数  因为删除params参数，会改变路由，触发watch，则会发送请求
      this.$router.push({ name: 'search', query: this.$route.query })
      // 通知兄弟组件 Header，清除搜索框中的内容 全局事件总线 $bus
      this.$bus.$emit('clear')
    },
    // 接收到子组件 SearchSelector传递的商品品牌信息  自定义事件 子传父 
    tradeMarkInfo(trademark) {
      // console.log(trademark);
      // 配置好参数项  "id: 品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 发送请求
      this.getData()
    },
    // 面包屑处理：移除品牌信息
    removeTrademark() {
      // 将品牌信息字段设置为 undefined
      this.searchParams.trademark = undefined
      // 发送网络请求
      this.getData()
    },
    // 接收到子组件 SearchSelector传递的商品属性相关的信息 自定义事件
    attrInfo(attr, atVal) {
      // 整理商品属性的参数
      let props = `${attr.attrId}:${atVal}:${attr.attrName}`
      // 将整理好的参数添加到请求参数中
      // 防止重复添加相同的参数  props中没有的参数才执行添加 并且发送请求
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)
        // 发送请求
        this.getData()
      }
    },
    // 面包屑处理：删除商品属性
    removeAttr(index) {
      // 删除searchParams中props数组元素
      this.searchParams.props.splice(index, 1)
      // 发送请求
      this.getData()
    },
    // 排序的操作
    changeOrder(flag) {
      // 拿到初始的 order各个参数
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      let newOrder = ''
      // 判断点击的是否为综合
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`
      } else {
        // 点击的是价格
        newOrder = `${flag}:desc`
      }
      this.searchParams.order = newOrder
      // 发送请求
      this.getData()
    },
    // 获取 Pagination(分页器)子组件传递的 当前页码
    getPageNo(page) {
      this.searchParams.pageNo = page
      this.getData()
    }
  },
  // 数据监听 监听组件实例身上的属性值的变化
  watch: {
    // 监听路由信息的变化
    $route: {
      handler(newVal) {
        // 一上来就把 id置空，防止 beforeMount中原来的参数带来的影响 把相应的1，2，3级id置空
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
        // 路由信息变化 重新整理参数
        Object.assign(this.searchParams, newVal.query, newVal.params)
        this.getData()
      }
    }
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>